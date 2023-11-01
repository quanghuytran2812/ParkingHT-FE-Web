import "../assets/css/sidebar.css";
import { NavLink } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import { sidebarItemData } from "../ultils/contants";
import icons from "../ultils/icons";

const SidebarContext = createContext();

export default function Sidebar() {
  const { ArrowBackIcon, ArrowForwardIcon } = icons;
  const [expand, setExpand] = useState(true);

  return (
    <aside className="sidebar">
      <div className={`sidebarContainer ${expand ? "openSidebar" : "closeSidebar"}`}>
        <div className="sidebartoplogo">
          <img className="logo" src={require('../assets/images/Logo.png')} alt='Logo' />
          <span className={`logoText ${expand ? "openSidebarlogoText" : "closeSidebarlogoText"}`}>arkingHT</span>
        </div>
        <SidebarContext.Provider value={{ expand }}>
          <ul className="sidebarWrapper">
            {sidebarItemData.map((el) => (
              <SidebarItem key={el.id} itemId={el.id} icon={el.icon} text={el.value} path={el.paths} />
            ))}
          </ul>
        </SidebarContext.Provider>
        <div className="sidebarBottom">
          <button className="sidebarBottomIcon" onClick={() => setExpand((curr) => !curr)}>
            {expand ? <ArrowBackIcon /> : <ArrowForwardIcon />}
          </button>
        </div>
      </div>
    </aside>
  );
}

export function SidebarItem({ icon, text, path, itemId }) {
  const { expand } = useContext(SidebarContext);
  return (
    <li className="sidebarItem" key={itemId}>
      <NavLink to={path} className="sidebarItemLink">
        {icon}
        <span className={`sidebarItemText ${expand ? "openText" : "closeText"}`}>{text}</span>
        {!expand && <div className="sidebarItemTextHide">{text}</div>}
      </NavLink>
    </li>
  );
}