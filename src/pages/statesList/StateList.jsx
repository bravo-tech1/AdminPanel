import "./stateList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";


export default function ProductList() {
  const [data, setData] = useState([]);
  const [serviceData, setServicData] = useState([]);

  console.log(data)


  const handleDelete = async (id) => {
        await axios.delete(`https://test.emkanfinances.net/api/state/delete/${id}`).then(() => {
          setData(data.filter((el) => el.id !== id));
        })
        

}
  useEffect(()=>{
    fetch("https://test.emkanfinances.net/api/state/show")
      .then(res => res.json())
      .then(data => setData(data))
    },[])
    useEffect(() => {
      fetch('https://test.emkanfinances.net/api/service/show')
        .then(res => res.json())
        .then(data => setServicData(data))
    },[])

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "service name",
      headerName: "Service Name",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.service_id}
          </div>
        );
      },
    },
    {
      field: "state_title",
      headerName: "State Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem serviceNameC2">
            {params.row.state_title_en}
          </div>
        );
      },
    },
    {
      field: "state_title(Arabic)",
      headerName: "State Name(Arabic)",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.state_title_ar}
          </div>
        );
      },
    },
    
    {
      field: "state_text",
      headerName: "State Description",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.state_text_en}
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
            <Link to={"/states/update/" + params.row.id}>
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
