package com.yusuftalhaklc.weatherapp.Model


import com.google.gson.annotations.SerializedName

data class Forecastday(
    @SerializedName("astro")
    val astro: Astro,
    @SerializedName("date")
    val date: String,
    @SerializedName("date_epoch")
    val dateEpoch: Int,
    @SerializedName("day")
    val day: Day,
    @SerializedName("hour")
    val hour: List<Hour>
)