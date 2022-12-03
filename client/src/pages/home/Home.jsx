import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Items from "../../components/items/Items";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";

export default function Home() {
  const [items, setItems] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchItems = async () => {
      const res = await axios.get("/items" + search);
      setItems(res.data);
    };
    fetchItems();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Items items={items} />
      </div>
    </>
  );
}
