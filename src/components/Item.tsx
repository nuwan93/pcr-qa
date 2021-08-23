import { useState } from "react";
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
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="right floated">
          <button
            style={getButtonStyle(isClean)}
            onClick={(e) => setIsClean(changeCondition(e))}
            value={isClean}
          >
            Clean - {isClean}
          </button>
          <button
            style={getButtonStyle(isUndamaged)}
            onClick={(e) => setIsUndamaged(changeCondition(e))}
            value={isUndamaged}
          >
            Undamaged - {isUndamaged}
          </button>
          <button
            style={getButtonStyle(isWorking)}
            onClick={(e) => setIsWorking(changeCondition(e))}
            value={isWorking}
          >
            Working - {isWorking}
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
