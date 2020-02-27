import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";
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

export default function SignUpScreen({ setToken, setId }) {
  const navigation = useNavigation();
  // STATES POUR LE FORMULAIRE
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // FONT
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  // RETURN :
  return (
    <View style={s.backgroundCoral}>
      <View style={s.container}>
        <View style={[s.signupHeader]}>
          <Text style={[s.font, s.white, s.h1]}> Rejoignez-nous!</Text>
        </View>

        <TextInput
          style={[s.font, s.white, s.h2, s.margins]}
          placeholder="email"
          placeholderTextColor="#ffffff"
          onChangeText={text => {
            setEmail(text);
          }}
          value={email}
        />
        <View style={[s.line, s.marginBottom]} />
        <TextInput
          style={[s.font, s.white, s.h2, s.margins]}
          placeholder="username"
          placeholderTextColor="#ffffff"
          onChangeText={text => {
            setUsername(text);
          }}
          value={username}
        />
        <View style={s.line} />

        <TextInput
          style={[s.font, s.white, s.h2, s.margins]}
          placeholder="name"
          placeholderTextColor="#ffffff"
          onChangeText={text => {
            setName(text);
          }}
          value={name}
        />

        <View style={s.line} />

        <View style={s.textArea}>
          <TextInput
            style={[s.font, s.white, s.h2, s.margins]}
            placeholder="Présentez-vous en quelques mots..."
            placeholderTextColor="#ffffff"
            multiline
            onChangeText={text => {
              setDescription(text);
            }}
            value={description}
          />
        </View>

        <TextInput
          style={[s.font, s.white, s.h2, s.margins]}
          placeholder="mot de passe"
          placeholderTextColor="#ffffff"
          secureTextEntry={true}
          onChangeText={text => {
            setPassword(text);
          }}
          value={password}
        />

        <View style={s.line} />

        <TextInput
          style={[s.font, s.white, s.h2, s.margins]}
          placeholder="confirmez le de passe"
          placeholderTextColor="#ffffff"
          secureTextEntry={true}
          onChangeText={text => {
            setPasswordConfirm(text);
          }}
          value={passwordConfirm}
        />

        <View style={s.line} />
        <View style={s.marginsSignup}>
          {/* ---- BUTTON SIGNUP WITH FUNCTION TO SEND TO BACKEND  ---- */}
          <TouchableHighlight
            style={[s.button]}
            onPress={async () => {
              try {
                if (password !== passwordConfirm) {
                  alert("Les mots de passe ne sont pas identiques");
                } else {
                  const response = await axios.post(
                    "https://express-airbnb-api.herokuapp.com/user/sign_up",
                    { email, username, name, description, password },
                    { headers: { "Content-Type": "application/json" } }
                  );
                  if (response.data.token) {
                    const userToken = response.data.token; //Token généré par backend
                    const userId = response.data.id;
                    setToken(userToken);
                    setId(userId);
                  } else {
                    alert("Vous n'avez pas renseigné tous les champs");
                  }
                }
              } catch (error) {
                alert(error.message);
              }
            }}
          >
            <Text style={[s.font, s.h1, s.corail]}>S'inscrire</Text>
          </TouchableHighlight>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={[s.font, s.margins, s.white]}>
              Déjà un compte ? <Text style={s.fontBold}> Se connecter</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
