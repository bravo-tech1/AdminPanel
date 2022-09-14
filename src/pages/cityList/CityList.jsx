import "../cityList/cityList.css";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";



export default function UserList() {


  const [data, setData] = useState([]);

  const handleDelete = async (id) => {
        await axios.delete(`https://test.emkanfinances.net/api/city/delete/${id}`).then(() => {
          setData(data.filter((el) => el.id !== id));
        })
        

}
  useEffect(()=>{
    fetch("https://test.emkanfinances.net/api/city/show")
      .then(res => res.json())
      .then(data => setData(data))
    },[])


  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "state_id",
      headerName: "State",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row.state_id}
          </div>
        );
      },
    },
    { field: "city_name_en", headerName: "City Name(English)", width: 200,
      renderCell: (params) => {
        return(
          <div className="userListUser">
            {params.row.city_name_en}
          </div>
        )
      }
    },
    { field: "city_name_ar", headerName: "City Name(Arabic)", width: 200,
    renderCell: (params) => {
      return(
        <div className="userListUser">
          {params.row.city_name_ar}
        </div>
      )
    }
  },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/cities/update/" + params.row.id}>
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
    <div className="userList">
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
