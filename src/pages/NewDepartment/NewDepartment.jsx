import { useEffect, useState } from "react";
import axios from "axios";

export default function NewState() {
  const [departmetnTitleEn, setdepartmetnTitleEn] = useState();
  const [departmetnTitlAr, setdepartmetnTitlAr] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("dep_name_en", departmetnTitleEn);
    formData.append("dep_name_ar", departmetnTitlAr);
    axios
      .post("https://test.emkanfinances.net/api/Department/create", formData, {
        "Content-Type": "multipart/form-data",
      })
      .then((response) => {
        if (response.status === 201) {
          window.location.href = "/departments";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Department</h1>
      <form className="addProductForm" onSubmit={handleSubmit}>
        <div className="addProductItem">
          <label>Department Title(English)</label>
          <input
            type="text"
            placeholder="State Title(Arabic)"
            name="state_title_ar"
            value={departmetnTitleEn}
            onChange={(e) => setdepartmetnTitleEn(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Department Title(Arabic)</label>
          <input
            type="text"
            placeholder="State Title(English)"
            name="state_title_en"
            value={departmetnTitlAr}
            onChange={(e) => setdepartmetnTitlAr(e.target.value)}
          />
        </div>

        <button className="addProductButton" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
