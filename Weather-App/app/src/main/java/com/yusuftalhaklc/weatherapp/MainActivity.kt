package com.yusuftalhaklc.weatherapp

import android.os.Bundle
import android.util.Log

import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable

import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.Observer
import androidx.lifecycle.lifecycleScope
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.skydoves.landscapist.glide.GlideImage
import com.yusuftalhaklc.weatherapp.Model.Hour
import com.yusuftalhaklc.weatherapp.data.AppPref
import com.yusuftalhaklc.weatherapp.repository.WeatherRepository
import com.yusuftalhaklc.weatherapp.ui.theme.WeatherAppTheme
import kotlinx.coroutines.launch


class MainActivity : ComponentActivity() {

private lateinit var wrepo:WeatherRepository
private lateinit var colorID:MutableState<Int>
private lateinit var CityText:MutableState<String>
private lateinit var TimeText:MutableState<String>
private lateinit var ap:AppPref

override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            WeatherAppTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = Color.White
                ) {
                    NavPage()
                }
            }
        }
    /*
     ap = AppPref(applicationContext)
    lifecycleScope.launch{
        ap.setColor(R.color.Blue)
    }*/

}
override fun onStop() {
     super.onStop()/*
    lifecycleScope.launch{
        ap.setColor(colorID.value)
        ap.setCity(CityText.value)
    }
*/
}

@Composable
fun NavPage(){
    val navController = rememberNavController()
    NavHost(navController, startDestination = "main") {
        composable(route = "main") {
            MainPage()
        }
        composable(route = "sevendays") {
            NextSevenDays()
        }
    }
}

@Composable
fun ColorApp(colorText:String  ) {
     var color:Int?=null
    color = when(colorText){
        "Blue" -> R.color.Blue
        "Green" -> R.color.appGreen
        "Red" -> R.color.appRed
        "Orange" -> R.color.appOrange
        "Purple" -> R.color.appPurple
        else -> R.color.Blue
    }
    colorID.value = color
}

@Composable
fun MainPage(){/*

    LaunchedEffect(key1 = true){
        val job: Job = CoroutineScope(Dispatchers.Main).launch {
            if(ap.getCity() != null){
                CityText.value = ap.getCity()!!
            }else{CityText.value="istanbul"}
            if(ap.getColor()  != null){
                colorID.value = ap.getColor()!!
            }
            else{
                colorID.value = R.color.Blue
            }

        }
    }*/
    colorID = rememberSaveable {
        mutableStateOf(R.color.Blue)
    }
    CityText = rememberSaveable {
        mutableStateOf("Ankara")
    }

    ChangeNavigationBarColor(R.color.white)

    Column(modifier = Modifier
        .padding(start = 10.dp, end = 10.dp)
        .verticalScroll(rememberScrollState())) {
        TopInfoRow()
        CurrentInfo()
        BottomInfoRow()
        HourlyWeatherInfoRow()
    }
    ChangeNavigationBarColor(BarColor = colorID.value)
}

