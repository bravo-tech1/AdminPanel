import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function OtherDetails() {
  const [data, setData] = useState([]);
  const [allPack, setAllPack] = useState([]);

  const location = data.filter((item) => item.type === "Location");

  console.log(allPack);

  function getPackageTitle(id) {
    const title = allPack.filter((item) => item.id === id);
    return title[0] ? title[0].hotel_name_en : "Loading...";
  }

  const handleDelete = async (id) => {
    await axios
      .get(`https://test.emkanfinances.net/api/otherdetail/delete/${id}`)
      .then(() => {
        setData(data.filter((el) => el.id !== id));
      });
  };
  useEffect(() => {
    fetch("https://test.emkanfinances.net/api/otherdetail/show")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  useEffect(() => {
    fetch("https://test.emkanfinances.net/api/package/show")
      .then((res) => res.json())
      .then((data) => {
        setAllPack(data);
      });
  }, []);

  const columns = [
    {
      field: "package",
      headerName: "Package",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {getPackageTitle(params.row.package_id)}
            {/* {allPack
              .filter((item) => item.id === params.row.package_id)
              .map((item) => item.hotel_name_en)} */}
          </div>
        );
      },
    },
    {
      field: "Title",
      headerName: "Title",
      width: 200,
      renderCell: (params) => {
        return <div className="productListItem ">{params.row.title_en}</div>;
      },
    },
    {
      field: "type",
      headerName: "Type",
      width: 200,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.type}</div>;
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/otherdeatils/update/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={data.filter((item) => item.type !== "Location")}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        key={data.map((item) => item.id)}
      />
    </div>
  );
}
