import axios from "axios";
import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions, Cancel, } from "@material-ui/icons"
import { Context } from "../../context/Context";
import { useContext, useRef, useState } from "react";

export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const { user } = useContext(Context);
  const desc = useRef();
  const [file, setFile] = useState(null)

  const handelSubmit = async (e) => {
    e.preventDefault()
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name
      data.append("name", fileName)
      data.append("file", file)
      newPost.img = fileName

      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error)
      }
    }

    try {
      await axios.post("/posts", newPost)
      alert("Post has been published");
      window.location.reload();



    } catch (error) {

    }
  }


  // console.log(decs)

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user.profilePicture ? `${PF}person/${user.profilePicture}` : PF + "person/no_avatar.png"} alt="" />
          <input
            placeholder={`What's in your mind ${user.username}?`}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={handelSubmit}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">Share</button>
        </form>
      </div>
    </div>
  );
}
