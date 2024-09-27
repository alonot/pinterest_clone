
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableHighlight,
} from "react-native";
import React, { useContext } from "react";
import InputBox from "../components/input";

// import { pickSingle, types } from "react-native-document-picker";
import { getDocumentAsync } from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";
import {POST, PostContext} from "../globals.js";


export default function UploadPic({ navigation }) {
    const [text, onChangeText] = React.useState("");
  const [file, onFileURLChange] = React.useState({});


  const pickFile = async () => {
    const response = await getDocumentAsync({
      type: "image/*",
    });
    onFileURLChange(response.assets[0]);
    onChangeText(response.assets[0].name);
  };

  const {add_post} = useContext(PostContext)

  const handleSubmit =async () => {
    if (file.uri == undefined){
      alert("Please Select a file")
      return
    }
    const data = []
    data.push({
      id:file.name + (Math.random()* 10000 | 0),
      url:file.uri,
      name:file.name,
      profile:`https://picsum.photos/200/300?random=${Math.random() * 10 % 10}`
    })
    res = await add_post(data) 
    if (!res){
      alert("File Already uploaded")
      return
    }
    if (navigation){ 
      navigation.navigate('home')
    }
  };
    return (
        <View style={styles.container}>
            <View
              style={[
                styles.container,
                {
                  alignItems: "center",
                  paddingLeft: 5,
                  paddingVertical: 5,
                },
              ]}
            >
              <TouchableHighlight onPress={pickFile} style={styles.container}>
                {file.name == undefined ? (
                  <View
                    style={{
                      height: 150,
                      width: "100%",
                      backgroundColor: "#E0E0E0",
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons name="cloud-upload" color={"#424242"} size={14} />
                    <Text>Upload</Text>
                  </View>
                ) : (
                  <Image
                    style={{ borderRadius: 10 }}
                    source={{
                      uri: file.uri,
                      height: 150,
                      width: "100%",
                    }}
                  ></Image>
                )}
              </TouchableHighlight>
            </View>

            <InputBox
              name={"Name of the Pic"}
              onChangeText={onChangeText}
              text={text}
              hint={"Louise Sunset"}
            />

            <Button color={"#E57373"} title="Submit" onPress={handleSubmit} />
          </View>
    )
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
  