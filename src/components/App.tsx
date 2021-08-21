import React, { useRef } from "react";
import { useActions } from "../hooks/useActions";
import RoomList from "./RoomList";

const App: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { loadReport } = useActions();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files === null) {
      return;
    }
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      if (e.target === null) {
        return;
      } else if (!e.target.result || e.target.result === null) {
        return;
      } else if (typeof e.target.result === "string") {
        loadReport(JSON.parse(e.target.result), "sample");
        console.log("e.target.result", JSON.parse(e.target.result));
      }
    };
  };

  return (
    <div className="ui container grid" style={{ marginTop: "10px" }}>
      <div className="sixteen wide column">
        <button className="ui red right floated button">
          <i className="download icon"></i>
          Download
        </button>

        <input
          type="file"
          ref={fileInputRef}
          hidden
          accept=".json"
          multiple={false}
          onChange={handleUpload}
        />

        <button
          className="ui green right floated button"
          onClick={() =>
            fileInputRef.current
              ? fileInputRef.current.click()
              : console.log("Try again")
          }
        >
          <i className="upload icon"></i>
          Upload
        </button>

        <div>dateee</div>

        <div className="ui clearing divider"></div>
      </div>

      <div className="four wide column">
        <RoomList />
      </div>
      <div className="twelve wide column">item</div>
    </div>
  );
};

export default App;
