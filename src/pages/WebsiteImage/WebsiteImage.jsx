import { useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading/Loading.jsx";

import ReactQuill, { Quill } from "react-quill";

// #1 import quill-image-uploader
import ImageUploader from "quill-image-uploader";

import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link"],
    ["clean"],
  ],
};

export default function WebsiteImage() {
  const [title_en, settitle_en] = useState();
  const [title_en_night, settitle_en_night] = useState();
  const [title_ar, settitle_ar] = useState();
  const [title_ar_night, settitle_ar_night] = useState();
  const [website_image, setwebsite_image] = useState();
  const [website_image_night, setwebsite_image_night] = useState();
  const [loading, SetLoading] = useState(false);

  useState(() => {
    fetch("https://test.emkanfinances.net/api/website/showbyid/1")
      .then((res) => res.json())
      .then((dataRes) => {
        dataRes.map((item) => {
          settitle_en(item.title_en);
          settitle_en_night(item.title_en_night);
          settitle_ar(item.title_ar);
          settitle_ar_night(item.title_ar_night);
          setwebsite_image(item.website_image);
        });
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    SetLoading(true);
    const formData = new FormData();
    formData.append("title_en", title_en);
    formData.append("title_en_night", title_en_night);
    formData.append("title_ar", title_ar);
    formData.append("title_ar_night", title_ar_night);
    formData.append("website_image", website_image);
    formData.append("website_image_night", website_image_night);

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
        <div className="addProductItem" style={{ width: "100%" }}>
          <label>Image Title(Arabic)</label>
          <ReactQuill
            theme="snow"
            modules={modules}
            placeholder="Content goes here..."
            onChange={settitle_ar}
            value={title_ar}
          />
        </div>
        <div className="addProductItem" style={{ width: "100%" }}>
          <label>Image Title Night(Arabic)</label>
          <ReactQuill
            theme="snow"
            modules={modules}
            placeholder="Content goes here..."
            onChange={settitle_ar_night}
            value={title_ar_night}
          />
        </div>
        <div className="addProductItem" style={{ width: "100%" }}>
          <label>Image Title(English)</label>
          <ReactQuill
            theme="snow"
            modules={modules}
            placeholder="Content goes here..."
            onChange={settitle_en}
            value={title_en}
          />
        </div>
        <div className="addProductItem" style={{ width: "100%" }}>
          <label>Image Title Night(English)</label>
          <ReactQuill
            theme="snow"
            modules={modules}
            placeholder="Content goes here..."
            onChange={settitle_en_night}
            value={title_en_night}
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
        <div className="addProductItem">
          <label>Website Image Night</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setwebsite_image_night(e.target.files.item(0))}
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
