import { GET_POSTS, LIKE_POST, UNLIKE_POST } from "../actions/post.actions";

const initialeState = {};

export default function postReducer(state = initialeState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case LIKE_POST:
      return {
        ...state,
        likers: [action.payload.id, ...state.likers],
      };
    case UNLIKE_POST:
      return {
        ...state,
        likers: [state.likers.filter((id) => id != action.payload.id)],
      };
    default:
      return state;
  }
}
