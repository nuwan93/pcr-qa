import React, { useRef } from "react";
import { useActions } from "../hooks/useActions";
import RoomList from "./RoomList";
import ItemList from "./ItemList";
import { usedTypedSelector } from "../hooks/useTypedSelector";

const App: React.FC = () => {
  const originaName = usedTypedSelector(({ report }) => report.fileName);
  const entry = usedTypedSelector(({ report }) => report.entry);
  console.log(entry);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { loadReport } = useActions();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (!e.target.files || !e.target.files[0]) {
      alert("Have not uploaded a new file!");
      return;
    }
    const fileName = e.target.files[0].name;
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      if (e.target === null) {
        return;
      } else if (!e.target.result || e.target.result === null) {
        return;
      } else if (typeof e.target.result === "string") {
        loadReport(JSON.parse(e.target.result), fileName);
      }
    };
  };

  const getFileName = (): string | undefined => {
    if (!originaName) {
      return;
    }
    const nameWithoutExtension = originaName.split(".")[0];
    const splitedName = nameWithoutExtension.split("-");
    if (splitedName[splitedName.length - 1] === "qa") {
      return originaName;
    }
    return nameWithoutExtension + "-qa.json";
  };

  const downloadFile = async () => {
    const fileName = getFileName();
    if (!fileName) {
      alert("No File to download!");
      return;
    }
    const json = JSON.stringify(entry, null, 4);
    const blob = new Blob([json], { type: "application/json" });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="ui container grid" style={{ marginTop: "10px" }}>
      <div className="sixteen wide column">
        <button
          className="ui negative basic right floated button"
          onClick={() => downloadFile()}
        >
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
          className="ui positive basic right floated button"
          onClick={() =>
            fileInputRef.current
              ? fileInputRef.current.click()
              : console.log("Try again")
          }
        >
          <i className="upload icon"></i>
          Upload
        </button>

        <div>date</div>

        <div className="ui clearing divider"></div>
      </div>

      <div className="four wide column">
        <RoomList />
      </div>
      <div className="twelve wide column">
        <ItemList />
      </div>
    </div>
  );
};

export default App;
