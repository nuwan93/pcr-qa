import { useActions } from "../hooks/useActions";
import { usedTypedSelector } from "../hooks/useTypedSelector";
import { useState, useEffect } from "react";

interface IRoom {
  index: number;
}

const RoomComponent: React.FC<IRoom> = ({ index }) => {
  const { selectRoom, updateRoom } = useActions();

  const globalRoom = usedTypedSelector((state) => {
    if (!state.report.entry.rooms) {
      return;
    }
    return state.report.entry.rooms[index];
  });
  const [localRoom, setLocalRoom] = useState(globalRoom);
 
  const activeRoom = usedTypedSelector((state) => state.report.selectedRoom);
  const activeStyle = { backgroundColor: "palegreen" };

  useEffect(() => {
    if (!localRoom) {
      return;
    }
    updateRoom(localRoom, index);
  }, [localRoom, updateRoom, index]);

  const onChangeAltTile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!localRoom) {
      return;
    }
    setLocalRoom({ ...localRoom, altTitle: e.target.value });
  };
  const onChangeTile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!localRoom) {
      return;
    }
    setLocalRoom({ ...localRoom, title: e.target.value });
  };
  return (
    <div
      className="item"
      onClick={() => selectRoom(index)}
      style={activeRoom === index ? activeStyle : {}}
    >
      <i className="sort middle aligned icon"></i>
      <div className="content">
        <input
          className="header"
          value={localRoom?.title}
          placeholder="Title"
          onChange={(e)  => onChangeTile(e)}
          style={{marginBottom:"10px"}}
        />
        <input
          className="header"
          value={localRoom?.altTitle}
          placeholder="Alt title"
          onChange={(e) => onChangeAltTile(e)}
        />
        
      </div>
      
    </div>
  );
};

export default RoomComponent;
