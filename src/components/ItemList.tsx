import { usedTypedSelector } from "../hooks/useTypedSelector";
import ItemComponent from "./Item";

const ItemList: React.FC = () => {
  const selectRoom = usedTypedSelector((state) => {
    if (
      !state.report.entry.rooms ||
      (!state.report.selectedRoom && state.report.selectedRoom !== 0)
    ) {
      return;
    }
    return state.report.entry.rooms[state.report.selectedRoom];
  });
  return (
    <div className="ui divided items">
      {selectRoom?.items?.map((item, index) => {
        return <ItemComponent item={item} index={index} key={index} />;
      })}
    </div>
  );
};

export default ItemList;
