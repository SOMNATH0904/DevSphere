package com.yusuftalhaklc.weatherapp.repository

import androidx.lifecycle.MutableLiveData
import com.yusuftalhaklc.weatherapp.Model.Hour
import com.yusuftalhaklc.weatherapp.Model.Weather
import com.yusuftalhaklc.weatherapp.service.ApiClient
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class WeatherRepository(_city:String) {


    val weatherLiveData: MutableLiveData<Weather> = MutableLiveData()
    val weatherListLiveData: MutableLiveData<List<Hour>> = MutableLiveData()

    private var city = _city

    init {
        getWeather()
        getWeatherList()
    }

    fun getWeather(){
        ApiClient.getClient().getWeather(city).enqueue(
            object : Callback<Weather> {
                override fun onFailure(call: Call<Weather>, t: Throwable) {
                }
                override fun onResponse(call: Call<Weather>, response: Response<Weather>) {
                    try {
                        weatherLiveData.value = response.body()
                    }
                    catch(e : Exception) {

                    }
                }
            }
        )
    }

    fun getWeatherList() {
        ApiClient.getClient().getWeather(city).enqueue(
            object : Callback<Weather> {
                override fun onFailure(call: Call<Weather>, t: Throwable) {
                    // weatherLiveData.postValue(null)

                }
                override fun onResponse(call: Call<Weather>, response: Response<Weather>) {
                    try {
                        weatherListLiveData.value = response.body()?.forecast!!.forecastday[0].hour
                    }
                    catch(e : Exception) {

                    }

                }
            }
        )
    }


}