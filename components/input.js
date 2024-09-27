import { View, Text, TextInput, StyleSheet } from "react-native"

export default function InputBox({ name, hint,text, onChangeText }) {
    return (
        <View style={styles.container}>
            <Text
              style={{
                textAlign: "left",
                marginLeft: 5,
                alignSelf: "flex-start",
                fontWeight: "bold",
              }}
            >
              {name}
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder={hint}
            />
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