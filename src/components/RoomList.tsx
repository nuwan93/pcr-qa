import { useActions } from "../hooks/useActions";
import { v4 as uuid_v4 } from "uuid";
import { usedTypedSelector } from "../hooks/useTypedSelector";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import RoomComponent from "./Room";


const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  padding: 10,
  margin: `0 0px 15px 0px`,
  background: isDragging ? "#4a2975" : "white",
  color: isDragging ? "white" : "black",
  //border: `0.1px solid black`,
  //borderRadius: `5px`,

  ...draggableStyle,
});

const RoomList: React.FC = () => {
  const { addRoom } = useActions();
  const rooms = usedTypedSelector((state) => state.report.entry.rooms);

  if (!rooms) {
    return <div> No rooms</div>;
  }


  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;  
    if (!destination) return;
    if (!rooms) return;
    const itemList = Array.from(rooms);
    const [newOrder] = itemList.splice(source.index, 1);
    itemList.splice(destination.index, 0, newOrder);
    //updateItemListOrder(itemList)
  };

  return (
    <>
<div className="ui vertical fluid tabular menu">
<DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={uuid_v4()}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {rooms.map((room, index) => {
                return (
                  <Draggable key={room.id} draggableId={room.id} index={index}>
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
                         <RoomComponent key={room.id} index={index} />
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


      <button className="ui positive right floated button" onClick={addRoom} style={{marginTop:"15px"}}>
        <i className="save icon"></i>New Room
      </button>
      </div>


      {/* <div className="ui vertical fluid tabular menu">
        {rooms.map((room, index) => (
          <RoomComponent key={room.id} index={index} />
        ))}
      </div>
      <button className="ui positive right floated button" onClick={addRoom}>
        <i className="save icon"></i>New Room
      </button> */}


    </>
  );
};

export default RoomList;
