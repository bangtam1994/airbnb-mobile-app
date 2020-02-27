import React, { useState, useEffect } from "react";
import { AsyncStorage, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, EvilIcons, AntDesign } from "@expo/vector-icons";

import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";
import RoomScreen from "./containers/RoomScreen";
import AroundMe from "./containers/AroundMe";
//CSS
import s from "./style";

//Font
import * as Font from "expo-font";
import { AppLoading } from "expo";

const fetchFonts = () => {
  return Font.loadAsync({
    "montserrat-light": require("./assets/fonts/Montserrat-Light.ttf"),
    "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "montserrat-regular": require("./assets/fonts/Montserrat-Medium.ttf")
  });
};

//Menu tab
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  //STATES
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  console.log("Le USER ID EST", userId);
  const [fontLoaded, setFontLoaded] = useState(false);

  // TOKEN POUR LOG-IN
  const setToken = async token => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
    } else {
      AsyncStorage.removeItem("userToken");
    }
    setUserToken(token);
  };

  // ID pour PROFILE
  const setId = async id => {
    if (userId) {
      AsyncStorage.setItem("userId", id);
    } else {
      AsyncStorage.removeItem("userId");
    }
    setUserId(id);
    console.log("dans fonction setId,", userId);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIsLoading(false);
      setUserToken(userToken);
    };

    bootstrapAsync();
  }, []);

  // FONT
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return (
    <NavigationContainer>
      {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
        // No token found, user isn't signed in
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            options={{ header: () => null, animationEnabled: false }}
          >
            {() => <SignInScreen setToken={setToken} setId={setId} />}
          </Stack.Screen>
          <Stack.Screen
            name="SignUp"
            options={{ header: () => null, animationEnabled: false }}
          >
            {() => <SignUpScreen setToken={setToken} setId={setId} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        // User is signed in
        <Stack.Navigator>
          <Stack.Screen
            name="Tab"
            options={{ header: () => null, animationEnabled: false }}
          >
            {() => (
              <Tab.Navigator
                tabBarOptions={{
                  activeTintColor: "black",
                  inactiveTintColor: "white",
                  style: {
                    backgroundColor: "#FF495A",

                    paddingTop: 10
                  }
                }}
              >
                {/* MENU : HOME  */}
                <Tab.Screen
                  name="Home"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    )
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Home"
                        options={{
                          title: "Mon Airbnb",
                          tabBarLabel: "Home",
                          headerStyle: { backgroundColor: "#FF495A" },
                          headerTitleStyle: {
                            color: "white",
                            fontSize: 20,
                            fontFamily: "montserrat-regular"
                          }
                        }}
                      >
                        {() => <HomeScreen />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Room"
                        options={{
                          title: "Room",
                          tabBarLabel: "Room",
                          headerStyle: { backgroundColor: "#FF495A" },
                          headerBackImage: () => (
                            <Ionicons
                              name={"md-arrow-back"}
                              color="white"
                              size={30}
                              style={{ marginLeft: 20 }}
                            />
                          ),
                          headerTitleStyle: {
                            color: "white",
                            fontSize: 20,
                            fontFamily: "montserrat-regular"
                          },
                          headerBackTitle: <Text></Text>
                        }}
                      >
                        {props => <RoomScreen {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                {/* MENU : MAP  */}

                <Tab.Screen
                  name="AroundMe"
                  options={{
                    tabBarLabel: "Around Me",
                    tabBarIcon: ({ color, size }) => (
                      <EvilIcons name={"location"} size={size} color={color} />
                    )
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="AroundMe"
                        options={{
                          title: "Around Me",
                          tabBarLabel: "Around Me",
                          headerStyle: { backgroundColor: "#FF495A" },
                          headerTitleStyle: {
                            color: "white",
                            fontSize: 20,
                            fontFamily: "montserrat-regular"
                          }
                        }}
                      >
                        {() => <AroundMe />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                {/* MENU : PROFILE  */}

                <Tab.Screen
                  name="Profile"
                  options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size }) => (
                      <AntDesign name={"user"} size={size} color={color} />
                    )
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: "Profile",
                          tabBarLabel: "Profile",
                          headerStyle: { backgroundColor: "#FF495A" },
                          headerTitleStyle: {
                            color: "white",
                            fontSize: 20,
                            fontFamily: "montserrat-regular"
                          }
                        }}
                      >
                        {() => (
                          <ProfileScreen
                            userToken={userToken}
                            setToken={setToken}
                            userId={userId}
                            setId={setId}
                          />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
