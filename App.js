
import { StyleSheet } from "react-native";

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

import Login from "./src/pages/Login/Login";
import Drawer from "./src/pages/Drawer/Drawer";
import Register from "./src/pages/Register/Register";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import New1 from "./src/components/New1";
import Test from "./src/components/test";

const Stack = createStackNavigator();


function App() {
  const [login, setLogin] = useState(false)

  useEffect(() => {
    const checkToken = async () => {

      const token = await AsyncStorage.getItem("login");
      if (token) {
        console.log("token has")
        setLogin(true);
      } else {
        setLogin(false);
        console.log("token has not")
      }

    }
    checkToken()
  }, [])
  return (
    // <New1/>
    // <Test/>

    <NavigationContainer>

      <Stack.Navigator>
        {
          !login &&
          <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        }
        <Stack.Screen options={{ headerShown: false }} name="Drawer" component={Drawer} />
        <Stack.Screen options={{ headerShown: false }} name="Login2" component={Login} />

        <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />


      </Stack.Navigator>

    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },

});

export default App;
