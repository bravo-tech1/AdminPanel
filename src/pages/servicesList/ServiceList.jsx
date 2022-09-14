import "./serviceList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function ProductList() {
  const [data, setData] = useState([]);

  const handleDelete = async (id) => {
    await axios
      .delete(`https://test.emkanfinances.net/api/service/delete/${id}`)
      .then(() => {
        setData(data.filter((el) => el.id !== id));
      });
  };
  useEffect(() => {
    fetch("https://test.emkanfinances.net/api/service/show")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "department_id",
      headerName: "Department_ID",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem serviceNameC">
            {params.row.department_id}
          </div>
        );
      },
    },
    {
      field: "service_en",
      headerName: "Service(English)",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem serviceNameC">
            {params.row.service_text_en}
          </div>
        );
      },
    },
    {
      field: "service_text_ar",
      headerName: "Service(Arabic)",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">{params.row.service_text_ar}</div>
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
            <Link to={"/service/update/" + params.row.id}>
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
