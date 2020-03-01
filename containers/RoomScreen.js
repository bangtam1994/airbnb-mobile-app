import React, { useCallback, useState, useEffect } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import ViewPager from "@react-native-community/viewpager";

import axios from "axios";
//CSS
import s from "../style";

//FONT
const fetchFonts = () => {
  return Font.loadAsync({
    "montserrat-light": require("../assets/fonts/Montserrat-Light.ttf"),
    "montserrat-bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "montserrat-regular": require("../assets/fonts/Montserrat-Regular.ttf")
  });
};

// ROOMSCREEN

export default function RoomScreen({ route, navigation }) {
  const { id, tabStar } = route.params;
  //STATES
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // FONCTION POUR FETCH LES DATA
  const fetchData = async (req, res) => {
    try {
      const response = await axios.get(
        `https://airbnb-api.herokuapp.com/api/room/${id}`
      );
      setData(response.data); // data = {photos :[], title:, description, prix:5   }
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Fontion pour la géolocalisation
  const getLocationAsync = useCallback(async () => {
    // Demander la permission d'accéder aux coordonnées GPS
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      setErrorMessage("Please accept permission");
    } else {
      const location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      setIsMapLoading(false);
    }
  });

  // Cet effet est déclenché uniquement lors de la création de ce composant
  useEffect(() => {
    getLocationAsync();
  }, []);

  useEffect(() => {
    if (!isMapLoading) {
      fetchData();
    }
  }, [isMapLoading]);

  // FONT
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  // Pour calculer mes ratings

  // *************    RESULTATS : **************
  return (
    <View>
      {isMapLoading === true || isLoading === true ? (
        <View style={s.loading}>
          <ActivityIndicator size="large" color="#FF495A" />
        </View>
      ) : (
        <ScrollView>
          <View style={s.roomPic}>
            <ViewPager style={{ flex: 1 }} initialPage={0}>
              {data.photos.map((photo, index) => {
                return (
                  <Image
                    style={s.homePic}
                    source={{ uri: photo }}
                    key={index}
                  />
                );
              })}
            </ViewPager>

            <View style={s.roomBlocPrice}>
              <Text style={[s.font, s.h2, s.white]}> {data.price} €</Text>
            </View>
          </View>

          <View style={[s.homeBloc, s.container]}>
            {/* Photo principale */}

            <View style={[s.homeBlocDetail]}>
              <View style={s.homeBlocDescription}>
                <Text style={[s.h2, s.font]} numberOfLines={1}>
                  {data.title}
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
                    {data.reviews} avis
                  </Text>
                </View>
              </View>

              {/* Photo du user */}

              <Image
                style={s.homeBlocDetailPic}
                source={{ uri: data.user.account.photos[0] }}
              />
            </View>
            <View>
              <Text style={s.font}>{data.description}</Text>
            </View>

            <MapView
              style={s.roomMap}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={true}
              region={{
                latitude: 48.85825,
                longitude: 2.3522219,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
              }}
            >
              <MapView.Marker
                title={data.title}
                key={data.title}
                coordinate={{
                  latitude: data.loc[1],
                  longitude: data.loc[0]
                }}
              />
            </MapView>
          </View>
        </ScrollView>
      )}

      {/* Fin du return */}
    </View>
  );
}
