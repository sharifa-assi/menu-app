import Item from "../item/Item";
import "./items.css";

export default function Items({ items }) {
  return (
    <div className="items">
      {items.map((p) => (
        <Item item={p} />
      ))}
    </div>
  );
}
