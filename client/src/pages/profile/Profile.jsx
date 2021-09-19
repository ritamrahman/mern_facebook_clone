import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { Context } from "../../context/Context";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


export default function Profile() {
  const username = useParams().username;
  const [user, setUser] = useState({})
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  // const { user: currentUser } = useContext(Context)

  useEffect(() => {
    const fetchUser = async () => {
      // const res = await axios.get(`/users/${post.userId}`)
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data)
      console.log(res)
    }
    fetchUser()
  }, [username])

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPic ? `${PF}post/${user.coverPic}` : PF + "post/1.jpeg"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture ? `${PF}person/${user.profilePicture}` : PF + "person/no_avatar.png"}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
}
