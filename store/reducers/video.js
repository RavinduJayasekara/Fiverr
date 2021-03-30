import { ADD_VIDEO } from "../actions/video";
import Video from "../../Models/Video";

const initialState = {
  videos: [],
};

export default videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_VIDEO:
      const newVideo = new Video(new Date().toString(), action.videoUri);
      return {
        videos: state.videos.concat(newVideo),
      };
    default:
      return state;
  }
};
