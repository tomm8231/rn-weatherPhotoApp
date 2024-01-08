import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons"


const RowText = (props) => {
    const { messageOne, messageTwo, containerStyles, messageOneStyles, messageTwoStyles, iconData, iconStyles } = props
    return (
        <View style={containerStyles}>
            <Feather style={iconStyles} name={iconData.name} size={iconData.size} color={iconData.colour} />
            <Text style={messageOneStyles}>{messageOne}</Text>
            <Text style={messageTwoStyles}>{messageTwo}</Text>
        </View>
    )
}

export default RowText