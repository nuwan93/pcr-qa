import { usedTypedSelector } from "../hooks/useTypedSelector";
import RoomComponent from "./Room";

const RoomList: React.FC = () => {
  const rooms = usedTypedSelector((state) => state.report.entry.rooms);

  if (!rooms) {
    return <div> No rooms</div>;
  }
  return (
    <div className="ui vertical fluid tabular menu">
      {rooms.map((room, index) => {
        return <RoomComponent key={index} index={index} />;
      })}
    </div>
  );
};

export default RoomList;
