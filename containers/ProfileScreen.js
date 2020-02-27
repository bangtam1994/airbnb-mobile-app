import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from "react-native";

import axios from "axios";
import empty from "../assets/images/emptypic.png";

//CSS
import s from "../style";

export default function ProfileScreen({ userToken, setToken, setId, userId }) {
  // setToken(null);
  //STATES
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [update, setUpdate] = useState(false);

  // FONCTION POUR FETCH LES DATA
  const fetchData = async (req, res) => {
    try {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/user/${userId}`,
        { headers: { Authorization: "Bearer " + userToken } }
      );
      setData(response.data);

      setIsLoading(false);
      setEmail(response.data.email);
      setUsername(response.data.username);
      setName(response.data.name);
      setDescription(response.data.description);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [update]);

  return (
    <View>
      {isLoading === true ? (
        <View style={s.loading}>
          <ActivityIndicator size="large" color="#FF495A" />
        </View>
      ) : (
        <KeyboardAvoidingView behavior="padding" enabled>
          <ScrollView>
            <View style={[s.container, s.alignItemsCenter]}>
              <View style={s.profilePic}>
                {data.photo ? (
                  <Image source={empty} style={s.profilePic} />
                ) : (
                  <Image source={data.photo} style={s.profilePic} />
                )}
              </View>

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
                            name,
                            username
                          },
                          { headers: { Authorization: "Bearer " + userToken } }
                        );
                        setEmail(response.data.email);
                        setUsername(response.data.username);
                        setName(response.data.name);
                        setDescription(response.data.description);
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
                    setToken(null);
                    setId(null);
                  }}
                >
                  <Text style={[s.font, s.h2, s.corail, s.margins]}>
                    Se déconnecter
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </View>
  );
}
