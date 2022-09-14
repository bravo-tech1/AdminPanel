import { Link } from "react-router-dom";
import "../Service/service.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading/Loading.jsx";

export default function State() {
  const [state_id, setStateId] = useState(1);
  const [data, setData] = useState([]);
  const [city_name_en, setcity_name_en] = useState();
  const [city_name_ar, setcity_name_ar] = useState();
  const [city_image, setcity_image] = useState();
  const [loading, SetLoading] = useState(false);

  useEffect(() => {
    fetch("https://test.emkanfinances.net/api/state/show")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  const stateTitle = data.map((item) => (
    <option value={item.id}>{item.state_title_en}</option>
  ));

  const handleSubmit = (event) => {
    event.preventDefault();
    SetLoading(true);
    const formData = new FormData();
    formData.append("state_id", state_id);
    formData.append("city_name_en", city_name_en);
    formData.append("city_name_ar", city_name_ar);
    formData.append("city_image", city_image);

    axios
      .post(`https://test.emkanfinances.net/api/city/create`, formData, {
        "Content-Type": "multipart/form-data",
      })
      .then((response) => {
        if (response.status === 201) {
          window.location.href = "/city";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">New City</h1>
      </div>
      <div className="newProduct">
        <form className="addProductForm" onSubmit={handleSubmit}>
          <div className="newUserItem">
            <label>Choose State</label>
            <select
              className="newUserSelect"
              name="state_id"
              id="active"
              onChange={(e) => setStateId(e.target.value)}
              value={state_id}
              required
            >
              <option selected disabled>
                Choose one
              </option>
              {stateTitle}
            </select>
          </div>
          <div className="addProductItem">
            <label>City Title(Arabic)</label>
            <input
              type="text"
              placeholder="City Title(Arabic)"
              name="city_name_ar"
              value={city_name_ar}
              onChange={(e) => setcity_name_ar(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label>City Title(English)</label>
            <input
              type="text"
              placeholder="City Title(English)"
              name="city_name_en"
              value={city_name_en}
              onChange={(e) => setcity_name_en(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label>Stat's Image</label>
            <input
              type="file"
              id="file"
              multiple
              onChange={(e) => setcity_image(e.target.files.item(0))}
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
