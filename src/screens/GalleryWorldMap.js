import React, { useState } from "react";
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'
import MapView, { Callout, Marker } from "react-native-maps";
import { WebView } from 'react-native-webview';



const GalleryWorldMap = ({ route }) => {
    const { data } = route?.params;

    const { width, height } = Dimensions.get('window');
    const navigation = useNavigation();

    const latitudes = data.map(location => location.weatherInfo.coords.lat);
    const longitudes = data.map(location => location.weatherInfo.coords.lon);

    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLon = Math.min(...longitudes);
    const maxLon = Math.max(...longitudes);

    const deltaLat = maxLat - minLat;
    const deltaLon = maxLon - minLon;

    const defaultRegion = {
        latitude: (minLat + maxLat) / 2,
        longitude: (minLon + maxLon) / 2,
        latitudeDelta: deltaLat + 0.001,
        longitudeDelta: deltaLon + 0.01
    };

    const [region, setRegion] = useState(defaultRegion);


    const onMarkerPress = (location) => {
        const newRegion = {
            // ...region, // Behold nuværende regions delta values
            latitude: location.weatherInfo.coords.lat + 0.0009, // shift center of the map to a little north of the marker to make room for the image
            longitude: location.weatherInfo.coords.lon + 0.00000000001,
            latitudeDelta: 0.004,
            longitudeDelta: 0.004,

        };
        setRegion(newRegion);
    };



    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
                <Feather
                    name={"arrow-left"}
                    size={50}
                    color={"black"}
                />
            </TouchableOpacity>

            <MapView
                style={styles.mapBox}
                region={region}

            >
                {data && (
                    <>
                        {data.map((location) => (
                            <Marker
                                coordinate={{
                                    latitude: location.weatherInfo.coords.lat,
                                    longitude: location.weatherInfo.coords.lon
                                }}
                                key={location.id}
                                title={location.weatherInfo.locationName}
                                onPress={() => onMarkerPress(location)}
                            >
                                <Callout>

                                    <View style={styles.markerBox}>
                                        <WebView style={{ width: 300, height: 300 }} source={{ uri: location.imageUrl }} />
                                    </View>
                                </Callout>
                            </Marker>
                        ))}
                    </>
                )}
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
        width: 50,
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: 'rgba(70,70,70,0.5)'
    },
    mapBox: {
        width: "100%",
        height: "100%"
    },
    markerBox: {
        height: 300,
        width: 300,
    }
});

export default GalleryWorldMap;