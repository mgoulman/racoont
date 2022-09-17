import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch } from "react-redux";
import { likePost, unLikePost } from "../../actions/post.actions";

export default function LikeButton({ post }) {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (post.likers.includes(uid)) setLiked(true);
  }, [uid, post.likers, liked]);

  const like = () => {
      setLiked(true);
      dispatch(likePost(uid, post._id))
  };

  const unLike = () => {
    setLiked(false);
    dispatch(unLikePost(uid, post._id));
  };

  return (
    <div className="like-container">
      {uid === null && (
        <Popup
          trigger={<img src="./img/icons/heart.svg" alt="like" />}
          position={["buttom center", "buttom right", "buttom left"]}
          closeOnDocumentClick
        >
          <div>Connectez-Vous pour aimer un post!</div>
        </Popup>
      )}
      {uid && liked === false && (
        <img src="./img/icons/heart.svg" onClick={like} alt="like" />
      )}
      {uid && liked === true && (
        <img src="./img/icons/heart-filled.svg" onClick={unLike} alt="like" />
      )}
      {post.likers.length}
    </div>
  );
}
