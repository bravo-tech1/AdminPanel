import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Loading from "../../components/Loading/Loading.jsx";
import { LoadScript, GoogleMap, Polygon } from "@react-google-maps/api";
import "./style.css";

export default function NewOtherDeatils() {
  // States
  const [detailsId, setDetailsId] = React.useState();
  const [data, setData] = useState([]);
  const [loading, SetLoading] = useState(false);
  const [IncTitle, setIncTitle] = useState("");
  const [IncTitleAr, setIncTitleAr] = useState("");
  const [IncDesc, setIncDesc] = useState("");
  const [IncDescAr, setIncDescAr] = useState("");
  const [ExTitle, setExTitle] = useState("");
  const [ExTitleAr, setExTitleAr] = useState("");
  const [ExDesc, setExDesc] = useState("");
  const [ExDescAr, setExDescAr] = useState("");
  const [ItiTitle, setItiTitle] = useState("");
  const [ItiTitleAr, setItiTitleAr] = useState("");
  const [ItiDesc, setItiDesc] = useState("");
  const [ItiDescAr, setItiDescAr] = useState("");

  useEffect(() => {
    fetch("https://test.emkanfinances.net/api/package/show")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  // useEffect(() => {
  //   fetch(" https://test.emkanfinances.net/api/otherdetail/show ")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setShowMap(
  //         data.filter((item) => item.package_id === Number(detailsId))
  //       );
  //     });
  // }, [detailsId]);

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

  const uploadToServer = async (e) => {
    e.preventDefault();
    SetLoading(true);
    const formData = new FormData();

    const ExData = new FormData();
    const itenData = new FormData();
    const locationData = new FormData();
    // Included Data
    formData.append("package_id", detailsId);
    formData.append("title_en", IncTitle);
    formData.append("title_ar", IncTitleAr);
    formData.append("description_en", IncDesc);
    formData.append("description_ar", IncDescAr);
    // Excluded Data
    formData.append("type", "Included");
    ExData.append("package_id", detailsId);
    ExData.append("title_en", ExTitle);
    ExData.append("title_ar", ExTitleAr);
    ExData.append("description_en", ExDesc);
    ExData.append("description_ar", ExDescAr);
    ExData.append("type", "Excluded");
    // Itinerary
    itenData.append("package_id", detailsId);
    itenData.append("title_en", ItiTitle);
    itenData.append("title_ar", ItiTitleAr);
    itenData.append("description_en", ItiDesc);
    itenData.append("description_ar", ItiDescAr);
    itenData.append("type", "Itinerary");
    // Location
    locationData.append("package_id", detailsId);
    path.forEach((i) => locationData.append("values1[]", i.lat));
    path.forEach((i) => locationData.append("keys1[]", i.lat));
    path.forEach((i) => locationData.append("keys2[]", i.lat));
    path.forEach((i) => locationData.append("values2[]", i.lng));
    locationData.append("type", "location");
    axios
      .post(`https://test.emkanfinances.net/api/otherdetail/create`, formData)
      .then((response) => {
        if (response.status === 201) {
          axios
            .post(
              `https://test.emkanfinances.net/api/otherdetail/create`,
              ExData
            )
            .then((response) => {
              if (response.status === 201) {
                axios
                  .post(
                    `https://test.emkanfinances.net/api/otherdetail/create`,
                    itenData
                  )
                  .then((response) => {
                    if (response.status === 201) {
                      axios
                        .post(
                          `https://test.emkanfinances.net/api/otherdetail/create-location`,
                          locationData
                        )
                        .then((response) => {
                          if (response.status === 200) {
                            window.location.pathname = "/otherdeatils";
                          }
                        });
                    }
                  });
              }
            })
            .catch((error) => {
              console.log(error);
            });
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
        <div className="d-flex align-items-center flex-wrap">
          <div className="newUserItem">
            <label htmlFor="inc">Included Title</label>
            <input
              className="form-control"
              id="inc"
              onChange={(e) => setIncTitle(e.target.value)}
              value={IncTitle}
              placeholder="Included Title.."
              required
            />
          </div>
          <div className="newUserItem">
            <label htmlFor="incD">Included Description</label>
            <input
              className="form-control"
              id="incD"
              onChange={(e) => setIncDesc(e.target.value)}
              value={IncDesc}
              placeholder="Included Description.."
              required
            />
          </div>
        </div>
        <div className="d-flex align-items-center flex-wrap">
          <div className="newUserItem">
            <label htmlFor="incAr">Included Title(Arabic)</label>
            <input
              className="form-control"
              id="incAr"
              onChange={(e) => setIncTitleAr(e.target.value)}
              value={IncTitleAr}
              placeholder="Included Title.."
              required
            />
          </div>
          <div className="newUserItem">
            <label htmlFor="incDAR">Included Description(Arabic)</label>
            <input
              className="form-control"
              id="incDAR"
              onChange={(e) => setIncDescAr(e.target.value)}
              value={IncDescAr}
              placeholder="Included Description.."
              required
            />
          </div>
        </div>
        <div className="d-flex align-items-center flex-wrap">
          <div className="newUserItem">
            <label htmlFor="Ex">Excluded Title</label>
            <input
              className="form-control"
              id="Ex"
              onChange={(e) => setExTitle(e.target.value)}
              value={ExTitle}
              placeholder="Excluded Title.."
              required
            />
          </div>
          <div className="newUserItem">
            <label htmlFor="EXD">Excluded Description</label>
            <input
              className="form-control"
              id="EXD"
              onChange={(e) => setExDesc(e.target.value)}
              value={ExDesc}
              placeholder="Excluded Description.."
              required
            />
          </div>
        </div>
        <div className="d-flex align-items-center flex-wrap">
          <div className="newUserItem">
            <label htmlFor="ExAR">Excluded Title(Arabic)</label>
            <input
              className="form-control"
              id="ExAR"
              onChange={(e) => setExTitleAr(e.target.value)}
              value={ExTitleAr}
              placeholder="Excluded Title.."
              required
            />
          </div>
          <div className="newUserItem">
            <label htmlFor="EXDAr">Excluded Description(Arabic)</label>
            <input
              className="form-control"
              id="EXDAr"
              onChange={(e) => setExDescAr(e.target.value)}
              value={ExDescAr}
              placeholder="Excluded Description.."
              required
            />
          </div>
        </div>
        <div className="d-flex align-items-center flex-wrap">
          <div className="newUserItem">
            <label htmlFor="Iti">Itinerary Title</label>
            <input
              className="form-control"
              id="Iti"
              onChange={(e) => setItiTitle(e.target.value)}
              value={ItiTitle}
              placeholder="Itinerary Title.."
              required
            />
          </div>
          <div className="newUserItem">
            <label htmlFor="itiD">Itinerary Description</label>
            <input
              className="form-control"
              id="itiD"
              onChange={(e) => setItiDesc(e.target.value)}
              value={ItiDesc}
              placeholder="Excluded Description.."
              required
            />
          </div>
        </div>
        <div className="d-flex align-items-center flex-wrap">
          <div className="newUserItem">
            <label htmlFor="ItiAr">Itinerary Title(Arabic)</label>
            <input
              className="form-control"
              id="ItiAr"
              onChange={(e) => setItiTitleAr(e.target.value)}
              value={ItiTitleAr}
              placeholder="Itinerary Title.."
              required
            />
          </div>
          <div className="newUserItem">
            <label htmlFor="itiDAr">Itinerary Description(Arabic)</label>
            <input
              className="form-control"
              id="itiDAr"
              onChange={(e) => setItiDescAr(e.target.value)}
              value={ItiDescAr}
              placeholder="Excluded Description.."
              required
            />
          </div>
        </div>

        {
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
        }
        <button className="addProductButton" type="submit">
          Create
        </button>
        {loading && <Loading />}
      </form>
    </div>
  );
}
