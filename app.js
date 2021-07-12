const express = require ("express");
const https = require ("https");
const bodyParser= require("body-parser");


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public')); // so that server can serve static files like custom css and images
app.get("/", function(request,response)
{
  response.render("index",{cityName:"" ,wdesc:"",wtemp:"",wimg:""});
  })

app.post("/", function(request, response)
{
  const city = request.body.cityName.toUpperCase()   // get cityname by use of bodyparser (get input from form)
  const appkey="";
  const url ="https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid="+appkey+ "&units=metric";
  https.get(url , function(res)
    {
      console.log(res.statusCode);
      if(res.statusCode===200)
    {  res.on("data", function(data)
      {
         const WeatherData = JSON.parse(data); // JS object with all API data
         const description = WeatherData.weather[0].description;
         const tempval = WeatherData.main.temp + " Degree Celcius";
         const icon = WeatherData.weather[0].icon;
         const imageurl ="http://openweathermap.org/img/wn/"+ icon + "@2x.png"
         response.render("index",{cityName:city ,wdesc:description,wtemp:tempval,wimg:imageurl});
      })
    }
    else
    {
      response.render("index",{cityName:"Enter valid city name!!!" ,wdesc:" ",wtemp:" ",wimg:" "});
    }
    })

})

app.listen(3000 , function()
{
  console.log("the server is running weather");
})
