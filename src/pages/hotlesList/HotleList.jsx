import "../cityList/cityList.css";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function UserList() {
  const [data, setData] = useState([]);
  const [cityData, setCityData] = useState([]);

  function getCityName(id) {
    const title = cityData.filter((item) => item.id === id);
    return title[0] ? title[0].city_name_en : "Loading...";
  }

  const handleDelete = async (id) => {
    await axios
      .delete(`https://test.emkanfinances.net/api/hotel/delete/${id}`)
      .then(() => {
        setData(data.filter((el) => el.id !== id));
      });
  };
  useEffect(() => {
    fetch("https://test.emkanfinances.net/api/city/show")
      .then((res) => res.json())
      .then((data) => setCityData(data));
  }, []);
  useEffect(() => {
    fetch("https://test.emkanfinances.net/api/hotel/show")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "city_id",
      headerName: "City",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="userListUser">{getCityName(params.row.city_id)}</div>
        );
      },
    },
    {
      field: "hotel_name_en",
      headerName: "Hotel Name(English)",
      width: 200,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.hotel_name_en}</div>;
      },
    },
    {
      field: "hotel_name_ar",
      headerName: "Hotel Name(Arabic)",
      width: 200,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.hotel_name_ar}</div>;
      },
    },
    {
      field: "hotel_location_en",
      headerName: "Location(English)",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="userListUser">{params.row.hotel_location_en}</div>
        );
      },
    },
    {
      field: "hotel_location_ar",
      headerName: "Location(Arabic)",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="userListUser">{params.row.hotel_location_ar}</div>
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
            <Link to={"/hotel/update/" + params.row.id}>
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
