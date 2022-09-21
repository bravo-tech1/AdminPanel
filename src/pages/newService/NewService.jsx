import "./newService.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../components/Loading/Loading.jsx";

export default function NewService() {
  const [departmentId, setDepartmentId] = useState();
  const [data, setData] = useState([]);
  const [ar_text, setArText] = useState();
  const [en_text, setEnText] = useState();
  const [service_desc_en, setservice_desc_en] = useState();
  const [service_desc_ar, setservice_desc_ar] = useState();
  const [service_video, setServiceVideo] = useState();

  const [loading, SetLoading] = useState(false);
  console.log(departmentId);

  useEffect(() => {
    fetch("https://test.emkanfinances.net/api/Department/show")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const departmentid = data.map((item) => (
    <option value={item.id}>{item.dep_name_en}</option>
  ));

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
      .post("https://test.emkanfinances.net/api/service/create", formData, {
        "Content-Type": "multipart/form-data",
      })
      .then((response) => {
        if (response.status === 201) {
          window.location.href = "/services";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Service</h1>
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
          Create
        </button>
        {loading && <Loading />}
      </form>
    </div>
  );
}
