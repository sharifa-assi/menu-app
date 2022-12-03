import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Food</span>
        <span className="headerTitleLg">Menu</span>
      </div>
      <img
        className="headerImg"
        src="https://img.freepik.com/free-psd/hamburger-banner-with-delicious-fast-food-burgers_23-2148421441.jpg"
        alt=""
      />
    </div>
  );
}
