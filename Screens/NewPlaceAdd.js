import React, { useState, useEffect } from "react";
import { Button, Text, View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import Video from "../Models/Video";
import { useDispatch } from "react-redux";
import * as videoActions from "../store/actions/video";
const NewPlaceAdd = (props) => {
  const [cameraRef, setCameraRef] = useState();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraPreview, setCameraPreview] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [recording, setRecording] = useState(false);
  const [pickedImage, setPickedImage] = useState();
  const [video, setVideo] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const imgHandler = async () => {
    if (cameraRef && cameraPreview) {
      let photo = await cameraRef.takePictureAsync();
      console.log(photo);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!pickedImage ? (
        <Camera
          style={{ flex: 1 }}
          type={type}
          ref={(ref) => {
            setCameraRef(ref);
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: "flex-end",
                }}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Ionicons
                  name={Platform.OS === "ios" ? "ios-camera" : "md-camera"}
                  size={40}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignSelf: "center" }}
                onPress={async () => {
                  if (cameraRef) {
                    let photo = await cameraRef.takePictureAsync();
                    setPickedImage(photo.uri);
                  }
                }}
              >
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: 25,
                    borderColor: "white",
                    height: 50,
                    width: 50,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      borderWidth: 2,
                      borderRadius: 25,
                      borderColor: "white",
                      height: 40,
                      width: 40,
                      backgroundColor: "white",
                    }}
                  ></View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignSelf: "center" }}
                onPress={async () => {
                  if (!recording) {
                    setRecording(true);
                    let video = await cameraRef.recordAsync();
                    dispatch(videoActions.addVideo(video.uri));
                    props.navigation.navigate("VideoList");
                  } else {
                    setRecording(false);
                    cameraRef.stopRecording();
                  }
                }}
              >
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: 25,
                    borderColor: "red",
                    height: 50,
                    width: 50,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      borderWidth: 2,
                      borderRadius: 25,
                      borderColor: "red",
                      height: 40,
                      width: 40,
                      backgroundColor: "red",
                    }}
                  ></View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
      ) : (
        <Image
          style={{ height: "100%", width: "100%" }}
          source={{ uri: pickedImage }}
        />
      )}
    </View>
  );
};

export default NewPlaceAdd;
