import { useActions } from "../hooks/useActions";
import { usedTypedSelector } from "../hooks/useTypedSelector";

import RoomComponent from "./Room";

const RoomList: React.FC = () => {
  const { addRoom } = useActions();
  const rooms = usedTypedSelector((state) => state.report.entry.rooms);

  if (!rooms) {
    return <div> No rooms</div>;
  }

  return (
    <>
      <div className="ui vertical fluid tabular menu">
        {rooms.map((room, index) => (
          <RoomComponent key={room.id} index={index} />
        ))}
      </div>
      <button className="ui positive right floated button" onClick={addRoom}>
        <i className="save icon"></i>New Room
      </button>
    </>
  );
};

export default RoomList;
