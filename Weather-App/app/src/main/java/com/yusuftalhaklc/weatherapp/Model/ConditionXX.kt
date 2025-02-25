package com.yusuftalhaklc.weatherapp.Model


import com.google.gson.annotations.SerializedName

data class ConditionXX(
    @SerializedName("code")
    val code: Int,
    @SerializedName("icon")
    val icon: String,
    @SerializedName("text")
    val text: String
)