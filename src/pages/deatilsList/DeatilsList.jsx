import "../statesList/stateList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import HTMLReactParser from "html-react-parser";

export default function DeatilsList() {
  const [data, setData] = useState([]);
  const [serviceData, setServicData] = useState([]);

  const handleDelete = async (id) => {
    await axios
      .delete(`https://test.emkanfinances.net/api/detail/delete/${id}`)
      .then(() => {
        setData(data.filter((el) => el.id !== id));
      });
  };
  useEffect(() => {
    fetch("https://test.emkanfinances.net/api/detail/show")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  useEffect(() => {
    fetch("https://test.emkanfinances.net/api/package/show")
      .then((res) => res.json())
      .then((data) => setServicData(data));
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "Pack_id",
      headerName: "Package",
      width: 150,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.package_id}</div>;
      },
    },

    {
      field: "English Text",
      headerName: "English Text",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {HTMLReactParser(params.row.text_en)}
          </div>
        );
      },
    },
    {
      field: "Arabic Text",
      headerName: "Arabic Text",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {HTMLReactParser(params.row.text_ar)}
          </div>
        );
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/detail/update/" + params.row.id}>
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
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
