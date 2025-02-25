package com.yusuftalhaklc.weatherapp.viewmodel

import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.yusuftalhaklc.weatherapp.repository.WeatherRepository


class MainViewModel:ViewModel() {

   /* val wrepo = WeatherRepository()

    fun getCityName():String{
        var name : MutableLiveData<String> =  MutableLiveData()
        wrepo.weatherLiveData.observeForever {
            Log.e("VIEWMODEL", "${it.location.name}")
             name.value = it.location.name
        }
        Log.e("VIEWMODEL 22", "${name.value.toString()}")
        return name.value.toString()
    }
*/

}