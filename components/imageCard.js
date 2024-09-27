import { Image, View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { PostContext } from "../globals";


export default function ImageCard({ imgObj }) {
  const randomSize = (Math.random() * 100) % 50;
  const {delete_post} = useContext(PostContext)

  return (
    <View
      style={{
        borderRadius: 20,
        alignSelf:"baseline",
        width:"50%",
        padding:2
      }}
    >
      <Image
        style={{
          borderRadius: 10,
          borderColor: "#E0E0E0",
          backgroundColor: "#E0E0E0",
          borderWidth: 1,
        }}
        source={{
          height: 290 + randomSize,
          width: "100%",
          uri: imgObj.url,
        }}
      />
      <View
        style={{
            height:40,
            width:"100%",
            padding:0,
            // paddingRight:7,
            alignItems:"center",
            flexDirection:"row",
            justifyContent:"space-between"
        }}
      >
        <Image 
            style={{
                borderRadius: 100,
                borderWidth:1,
                backgroundColor:"#E0E0E0",
                borderColor:"#E0E0E0",
            }}
            source={{
                height:"100%",
                width:40,
                uri: imgObj.profile
            }}
        />
        <Text
          numberOfLines={1}
          style={{overflow:"hidden", flex:1, paddingLeft:5}}
        >{imgObj.name}</Text>
        <Pressable onPress={() => delete_post(imgObj.id)}>
          <Ionicons name="trash" size={17}/>
        </Pressable>
      </View>
    </View>
  );
}
