import React, { useState, useEffect } from "react"
import * as Location from 'expo-location'


export const useGetWeather = () => {
    const [isloading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [weather, setWeather] = useState([])
    const [lat, setLat] = useState([])
    const [lon, setLon] = useState([])


    const fetchWeatherData = async () => {
        try {
            const res = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=16991c28f8b15ad92400218efbb0a9ce&units=metric`)
            const data = await res.json()
            setWeather(data)
        } catch (e) {
            setError('Could not fetch weather')
        } finally {
            setIsLoading(false)
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