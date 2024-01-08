import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons"
import RowText from "../components/RowText";
import { weatherType } from "../utilities/weatherType";

const CurrentWeather = ({ weatherData }) => {

  const { wrapper, container, tempStyles, feels, windWrapper, windText, windIcon, gust, speed} = styles

  const { main: { temp, feels_like }, weather, wind } = weatherData

  const weatherCondition = weather[0]?.main


  return (
    <SafeAreaView style={[wrapper, { backgroundColor: "red" }]}>
      <View style={container}>
        <Feather name={weatherType[weatherCondition]?.icon} size={100} color="white" />
        <Text style={tempStyles}>{`${Math.round(temp)}°`}</Text>
        <Text style={feels}>{`Føles som ${Math.round(feels_like)}°`}</Text>
        <RowText
          messageOne={`${Math.round(wind.speed)} m/s `}
          messageTwo={`${Math.round(wind.gust)} m/s`} 
          containerStyles={windWrapper}
          iconStyles={windIcon} 
          messageOneStyles={[windText, speed]} 
          messageTwoStyles={[windText, gust]} 
          iconData={{name: "wind", size: 50, colour: "white"}}/>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  wrapper: {
    flex: 1,
  },
  container: {
    paddingTop: 30,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  tempStyles: {
    color: "black",
    fontSize: 48
  },
  feels: {
    color: "black",
    fontSize: 30
  },
  gust: {
    fontSize: 18
  },
  speed: {
    fontWeight: "bold",
    fontSize: 20
  },
  windText: {
    color: "black",
  },
  windIcon: {
    paddingRight: 20
  },
  windWrapper: {
    flexDirection: "row",
    paddingTop: 30,
    alignItems: "center"
  },
  bodyWrapper: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingLeft: 24,
    marginBottom: 40,
  },
  description: {
    fontSize: 43
  },
  message: {
    fontSize: 25
  }

})

export default CurrentWeather