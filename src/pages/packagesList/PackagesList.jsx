import "../statesList/stateList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function PackagesList() {
  const [data, setData] = useState([]);
  const [serviceData, setServicData] = useState([]);

  const handleDelete = async (id) => {
    await axios
      .delete(`https://test.emkanfinances.net/api/package/delete/${id}`)
      .then(() => {
        setData(data.filter((el) => el.id !== id));
      });
  };
  useEffect(() => {
    fetch("https://test.emkanfinances.net/api/package/show")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  useEffect(() => {
    fetch("https://test.emkanfinances.net/api/hotel/show")
      .then((res) => res.json())
      .then((data) => setServicData(data));
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "hotel_id",
      headerName: "Hotel",
      width: 50,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.hotel_id}</div>;
      },
    },
    {
      field: "details_title_en",
      headerName: "Package(En)",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">{params.row.details_title_en}</div>
        );
      },
    },
    {
      field: "details_title_ar",
      headerName: "Package(ar)",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">{params.row.details_title_ar}</div>
        );
      },
    },

    {
      field: "period",
      headerName: "From",
      width: 200,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.period_from}</div>;
      },
    },
    {
      field: "periodTo",
      headerName: "To",
      width: 200,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.period_to}</div>;
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/package/update/" + params.row.id}>
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
        key={data.map((item) => item.id)}
      />
    </div>
  );
}
