import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { useNavigation } from "@react-navigation/core";
import {
  ActivityIndicator,
  Button,
  Image,
  FlatList,
  ScrollView,
  Text,
  View
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import axios from "axios";
//CSS
import s from "../style";

import {
  TouchableHighlight,
  TouchableOpacity
} from "react-native-gesture-handler";

//FONT
const fetchFonts = () => {
  return Font.loadAsync({
    "montserrat-light": require("../assets/fonts/Montserrat-Light.ttf"),
    "montserrat-bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "montserrat-regular": require("../assets/fonts/Montserrat-Regular.ttf")
  });
};

// FONCTION HOME

export default function HomeScreen() {
  const navigation = useNavigation();

  //STATES
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [fontLoaded, setFontLoaded] = useState(false);

  // FONCTION POUR FETCH LES DATA
  const fetchData = async (req, res) => {
    try {
      const response = await axios.get(
        "https://airbnb-api.herokuapp.com/api/room?city=paris"
      );
      setData(response.data.rooms); // data = {rooms :[], city:{}, count:5   }
      setIsLoading(false);
    } catch (error) {
      alert("Cannot load");
    }
  };

  useEffect(() => {
    fetchData();
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

  // *************    RESULTATS : **************
  return (
    <View style={s.container}>
      {isLoading === true ? (
        <View style={s.loading}>
          <ActivityIndicator size="large" color="#FF495A" />
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => {
            let tabStar = [];
            for (let i = 1; i <= 5; i++) {
              if (item.ratingValue >= i) {
                tabStar.push("yellow");
              } else {
                tabStar.push("grey");
              }
            }
            // Je push yellow si mon rating est supérieur à i; sinon je push grey. Si j'ai rating = 4; j'aurai 4 yellow et 1 grey

            return (
              <TouchableOpacity
                nextFocusRight="true"
                onPress={() => {
                  navigation.navigate("Room", {
                    id: item._id,
                    tabStar: tabStar
                  }); // Je transmet l'id et le tableau tabStar de la room en props pour la Screen Room
                }}
              >
                <View style={s.homeBloc}>
                  {/* Photo principale */}
                  <Image style={s.homePic} source={{ uri: item.photos[0] }} />
                  <View style={s.homeBlocPrice}>
                    <Text style={[s.font, s.h2, s.white]}> {item.price} €</Text>
                  </View>
                  <View style={s.homeBlocDetail}>
                    <View style={s.homeBlocDescription}>
                      <Text style={[s.h2, s.font]} numberOfLines={1}>
                        {item.title}
                      </Text>

                      {/* ratings */}

                      <View style={[s.row, s.alignItemsCenter, s.marginTop]}>
                        {tabStar.map((color, index) => {
                          if (color === "yellow") {
                            return (
                              <FontAwesome
                                key={index}
                                name={"star"}
                                size={22}
                                color={"#FFB100"}
                                style={s.marginRight}
                              />
                            );
                          } else {
                            return (
                              <FontAwesome
                                key={index}
                                name={"star"}
                                size={22}
                                color={"#BBBBBB"}
                                style={s.marginRight}
                              />
                            );
                          }
                        })}

                        <Text style={[s.homeBlocReview, s.font]}>
                          {item.reviews} avis
                        </Text>
                      </View>
                    </View>

                    {/* Photo du user */}

                    <Image
                      style={s.homeBlocDetailPic}
                      source={{ uri: item.user.account.photos[0] }}
                    />
                  </View>

                  <View style={[s.lineGrey, s.marginBottom, s.marginTop]} />
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => String(item._id)}
        />
      )}
    </View>
  );
}
