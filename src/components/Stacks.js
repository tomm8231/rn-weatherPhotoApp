import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Gallery from "../screens/Gallery";
import GalleryDetail from "../screens/GalleryDetail";
import GalleryTextEdit from "../screens/GalleryTextEdit"
import GalleryImageInfo from "../screens/GalleryImageInfo"
import GalleryWorldMap from "../screens/GalleryWorldMap";

const Stack = createNativeStackNavigator();

const GalleryStack = ({ weatherData }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Gallery" options={{ headerShown: false }}>
        {(props) => <Gallery {...props} weatherData={weatherData} />}
      </Stack.Screen>
      <Stack.Screen name="GalleryDetail" component={GalleryDetail} options={{ headerShown: false }} />
      <Stack.Screen name="GalleryTextEdit" component={GalleryTextEdit} options={{ headerShown: false }} />
      <Stack.Screen name="GalleryImageInfo" component={GalleryImageInfo} options={{ headerShown: false }} />
      <Stack.Screen name="GalleryWorldMap" component={GalleryWorldMap} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default GalleryStack;