@Composable
fun CurrentInfo(){

    wrepo = WeatherRepository(CityText.value)

    var CityText = rememberSaveable{ mutableStateOf("City")}
    var CountryText = rememberSaveable{ mutableStateOf("Country")}
    var temp = rememberSaveable{ mutableStateOf(0.0)}
    var tempFeelsLike = rememberSaveable{ mutableStateOf(0.0)}
    var wind = rememberSaveable{ mutableStateOf(0.0)}
    var pressure = rememberSaveable{ mutableStateOf(0.0)}
    var uv = rememberSaveable{ mutableStateOf(0.0)}
    var condition = rememberSaveable{ mutableStateOf("Country")}
    TimeText = rememberSaveable{ mutableStateOf("0000-00-00 00:00")}
    var imageUrl = rememberSaveable{ mutableStateOf("")}

    wrepo.weatherLiveData.observe(this, Observer {
        condition.value = it.current.condition.text
        imageUrl.value = it.current.condition.icon
        CityText.value = it.location.name
        CountryText.value = it.location.country
        temp.value = it.current.tempC
        tempFeelsLike.value = it.current.feelslikeC
        wind.value = it.current.windMph
        pressure.value = it.current.pressureMb
        uv.value = it.current.uv
        TimeText.value = it.location.localtime
        TimeText.value = it.location.localtime

    })

    Row(modifier = Modifier.padding(10.dp)){
        Text(
            text = CityText.value+ ",",
            fontWeight = FontWeight.Bold,
            fontSize = 25.sp,
            modifier = Modifier.padding(start=4.dp)
        )
        Text(
            text = CountryText.value,
            fontWeight = FontWeight.Light,
            fontSize = 25.sp,
            modifier = Modifier.padding(start=3.dp)
        )
    }

    Card (
        shape = RoundedCornerShape(20.dp),
        backgroundColor = colorResource(id = colorID.value),
        contentColor = Color.White,
        modifier =Modifier.padding(15.dp)
    ){
        Column(
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier.fillMaxWidth()
        ) {
            Spacer(modifier = Modifier.padding(15.dp))

            GlideImage(
                imageModel = imageUrl.value.replace("//","https://"),
                modifier = Modifier.size(70.dp,70.dp)
            )
            Text(
                text = condition.value,
                fontWeight = FontWeight.Bold,
                fontSize = 25.sp,
                modifier = Modifier.padding(bottom = 5.dp)
            )
            Text(
                text = TimeText.value,
                fontWeight = FontWeight.Light,
                fontSize = 15.sp
            )
            Spacer(modifier = Modifier.padding(5.dp))
            Text(
                text = "${temp.value.toInt()}°",
                fontWeight = FontWeight.SemiBold,
                fontSize = 100.sp
            )

            Spacer(modifier = Modifier.padding(5.dp))

            Spacer(modifier = Modifier
                .padding(bottom = 4.dp, top = 5.dp)
                .fillMaxWidth()
                .height(1.dp)
                .background(colorResource(id = R.color.LightBlue)))
            Column(modifier = Modifier.fillMaxWidth(1f)) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(start = 20.dp, end = 20.dp),
                    horizontalArrangement = Arrangement.SpaceBetween) {

                    CurrentWeatherDetailBox(R.drawable.wind,"WIND","${wind.value} km/j")
                    CurrentWeatherDetailBox(R.drawable.temperature,"FEELS LIKE","${tempFeelsLike.value}°")
                }
                Spacer(modifier = Modifier
                    .padding(bottom = 8.dp, top = 0.dp, start = 0.dp))
                Spacer(modifier = Modifier
                    .padding(bottom = 0.dp, top = 0.dp)
                    .fillMaxWidth()
                    .height(1.dp)
                    .background(colorResource(id = R.color.LightBlue)))
                Spacer(modifier = Modifier
                    .padding(bottom = 5.dp, top = 0.dp, start = 0.dp))
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(start = 20.dp, end = 20.dp, bottom = 0.dp),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    CurrentWeatherDetailBox(R.drawable.sunnyy,"INDEX UV","${uv.value.toInt()}")

                    CurrentWeatherDetailBox(R.drawable.pulserate,"PRESSURE","${pressure.value.toInt()} mbar")
                }
                Spacer(modifier = Modifier
                    .padding(bottom = 10.dp, top = 0.dp, start = 0.dp))

            }
        }

    }
}

