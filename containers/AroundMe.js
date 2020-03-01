import React, { useCallback, useState, useEffect } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { useNavigation } from "@react-navigation/core";
import { ActivityIndicator, Text, View } from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

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

// FONCTION HOME

export default function AroundMe() {
  const navigation = useNavigation();

  //STATES
  const [data, setData] = useState();
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // FONCTION POUR GEOLOCALISATION DE MOI - MEME

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

  // FONCTION POUR FETCH LES DATA
  const fetchData = async (req, res) => {
    try {
      if (latitude && longitude) {
        const response = await axios.get(
          `https://airbnb-api.herokuapp.com/api/room/around?latitude=${latitude}&longitude=${longitude}`
        );
        setData(response.data); // data = {photos :[], title:, description, prix:5   }

        setIsDataLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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
      {isMapLoading === true || isDataLoading === true ? (
        <View style={s.loading}>
          <ActivityIndicator size="large" color="#FF495A" />
        </View>
      ) : (
        <MapView
          style={s.AroundmeMap}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.3,
            longitudeDelta: 0.3
          }}
        >
          {data.map(item => {
            let tabStar = [];
            for (let i = 1; i <= 5; i++) {
              if (item.ratingValue >= i) {
                tabStar.push("yellow");
              } else {
                tabStar.push("grey");
              }
            }
            return (
              <MapView.Marker
                // title={item.title}
                key={item._id}
                coordinate={{
                  latitude: item.loc[1],
                  longitude: item.loc[0]
                }}
              >
                <MapView.Callout
                  onPress={() => {
                    navigation.navigate("Room", {
                      id: item._id,
                      tabStar: tabStar
                    });
                  }}
                >
                  <Text style={s.aroundMeCallout}>{item.title}</Text>
                </MapView.Callout>
              </MapView.Marker>
            );
          })}
        </MapView>
      )}

      {/* Fin du return */}
    </View>
  );
}
