import React, { useState } from "react";
import LeftNav from "../LeftNav";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { updateBio } from "../../actions/user.actions";
import { parseDate } from "../Utils";
import FollowHandler from "./FollowHandler";

const UpdateProfile = () => {
  const [bio, setBio] = useState('');
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [followingPopup, setFollowing] = useState(false);
  const [followerPopup, setFollower] = useState(false);
  const usersData = useSelector((state) => state.usersReducer);


  const handleUpdate = () => {
    setUpdateForm(false)
    dispatch(updateBio(userData._id, bio))
  }

  return (
    <div className="profil-container">
      <LeftNav />
      <h1>Profil de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo De profil</h3>
          <img src={userData.picture} alt="user-pic" />
          <UploadImg />
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>Modifier Bio</button>
              </>
            )}
            {updateForm && (
              <>
                <textarea type="text" defaultValue={userData.bio} onChange={(e) => setBio(e.target.value)}></textarea>
                <button onClick={handleUpdate}>Valider Modifications</button>
              </>
            )}
          </div>
          <h4>Membre depuis le : {parseDate(userData.createdAt)}</h4>
          <h5 onClick={() => setFollowing(true)}>Abonement: {userData.following ? userData.following.length : "0"}</h5>
          <h5 onClick={() => setFollower(true)}>Abonnes: {userData.followers ? userData.followers.length : "0"}</h5>
        </div>
      </div>
      {followingPopup && (
      <div className="popup-profil-container">
        <div className="modal">
          <h3>Abonnements</h3>
          <span className="cross" onClick={() => setFollowing(false)}>&#10005;</span>
          <ul>
            {usersData.map((user) => {
              for(let i = 0; i < userData.following.length; i++){
                if(user._id === userData.following[i]){
                  console.log("user ===>", user);
                  return (
                    <li key={user._id}>
                      <img src={user.picture} alt="user_pic"/>
                      <h4>{user.pseudo}</h4>
                      <FollowHandler idToFollow={user._id}/>
                    </li>
                  )
                }
              }
            })}
          </ul>
        </div>
      </div>
      )}
      {followerPopup && (
      <div className="popup-profil-container">
        <div className="modal">
          <h3>Abonnements</h3>
          <span className="cross" onClick={() => setFollower(false)}>&#10005;</span>
          <ul>
          {usersData.map((user) => {
              for(let i = 0; i < userData.followers.length; i++){
                if(user._id === userData.followers[i]){
                  console.log("user ===>", user);
                  return (
                    <li key={user._id}>
                      <img src={user.picture} alt="user_pic"/>
                      <h4>{user.pseudo}</h4>
                      <FollowHandler /> 
                    </li>
                  )
                }
              }
            })}
          </ul>
        </div>
      </div>
      )}
    </div>
  );
};

export default UpdateProfile;
