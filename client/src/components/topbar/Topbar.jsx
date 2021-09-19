import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Context } from "../../context/Context";
import { NavLink } from 'react-router-dom';
import { useContext } from "react";

export default function Topbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const { user, dispatch } = useContext(Context);

  const handelLogout = () => {
    dispatch({ type: "LOGOUT" })
  }
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <NavLink to="/" className="logo">Ritamsocial</NavLink>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          {/* <span className="topbarLink">Homepage</span> */}
          <NavLink to="/" className="topbarLink">Timeline</NavLink>
          <span className="topbarLink" onClick={handelLogout}>Logout</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <NavLink to={`/profile/${user.username}`} className="topbarLink">
          <img src={user.profilePicture ? `${PF}person/${user.profilePicture}` : PF + "person/no_avatar.png"} alt="" className="topbarImg" />
        </NavLink>

      </div>
    </div>
  );
}
