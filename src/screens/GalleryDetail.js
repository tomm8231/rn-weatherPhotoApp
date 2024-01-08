import React from "react";
import { View, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'


const GalleryDetail = ({ route }) => {
  const { itemData } = route.params;
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation();


  return (
    <View style={styles.container}>

        <TouchableOpacity style={styles.minimiseImage} onPress={() => navigation.goBack()}>
          <Feather
            name={"minimize-2"}
            size={50}
            color={"silver"}
          />
        </TouchableOpacity>

        <Image
          source={{ uri: itemData.imageUrl }}
          style={{ width: width, height: height }}
          resizeMode="contain"
        />
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
  minimiseImage: {
    position: "absolute",
    zIndex: 10,
    marginVertical: 20,
    bottom: "85%",
    right: 0,
    left: "80%",
    width: 50
  }
});

export default GalleryDetail;