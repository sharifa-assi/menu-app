import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singleItem.css";

export default function SingleItem() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [item, setItem] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getItem = async () => {
      const res = await axios.get("/items/" + path);
      setItem(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setPrice(res.data.price);
    };
    getItem();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/items/${item._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/items/${item._id}`, {
        username: user.username,
        title,
        desc,
        price,
      });
      setUpdateMode(false)
    } catch (err) {}
  };

  return (
    <div className="singleItem">
      <div className="singleItemWrapper">
        {item.photo && (
          <img src={PF + item.photo} alt="" className="singleItemImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singleItemTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singleItemTitle">
            {title}
            {item.username === user?.username && (
              <div className="singleItemEdit">
                <i
                  className="singleItemIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singleItemIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singleItemInfo">
         
          
        </div>
        {updateMode ? (
          <textarea
            className="singleItemDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singleItemDesc">{desc}</p>
        )}
           {updateMode ? (
          <textarea
            className="singleItemDescInput"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        ) : (
          <p className="singleItemDesc">{price}</p>
        )}
       
        {updateMode && (
          <button className="singleItemButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
   
    </div>
  );
}
