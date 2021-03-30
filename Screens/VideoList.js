import React, { useEffect } from "react";
import { View, FlatList, StyleSheet, Button, Text } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import { useSelector } from "react-redux";

const VideoList = (props) => {
  const newVideos = useSelector((state) => state.video.videos);

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  if (newVideos.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No Videos to play</Text>
      </View>
    );
  }

  const renderItem = (itemData) => {
    return (
      <View style={styles.container}>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: itemData.item.vidUrl,
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
        <View style={styles.buttons}></View>
      </View>
    );
  };

  useEffect(() => {});

  return (
    <FlatList
      data={newVideos}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
});

export default VideoList;
