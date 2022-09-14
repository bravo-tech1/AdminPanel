import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../components/Loading/Loading.jsx";

export default function NewPackImage() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [packageId, setPackageId] = React.useState();
  const [data, setData] = React.useState([]);
  const [loading, SetLoading] = useState(false);

  useEffect(() => {
    fetch("https://test.emkanfinances.net/api/package/show")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  const packTitle = data.map((item) => (
    <option value={item.id}>{item.details_title_en}</option>
  ));

  const handleImageChange = (e) => {
    setSelectedFiles([]);
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedFiles((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };

  function uploadToServer(e) {
    e.preventDefault();
    SetLoading(true);
    var files = e.target[0].files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("img", files[i]);
    }
    formData.append("package_id", packageId);
    axios({
      url: `https://test.emkanfinances.net/api/image/create/${packageId}`,
      method: "POST",
      data: formData,
    })
      .then((response) => {
        if (response.status === 201) {
          window.location.href = "/packagesimg";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="app p-5 product">
      <form onSubmit={(e) => uploadToServer(e)} encType="multipart/form-data">
        <div>
          <input
            className="ml-2"
            type="file"
            id="file"
            name="file[]"
            multiple
            onChange={handleImageChange}
          />
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
        <button className="addProductButton" type="submit">
          Create
        </button>
        {loading && <Loading />}
      </form>
    </div>
  );
}
