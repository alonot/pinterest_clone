import { View, StyleSheet, Button } from "react-native";
import React, { useContext } from "react";
import InputBox from "../components/input";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { POST, PostContext } from "../globals";

export default function GenerateRandom({navigation}) {
  const [number, onChangeNumber] = React.useState("1");
  let { data, add_post } = useContext(PostContext);

  
  if (data == null){
    data = []
  }
  const handleSubmit = async () => {
    if (number > 10) {
      alert("You cannot add more than 10 images at once");
      return;
    }
    const data = []
    for (let i = 0; i < number; i++) {
      data.push({
        id: "random" + (i + (Math.random() * 10000 | 0)),
        url:
          "https://picsum.photos/600/500?random=" +
          ((Math.random() * 10) % 10) +
          i,
        profile: `https://picsum.photos/200/300?random=${
          (Math.random() * 10) % 10
        }`,
        name: "random",
      });
    }
    await add_post(data)
    navigation.navigate('home')
  };

  return (
    <View style={styles.container}>
      <InputBox
        name={"Number Of Pics"}
        onChangeText={onChangeNumber}
        text={number}
        hint={"10"}
      />

      <Button color={"#E57373"} title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  input: {
    height: 40,
    marginVertical: 5,
    padding: 10,
    width: "100%",
    borderWidth: 1,
  },
});
