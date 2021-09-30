import React, { useRef, useEffect } from "react";
import { useActions } from "../hooks/useActions";
import DatePicker from "react-datepicker";
import RoomList from "./RoomList";
import ItemList from "./ItemList";
import { usedTypedSelector } from "../hooks/useTypedSelector";

import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

const App: React.FC = () => {
  const originaName = usedTypedSelector(({ report }) => report.fileName);
  const entry = usedTypedSelector(({ report }) => report.entry);

  //const report = usedTypedSelector(({ report }) => report);
  //console.log(report);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { loadReport, loadReportFromLocalStorage, updateDate } = useActions();

  useEffect(() => {
    const unserilizelReport = localStorage.getItem("reportData");
    if (!unserilizelReport) return;
    loadReportFromLocalStorage(JSON.parse(unserilizelReport));
    // eslint-disable-next-line
  }, []);

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

    const jsonFormat = JSON.stringify(entry, null, 4);
    const unTypedObj = JSON.parse(jsonFormat);

    unTypedObj.rooms?.forEach((room: any) => {
      delete room.id;
      room.items?.forEach((item: any) => {
        delete item.id;
      });
    });

    const json = JSON.stringify(unTypedObj, null, 4);
    const blob = new Blob([json], { type: "application/json" });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderDatePicker = () => {
    if (entry.inspectedAt) {
      return (
        <DatePicker
          selected={new Date(entry.inspectedAt * 1000)}
          onChange={(date) => {
            if (date) {
              updateDate(Date.parse(String(date)) / 1000);
            }
          }}
          showYearDropdown
          scrollableYearDropdown
        />
      );
    }
    return null;
  };

  const clearAll = () => {
    const emptyReport = {
      importMode: "CREATE_ONLY",
      inspectedAt: Date.now() / 1000,
      type: "ENTRY",
      rooms: [
        {
          title: "",
        },
      ],
    };
    loadReport(emptyReport, "Untitled.json");
  };

  return (
    <div className="ui container grid" style={{ marginTop: "10px" }}>
      <div className="sixteen wide column">
        <button
          className="ui negative right floated button"
          onClick={() =>
            window.confirm("Are you sure?") ? clearAll() : console.log()
          }
        >
          <i className="window close"></i>
          Clear All
        </button>
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

        <div>
          <h3> {originaName}</h3>
          {renderDatePicker()}
          {entry.rooms?.length} Rooms
        </div>

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
