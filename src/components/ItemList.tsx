import { usedTypedSelector } from "../hooks/useTypedSelector";

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
    <div>
      {selectRoom?.items?.map((item, index) => {
        return <p key={index}>{item.title}</p>;
      })}
    </div>
  );
};

export default ItemList;
