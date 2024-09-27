import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Platform,
    StatusBar,
    Dimensions,
    useWindowDimensions
  } from "react-native";
  
  import { useDeviceOrientation } from "@react-native-community/hooks";
  
  // hooks are functions to control the app
  
  export default function App() {
    // console.log(Dimensions.get('screen')) // in android : 'screen' -> size of whole screen, 'window': viewport
    //                                       // in IOS : same
    // // does not respond to orientation changes
    console.log(useDeviceOrientation())
    console.log(useWindowDimensions())
    const orientation = useDeviceOrientation();
  
    // require returns a number for that resource
  
    // we can give multiple css, right one get priority
    return (
      <SafeAreaView style={{flex:1}} // only work on IOS , so we check platform and give padding
      >
        <View // in width: 20 we actually do 20 * scalar factor (but almost same on both devices)
          style={{
            width:"100%",
            backgroundColor:"red",
            height:orientation == "landscape" ?  "100%": "30%",
            justifyContent:"center",
            alignItems:"center"
          }}
        >
          <Text>Video Player</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1, // flexible to fill horizontly and verically
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0
    },
    image: {
      height: 200,
      width: 200,
    },
  });
  