package com.yusuftalhaklc.weatherapp.Model


import com.google.gson.annotations.SerializedName

data class Forecast(
    @SerializedName("forecastday")
    val forecastday: List<Forecastday>
)