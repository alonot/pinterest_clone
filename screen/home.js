import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  RefreshControl,
  FlatList,
} from "react-native";
import ImageCard from "../components/imageCard";
import { useState, useCallback, useEffect, useContext } from "react";
import { PostContext } from "../globals.js";

export default function HomeScreen({}) {

  const [PostData,setPostData] = useState([])
  let { data, reload_data,getData} = useContext(PostContext);

  useEffect(() => {
    setPostData(getData())
  },[data])

  const refreshContents = async () => {
    await reload_data()
    const newData = PostData.filter((e, i) => {
      if (e.name != "random") {
        return e;
      }
      e.url =
        "https://picsum.photos/600/500?random=" + ((Math.random() * 10 | 0) % 10) + i;
      e.profile = `https://picsum.photos/200/300?random=${
        (Math.random() * 10 | 0) % 10
      }`;
      return e;
    });
    
    setPostData(newData)
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refreshContents();
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, paddingBottom: 0, backgroundColor: "white" }}
    >
      <Text
        style={[
          { color: "red", fontSize: 25, fontWeight: "bold", width: "100%" },
          styles.pad,
        ]}
      >
        Pinterest
      </Text>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={[styles.scrollView,PostData.length == 0 ? {
          justifyContent:"center",flex:1
        }:{}]}
      >
        { PostData.length == 0 ? (
          <Text key={"key"} style={{alignSelf:"center"}}>No Post to display</Text>
        ) : (
          PostData.map((_, ind) =>
            ind % 2 == 1 ? (
              <></>
            ) : (
              <View style={{ width: "100%", flexDirection: "row" }} key={"View" + ind}>
                {ind < PostData.length ? (
                  <ImageCard imgObj={PostData[ind]} key={PostData[ind++].id} />
                ) : (
                  <></>
                )}
                {ind < PostData.length ? (
                  <ImageCard imgObj={PostData[ind]} key={PostData[ind].id} />
                ) : (
                  <></>
                )}
              </View>
            )
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pad: {
    padding: 5,
  },
  container: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
  },
});
