import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, View, Button, Image, FlatList, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker'
import { storage, app, database } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { collection, addDoc, deleteDoc, doc, updateDoc, deleteField } from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore';
import * as ImageManipulator from 'expo-image-manipulator';
import { Feather } from '@expo/vector-icons'


const Gallery = ({ weatherData, navigation, route }) => {
    const { rowLayout, container, uploadImageWrapper, uploadImageBox, button, addImageBox, deleteModeWrapper } = styles
    const { list, city: { name, country, coord: { lat, lon } } } = weatherData
    const { dt_txt, dt, main: { temp, feels_like }, wind: { speed, gust } } = list[0]
    const [imageToUploadPath, setImageToUploadPath] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null);
    const [deleteMode, setDeleteMode] = useState(false)
    const [confirmDeletion, setConfirmDeletion] = useState(null)


    const [values, loading, error] = useCollection(collection(database, "weatherData"))
    const data = values?.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort((a, b) => b.weatherInfo.timeStamp - a.weatherInfo.timeStamp);

    useEffect(() => {
        if (route.params?.updatedTextData !== undefined) {

            const newData = route.params?.updatedTextData;
            const docId = route.params?.docId

            const updatePayload = newData.trim() === ''
                ? { text: deleteField() }
                : { text: newData };

            updateDoc(doc(database, "weatherData", docId), updatePayload);

            navigation.setParams({ updatedTextData: undefined, docId: undefined });
        }
    }, [route.params?.updatedTextData, navigation]);


    const toggleOverlay = (imageId) => {
        if (confirmDeletion) {
            setConfirmDeletion(false)
        }

        if (deleteMode && !confirmDeletion) {
            setDeleteMode(false)
        }

        if (selectedImage === imageId) {
            setSelectedImage(null);
        } else {
            if (!deleteMode) {
                setSelectedImage(imageId);
            }
        }
    };

    const showFullImage = (itemData) => {
        navigation.navigate('GalleryDetail', { itemData });
    };

    const editImageText = (itemData) => {
        navigation.navigate('GalleryTextEdit', {
            itemData
        });
    };

    const toggleDeleteMode = () => {
        if (deleteMode) {
            setDeleteMode(false);
        } else {
            setDeleteMode(true);
        }
    };

    async function deleteImage(id) {
        setConfirmDeletion(false)
        await deleteDoc(doc(database, "weatherData", id))
    }


    async function launchImagePicker() {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true
        })

        if (!result.canceled) {
            setImageToUploadPath(result.assets[0].uri)
        }
    }

    async function addImageToDoc(url) {
        const date = new Date();

        try {
            await addDoc(collection(database, "weatherData"), {
                weatherInfo: {
                    locationName: name,
                    country,
                    timeStamp: date.getTime(),
                    date: {
                        year: date.getFullYear(),
                        month: date.getMonth() + 1,
                        day: date.getDate(),
                        hours: date.getHours(),
                        minutes: date.getMinutes(),
                        seconds: date.getSeconds(),
                    },
                    temp,
                    feels_like,
                    speed,
                    gust,
                    coords: {
                        lat,
                        lon
                    }
                },
                imageUrl: url
            })
        } catch (err) {
            console.log("fejl i db: " + err);
        }
    }

    async function uploadImage() {
        setDeleteMode(false)

        if (!imageToUploadPath) {
            console.log("No image selected for upload.");
            return;
        }

        const manipResult = await ImageManipulator.manipulateAsync(
            imageToUploadPath,
            [{ resize: { width: 800 } }],
            { compress: 0.7 } 
        );


        const response = await fetch(manipResult.uri)

        //binary large object - binært format som er rene bits
        const blob = await response.blob()

        const uniqueImageID = Date.now().toString();
        const storageRef = ref(storage, uniqueImageID)

        try {
            await uploadBytes(storageRef, blob);
            const url = await getDownloadURL(ref(storage, uniqueImageID));
            await addImageToDoc(url)
            setImageToUploadPath(null)

        } catch (error) {
            console.log("Error during image upload or URL retrieval or image manipulation: " + error);
        }

    }



    return (
        <SafeAreaView style={container}>
            {!imageToUploadPath && (
                <>
                    {data?.length == 0 && (
                        <View style={styles.buttonHeaderText}>
                            <Text>Tag dit første billede til galleriet</Text>
                        </View>
                    )}

                    <View style={[rowLayout, data?.length == 0 ? styles.centeredAddImageBox : addImageBox]}>
                        <TouchableOpacity style={[button]} onPress={launchImagePicker}>
                            <View>
                                <Feather
                                    name={'plus'}
                                    size={50}
                                    color='silver' />
                            </View>
                        </TouchableOpacity>
                    </View>
                </>
            )}
            {imageToUploadPath && (
                <>
                    <View style={uploadImageWrapper}>
                        <View style={uploadImageBox}>
                            <Image style={{ width: '100%', height: 300 }} source={{ uri: imageToUploadPath }} />
                        </View>

                        <View style={rowLayout}>
                            <TouchableOpacity style={button} onPress={uploadImage}>
                                <Feather
                                    name={'save'}
                                    size={50}
                                    color='darkgreen' />
                            </TouchableOpacity>
                            <TouchableOpacity style={button} onPress={() => setImageToUploadPath(null)}>
                                <Feather
                                    name={'trash-2'}
                                    size={50}
                                    color='darkred' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )}
            <FlatList
                style={{ marginTop: 10, marginBottom: 10 }}
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity onLongPress={() => toggleDeleteMode(item.id)} onPress={() => toggleOverlay(item.id)}>
                        <View style={{ borderWidth: 5, borderColor: "black", margin: 10 }}>
                            <>
                                <Image
                                    source={{ uri: item.imageUrl }}
                                    style={{ width: "100%", height: 300 }}
                                />
                            </>
                            {selectedImage === item.id && !deleteMode && !confirmDeletion && (
                                <View style={styles.overlay}>
                                    <TouchableOpacity onPress={() => alert("Info")}>
                                        <Feather
                                            name={'info'}
                                            size={50}
                                            color='silver'
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => editImageText(item)}>
                                        <Feather
                                            name={'edit-3'}
                                            size={50}
                                            color='silver'
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => showFullImage(item)}>
                                        <Feather
                                            name={'maximize-2'}
                                            size={50}
                                            color='silver'
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                            {deleteMode && (
                                <View style={deleteModeWrapper}>
                                    <TouchableOpacity onPress={() => {
                                        setConfirmDeletion(true)
                                        setSelectedImage(item.id)
                                    }}>
                                        <Feather
                                            name={'x-circle'}
                                            size={50}
                                            color='silver'
                                            style={{ position: 'absolute', backgroundColor: "black", borderRadius: 50, top: 0, right: 0, transform: [{ translateX: 10 }, { translateY: -15 }] }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                            {confirmDeletion && deleteMode && selectedImage === item.id && (
                                <View style={styles.confirmDeletionBox}>
                                    <TouchableOpacity onPress={() => deleteImage(item.id)}>
                                        <Feather
                                            name={'trash'}
                                            size={50}
                                            color='silver' />
                                    </TouchableOpacity>

                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'olivedrab',
    },
    rowLayout: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%"
        // height: "100%"

    },
    uploadImageWrapper: {
        position: 'absolute',
        top: "20%",
        left: 0,
        right: 0,
        flexDirection: 'column',
        backgroundColor: 'rgba(192,192,192, 0.7)',
        borderWidth: 2,
        borderColor: 'silver',
        zIndex: 10,
    },
    uploadImageBox: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: "15%",
    },
    addImageBox: {
        position: "absolute",
        zIndex: 10,
        backgroundColor: "grey",
        height: 70,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 15,
        elevation: 10,
        marginVertical: 20,

        top: "83%",
        right: 0,
        left: "75%",
        width: 75
    },
    overlay: {
        position: 'absolute',
        flexDirection: "row",
        justifyContent: "space-around",
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    overlayText: {
        color: 'white',
        fontSize: 16,
    },
    deleteModeWrapper: {
        position: "absolute",
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
        alignItems: "flex-end"
    },
    confirmDeletionBox: {
        position: "absolute",
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredAddImageBox: {
        position: "absolute",
        zIndex: 10,
        backgroundColor: "grey",
        height: 70,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 15,
        elevation: 10,
        marginVertical: 20,
        width: 75,
        alignSelf: 'center',
        justifyContent: 'center',
        top: '50%',
        transform: [{ translateY: -35 }]
    },
    buttonHeaderText: {
        alignSelf: 'center',
        top: '50%',
        transform: [{ translateY: -70 }],
        zIndex: 11,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: 10,
        borderRadius: 10,
        maxWidth: '80%',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000'
    }


})

export default Gallery