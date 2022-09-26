import { Link } from "react-router-dom";
import "../Service/service.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading/Loading.jsx";

export default function State() {
  const [hotel_id, sethotel_id] = useState();
  const [data, setData] = useState([]);
  const [details_title_en, setdetails_title_en] = useState();
  const [details_text2_en, setdetails_text2_en] = useState();
  const [details_text1_en, setdetails_text1_en] = useState();
  const [details_title_ar, setdetails_title_ar] = useState();
  const [details_text2_ar, setdetails_text2_ar] = useState();
  const [details_text1_ar, setdetails_text1_ar] = useState();
  const [package_period, setpackage_period] = useState();
  const [package_price, setpackage_price] = useState();
  const [pack_image, setpack_image] = useState();
  const [loading, SetLoading] = useState(false);

  useEffect(() => {
    fetch("https://test.emkanfinances.net/api/hotel/show")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  const hotelTitle = data.map((item) => (
    <option value={item.id}>{item.hotel_name_en}</option>
  ));
  const id = Number(window.location.pathname.replace("/package/update/", ""));

  const handleSubmit = (event) => {
    event.preventDefault();
    SetLoading(true);
    const formData = new FormData();
    formData.append("hotel_id", hotel_id);
    formData.append("details_title_en", details_title_en);
    formData.append("details_text2_en", details_text2_en);
    formData.append("details_text1_en", details_text1_en);
    formData.append("details_title_ar", details_title_ar);
    formData.append("details_text2_ar", details_text2_ar);
    formData.append("details_text1_ar", details_text1_ar);
    formData.append("package_period", package_period);
    formData.append("package_price", package_price);
    formData.append("package_image", pack_image);

    axios
      .post(
        `https://test.emkanfinances.net/api/package/update/${id}`,
        formData,
        { "Content-Type": "multipart/form-data" }
      )
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "/packages";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Update Package</h1>
        <Link to="/package/create">
          <button className="productAddButton">Create</button>
        </Link>
      </div>

      <div className="newProduct">
        <form className="addProductForm" onSubmit={handleSubmit}>
          <div className="newUserItem">
            <label>Choose Hotel</label>
            <select
              className="newUserSelect"
              name="hotel_id"
              id="active"
              onChange={(e) => sethotel_id(e.target.value)}
              value={hotel_id}
              required
            >
              <option selected disabled>
                Choose one
              </option>
              {hotelTitle}
            </select>
          </div>
          <div className="addProductItem">
            <label>Package Title(Arabic)</label>
            <input
              type="text"
              placeholder="Package Title(Arabic)"
              name="details_title_ar"
              value={details_title_ar}
              onChange={(e) => setdetails_title_ar(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label>Package Title(English)</label>
            <input
              type="text"
              placeholder="Package Title(English)"
              name="details_title_en"
              value={details_title_en}
              onChange={(e) => setdetails_title_en(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label>Package Description (English)</label>
            <input
              type="text"
              placeholder="Package Description(English)"
              name="details_text1_en"
              value={details_text1_en}
              onChange={(e) => setdetails_text1_en(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label>Package Description (Arabic)</label>
            <input
              type="text"
              placeholder="Package Title(Arabic)"
              name="details_text1_ar"
              value={details_text1_ar}
              onChange={(e) => setdetails_text1_ar(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label>Package Description 2 (English)</label>
            <input
              type="text"
              placeholder="Package Descriptiony 2 (English)"
              name="details_text2_en"
              value={details_text2_en}
              onChange={(e) => setdetails_text2_en(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label>Package Description 2 (Arabic)</label>
            <input
              type="text"
              placeholder="Package Description (Arabic)"
              name="details_text2_ar"
              value={details_text2_ar}
              onChange={(e) => setdetails_text2_ar(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label> Package Period</label>
            <input
              type="number"
              placeholder="Package Period"
              name="package_period"
              value={package_period}
              onChange={(e) => setpackage_period(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label> Package Price</label>
            <input
              type="number"
              placeholder="Package Price"
              name="package_price"
              value={package_price}
              onChange={(e) => setpackage_price(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label>Package Image</label>
            <input
              type="file"
              id="file"
              multiple
              onChange={(e) => setpack_image(e.target.files.item(0))}
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
