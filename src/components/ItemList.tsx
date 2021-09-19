import { v4 as uuid_v4 } from "uuid";
import { useActions } from "../hooks/useActions";
import { usedTypedSelector } from "../hooks/useTypedSelector";
import ItemComponent from "./ItemComponent";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  padding: 10,
  margin: `0 0px 15px 0px`,
  background: isDragging ? "#4a2975" : "white",
  color: isDragging ? "white" : "black",
  border: `1px solid black`,
  borderRadius: `5px`,

  ...draggableStyle,
});

const ItemList: React.FC = () => {
  const { addItem, deleteRoom, updateItemListOrder } = useActions();

  const selectedRoomIndex = usedTypedSelector(
    ({ report }) => report.selectedRoom
  );
  const filename = usedTypedSelector(({ report }) => report.fileName);
  const selectRoom = usedTypedSelector((state) => {
    if (!state.report.entry.rooms) return;
    return state.report.entry.rooms[selectedRoomIndex];
  });

  const renderAddItemButton = () => {
    if (!selectRoom) return null;
    return (
      <button
        className="ui positive right floated button"
        style={{ marginTop: "15px" }}
        onClick={addItem}
      >
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
        onClick={() =>
          window.confirm("Are you sure?") ? deleteRoom() : console.log()
        }
      >
        Delete Room
      </button>
    );
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (!selectRoom?.items) return;
    const itemList = Array.from(selectRoom?.items);
    const [newOrder] = itemList.splice(source.index, 1);
    itemList.splice(destination.index, 0, newOrder);
    updateItemListOrder(itemList);
  };

  return (
    <>
      <div style={{ marginBottom: "50px" }}>{renderDeleteRoom()}</div>
      <div className="ui left floated" style={{ marginBottom: "5px" }}>
        <h2>{selectRoom?.title}</h2>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={uuid_v4()}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {selectRoom?.items?.map((item, index) => {
                return (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        className="ui divided items"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <ItemComponent
                          key={item.id}
                          item={item}
                          index={index}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {renderAddItemButton()}
    </>
  );
};

export default ItemList;
