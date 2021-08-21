import { Room } from "../state";

const RoomComponent: React.FC<Room> = ({ title, altTitle }) => {
  return (
    <div className="item">
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
