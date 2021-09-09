import { useActions } from "../hooks/useActions";
import { usedTypedSelector } from "../hooks/useTypedSelector";
import ItemComponent from "./ItemComponent";

const ItemList: React.FC = () => {
  const { addItem, deleteRoom } = useActions();
  const selectedRoomIndex = usedTypedSelector(
    ({ report }) => report.selectedRoom
  );
  const filename = usedTypedSelector(({ report }) => report.fileName);
  const selectRoom = usedTypedSelector((state) => {
    if (
      !state.report.entry.rooms ||
      (!state.report.selectedRoom && state.report.selectedRoom !== 0)
    ) {
      return;
    }
    return state.report.entry.rooms[selectedRoomIndex];
  });

  const renderAddItemButton = () => {
    if (!selectRoom) {
      return null;
    }
    return (
      <button className="ui positive right floated button" onClick={addItem}>
        <i className="save icon"></i>New Item
      </button>
    );
  };

  const renderDeleteRoom = () => {
    if (!filename) {
      return null;
    }
    return (
      <button
        className="ui right floated negative button "
        style={{ marginBottom: "10px" }}
        onClick={() =>
          window.confirm("Are you sure?") ? deleteRoom() : console.log()
        }
      >
        Delete Room
      </button>
    );
  };

  return (
    <>
      {renderDeleteRoom()}
      <div className="ui divided items">
        {selectRoom?.items?.map((item, itemindex) => (
          <ItemComponent key={item.id} item={item} index={itemindex} />
        ))}
      </div>

      {renderAddItemButton()}
    </>
  );
};

export default ItemList;
