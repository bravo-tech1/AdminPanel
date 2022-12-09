import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Loading from "../../components/Loading/Loading.jsx";

import parse from "html-react-parser";

import { LoadScript, GoogleMap, Polygon } from "@react-google-maps/api";

export default function NewOtherDeatils() {
  // States
  const [detailsId, setDetailsId] = React.useState();
  const [data, setData] = useState([]);

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

  useEffect(() => {
    fetch("https://test.emkanfinances.net/api/package/show")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  const detailsTitle = data.map((item) => (
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
    formData.append("package_id", detailsId);
    formData.append("Included[]", inputFieldsIncluded);
    formData.append("Excluded[]", inputFieldsEx);
    formData.append("Itinerary[]", inputFields);
    formData.append("location[]", path);
    axios({
      url: `https://test.emkanfinances.net/api/otherdetail/insert`,
      method: "POST",
      data: formData,
    })
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "/otherdeatils";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
        <div className="newUserItem">
          <label>Choose Deatil</label>
          <select
            className="newUserSelect"
            name="state_id"
            id="active"
            onChange={(e) => setDetailsId(e.target.value)}
            value={detailsId}
            required
          >
            <option selected disabled>
              Choose one
            </option>
            {detailsTitle}
          </select>
        </div>
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
        <button className="addProductButton" type="submit">
          Create
        </button>
        {loading && <Loading />}
      </form>
    </div>
  );
}
