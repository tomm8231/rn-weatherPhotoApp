import React from "react"
import CurrentWeather from "../screens/CurrentWeather"
import UpcomingWeather from "../screens/UpcomingWeather"
import GalleryStack from "./Stacks";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Feather } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

const Tabs = ({ weather }) => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'grey',
                tabBarStyle: {
                    backgroundColor: 'lightblue',
                },
                headerStyle: {
                    backgroundColor: 'lightblue'
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 25,
                    color: 'darkblue'
                }
            }}>
                
            <Tab.Screen
                name={'Vejret nu'}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Feather
                            name={'droplet'}
                            size={25}
                            color={focused ? 'indianred' : 'black'}
                        />)
                }}
            >
                {() => <CurrentWeather weatherData={weather.list[0]} />}
            </Tab.Screen>

            <Tab.Screen
                name={'Vejrudsigt'}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Feather
                            name={'clock'}
                            size={25}
                            color={focused ? 'indianred' : 'black'}
                        />)
                }}
            >
                {() => <UpcomingWeather weatherData={weather.list} />}
            </Tab.Screen>

            <Tab.Screen
                name={'Galleri'}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Feather
                            name={'camera'}
                            size={25}
                            color={focused ? 'indianred' : 'black'} />)
                }}
            >
                {() => <GalleryStack weatherData={weather} />}
            </Tab.Screen>

        </Tab.Navigator>
    )
}

export default Tabs