import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import s from "../style";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { SimpleLineIcons } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";
import axios from "axios";

//FONT
const fetchFonts = () => {
  return Font.loadAsync({
    "montserrat-light": require("../assets/fonts/Montserrat-Light.ttf"),
    "montserrat-bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "montserrat-regular": require("../assets/fonts/Montserrat-Regular.ttf")
  });
};

export default function SignInScreen({ setToken, setId }) {
  const navigation = useNavigation();

  // STATES POUR LE FORMULAIRE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //FONT

  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  // RETURN
  return (
    <KeyboardAwareScrollView>
      <View style={s.backgroundCoral}>
        <View style={s.container}>
          <View style={s.marginLogo}>
            <SimpleLineIcons name="home" size={100} color="white" />
          </View>
          <TextInput
            style={[s.font, s.white, s.h2, s.margins]}
            placeholder="Email"
            placeholderTextColor="#ffffff"
            autoCapitalize="none"
            onChangeText={text => {
              setEmail(text);
            }}
            value={email}
          />
          <View style={[s.line, s.marginBottom]} />
          <TextInput
            style={[s.font, s.white, s.h2, s.margins]}
            placeholder="Password"
            placeholderTextColor="#ffffff"
            secureTextEntry={true}
            onChangeText={text => {
              setPassword(text);
            }}
            value={password}
          />
          <View style={s.line} />
          <View style={s.marginLogo}>
            {/* ---- BUTTON LOGIN  TO SEND TO BACKEND  ---- */}

            <TouchableHighlight
              style={[s.button]}
              onPress={async () => {
                try {
                  if (!email && !password) {
                    alert("Veuillez renseigner tous les champs");
                  } else {
                    const response = await axios.post(
                      "https://express-airbnb-api.herokuapp.com/user/log_in",
                      { email, password },
                      { headers: { "Content-Type": "application/json" } }
                    );
                    if (response.data.token) {
                      const userToken = response.data.token; //Token généré par backend
                      const userId = response.data.id;
                      setToken(userToken);
                      setId(userId);
                      console.log("response.data.id", response.data.id);
                    } else {
                      alert("Mauvais email ou mot de passe");
                    }
                  }
                } catch (error) {
                  alert("Mauvais email ou mot de passe");
                }
              }}
            >
              <Text style={[s.font, s.h1, s.corail, s.margins]}>
                Se connecter
              </Text>
            </TouchableHighlight>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text style={[s.font, s.margins, s.white]}>
                Pas de compte ? <Text style={s.fontBold}> S'inscrire</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
