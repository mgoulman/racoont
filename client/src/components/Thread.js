import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import {isEmpty} from "../components/Utils"
import Card from "./Post/Card";

export default function Thread() {
  const [loadPost, setLadPost] = useState(true);
  const [count, setCount] = useState(5)
  const dispatch = useDispatch();
  const [count, setCount] = useState(5)
  const posts = useSelector((state) => state.postReducer);


  const loadMore = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight){
      setLadPost(true);

    }
  }

  useEffect(() => {
    if(loadPost){
        dispatch(getPosts(count));
        setLadPost(false)
        setCount(count + 5)
    }
    window.addEventListener('scroll', loadMore);
    return () => window.removeEventListener('scroll', loadMore)
  }, [loadPost, dispatch, count])

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
