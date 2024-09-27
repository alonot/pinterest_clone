import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useState } from "react";

import UploadPic from "../components/uploadPic";
import GenerateRandom from "../components/generateRandom";

export default function SubmitScreen({navigation}) {
  const [showDevice, setShowDevice] = useState(true);

  const toggleDevice = () => {
    setShowDevice(true);
    // some logic
  };
  const toggleRandom = () => {
    // some logic
    setShowDevice(false);
  };

  return (
    <SafeAreaView style={styles.sfArea}>
      <Text style={styles.pad}>Upload</Text>
      <View style={{ width: "100%" }}>
          <Pressable
          style={[styles.toggleButton,{backgroundColor:!showDevice? "#EEEEEE" : "#BDBDBD",borderWidth:showDevice? 1: 0}]}
            onPress={toggleDevice}
          >
            <Text>Upload From Device</Text>
          </Pressable>
          <Pressable
            style={[styles.toggleButton,{backgroundColor:showDevice? "#EEEEEE" : "#BDBDBD",borderWidth:!showDevice? 1: 0}]}
            onPress={toggleRandom}
          >
            <Text>Upload Random Image(s)</Text>
          </Pressable>
      </View>
      <View style={[styles.container, { flex: 3, padding: 10 }]}>
        {showDevice ? <UploadPic navigation={navigation} /> : <GenerateRandom navigation={navigation} />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sfArea: {
    flex: 1,
    padding: 0,
    backgroundColor: "white",
    alignItems: "center",
  },
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
  pad: {
    color: "red",
    fontSize: 25,
    fontWeight: "bold",
    width: "100%",
    padding: 5,
    borderBottomColor: "gray",
    borderBottomWidth: 0.2,
  },
  toggleButton: {
    width: "100%",
    alignItems:"center",
    justifyContent:"center",
    height:40
  },
});
