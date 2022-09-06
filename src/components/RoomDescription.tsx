import { useEffect } from "react";
import { useActions } from "../hooks/useActions";
import { conditionType, Room, } from "../state";

interface IRoom {
  index: number;
  room: Room;
}

const RoomDescription: React.FC<IRoom> = ({ index, room }) => {
  
  let routineRoom: Room = JSON.parse(JSON.stringify(room))
  // const [title, setTitle] = useState(room.title);
  // const [comment, setComment] = useState(room.comment || "");
  if (!routineRoom.condition) {
    routineRoom.condition = {
      isClean: "NA",
      isUndamaged: "NA",
      isWorking: "NA"
    }
  }
  //const [isClean, setIsClean] = useState(room.condition.isClean );
  // const [isUndamaged, setIsUndamaged] = useState(room.condition.isUndamaged);
  // const [isWorking, setIsWorking] = useState(room.condition.isWorking);

  const { updateRoomDescription } = useActions();

  
  


  

  useEffect(() => {
    

    if (!routineRoom.condition) {
      routineRoom.condition = {
        isClean: "NA",
        isUndamaged: "NA",
        isWorking: "NA"
      }
    
      console.log("came");
      
    updateRoomDescription(
      index,
      routineRoom.id,
      routineRoom.title,
      routineRoom.comment,
      routineRoom.condition.isClean,
      routineRoom.condition.isUndamaged,
      routineRoom.condition.isWorking
    );
   }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routineRoom.id, routineRoom.title, routineRoom.comment, routineRoom.condition.isClean, routineRoom.condition.isUndamaged,routineRoom.condition.isWorking]);

  const changeCondition = (
    e: React.MouseEvent<HTMLButtonElement>
  ): conditionType => {
    const target = e.target as HTMLButtonElement;

    if (target.value === "") {
      return "NA";
    } else if (target.value === "NA") {
      return "YES";
    } else if (target.value === "YES") {
      return "NO";
    } else if (target.value === "NO") {
      return undefined;
    }
  };
  const getButtonStyle = (condition: conditionType) => {
    if (condition === "YES") {
      return { backgroundColor: "palegreen", border: "2px solid black" };
    } else if (condition === "NO") {
      return { backgroundColor: "salmon", border: "2px solid black" };
    } else if (condition === undefined) {
      return {
        backgroundColor: "white",
        border: "2px solid black",
      };
    } else {
      return { backgroundColor: "yellow", border: "2px solid black" };
    }
  };

  const setIsClean = ( condition: conditionType) => {
    if (!routineRoom.condition) {
      routineRoom.condition = {
        isClean: "NA",
        isUndamaged: "NA",
        isWorking: "NA"
      }
    }
    
      routineRoom.condition.isClean = condition
      updateRoomDescription(
        index,
        routineRoom.id,
        routineRoom.title,
        routineRoom.comment,
        routineRoom.condition.isClean,
        routineRoom.condition.isUndamaged,
        routineRoom.condition.isWorking
      );
  }

  const setIsUndamaged = ( condition: conditionType) => {
    if (!routineRoom.condition) {
      routineRoom.condition = {
        isClean: "NA",
        isUndamaged: "NA",
        isWorking: "NA"
      }
    }
      routineRoom.condition.isUndamaged = condition
      updateRoomDescription(
        index,
        routineRoom.id,
        routineRoom.title,
        routineRoom.comment,
        routineRoom.condition.isClean,
        routineRoom.condition.isUndamaged,
        routineRoom.condition.isWorking
      );
  }

  const setIsWorking = ( condition: conditionType) => {
    if (!routineRoom.condition) {
      routineRoom.condition = {
        isClean: "NA",
        isUndamaged: "NA",
        isWorking: "NA"
      }
    }
      routineRoom.condition.isWorking = condition
      updateRoomDescription(
        index,
        routineRoom.id,
        routineRoom.title,
        routineRoom.comment,
        routineRoom.condition.isClean,
        routineRoom.condition.isUndamaged,
        routineRoom.condition.isWorking
      );
  }

  const setComment = ( comment: string) => {
    if (!routineRoom.condition) {
      routineRoom.condition = {
        isClean: "NA",
        isUndamaged: "NA",
        isWorking: "NA"
      }
    }
      routineRoom.comment = comment
      updateRoomDescription(
        index,
        routineRoom.id,
        routineRoom.title,
        routineRoom.comment,
        routineRoom.condition.isClean,
        routineRoom.condition.isUndamaged,
        routineRoom.condition.isWorking
      );
  }

  return (
    <div className="item">
      <div className="content">
        <div className="header">
          <h2

            defaultValue={routineRoom.title}
            style={{ margin: "5px" }}
          >
            {routineRoom.title}
            </h2>
        </div>
      
        <div className="right floated">
          <button
            className="ui button"
            style={getButtonStyle(routineRoom.condition.isClean)}
            onClick={(e) => setIsClean(changeCondition(e))}
            value={routineRoom.condition.isClean}
          >
            C - {routineRoom.condition.isClean}
          </button>
          <button
            className="ui button"
            style={getButtonStyle(routineRoom.condition.isUndamaged)}
            onClick={(e) => setIsUndamaged(changeCondition(e))}
            value={routineRoom.condition.isUndamaged}
          >
            U - {routineRoom.condition.isUndamaged}
          </button>
          <button
            className="ui button"
            style={getButtonStyle(routineRoom.condition.isWorking)}
            onClick={(e) => setIsWorking(changeCondition(e))}
            value={routineRoom.condition.isWorking}
          >
            W - {routineRoom.condition.isWorking}
          </button>
        </div>
        <div className="description">
          <textarea
            value={routineRoom.comment}
            onChange={(e) => setComment(e.target.value)}
            rows={10}
            cols={100}
          />
        </div>
      </div>
    </div>
  );
};

export default RoomDescription;
