import "./newUser.css";
import { useState } from "react";
import axios from "axios";

import Loading from "../../components/Loading/Loading.jsx";

export default function NewUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setpassword_confirmation] = useState("");
  const [accept, setAccept] = useState("1");
  const [userType, setUserType] = useState("user");
  const [loading, SetLoading] = useState(false);

  console.log(accept);

  let handleSubmit = async (e) => {
    e.preventDefault();
    SetLoading(true);
    try {
      let res = await axios("https://test.emkanfinances.net/api/user/create", {
        method: "POST",
        data: {
          name: name,
          email: email,
          password: password,
          password_confirmation: password_confirmation,
          accepted: accept,
          user_type: userType,
        },

        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        window.location.href = "/users";
      } else {
        console.log("Some error occured");
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form
        className="newUserForm"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            placeholder="john"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="john@gmail.com"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            name="passowrd"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Password Confirmation</label>
          <input
            type="password"
            placeholder="password"
            name="password_confirmation"
            onChange={(e) => setpassword_confirmation(e.target.value)}
            value={password_confirmation}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Accept?</label>
          <select
            className="newUserSelect"
            name="accepted"
            id="active"
            onChange={(e) => setAccept(e.target.value)}
            value={accept}
            required
          >
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>
        <div className="newUserItem">
          <label>User Type</label>
          <select
            className="newUserSelect"
            name="user_type"
            id="active"
            onChange={(e) => setUserType(e.target.value)}
            value={userType}
            required
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </div>
        <button className="newUserButton" type="submit">
          Create
        </button>
        {loading && <Loading />}
      </form>
    </div>
  );
}
