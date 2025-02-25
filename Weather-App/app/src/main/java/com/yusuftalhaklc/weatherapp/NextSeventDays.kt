package com.yusuftalhaklc.weatherapp

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.google.accompanist.systemuicontroller.rememberSystemUiController
import com.yusuftalhaklc.weatherapp.ui.theme.WeatherAppTheme

@Composable
fun NextSevenDays(){
    ChangeNavigationBarColor(R.color.Blue)
    Surface(
        modifier = Modifier.fillMaxSize(),
        color = colorResource(id = R.color.Blue)
    ) {
        SevenDayInfoColumn()
    }
}
@Composable
fun SevenDayInfoColumn(){
    Column() {
        Row(modifier = Modifier
            .padding(20.dp)
            .fillMaxWidth(), horizontalArrangement = Arrangement.Center){
            Text(
                text = "Istanbul"+",",
                fontWeight = FontWeight.Bold,
                fontSize = 18.sp,
                color = Color.White,
                modifier = Modifier.padding(start=4.dp)
            )
            Text(
                text = "Turkey",
                fontWeight = FontWeight.Light,
                fontSize = 18.sp,
                color = Color.White,
                modifier = Modifier.padding(start=3.dp)

            )
        }
        Column(modifier = Modifier.padding(30.dp)) {
            Text(
                text = "Next 7 Days",
                fontWeight = FontWeight.Normal,
                fontSize = 22.sp,
                color = Color.White,
                modifier = Modifier.padding(bottom=10.dp)
            )
            DayInfoColumn(day = "Monday", day2 = "7 Feb", temp1 = 32, temp2 = 31)
            DayInfoColumn(day = "Tuesday", day2 = "8 Feb", temp1 = 22, temp2 = 23)
            DayInfoColumn(day = "Wednesday", day2 = "9 Feb", temp1 = 30, temp2 = 31)
            DayInfoColumn(day = "Thursday", day2 = "10 Feb", temp1 = 24, temp2 = 26)
            DayInfoColumn(day = "Friday", day2 = "11 Feb", temp1 = 26, temp2 = 27)
            DayInfoColumn(day = "Saturday", day2 = "12 Feb", temp1 = 27, temp2 = 28)
            DayInfoColumn(day = "Sunday", day2 = "13 Feb", temp1 = 22, temp2 = 23)
        }

    }
}

@Composable
fun DayInfoColumn(day:String,day2:String,temp1:Int,temp2:Int){
    Row(Modifier.padding(top=25.dp, bottom = 10.dp)) {
        Image(
            painter = painterResource(id = R.drawable.sunny),
            contentDescription = "weather image",
            modifier = Modifier
                .width(25.dp)
                .height(25.dp)
        )
        Spacer(modifier = Modifier.padding(15.dp))
        Text(
            text = day +",",
            fontWeight = FontWeight.Bold,
            fontSize = 15.sp,
            color = Color.White,
            modifier = Modifier.padding(start=4.dp)
        )
        Text(
            text = day2,
            fontWeight = FontWeight.Light,
            fontSize = 15.sp,
            color = Color.White,
            modifier = Modifier.padding(start=3.dp)
        )
        Row(horizontalArrangement = Arrangement.End,
        modifier = Modifier.fillMaxWidth()) {
        Text(
            text = temp1.toString() ,
            fontWeight = FontWeight.Bold,
            fontSize = 20.sp,
            color = Color.White,
            modifier = Modifier.padding(start=4.dp)
        )
            Text(
                text = " / ",
                fontWeight = FontWeight.Light,
                fontSize = 18.sp,
                color = Color.White,
                modifier = Modifier.padding(start=3.dp)
            )
            Text(
                text = temp2.toString()+"°",
                fontWeight = FontWeight.Light,
                fontSize = 15.sp,
                color = Color.White,
                modifier = Modifier.padding(start=3.dp)
            )
        }
    }
}