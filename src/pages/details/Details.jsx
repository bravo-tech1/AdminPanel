import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Loading from "../../components/Loading/Loading.jsx";
import ReactQuill, { Quill } from "react-quill";
import { LoadScript, GoogleMap, Polygon } from "@react-google-maps/api";
// #1 import quill-image-uploader
import ImageUploader from "quill-image-uploader";
import "../newDeatils/input.css";

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
  const [packageId, setPackageId] = React.useState();
  const [deatils, setDeatil] = useState([]);
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [text_en, settext_en] = useState("");
  const [text2_en, settext2_en] = useState("");
  const [text_ar, settext_ar] = useState("");
  const [text2_ar, settext2_ar] = useState("");
  const [loading, SetLoading] = useState(false);
  const [inputFields, setInputFields] = useState([{ title: "", desc: "" }]);
  const [inputFieldsIncluded, setInputFieldsIncluded] = useState([
    { titleI: "", descI: "" },
  ]);
  const [inputFieldsEx, setInputFieldsEx] = useState([
    { titleE: "", descE: "" },
  ]);
  const [height, setHight] = useState(0);
  const [overflow, setOverFlow] = useState(true);
  const [filedsShow, setFiledsShow] = useState("city");

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

  // #2 register module
  Quill.register("modules/imageUploader", ImageUploader);

  const id = Number(window.location.pathname.replace("/detail/update/", ""));

  useEffect(() => {
    fetch("https://test.emkanfinances.net/api/package/show")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  const packTitle = data.map((item) => (
    <option value={item.id}>{item.details_title_en}</option>
  ));
  useEffect(() => {
    fetch(`https://test.emkanfinances.net/api/detail/show`)
      .then((res) => res.json())
      .then((dataRes) => {
        console.log(dataRes.filter((x) => x.id === id));
        let update = dataRes.filter((x) => x.package_id === id);
        // settext_en(update[0].text_en);
        // settext_ar(update[0].text_ar);
        // settext2_en(update[0].text2_en);
        // settext2_ar(update[0].text2_ar);
        // setInputFields(update[0].itinerary);
        // setInputFieldsIncluded(update[0].inputFieldsIncluded);
        // setInputFieldsEx(update[0].inputFieldsEx);
      });
  }, []);

  function uploadToServer(e) {
    e.preventDefault();
    SetLoading(true);
    const formData = new FormData();
    formData.append("package_id", packageId);
    formData.append("text_en", text_en);
    formData.append("text2_en", text2_en);
    formData.append("text_ar", text_ar);
    formData.append("text2_ar", text2_ar);
    formData.append("images[]", images);
    formData.append("included", inputFieldsIncluded);
    formData.append("excluded", inputFieldsEx);
    formData.append("itinerary", inputFields);
    formData.append("cities_names", path);
    axios({
      url: `https://test.emkanfinances.net/api/detail/update/${id}`,
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
  }
  // City
  const addFields = () => {
    let newfield = { title: "", desc: "" };
    setInputFields([...inputFields, newfield]);
  };

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };
  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };
  // Included
  const addFieldsI = () => {
    let newfield = { titleI: "", descI: "" };
    setInputFieldsIncluded([...inputFieldsIncluded, newfield]);
  };

  const handleFormChangeI = (index, event) => {
    let data = [...inputFieldsIncluded];
    data[index][event.target.name] = event.target.value;
    setInputFieldsIncluded(data);
  };
  const removeFieldsI = (index) => {
    let data = [...inputFieldsIncluded];
    data.splice(index, 1);
    setInputFieldsIncluded(data);
  };
  // Exclude
  const addFieldsE = () => {
    let newfield = { titleE: "", descE: "" };
    setInputFieldsEx([...inputFieldsEx, newfield]);
  };

  const handleFormChangeE = (index, event) => {
    let data = [...inputFieldsEx];
    data[index][event.target.name] = event.target.value;
    setInputFieldsEx(data);
  };
  const removeFieldsE = (index) => {
    let data = [...inputFieldsEx];
    data.splice(index, 1);
    setInputFieldsEx(data);
  };
  return (
    <div className="app p-5 product" style={{ position: "relative" }}>
      <form onSubmit={(e) => uploadToServer(e)} encType="multipart/form-data">
        <div
          className="abs"
          style={{
            position: "absolute",
            background: "white",
            bottom: "0",
            height: `${height}%`,
            transition: "0.3s",
            width: "99%",
            overflow: overflow ? "hidden" : "visible",
            zIndex: 1,
          }}
        >
          <p
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              fontSize: "30px",
              cursor: "pointer",
            }}
            onClick={() => {
              setHight(0);
              setOverFlow(true);
            }}
          >
            X
          </p>

          {filedsShow === "city"
            ? inputFields.map((input, index) => {
                return (
                  <div className="form-inline" key={index}>
                    <input
                      name="title"
                      placeholder="Title"
                      value={input.title}
                      onChange={(event) => handleFormChange(index, event)}
                    />
                    <input
                      name="desc"
                      placeholder="Description"
                      value={input.desc}
                      onChange={(event) => handleFormChange(index, event)}
                    />
                    {index !== 0 && (
                      <button
                        type="button"
                        className="remove button"
                        onClick={() => removeFields(index)}
                      >
                        Remove
                      </button>
                    )}
                    <button
                      type="button"
                      className="button"
                      onClick={addFields}
                    >
                      Add More..
                    </button>
                  </div>
                );
              })
            : filedsShow === "inc"
            ? inputFieldsIncluded.map((input, index) => {
                return (
                  <div className="form-inline" key={index}>
                    <input
                      name="titleI"
                      placeholder="Title"
                      value={input.titleI}
                      onChange={(event) => handleFormChangeI(index, event)}
                    />
                    <input
                      name="descI"
                      placeholder="Description"
                      value={input.descI}
                      onChange={(event) => handleFormChangeI(index, event)}
                    />
                    {index !== 0 && (
                      <button
                        type="button"
                        className="remove button"
                        onClick={() => removeFieldsI(index)}
                      >
                        Remove
                      </button>
                    )}
                    <button
                      type="button"
                      className="button"
                      onClick={addFieldsI}
                    >
                      Add More..
                    </button>
                  </div>
                );
              })
            : filedsShow === "ex"
            ? inputFieldsEx.map((input, index) => {
                return (
                  <div className="form-inline" key={index}>
                    <input
                      name="titleE"
                      placeholder="Title"
                      value={input.titleE}
                      onChange={(event) => handleFormChangeE(index, event)}
                    />
                    <input
                      name="descE"
                      placeholder="Description"
                      value={input.descE}
                      onChange={(event) => handleFormChangeE(index, event)}
                    />
                    {index !== 0 && (
                      <button
                        type="button"
                        className="remove button"
                        onClick={() => removeFieldsE(index)}
                      >
                        Remove
                      </button>
                    )}
                    <button
                      type="button"
                      className="button"
                      onClick={addFieldsE}
                    >
                      Add More..
                    </button>
                  </div>
                );
              })
            : "no data"}

          <p
            style={{
              fontSize: "30px",
              cursor: "pointer",
              width: "fit-content",
            }}
            className="button"
            onClick={() => {
              setHight(0);
              setOverFlow(true);
            }}
          >
            Close
          </p>
        </div>
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
        {/* {uploadedImages} */}
        <div style={{ display: "block" }}>
          <button
            type="button"
            className="button addProductButton"
            onClick={() => {
              setFiledsShow("city");
              setHight(100);
            }}
          >
            Cities
          </button>
          <button
            type="button"
            className="button addProductButton"
            onClick={() => {
              setFiledsShow("inc");
              setHight(100);
            }}
          >
            Indcluded
          </button>
          <button
            type="button"
            className="button addProductButton"
            onClick={() => {
              setFiledsShow("ex");
              setHight(100);
            }}
          >
            Excluded
          </button>
        </div>
        <div style={{ width: "100%", height: "600px" }}>
          <LoadScript
            id="script-loader"
            googleMapsApiKey=""
            language="en"
            region="us"
          >
            <GoogleMap
              mapContainerClassName="App-map"
              center={{ lat: 52.52047739093263, lng: 13.36653284549709 }}
              zoom={12}
              version="weekly"
              on
            >
              <Polygon
                // Make the Polygon editable / draggable
                editable
                draggable
                path={path}
                // Event used when manipulating and adding points
                onMouseUp={onEdit}
                // Event used when dragging the whole Polygon
                onDragEnd={onEdit}
                onLoad={onLoad}
                onUnmount={onUnmount}
              />
            </GoogleMap>
          </LoadScript>
        </div>
        <input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
          style={{ display: "block" }}
        />
        <button className="addProductButton" type="submit">
          Update
        </button>
        {loading && <Loading />}
      </form>
    </div>
  );
}
