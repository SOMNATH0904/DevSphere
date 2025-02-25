import { useState, useEffect, useRef } from "react";
import "./App.css";
import { uploadFile } from "./service/api";

function App() {
  const [file, setFile] = useState("");
  const [result, setResult] = useState("");

  const fileInputRef = useRef();

  const url =
    "https://img.freepik.com/free-vector/concept-transfer-files-landing-page_23-2148298990.jpg?t=st=1726683222~exp=1726686822~hmac=6b010518c46c9846a9f181b1682364f1988a23ae53e94e24586a84ff264c0e23&w=900";
  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setResult(response.path);
      }
    };
    getImage();
  }, [file]);

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="container">
      <img src={url} className="img" />
      <div className="wrapper">
        <h1>DropLink</h1>
        <p>Drop it! Link it! Share it!</p>

        <button onClick={() => onUploadClick()}>Upload</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <a href={result} target="_blank" className="link">
          {result}
        </a>
      </div>
    </div>
  );
}

export default App;
