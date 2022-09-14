import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import {isEmpty} from "../components/Utils"
import Card from "./Post/Card";

export default function Thread() {
  const [loadPost, setLadPost] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);


  useEffect(() => {
    if(loadPost){
        dispatch(getPosts());
        setLadPost(false)
    }
  }, [loadPost, dispatch])

  return(
      <div className="thread-cantainer">
          <ul>
              {!isEmpty(posts[0]) && (
                  posts.map((post) => {
                      return(
                        <Card post={post} key={post._id} />
                      )
                  })
              )}
          </ul>
      </div>
  )
}
