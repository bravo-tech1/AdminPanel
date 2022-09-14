import {
  LocationSearching,
  MailOutline,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./user.css";

export default function User() {
  
  const [userData, setUserData] = useState("Loading...")
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setpassword_confirmation] = useState("");
  const [accept, setAccept] = useState("1");
  const [userType, setUserType] = useState("user");
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
     let res = await axios(`https://test.emkanfinances.net/api/user/update/${id}`,{
        method: "POST",
        data: {
          name:name,
          email:email,
          password:password,
          password_confirmation:password_confirmation,
          accepted:accept,
          user_type:userType
        },
        headers: {
            'content-type': 'multipart/form-data'
          }
     },);
      if (res.status === 200) {
      window.location.href = "/users"
      } else {
        console.log("Some error occured");
      }
    } catch (err) {
      console.log(err.response.data);
    }
 }


  const id = Number(window.location.pathname.replace('/user/',''))
  useEffect(() => {
    fetch(`https://test.emkanfinances.net/api/user/show`)
      .then(res => res.json())
      .then(data => setUserData(data.find(x => x.id === id)))
  }, [])

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/user/create">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <div className="userShowTopTitle">
              <span className="userShowUsername">{ userData.name}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{userData.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{userData.user_type}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{userData.accepted ? 'Accepted' : 'Not Aceepted' }</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
        <form className="newUserForm" onSubmit={handleSubmit} encType='multipart/form-data'>
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="john" name="name" onChange={(e) => setName(e.target.value)} value={name} required/>
        </div>
        <div className="newUserItem"  >
          <label>Email</label>
          <input type="email" placeholder="john@gmail.com" name="email" onChange={(e) => setEmail(e.target.value)} value={email} required/>
        </div>
        <div className="newUserItem"  >
          <label>Password</label>
          <input type="password" placeholder="password" name="passowrd" onChange={(e) => setPassword(e.target.value)} value={password} required/>
        </div>
        <div className="newUserItem"  >
          <label>Password Confirmation</label>
          <input type="password" placeholder="password" name="password_confirmation" onChange={(e) => setpassword_confirmation(e.target.value)} value={password_confirmation} required/>
        </div>
        <div className="newUserItem">
          <label>Accept?</label>
          <select className="newUserSelect" name="accepted" id="active" onChange={(e) => setAccept(e.target.value)} value={accept} required>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>
        <div className="newUserItem">
          <label>User Type</label>
          <select className="newUserSelect" name="user_type" id="active" onChange={(e) => setUserType(e.target.value)} value={userType} required>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </div>
        <button className="newUserButton" type="submit">Update</button>
      </form>
        </div>
      </div>
    </div>
  );
}
