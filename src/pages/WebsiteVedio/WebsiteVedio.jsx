import { useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading/Loading.jsx";


export default function NewService() {
  const [service_video, setServiceVideo] = useState();

  const [loading, SetLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    SetLoading(true);

    const formData = new FormData();
    formData.append("service_video", service_video);

    axios
      .post("https://test.emkanfinances.net/api/website/update/1", formData, {
        "Content-Type": "multipart/form-data",
      })
      .then((response) => {
        if (response.status === 201) {
          window.location.href = "/services";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Update Video</h1>
      <form className="addProductForm" onSubmit={handleSubmit}>
        <div className="addProductItem">
          <label>Website Vedio</label>
          <input
            type="file"
            id="file"
            multiple
            onChange={(e) => setServiceVideo(e.target.files.item(0))}
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
