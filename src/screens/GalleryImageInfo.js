import React from "react";
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'
import MapView, { Marker } from "react-native-maps"

const GalleryImageInfo = ({ route }) => {
    const { itemData } = route.params;
    const {
        id,
        text,
        weatherInfo: {
            coords: { lat, lon },
            country,
            date: { day, hours, minutes, seconds, month, year },
            feels_like,
            gust,
            speed,
            locationName,
            temp,
            timeStamp
        }
    } = itemData

    const { width, height } = Dimensions.get('window');
    const navigation = useNavigation();


    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
                <Feather
                    name={"arrow-left"}
                    size={50}
                    color={"silver"}
                />
            </TouchableOpacity>
            <Text style={styles.infoText}>{text}</Text>
            <Text style={styles.infoText}>{locationName}, {country}</Text>
            <Text style={styles.infoText}>{day}/{month}/{year}</Text>
            <Text style={styles.infoText}>{hours}:{minutes}</Text>
            <Text style={styles.infoText}>{temp} / {feels_like}</Text>
            <Text style={styles.infoText}>{speed} / {gust}</Text>
            <Text style={styles.infoText}>{lat}, {lon}</Text>

            <MapView
                style={styles.map}
                region={{
                    latitude: lat,
                    longitude: lon,
                    latitudeDelta: 0.4,
                    longitudeDelta: 0.4
                }}
            >
                <Marker
                    coordinate={{
                        latitude: lat,
                        longitude: lon
                    }}
                    key={id}
                    title={locationName}
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     backgroundColor: "olivedrab"
    // },
    // goBack: {
    //     position: "absolute",
    //     zIndex: 10,
    //     marginVertical: 20,
    //     bottom: "85%",
    //     right: 0,
    //     left: "80%",
    //     width: 50
    // },
    // map: {
    //     width: "90%",
    //     height: 200,
    // }
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "olivedrab"
      },
      goBack: {
        position: "absolute",
        zIndex: 10,
        marginVertical: 20,
        bottom: "85%",
        right: 0,
        left: "80%",
        width: 50
      },
      infoText: {
        fontSize: 16,
        marginVertical: 5,
        color: "white"
      },
      map: {
        width: "90%",
        height: 200,
      }
});

export default GalleryImageInfo;