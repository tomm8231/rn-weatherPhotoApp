import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Feather } from "@expo/vector-icons"
import { weatherType } from "../utilities/weatherType"
import moment from 'moment'
import 'moment/locale/da'
moment.locale('da')

const ListItem = (props) => {
    const { dt_txt, min, max, condition } = props
    const { item, date, temp, dateTextWrapper } = styles
    return (
        <View style={item}>
            <Feather name={weatherType[condition]?.icon} size={50} color={"white"} />
            <View style={dateTextWrapper}>
                <Text style={date}>{moment(dt_txt).format('dddd').charAt(0).toUpperCase() + moment(dt_txt).format('dddd').slice(1).toLowerCase()}</Text>
                <Text style={date}>{moment(dt_txt).format(`D. MMM`)}</Text>
                <Text style={date}>{moment(dt_txt).format('HH:mm')}</Text>
            </View>
            <Text style={temp}>{`${Math.round(min)}° / ${Math.round(max)}°`}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderWidth: 5,
        backgroundColor: "blue"
    },
    temp: {
        color: "white",
        fontSize: 20
    },
    dateTextWrapper: {
        flexDirection: 'column'
    },
    date: {
        color: "white",
        fontSize: 15
    }
})

export default ListItem