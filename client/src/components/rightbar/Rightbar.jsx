import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../context/Context";


export default function Rightbar({ profile }) {
  const username = useParams().username;
  const userID = useParams()._id;
  const { user: currentUser } = useContext(Context)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [user, setUser] = useState([])
  console.log(userID);

  useEffect(() => {
    const fetchFriend = async () => {
      const res = await axios.get(`/users/friends/${currentUser._id}`);
      setUser(res.data)
      console.log(res.data);
    }
    fetchFriend()
  }, [username, currentUser._id])


  const HomeRightbar = () => {

    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue"> {user.city || "n/a"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from || "n/a"}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship || "n/a"}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {
            user.map((friend) => (
              <Link to={"/profile/" + friend.username}>

                <div className="rightbarFollowing">
                  <img
                    src={friend.profilePic ? `${PF}person/${friend.profilePicture}` : PF + "person/no_avatar.png"}
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">{friend.username}</span>
                </div>
              </Link>
            ))
          }

          {/* <div className="rightbarFollowing">
            <img
              src={PF + "person/1.jpeg"}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={PF + "person/2.jpeg"}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={PF + "person/6.jpeg"}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={PF + "person/4.jpeg"}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={PF + "person/1.jpeg"}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div> */}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}