import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'

const GalleryTextEdit = ({ route }) => {
    const { itemData } = route?.params;
    const navigation = useNavigation();
    const [editedText, setEditedText] = useState((route.params.itemData.text) ? route.params.itemData.text : "")

    function saveTextData() {
        navigation.navigate('Gallery', { updatedTextData: editedText, docId: itemData.id });
    }


    return (
        <View style={styles.container}>
                <TextInput
                    onChangeText={setEditedText}
                    multiline={true}
                    value={editedText}
                    rows={10}
                    style={styles.inputBox} />
            <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
                <Feather
                    name={"arrow-left"}
                    size={50}
                    color={"silver"}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveTextButton} onPress={saveTextData}>
                <Feather
                    name={"save"}
                    size={50}
                    color={"silver"}
                />
            </TouchableOpacity>
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
    saveTextButton: {
        position: "absolute",
        zIndex: 10,
        marginVertical: 20,
        bottom: "80%",
        right: 0,
        left: "80%",
        width: 50
    },
    inputBox: {
        height: 250,
        width: 300,
        textAlignVertical: 'top',
        borderWidth: 2,
        padding: 20,
        margin: 10,
        fontSize: 20,
        fontWeight: "bold"
    },
    goBack: {
        position: "absolute",
        zIndex: 10,
        marginVertical: 20,
        bottom: "80%",
        right: "80%",
        left: "5%",
        width: 50
    },

});

export default GalleryTextEdit;