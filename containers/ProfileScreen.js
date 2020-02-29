import React, { useState, useEffect, useCallback } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//Photo
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

//Axios
import axios from "axios";

//Image
import empty from "../assets/images/emptypic.png";

//CSS
import s from "../style";

export default function ProfileScreen({ userToken, setToken, setId, userId }) {
  //STATES
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  //State pour le bouton Mettre à jour
  const [update, setUpdate] = useState(false);

  // FONCTION POUR FETCH LES DATA
  const fetchData = async (req, res) => {
    try {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/user/${userId}`,
        { headers: { Authorization: "Bearer " + userToken } }
      );
      setUser(response.data);

      setEmail(response.data.email);
      setUsername(response.data.username);
      setName(response.data.name);
      setDescription(response.data.description);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  // ***** USE EFFECT DECLENCHE LA FONCTION FETCHDATA
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      {isLoading === true ? (
        <View style={s.loading}>
          <ActivityIndicator size="large" color="#FF495A" />
        </View>
      ) : (
        <KeyboardAwareScrollView>
          <View style={[s.container, s.alignItemsCenter]}>
            {/* UPLOAD DE LA PHOTO PROFIL  */}
            <View style={s.profilePic}>
              <TouchableOpacity
                onPress={async () => {
                  // Permissions
                  const cameraPerm = await Permissions.askAsync(
                    Permissions.CAMERA
                  );
                  const cameraRollPerm = await Permissions.askAsync(
                    Permissions.CAMERA_ROLL
                  );

                  // Choisir camera ou camera roll
                  if (
                    cameraPerm.status === "granted" &&
                    cameraRollPerm.status === "granted"
                  ) {
                    const pickerResult = await ImagePicker.launchImageLibraryAsync(
                      {
                        allowsEditing: true,
                        aspect: [4, 3]
                      }
                    );

                    // Sending the file
                    const uri = pickerResult.uri;
                    const uriParts = uri.split(".");
                    const fileType = uriParts[uriParts.length - 1];
                    const formData = new FormData();
                    formData.append("photo", {
                      uri,
                      name: `photo.${fileType}`,
                      type: `image/${fileType}`
                    });
                    const options = {
                      method: "PUT",
                      body: formData,
                      headers: {
                        Authorization: "Bearer " + userToken,
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data"
                      }
                    };
                    //Envoi de la photo au backend
                    try {
                      const uploadResponse = await fetch(
                        "https://express-airbnb-api.herokuapp.com/user/upload_picture/" +
                          userId,
                        options
                      );

                      const uploadResult = await uploadResponse.json();

                      setUser(uploadResult);
                    } catch (e) {
                      console.log(e.message);

                      alert("An error occurred");
                    }
                  }
                }}
              >
                {user.photo && user.photo.length > 0 ? (
                  <Image
                    source={{ uri: user.photo[0].url }}
                    style={s.profilePic}
                  />
                ) : (
                  <Image source={empty} style={s.profilePic} />
                )}
              </TouchableOpacity>
            </View>

            {/* DESCRIPTION DU COMPTE  */}
            <View style={[s.profileDescription, s.alignItemsCenter]}>
              <Text style={[s.h2, s.font, s.marginBottom]}>Name</Text>
              <TextInput
                onChangeText={text => {
                  setName(text);
                }}
                value={name}
                style={[s.marginBigBottom, s.h2, s.fontBold]}
              />
              <Text style={[s.h2, s.font, s.marginBottom]}>Username</Text>
              <TextInput
                onChangeText={text => {
                  setUsername(text);
                }}
                value={username}
                style={[s.marginBigBottom, s.h2, s.fontBold]}
              />
              <Text style={[s.h2, s.font, s.marginBottom]}>Email</Text>
              <TextInput
                onChangeText={text => {
                  setEmail(text);
                }}
                value={email}
                style={[s.marginBigBottom, s.h2, s.fontBold]}
              />
              <Text style={[s.h2, s.font, s.marginBottom]}>Description</Text>
              <TextInput
                onChangeText={text => {
                  setDescription(text);
                }}
                value={description}
                style={[s.marginBigBottom, s.h2, s.fontBold]}
              />
            </View>

            <View>
              {/* EDITER  */}

              {update === true ? (
                <Text style={[s.textAlignCenter, s.font, s.marginBigBottom]}>
                  Updated !
                </Text>
              ) : (
                <TouchableHighlight
                  style={[s.buttonInverse]}
                  onPress={async (req, res) => {
                    try {
                      const response = await axios.put(
                        `https://express-airbnb-api.herokuapp.com/user/update/${userId}`,
                        {
                          email,
                          description,
                          name: name,
                          username
                        },
                        { headers: { Authorization: "Bearer " + userToken } }
                      );

                      setUser(response.data);
                      setUpdate(true);
                      setTimeout(() => {
                        setUpdate(false);
                      }, 2000);
                    } catch (error) {
                      alert("An error occurred");
                    }
                  }}
                >
                  <Text style={[s.font, s.h2, s.white, s.margins]}>
                    Mettre à jour
                  </Text>
                </TouchableHighlight>
              )}

              {/* DECONNEXION  */}
              <TouchableHighlight
                style={[s.button]}
                onPress={() => {
                  setToken(null); //On met le token a null donc déconnexion
                }}
              >
                <Text style={[s.font, s.h2, s.corail, s.margins]}>
                  Se déconnecter
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </KeyboardAwareScrollView>
      )}
    </View>
  );
}
