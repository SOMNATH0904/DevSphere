package com.yusuftalhaklc.weatherapp.data

import android.content.Context
import android.util.Log
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.intPreferencesKey
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.first

class AppPref(var context:Context) {
    val Context.ds :DataStore<Preferences> by preferencesDataStore("weatherapp")

    companion object{
        val COLOR_KEY = intPreferencesKey("COLOR")
        val CITY_KEY = stringPreferencesKey("CITY")
    }

    suspend fun setColor(color:Int){
        context.ds.edit {
            it[COLOR_KEY] = color
        }
    }
    suspend fun getColor():Int? {
        val p = context.ds.data.first()
        return p[COLOR_KEY]
    }
    suspend fun setCity(city:String){
        context.ds.edit {
            it[CITY_KEY] = city
        }
    }
    suspend fun getCity():String? {
        val p = context.ds.data.first()
        return p[CITY_KEY]
    }



}