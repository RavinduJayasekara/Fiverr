export const ADD_VIDEO = "ADD_VIDEO";

export const addVideo = (videoUri) => {
  return { type: ADD_VIDEO, videoUri: videoUri };
};
