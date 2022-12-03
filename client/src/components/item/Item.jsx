import "./item.css";
import { Link } from "react-router-dom";

export default function Item({ item }) {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="item">
      {item.photo && <img className="itemImg" src={PF + item.photo} alt="" />}
      <div className="itemInfo">
        <div className="itemCats">
          {item.categories.map((c) => (
            <span className="itemCat">{c.name}</span>
          ))}
        </div>
        <Link to={`/item/${item._id}`} className="link">
          <span className="itemTitle">{item.title}</span>
        </Link>
        <hr />
        <span>
        <p className="itemDate">{item.price}</p>
        </span>
      </div>
      <p className="itemDesc">{item.desc}</p>
    </div>
  );
}
