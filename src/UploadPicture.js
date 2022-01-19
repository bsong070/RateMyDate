import React from "react";
import "./App.css";

const UploadPicture = () => {
  return (
    <div>
      <form action="/uploadpicture" method="POST" encType="multipart/form-data">
        <h3>Upload Picture Optional</h3>
        <input type="file" name="picture" accept="image/*" />
        <input type="submit" className="btn btn-primary"></input>
      </form>
    </div>
  );
};

export default UploadPicture;
