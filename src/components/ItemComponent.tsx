import { useEffect } from "react";
import { useState } from "react";
import { useActions } from "../hooks/useActions";
import { Item, conditionType } from "../state";

interface ItemProps {
  index: number;
  item: Item;
}

const ItemComponent: React.FC<ItemProps> = ({ index, item }) => {
  const [title, setTitle] = useState(item.title);
  const [comment, setComment] = useState(item.comment);
  const [isClean, setIsClean] = useState(item.condition.isClean);
  const [isUndamaged, setIsUndamaged] = useState(item.condition.isUndamaged);
  const [isWorking, setIsWorking] = useState(item.condition.isWorking);

  const { updateItem, deleteItem } = useActions();

  useEffect(() => {
    updateItem(
      index,
      item.id,
      title,
      comment,
      item.type,
      isClean,
      isUndamaged,
      isWorking
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, comment, isClean, isUndamaged, isWorking, index, item.type]);

  const changeCondition = (
    e: React.MouseEvent<HTMLButtonElement>
  ): conditionType => {
    const target = e.target as HTMLButtonElement;

    if (target.value === "YES") {
      return "NO";
    } else if (target.value === "NO") {
      return "NA";
    } else {
      return "YES";
    }
  };
  const getButtonStyle = (
    condition: conditionType
  ): { backgroundColor: string } => {
    if (condition === "YES") {
      return { backgroundColor: "palegreen" };
    } else if (condition === "NO") {
      return { backgroundColor: "salmon" };
    } else {
      return { backgroundColor: "yellow" };
    }
  };
  return (
    <div className="item">
      <div className="content">
        <div className="header">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ margin: "5px" }}
          />
        </div>
        <button
          className="ui compact icon negative button "
          onClick={() =>
            window.confirm("Are you sure?") ? deleteItem(index) : console.log()
          }
        >
          <i className="ui negative close icon"></i>
        </button>
        <div className="right floated">
          <button
            className="ui button"
            style={getButtonStyle(isClean)}
            onClick={(e) => setIsClean(changeCondition(e))}
            value={isClean}
          >
            C - {isClean}
          </button>
          <button
            className="ui button"
            style={getButtonStyle(isUndamaged)}
            onClick={(e) => setIsUndamaged(changeCondition(e))}
            value={isUndamaged}
          >
            U - {isUndamaged}
          </button>
          <button
            className="ui button"
            style={getButtonStyle(isWorking)}
            onClick={(e) => setIsWorking(changeCondition(e))}
            value={isWorking}
          >
            W - {isWorking}
          </button>
        </div>
        <div className="description">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            cols={100}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemComponent;
