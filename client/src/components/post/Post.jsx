import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from 'timeago.js'
import { Context } from "../../context/Context";

export default function Post({ post }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const { user: currentUser } = useContext(Context)

  const [like, setLike] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchUser = async () => {
      // const res = await axios.get(`/users/${post.userId}`)
      const res = await axios.get(`/users/?userId=${post.userId}`);
      setUser(res.data)
      // console.log(res)
    }
    fetchUser()
  }, [post.userId])


  const likeHandler = async () => {
    const res = await axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
    setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
    // console.log(res.likes)
  }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={user.profilePicture ? `${PF}person/${user.profilePicture}` : PF + "person/no_avatar.png"}
              alt=""
            />
            <span className="postUsername">
              {user.username}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={`${PF}post/${post.img}`} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
