const express=require("express");
const app=express();
const https=require('https');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',function(req,res){
  // res.send('Server is up and running on 3000!');
  res.sendFile(__dirname+"/index.html");
})
app.post('/',  function(req,res){
    var city=req.body.city;
    var apiKey="afe38258a0463ea37b0ccfb2eb099e2d";
    var units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+units;
    // const r;
    https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      // console.log(data);Here data is recieved in hexadecimal code.
      const weatherData=JSON.parse(data);//Hexcode is converted into Json object format
      const temp=weatherData.main.temp;
      const desc=weatherData.weather[0].description;
      const id=weatherData.weather[0].icon;
      console.log(id);
      const imageUrl="http://openweathermap.org/img/wn/"+id+"@2x.png";
      res.write("<h1>The temperature is "+temp+ "C</h1>");
      res.write("<h1>Weather is currently "+ desc+"</h1>");
      res.write("<img src=" + imageUrl+">")
      res.send();
    })
  })
});


app.listen(3000,function(){
  console.log("Server is running on port 3000");
})