@Composable
fun TopInfoRow(){
    val focusRequester = remember {
        FocusRequester()
    }
    val searchBar = rememberSaveable {
        mutableStateOf(false)
    }
    val dropDownMenuExpanded = rememberSaveable {
        mutableStateOf(false)
    }
    val  searchTextTop = rememberSaveable {
        mutableStateOf("")
    }
    val appColorText = rememberSaveable  {
        mutableStateOf("Blue")
    }

    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(top = 10.dp),
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        IconButton(onClick = {
            searchBar.value = !searchBar.value
            if(!searchBar.value && CityText.value.isEmpty()){
                CityText.value = searchTextTop.value.replace(" ","_")
            }
        }) {
                Icon(
                    painter = painterResource(id = R.drawable.ic_baseline_search_24),
                    contentDescription = "SEARCH"
                )
        }

        if(searchBar.value){

            OutlinedTextField(
                value = searchTextTop.value ,
                colors = TextFieldDefaults.outlinedTextFieldColors(
                    focusedBorderColor = colorResource(id = colorID.value)
                ),
                onValueChange = {
                    searchTextTop.value = it
                                } ,
                shape = RoundedCornerShape(percent = 50),
                modifier = Modifier
                    .padding(0.dp)
                    .focusRequester(
                        focusRequester
                    )
                    .height(45.dp)
                    .weight(1f),
                placeholder = {
                    Text("Enter a city name",fontSize = 10.sp)
                },
                textStyle = TextStyle(fontSize = 10.sp),
                singleLine = true,
                keyboardOptions = KeyboardOptions(
                    keyboardType =  KeyboardType.Text,
                    imeAction = ImeAction.Search
                ),
                keyboardActions = KeyboardActions(
                    onSearch = {
                        CityText.value = searchTextTop.value.replace(" ","_")
                        searchBar.value = false
                    }
                )

            )
        }
        else{
            //focusRequester.freeFocus()
        }

        IconButton(onClick = { 
            dropDownMenuExpanded.value = !dropDownMenuExpanded.value
        }) {
            Icon(
                painter = painterResource(id = R.drawable.ic_baseline_more_horiz_24),
                contentDescription = "menu"
            )

            DropdownMenu(expanded = dropDownMenuExpanded.value,
                onDismissRequest = {
                    dropDownMenuExpanded.value = false
                }) {

                DropdownMenuItem(onClick = {
                    dropDownMenuExpanded.value = false
                    appColorText.value = "Blue"
                }) {
                    Box(modifier = Modifier
                        .size(15.dp, 15.dp)
                        .background(
                            colorResource(id = R.color.Blue),
                            CircleShape
                        ))
                    Spacer(modifier = Modifier.padding(5.dp))
                    Text("Blue")
                }

                DropdownMenuItem(onClick = {
                    dropDownMenuExpanded.value = false
                    appColorText.value = "Green"
                }) {
                    Box(modifier = Modifier
                        .size(15.dp, 15.dp)
                        .background(
                            colorResource(id = R.color.appGreen),
                            CircleShape
                        ))
                    Spacer(modifier = Modifier.padding(5.dp))
                    Text("Green")
                }

                DropdownMenuItem(onClick = {
                    dropDownMenuExpanded.value = false
                    appColorText.value = "Red"
                }) {
                    Box(modifier = Modifier
                        .size(15.dp, 15.dp)
                        .background(
                            colorResource(id = R.color.appRed),
                            CircleShape
                        ))
                    Spacer(modifier = Modifier.padding(5.dp))
                    Text("Red")
                }
                DropdownMenuItem(onClick = {
                    dropDownMenuExpanded.value = false
                    appColorText.value = "Orange"
                }) {
                    Box(modifier = Modifier
                        .size(15.dp, 15.dp)
                        .background(
                            colorResource(id = R.color.appOrange),
                            CircleShape
                        ))
                    Spacer(modifier = Modifier.padding(5.dp))
                    Text("Orange")
                }

                DropdownMenuItem(onClick = {
                    dropDownMenuExpanded.value = false
                    appColorText.value = "Purple"
                }) {
                    Box(modifier = Modifier
                        .size(15.dp, 15.dp)
                        .background(
                            colorResource(id = R.color.appPurple),
                            CircleShape
                        ))
                    Spacer(modifier = Modifier.padding(5.dp))
                    Text("Pink")
                }


            }
        }

    }

    ColorApp(colorText = appColorText.value)


}

