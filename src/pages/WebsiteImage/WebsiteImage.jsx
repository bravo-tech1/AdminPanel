import { useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading/Loading.jsx";

export default function WebsiteImage() {
  const [title_en, settitle_en] = useState();
  const [title_ar, settitle_ar] = useState();
  const [website_image, setwebsite_image] = useState();
  const [loading, SetLoading] = useState(false);

  useState(() => {
    fetch("https://test.emkanfinances.net/api/website/showbyid/1")
      .then((res) => res.json())
      .then((dataRes) => {
        dataRes.map((item) => {
          settitle_en(item.title_en);
          settitle_ar(item.title_ar);
          setwebsite_image(item.website_image);
        });
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    SetLoading(true);
    const formData = new FormData();
    formData.append("title_en", title_en);
    formData.append("title_ar", title_ar);
    formData.append("website_image", website_image);

    axios
      .post("https://test.emkanfinances.net/api/website/update/1", formData, {
        "Content-Type": "multipart/form-data",
      })
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
    <div className="newProduct">
      <h1 className="addProductTitle">Update Image</h1>
      <form className="addProductForm" onSubmit={handleSubmit}>
        <div className="addProductItem">
          <label>Image Title(Arabic)</label>
          <input
            type="text"
            placeholder="Hotel Title(Arabic)"
            name="title_ar"
            value={title_ar}
            onChange={(e) => settitle_ar(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Image Title(English)</label>
          <input
            type="text"
            placeholder="Hotel Title(English)"
            name="title_en"
            value={title_en}
            onChange={(e) => settitle_en(e.target.value)}
          />
        </div>

        <div className="addProductItem">
          <label>Website Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setwebsite_image(e.target.files.item(0))}
          />
        </div>
        <button className="addProductButton" type="submit">
          Update
        </button>
        {loading && <Loading />}
      </form>
    </div>
  );
}
