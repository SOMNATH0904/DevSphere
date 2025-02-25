package com.yusuftalhaklc.weatherapp.Model


import com.google.gson.annotations.SerializedName

data class Weather(
    @SerializedName("current")
    val current: Current,
    @SerializedName("forecast")
    val forecast: Forecast,
    @SerializedName("location")
    val location: Location
)