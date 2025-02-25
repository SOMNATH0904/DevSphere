package com.yusuftalhaklc.weatherapp.service

import com.yusuftalhaklc.weatherapp.utils.Constants.BASE_URL
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.create

object ApiClient {

    private var retrofit: Retrofit? = null

    fun getClient(): WeatherAPI {
        if (retrofit == null)
            retrofit = Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build()

        return retrofit!!.create(WeatherAPI::class.java)
    }
}