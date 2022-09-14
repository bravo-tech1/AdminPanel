import { Link } from "react-router-dom";
import "../Service/service.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading/Loading.jsx";

export default function State() {
  const [service_id, setServiceId] = useState(1);
  const [data, setData] = useState([]);
  const [state_title_ar, setstate_title_ar] = useState();
  const [state_title_secondary_ar, setstate_title_secondary_ar] = useState();
  const [state_text_ar, setstate_text_ar] = useState();
  const [state_title_en, setstate_title_en] = useState();
  const [state_title_secondary_en, setstate_title_secondary_en] = useState();
  const [state_text_en, setstate_text_en] = useState();
  const [state_image, setstate_image] = useState();
  const [loading, SetLoading] = useState(false);

  useEffect(() => {
    fetch("https://test.emkanfinances.net/api/service/show")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  const serviceTitle = data.map((item) => (
    <option value={item.id}>{item.service_text_en}</option>
  ));

  const id = Number(window.location.pathname.replace("/states/update/", ""));

  const handleSubmit = (event) => {
    event.preventDefault();
    SetLoading(true);
    const formData = new FormData();
    formData.append("service_id", service_id);
    formData.append("state_title_ar", state_title_ar);
    formData.append("state_title_secondary_ar", state_title_secondary_ar);
    formData.append("state_text_ar", state_text_ar);
    formData.append("state_title_en", state_title_en);
    formData.append("state_title_secondary_en", state_title_secondary_en);
    formData.append("state_text_en", state_text_en);
    formData.append("state_image", state_image);

    axios
      .post(`https://test.emkanfinances.net/api/state/update/${id}`, formData, {
        "Content-Type": "multipart/form-data",
      })
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "/state";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Update State</h1>
        <Link to="/states/create">
          <button className="productAddButton">Create</button>
        </Link>
      </div>

      <div className="newProduct">
        <form className="addProductForm" onSubmit={handleSubmit}>
          <div className="newUserItem">
            <label>Choose Service</label>
            <select
              className="newUserSelect"
              name="service_id"
              id="active"
              onChange={(e) => setServiceId(e.target.value)}
              value={service_id}
              required
            >
              <option selected disabled>
                Choose one
              </option>
              {serviceTitle}
            </select>
          </div>
          <div className="addProductItem">
            <label>State Title(Arabic)</label>
            <input
              type="text"
              placeholder="State Title(Arabic)"
              name="state_title_ar"
              value={state_title_ar}
              onChange={(e) => setstate_title_ar(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label>State Title(English)</label>
            <input
              type="text"
              placeholder="State Title(English)"
              name="state_title_en"
              value={state_title_en}
              onChange={(e) => setstate_title_en(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label>State Secondary Title (English)</label>
            <input
              type="text"
              placeholder="State Title(English)"
              name="state_title_secondary_en"
              value={state_title_secondary_en}
              onChange={(e) => setstate_title_secondary_en(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label>State Secondary Title (Arabic)</label>
            <input
              type="text"
              placeholder="State Title(Arabic)"
              name="state_title_secondary_ar"
              value={state_title_secondary_ar}
              onChange={(e) => setstate_title_secondary_ar(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label>State Description (English)</label>
            <input
              type="text"
              placeholder="State Description (English)"
              name="state_text_en"
              value={state_text_en}
              onChange={(e) => setstate_text_en(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label>State Description (Arabic)</label>
            <input
              type="text"
              placeholder="State Description (Arabic)"
              name="state_text_ar"
              value={state_text_ar}
              onChange={(e) => setstate_text_ar(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label>Stat's Image</label>
            <input
              type="file"
              id="file"
              multiple
              onChange={(e) => setstate_image(e.target.files.item(0))}
            />
          </div>

          <button className="addProductButton" type="submit">
            Create
          </button>
          {loading && <Loading />}
        </form>
      </div>
    </div>
  );
}
