import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Loading from "../../components/Loading/Loading.jsx";
import ReactQuill, { Quill } from "react-quill";
import "./input.css";
import { LoadScript, GoogleMap, Polygon } from "@react-google-maps/api";
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
    ["link", "image", "video"],
    ["clean"],
  ],
  imageUploader: {
    upload: (file) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("image", file);

        fetch(
          "https://api.imgbb.com/1/upload?key=d8b8d83a8810c689d5b6ebc1d4152df7",
          {
            method: "POST",
            body: formData,
          }
        )
          .then((response) => response.json())
          .then((result) => {
            resolve(result.data.url);
          })
          .catch((error) => {
            reject("Upload failed");
            console.error("Error:", error);
          });
      });
    },
  },
};

export default function NewDeatils() {
  // States
  const [packageId, setPackageId] = React.useState();
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [text_en, settext_en] = useState("");
  const [text2_en, settext2_en] = useState("");
  const [text_ar, settext_ar] = useState("");
  const [text2_ar, settext2_ar] = useState("");
  const [loading, SetLoading] = useState(false);

  // #2 register module
  Quill.register("modules/imageUploader", ImageUploader);

  const fileSelectedHandler = (e) => {
    setImages([...images, ...e.target.files]);
  };
  useEffect(() => {
    fetch("https://test.emkanfinances.net/api/package/show")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  const packTitle = data.map((item) => (
    <option value={item.id}>{item.details_title_en}</option>
  ));

  // Store Polygon path in state
  const [path, setPath] = useState([
    { lat: 52.52549080781086, lng: 13.398118538856465 },
    { lat: 52.48578559055679, lng: 13.36653284549709 },
    { lat: 52.48871246221608, lng: 13.44618372440334 },
  ]);

  // Define refs for Polygon instance and listeners
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);

  // Call setPath with new edited path
  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map((latLng) => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      setPath(nextPath);
    }
  }, [setPath]);

  // Bind refs to current Polygon and listeners
  const onLoad = useCallback(
    (polygon) => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );

  // Clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach((lis) => lis.remove());
    polygonRef.current = null;
  }, []);

  // Submit Data To Server

  const uploadToServer = (e) => {
    e.preventDefault();
    SetLoading(true);
    const formData = new FormData();
    formData.append("package_id", packageId);
    formData.append("text_en", text_en);
    formData.append("text2_en", text2_en);
    formData.append("text_ar", text_ar);
    formData.append("text2_ar", text2_ar);
    images.forEach((image_file) => {
      formData.append("images[]", image_file);
    });

    axios({
      url: `https://test.emkanfinances.net/api/detail/create`,
      method: "POST",
      data: formData,
    })
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "/deatils";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="app p-5 product" style={{ position: "relative" }}>
      <form onSubmit={(e) => uploadToServer(e)} encType="multipart/form-data">
        <div className="newUserItem">
          <label>Choose Package</label>
          <select
            className="newUserSelect"
            name="state_id"
            id="active"
            onChange={(e) => setPackageId(e.target.value)}
            value={packageId}
            required
          >
            <option selected disabled>
              Choose one
            </option>
            {packTitle}
          </select>
        </div>
        <div
          className="newUserItem flex"
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            width: "100%",
          }}
        >
          <div>
            <h2 style={{ marginBottom: "1rem" }}>English Deatils: </h2>
            <ReactQuill
              theme="snow"
              modules={modules}
              placeholder="Content goes here..."
              onChange={settext_en}
            />
            <h2 style={{ marginTop: "1rem", marginBottom: "1rem" }}>
              Secondary Deatils(English):{" "}
            </h2>
            <ReactQuill
              theme="snow"
              modules={modules}
              placeholder="Content goes here..."
              onChange={settext2_en}
            />
          </div>
          <div>
            <h2 style={{ marginBottom: "1rem" }}>Arabic Deatils: </h2>
            <ReactQuill
              theme="snow"
              modules={modules}
              placeholder="Content goes here..."
              onChange={settext_ar}
            />
            <h2 style={{ marginTop: "1rem", marginBottom: "1rem" }}>
              Secondary Deatils(Arabic):{" "}
            </h2>
            <ReactQuill
              theme="snow"
              modules={modules}
              placeholder="Content goes here..."
              onChange={settext2_ar}
            />
          </div>
        </div>
        <input
          type="file"
          multiple
          onChange={fileSelectedHandler}
          style={{ display: "block" }}
          required
        />

        <button className="addProductButton" type="submit">
          Create
        </button>
        {loading && <Loading />}
      </form>
    </div>
  );
}
