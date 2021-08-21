import { usedTypedSelector } from "../hooks/useTypedSelector";
import RoomComponent from "./Room";

const RoomList: React.FC = () => {
  const rooms = usedTypedSelector((state) => state.report.entry.rooms);

  if (!rooms) {
    return <div> No rooms</div>;
  }
  return (
    <div className="ui relaxed divided list">
      {rooms.map((room, index) => {
        return <RoomComponent title={room.title} altTitle={room.altTitle} />;
      })}
    </div>
  );
};

export default RoomList;
