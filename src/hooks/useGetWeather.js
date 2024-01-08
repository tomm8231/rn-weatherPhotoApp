import React, { useState, useEffect } from "react"
import * as Location from 'expo-location'


export const useGetWeather = () => {
    const [isloading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [weather, setWeather] = useState([])
    const [lat, setLat] = useState(null)
    const [lon, setLon] = useState(null)


    const fetchWeatherData = async () => {
        if (lat && lon) {
            try {
                const res = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.EXPO_PUBLIC_OPEN_WEATHER_API}&units=metric`)
                const data = await res.json()
                setWeather(data)
            } catch (e) {
                setError('Could not fetch weather')
            } finally {
                setIsLoading(false)
            }
        }
    }

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                setError('permission to access location was denied')
                return
            }
            let location = await Location.getCurrentPositionAsync({})
            setLat(location.coords.latitude)
            setLon(location.coords.longitude)
            await fetchWeatherData()
        })()
    }, [lat, lon])

    return [isloading, error, weather]
}