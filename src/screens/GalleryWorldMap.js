import React from "react";
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'
import MapView, { Callout, Marker } from "react-native-maps";
import { WebView } from 'react-native-webview';



const GalleryWorldMap = ({ route }) => {
    const { data } = route.params;

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
                style={styles.mapBox}
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
                            >
                                <Callout>
                                    
                                    <View style={styles.markerBox}>
                                            <WebView style={{ width: 200, height: 200}}  source={{ uri: location.imageUrl }} />
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
        width: 50
    },
    mapBox: {
        width: "95%",
        height: "75%"
    },
    markerBox: {
        height: 200,
        width: 200,
    }
});

export default GalleryWorldMap;