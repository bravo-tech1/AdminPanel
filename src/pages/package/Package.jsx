import { Link } from "react-router-dom";
import "../Service/service.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading/Loading.jsx";

export default function State() {
  const [hotel_id, sethotel_id] = useState();
  const [data, setData] = useState([]);
  const [details_title_en, setdetails_title_en] = useState();

  const [details_text1_en, setdetails_text1_en] = useState();
  const [details_title_ar, setdetails_title_ar] = useState();

  const [details_text1_ar, setdetails_text1_ar] = useState();
  const [period_from, setperiod_from] = useState();
  const [period_to, setperiod_to] = useState();
  const [package_rate, setpackage_rate] = useState();
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

  let update;
  useEffect(() => {
    fetch(`https://test.emkanfinances.net/api/package/show`)
      .then((res) => res.json())
      .then((data) => {
        update = data.filter((item) => item.id === id);
        sethotel_id(update[0].hotel_id);
        setdetails_title_en(update[0].details_title_en);
        setdetails_text1_en(update[0].details_text1_en);
        setdetails_title_ar(update[0].details_title_ar);
        setdetails_text1_ar(update[0].details_text1_ar);
        setperiod_from(update[0].period_from);
        setperiod_to(update[0].period_to);
        setpackage_rate(update[0].package_rate);
        setpackage_price(update[0].package_price);
        setpack_image(update[0].pack_image);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    SetLoading(true);
    const formData = new FormData();
    formData.append("hotel_id", hotel_id);
    formData.append("details_title_en", details_title_en);
    formData.append("details_text1_en", details_text1_en);
    formData.append("details_title_ar", details_title_ar);
    formData.append("details_text1_ar", details_text1_ar);
    formData.append("period_from", period_from);
    formData.append("period_to", period_to);
    formData.append("package_rate", package_rate);
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
    <div className="newProduct">
      <h1 className="addProductTitle">New Package</h1>
      <form
        className="addProductForm flex"
        style={{ justifyContent: "start", alignItems: "start" }}
        onSubmit={handleSubmit}
      >
        <div className="col-md-6">
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
          {/* <div className="addProductItem">
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
          </div> */}
        </div>
        <div className="col-md-6">
          <div className="addProductItem">
            <label>Period(From)</label>
            <input
              type="text"
              placeholder="Package Period"
              name="period_from"
              value={period_from}
              onChange={(e) => setperiod_from(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label>Period(to)</label>
            <input
              type="text"
              placeholder="Package Period"
              name="period_to"
              value={period_to}
              onChange={(e) => setperiod_to(e.target.value)}
            />
          </div>
          <div className="addProductItem">
            <label>Rate (Up to 5 Stars)</label>
            <input
              type="number"
              placeholder="Package Rate"
              name="package_rate"
              value={package_rate}
              onChange={(e) => setpackage_rate(e.target.value)}
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
            update
          </button>
          {loading && <Loading />}
        </div>
      </form>
    </div>
  );
}
