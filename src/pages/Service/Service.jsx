import { Link } from "react-router-dom";
import "./service.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading/Loading.jsx";

export default function Service() {
  const [data, setData] = useState("Loading....");
  const [dataS, setDataS] = useState([]);
  const [departmentId, setDepartmentId] = useState();
  const [ar_text, setArText] = useState();
  const [en_text, setEnText] = useState();
  const [service_desc_en, setservice_desc_en] = useState();
  const [service_desc_ar, setservice_desc_ar] = useState();
  const [service_video, setServiceVideo] = useState();
  const [loading, SetLoading] = useState(false);

  useEffect(() => {
    fetch("https://test.emkanfinances.net/api/Department/show")
      .then((res) => res.json())
      .then((data) => setDataS(data));
  }, []);

  const departmentid = dataS.map((item) => (
    <option value={item.id}>{item.dep_name_en}</option>
  ));

  const id = Number(window.location.pathname.replace("/service/update/", ""));
  useEffect(() => {
    fetch("https://test.emkanfinances.net/api/service/show")
      .then((res) => res.json())
      .then((data) => setData(data.find((x) => x.id === id)));
  }, []);
  console.log(data);

  const handleSubmit = (event) => {
    event.preventDefault();
    SetLoading(true);
    const formData = new FormData();
    formData.append("service_text_ar", ar_text);
    formData.append("service_text_en", en_text);
    formData.append("service_desc_en", service_desc_en);
    formData.append("service_desc_ar", service_desc_ar);
    formData.append("service_video", service_video);
    formData.append("department_id", departmentId);

    axios
      .post(
        `https://test.emkanfinances.net/api/service/update/${id}`,
        formData,
        { "Content-Type": "multipart/form-data" }
      )
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "/services";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Service</h1>
        <Link to="/service/create">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="newProduct serviceFlex">
        <div className="serviceShow">
          <div className="item">
            <h3>Service Title(English)</h3>
            <p>{data.service_text_en}</p>
          </div>
          <div className="item">
            <h3>Service Title(Arabic)</h3>
            <p>{data.service_text_ar}</p>
          </div>
          <div className="item">
            <h3>Service Video</h3>
            <video width="100%" controls>
              <source src={data.service_video} type="video/mp4" />
            </video>
          </div>
        </div>
        <form className="addProductForm" onSubmit={handleSubmit}>
          <div className="newUserItem">
            <label>Choose Department</label>

            <select
              className="newUserSelect"
              name="hotel_id"
              id="active"
              onChange={(e) => setDepartmentId(e.target.value)}
              value={departmentId}
              required
            >
              <option selected disabled>
                Choose one
              </option>
              {departmentid}
            </select>
          </div>
          <div className="addProductItem">
            <label>Service's Title(English)</label>
            <input
              type="text"
              placeholder="New Srevice"
              name="service_text"
              value={en_text}
              onChange={(e) => setEnText(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label>Service's Title(Arabic)</label>
            <input
              type="text"
              placeholder="New Srevice"
              name="service_text"
              value={ar_text}
              onChange={(e) => setArText(e.target.value)}
            />
          </div>
          <div className="addProductItem">
          <label>Service's Description(English)</label>
          <input
            type="text"
            placeholder="Description"
            name="service_desc_en"
            value={service_desc_en}
            onChange={(e) => setservice_desc_en(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Service's Description(Arabic)</label>
          <input
            type="text"
            placeholder="Description"
            name="service_desc_ar"
            value={service_desc_ar}
            onChange={(e) => setservice_desc_ar(e.target.value)}
          />
        </div>
          <div className="addProductItem">
            <label>Service's Vedio</label>
            <input
              type="file"
              id="file"
              multiple
              onChange={(e) => setServiceVideo(e.target.files.item(0))}
            />
          </div>

          <button className="addProductButton" type="submit">
            Update
          </button>
          {loading && <Loading />}
        </form>
      </div>
    </div>
  );
}
