import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { StyleSheet } from "react-native";

import HomeScreen from "./screen/home";
import SubmitScreen from "./screen/submit";
import { SafeAreaView } from "react-native-safe-area-context";

import AsyncStorage from '@react-native-async-storage/async-storage';
import {POST, PostContext} from "./globals.js";

// hooks are functions to control the app
const Tab = createBottomTabNavigator();
let localRamVar = []

export default function App() {
  const [data, setData] = useState([]);

  const reload_data = async () => {
    const newData = await AsyncStorage.getItem(POST).then(res => JSON.parse(res))
    if (newData != null){
      localRamVar = newData
      setData(newData);
    }
  };
  const delete_post = async (id) => {
    await AsyncStorage.setItem(
      POST,
      JSON.stringify(
        data.filter((e) => {
          if (e.id != id){
            return e
          }
        })
      )
    )
    await reload_data()
  }
  // AsyncStorage.clear()
  const add_post = async (posts) => {
    for (let ind in posts) {
      const post = posts[ind]
      for (let dind in data){
        const d =data[dind]
        if (d.url == post.url){
          return false
        }
      }
      data.push(post)
    };
    await AsyncStorage.setItem(POST,
      JSON.stringify(data)
    )
    await reload_data()
    return true
  }

  const getData = () => {
    return data
  }

  useEffect(() => {
    reload_data()
  },[])

  return (
    <SafeAreaView style={[styles.flex1, styles.safecontainer]}>
        <NavigationContainer>
        <PostContext.Provider
          value={{ data,setData,reload_data, delete_post, getData, add_post }}
        >
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarActiveTintColor: "black",
              tabBarIcon: ({ focused, color, size }) => {
                switch (route.name) {
                  case "home":
                    return (
                      <Ionicons
                        name={focused ? "home-sharp" : "home-outline"}
                        size={size}
                        color={color}
                      />
                    );
                  case "submit":
                    return (
                      <Ionicons
                        name={focused ? "document" : "document-outline"}
                        size={size}
                        color={color}
                      />
                    );
                }
              },
            })}
          >
            <Tab.Screen name="home" component={HomeScreen} />
            <Tab.Screen name="submit" component={SubmitScreen} />
          </Tab.Navigator>
        </PostContext.Provider>
        </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  safecontainer: {
    backgroundColor: "white",
  },
});
