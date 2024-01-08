import React from "react";
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'
import MapView, { Marker } from "react-native-maps";


const GalleryWorldMap = ({ route }) => {
    const { data } = route.params;
    console.log(data);
    // const {
    //     id,
    //     text,
    //     weatherInfo: {
    //         coords: { lat, lon },
    //         country,
    //         date: { day, hours, minutes, seconds, month, year },
    //         feels_like,
    //         gust,
    //         speed,
    //         locationName,
    //         temp,
    //         timeStamp
    //     }
    // } = data

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

            <MapView
                style={styles.map}
            >
                {/* <Marker 
                coordinate={{
                    latitude: lat,
                    longitude: lon
                }}
                key={id}
                title={locationName}
                /> */}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
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
    map: {
        width: "95%",
        height: "75%"
    }
});

export default GalleryWorldMap;