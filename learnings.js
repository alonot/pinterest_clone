import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableWithoutFeedback,
    SafeAreaView,
    TouchableNativeFeedback,
    TouchableHighlight,
    ScrollView,
    Button,
    Alert,
    Platform,
    StatusBar,
  } from "react-native";
  
  export default function App() {
    const onPress = () => {
      console.log("Text Pressed");
    };
    const alertB = () => {
      // alert("Button Tappd")
      return Alert.alert("My title", "My message", [
        {text: "Yes",onPress: onPress},
        {text: "No"}
      ]);
      // also have Alert.prompt which takes input from user // mybe do not work in android
    }
  
    // require returns a number for that resource
  
    // we can give multiple css, right one get priority
    return (
      <SafeAreaView style={styles.container} // only work on IOS , so we check platform and give padding
      >
        <Text numberOfLines={1} onPress={onPress}>
          Namaste!! This is really long text. This is really long text. This is
          really long text.
        </Text>
        <View>
        <Text>IMAGE SECTION</Text>
        <Image style={styles.image} source={require("./assets/icon.png")} />
        <TouchableHighlight onPress={()=>{console.log("Image")}} // Triggers no UI changes
          // We also have TouchableWithoutFeedback
          // We also have TouchableOpacity
          //              TouchableNativeFeedback - only for android, this is maily for views with background color
          
          >
  
          <Image // images do  not have onPress
            // blurRadius={10}
            fadeDuration={1000} // only for android
            resizeMode="cover"
            style={styles.image}
            source={{
              uri: "https://picsum.photos/200/200",
            }}
            />
        </TouchableHighlight>
        <TouchableNativeFeedback>
          <View style={{width: 200,height: 100, backgroundColor: 'red'}}/>
        </TouchableNativeFeedback>
        </View>
          <Button
          color={"orange"}
          title="Click Me" onPress={alertB} />
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
  