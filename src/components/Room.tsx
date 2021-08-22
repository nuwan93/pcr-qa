import { Room } from "../state";
import { useActions } from "../hooks/useActions";

interface IRoom extends Room {
  index: number;
}

const RoomComponent: React.FC<IRoom> = ({ title, altTitle, index }) => {
  const { selectRoom } = useActions();

  return (
    <div className="item" onClick={() => selectRoom(index)}>
      <div className="content">
        <input className="header" value={title} placeholder="Title" />
        <input
          className="description"
          value={altTitle}
          placeholder="Alt title"
        />
      </div>
    </div>
  );
};

export default RoomComponent;
