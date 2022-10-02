import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@material-ui/icons";
import { useState } from "react";
import { useEffect } from "react";

export default function UserList() {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const handleDelete = async (id) => {
    await axios
      .delete(`https://test.emkanfinances.net/api/user/delete/${id}`)
      .then(() => {
        setData(data.filter((el) => el.id !== id));
      });
  };

  const handleAccept = async (id) => {
    await axios
      .post(`https://test.emkanfinances.net/api/auth/accept/${id}`)
      .then(() => setRefresh(false));
  };

  useEffect(() => {
    fetch("https://test.emkanfinances.net/api/user/show")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [refresh]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.name}</div>;
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row.accepted ? (
              <p className="approved">Approved</p>
            ) : (
              <p className="pending">Pending</p>
            )}
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
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
    {
      field: "StatusAction",
      headerName: "StatusAction",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {params.row.accepted ? (
              ""
            ) : (
              <button
                className="userListEdit"
                onClick={() => handleAccept(params.row.id)}
              >
                Accept
              </button>
            )}
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
        key={data.map((item) => item.id)}
      />
    </div>
  );
}