@Composable
fun BottomInfoRow(){
    Row(modifier = Modifier
        .fillMaxWidth()
        .padding(15.dp),
        horizontalArrangement = Arrangement.SpaceBetween) {
        Text(text = "Today", fontWeight = FontWeight.SemiBold)
        /*Row(modifier = Modifier.clickable { navController.navigate("sevendays") }) {
            Text(text = "Next 7 Days ",
                fontWeight = FontWeight.Bold,
                color = colorResource(R.color.gray)
            )
            Icon(
                painter = painterResource(id = R.drawable.ic_baseline_arrow_forward_ios_24),
                modifier = Modifier
                    .width(20.dp)
                    .height(20.dp)
                    .padding(top = 4.dp) ,
                contentDescription = "Next 7 Days")
        }*/
    }
}

@Composable
fun CurrentWeatherDetailBox(pic:Int,title:String,content:String){

    Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween,modifier= Modifier

    ) {
            Image(painter = painterResource(id = pic ),
                contentDescription = title,
                modifier = Modifier
                    .width(25.dp)
                    .height(25.dp)
            )
            Spacer(modifier = Modifier.padding(4.dp))

            Column(modifier = Modifier.padding(10.dp)) {
                Text(
                    text = title,
                    fontWeight = FontWeight.W300,
                    fontSize = 14.sp
                )
                Spacer(modifier = Modifier.padding(3.dp))
                Text(
                    text = content,
                    fontWeight = FontWeight.SemiBold,
                    fontSize = 15.sp
                )

            }
        }
}



@Composable
fun HourlyWeatherInfoRow() {

    wrepo = WeatherRepository(CityText.value)
    val hourList = remember{mutableStateListOf<Hour>()}
    val index = rememberSaveable {mutableStateOf(0)}
    val listState = rememberLazyListState()
    // Remember a CoroutineScope to be able to launch

    wrepo.weatherListLiveData.observe(this, Observer { weatherHourList ->
            hourList.addAll(weatherHourList)
        Log.e("LOST", hourList.size.toString())
    })

    LazyRow (state = listState){

        items(items = hourList.takeLast(24)) { hourL ->

                val hour = hourL.time.substring(10, 16)
                val temp = hourL.tempC
                val url = hourL.condition.icon.replace("//", "https://")
            if (TimeText.value.substring(10, 13).replace(":","") == hour.substring(0,3).replace("0","")){
                //index.value =
                HourlyWeatherCard(hour, "Now", url,R.color.white,tempColor = R.color.white, backgroundColor = colorID.value)
            }
            else{
                HourlyWeatherCard(hour, "${temp.toInt()}°", url)
            }

        }

    }
}

@Composable
fun HourlyWeatherCard(
    time:String,
    temp:String,
    imageUrl:String,
    timeColor:Int = R.color.gray,
    tempColor:Int = R.color.black,
    backgroundColor:Int = R.color.white) {
    Card(
        shape = RoundedCornerShape(10.dp),
        backgroundColor = colorResource(id = backgroundColor),
        modifier = Modifier
            .width(70.dp)
            .height(120.dp)
            .padding(10.dp)
    ) {

        Column(
            verticalArrangement = Arrangement.SpaceEvenly,
            horizontalAlignment = Alignment.CenterHorizontally,
        ) {
            Text(text = "${time}", fontSize = 12.sp, color = colorResource(timeColor))
            GlideImage(
                imageModel = imageUrl,
                modifier = Modifier.size(40.dp,40.dp)
            )
           /* Image(
                painter = painterResource(id = R.drawable.sunny),
                contentDescription = "weather image",
                modifier = Modifier
                    .width(30.dp)
                    .height(30.dp)
            )*/
            Text(
                text = "${temp}",
                color = colorResource(tempColor),
                fontSize = 14.sp
            )

        }
    }
    }





}
