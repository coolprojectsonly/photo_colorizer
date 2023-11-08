import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { getImage } from "./action";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageurl] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [dataStream, setDataStream] = useState(null);
  const [colorizedUrl, setColorizedUrl] = useState(null);
  const [urs, setUrs] = useState(false);
  const [loadingOpacity, setLoadingOpacity] = useState(false);

  const dispatch = useDispatch();

  const { status, error, data } = useSelector((state) => state.post);

  useEffect(() => {
    if (status === "loading") {
      setLoadingOpacity(true);
    } else {
      setLoadingOpacity(false);
    }
  }, [status]);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setImage(file);
        setImageurl(reader.result);
      };
      reader.readAsDataURL(file);
      setFileName(file.name);
    }
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setImage(file);
        setImageurl(reader.result);
      };
      reader.readAsDataURL(file);
      setFileName(file.name);
    }
  };

  // Later in your code where you send the image to the server, ensure it's a FormData object:

  const handleDropover = (e) => {
    e.preventDefault();
  };

  const handleColorize = () => {
    dispatch(getImage({ fileName }));
    // console.log(fileName);
  };

  const handleData = () => {
    console.log(data);
  };

  if (status === "failed") {
    return <h1>Error:{error}</h1>;
  }

  return (
    <div
      style={{
        opacity: loadingOpacity ? 0.3 : 1,
        border: "1px solid lightblue",
        borderRadius: "14px",
      }}
    >
      <h1>
        AI Picture Colorizer <span className="spanBlue">App</span>
      </h1>
      <div className="uploaderSection" style={{ backgroundColor: "linen" }}>
        <div
          className="uploaderContainer"
          onDrop={handleDrop}
          onDragOver={handleDropover}
          style={{ cursor: "pointer" }}
        >
          <input
            type="file"
            id="fileUploader"
            className="fileUploader"
            onChange={handleUpload}
            accept="image/*"
          />
          <label htmlFor="fileUploader" className="">
            <FontAwesomeIcon
              icon={faUpload}
              style={{
                color: "lightblue",
                width: "100px",
                height: "100px",
                cursor: "pointer",
              }}
            />
            Choose Image
            {/* {fileName && <h1>Hello</h1>} */}
          </label>
        </div>
      </div>

      {imageUrl && (
        <div className="imageContainer" style={{ backgroundColor: "belge" }}>
          <div className="uploadedImage">
            <img className="imageContent" src={imageUrl}></img>
          </div>
          <div className="colorizedImage">
            {/* {urs && <img className="imageContent" src={colorizedUrl}></img>} */}
            {/* {data && data} */}
            {data && <img src={data}></img>}
          </div>
        </div>
      )}

      <div className="buttonContainer">
        <button onClick={handleColorize} className="colorizeButton">
          Colorize
        </button>
      </div>
    </div>
  );
}

export default App;
