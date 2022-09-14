import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../actions/user.actions";
import { isEmpty } from "../Utils";

export default function FollowHandler({ idToFollow }) {
  const userData = useSelector((state) => state.userReducer);
  const [isFollow, setIsFollow] = useState(false);
  const dispatch = useDispatch();

  const handleFollow = () => {
    setIsFollow(true);
    dispatch(followUser(userData._id, idToFollow));
  };

  const handleUnfollow = () => {
    setIsFollow(false);
    dispatch(unFollowUser(userData._id, idToFollow));
  };

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsFollow(true);
      } else setIsFollow(false);
    }
  }, [userData, idToFollow]);

  return (
    <>
      {isFollow && !isEmpty(userData) && (
        <span onClick={handleUnfollow}>
          <button>Abonne</button>
        </span>
      )}
      {isFollow === false && !isEmpty(userData) && (
        <span onClick={handleFollow}>
          <button>Suivre</button>
        </span>
      )}
    </>
  );
}
