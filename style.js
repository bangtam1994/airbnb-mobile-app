import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";

const widthWindow = Dimensions.get("window").width;
const heightWindow = Dimensions.get("window").height;

export default StyleSheet.create({
  //Commons
  container: {
    // height: 320,
    margin: 25
  },
  backgroundCoral: {
    backgroundColor: "#FF495A",
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },

  line: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginBottom: 10
  },

  lineGrey: {
    borderBottomColor: "#BBBBBB",
    borderBottomWidth: 1,
    marginBottom: 10
  },

  button: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    width: 230,
    height: 70,
    borderWidth: 1,
    borderColor: "#FF495A"
  },

  buttonInverse: {
    backgroundColor: "#FF495A",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    width: 230,
    height: 70,
    marginBottom: 10
  },

  // LOADING
  loading: {
    height: heightWindow,
    width: widthWindow,
    justifyContent: "center"
  },
  //   FONT COLOR
  grey: {
    color: "#BBBBBB"
  },
  white: {
    color: "white"
  },
  blue: {
    color: "#0277BD"
  },
  corail: {
    color: "#FF495A"
  },

  //Font style
  font: {
    fontFamily: "montserrat-light"
  },
  fontBold: {
    fontFamily: "montserrat-bold"
  },
  fontRegular: {
    fontFamily: "montserrat-regular"
  },

  small: {
    fontSize: 11
  },
  bold: {
    fontWeight: "bold"
  },
  h1: {
    fontSize: 25
  },
  h2: {
    fontSize: 18
  },
  text: {
    color: "#B2B2B2"
  },
  textAlignCenter: {
    textAlign: "center"
  },
  marginTop: {
    marginTop: 5
  },
  marginLeft: {
    marginLeft: 10
  },
  marginRight: {
    marginRight: 10
  },
  marginBottom: { marginBottom: 10 },

  margins: {
    margin: 10
  },
  //   FLEXBOX
  row: {
    flexDirection: "row"
  },
  alignItemsCenter: {
    alignItems: "center"
  },
  justifyContentCenter: {
    justifyContent: "center"
  },
  spaceBetween: {
    justifyContent: "space-between"
  },

  //******LOG IN PAGE ****

  marginLogo: {
    height: "40%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  //******SIGN UP PAGE ****
  signupHeader: {
    margin: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  textArea: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "white",
    height: 100,
    marginTop: 30,
    marginBottom: 30
  },

  marginsSignup: {
    marginTop: 30,
    marginBottom: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  // HOME

  homeBloc: {
    marginBottom: 10
  },
  homeBlocDetail: {
    paddingTop: 15,
    paddingBottom: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    height: 80
  },

  homePic: {
    // width: "100%",
    height: 230
  },

  homeBlocPrice: {
    backgroundColor: "rgba(0,0,0,0.8)",
    width: 70,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 110
  },
  homeBlocDescription: {
    flex: 4
  },
  homeBlocDetailPic: {
    width: 50,
    height: 70,
    resizeMode: "cover",
    borderRadius: 50,
    flex: 1,
    marginLeft: 10
  },
  homeBlocReview: {
    color: "#bbbbbb",
    paddingLeft: 30,
    fontSize: 18
  },

  // ****** ROOM *******
  roomPic: {
    height: 230
  },
  roomBlocPrice: {
    backgroundColor: "black",
    width: 70,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 15
  },
  roomMap: {
    height: 300,
    width: "100%",
    marginTop: 20,
    marginBottom: 20
  },

  // AROUND ME

  AroundmeMap: {
    width: "100%",
    height: "100%"
  },
  aroundMeCallout: {
    width: 100,
    borderRadius: 30,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  // PROFILE

  profilePic: {
    height: 150,
    width: 200
    // width: "80%"
  },

  profileDescription: {
    marginTop: 40,
    marginBottom: 15
  },
  textAreaProfile: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#FF495A",
    height: 100,
    marginTop: 30,
    marginBottom: 30
  },
  marginBigBottom: {
    marginBottom: 20
  }
});
