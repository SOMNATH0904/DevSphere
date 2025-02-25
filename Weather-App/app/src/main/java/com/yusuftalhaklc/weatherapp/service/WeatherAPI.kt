package com.yusuftalhaklc.weatherapp.service

import com.yusuftalhaklc.weatherapp.Model.Weather
import com.yusuftalhaklc.weatherapp.utils.Constants.BASE_URL
import retrofit2.Call
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET
import retrofit2.http.Path
import retrofit2.http.Query

interface WeatherAPI {

    @GET("v1/forecast.json?key=608d0d1d968244f389c121315220802&&days=1&aqi=no&alerts=no")
     fun getWeather(@Query("q") city:String): Call<Weather>

}