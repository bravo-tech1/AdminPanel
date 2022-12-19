import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../components/Loading/Loading.jsx";

export default function NewOtherDeatils() {
  // States

  const [type, setType] = useState("");
  const [IncTitle, setIncTitle] = useState("");
  const [IncTitleAr, setIncTitleAr] = useState("");
  const [IncDesc, setIncDesc] = useState("");
  const [IncDescAr, setIncDescAr] = useState("");
  const [loading, SetLoading] = useState(false);

  const id = Number(
    window.location.pathname.replace("/otherdeatils/update/", "")
  );

  useEffect(() => {
    fetch(`https://test.emkanfinances.net/api/otherdetail/show`)
      .then((res) => res.json())
      .then((data) => {
        let update = data.filter((item) => item.id === id);
        console.log(update);
        setIncTitle(update[0].title_en);
        setIncDescAr(update[0].title_ar);
        setIncTitleAr(update[0].description_en);
        setIncDesc(update[0].description_ar);
        setType(update[0].type);
      });
  }, []);

  // Submit Data To Server

  const uploadToServer = async (e) => {
    e.preventDefault();
    SetLoading(true);
    const formData = new FormData();
    formData.append("title_en", IncTitle);
    formData.append("title_ar", IncTitleAr);
    formData.append("description_en", IncDesc);
    formData.append("description_ar", IncDescAr);
    axios
      .post(
        `https://test.emkanfinances.net/api/otherdetail/update/${id}`,
        formData
      )
      .then((response) => {
        if (response === 200) {
          window.location.pathname = "/otherdeatils";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="app p-5 product" style={{ position: "relative" }}>
      <form onSubmit={(e) => uploadToServer(e)} encType="multipart/form-data">
        <h1>{type}</h1>
        <div className="d-flex align-items-center flex-wrap">
          <div className="newUserItem">
            <label htmlFor="ItiAr">Title</label>
            <input
              className="form-control"
              id="ItiAr"
              onChange={(e) => setIncTitle(e.target.value)}
              value={IncTitle}
              placeholder="Title.."
              required
            />
          </div>
          <div className="newUserItem">
            <label htmlFor="itiDAr">Description</label>
            <input
              className="form-control"
              id="itiDAr"
              onChange={(e) => setIncDesc(e.target.value)}
              value={IncDesc}
              placeholder="Description.."
              required
            />
          </div>
          <div className="newUserItem">
            <label htmlFor="itiDAr">Title Arabic</label>
            <input
              className="form-control"
              id="itiDAr"
              onChange={(e) => setIncTitleAr(e.target.value)}
              value={IncTitleAr}
              placeholder="Title Ar.."
              required
            />
          </div>
          <div className="newUserItem">
            <label htmlFor="itiDAr">Description Arabic</label>
            <input
              className="form-control"
              id="itiDAr"
              onChange={(e) => setIncDescAr(e.target.value)}
              value={IncDescAr}
              placeholder="Description AR.."
              required
            />
          </div>
        </div>

        <button className="addProductButton" type="submit">
          Update
        </button>
        {loading && <Loading />}
      </form>
    </div>
  );
}
