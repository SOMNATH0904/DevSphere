package com.yusuftalhaklc.weatherapp

import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.colorResource
import com.google.accompanist.systemuicontroller.rememberSystemUiController

@Composable
fun ChangeNavigationBarColor(BarColor:Int){
    val systemUiController = rememberSystemUiController()
    val barColor : Color = colorResource(id = BarColor)
    SideEffect {
        systemUiController.setStatusBarColor(
            color = barColor
        )
    }
}