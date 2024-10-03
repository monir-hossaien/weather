

let options = { day: 'numeric', month: 'long', year: 'numeric' };

const searchBox = document.getElementById("searchInput");
const searchButton = document.getElementById("searchBtn")
const weatherDetails = document.getElementById("weatherDetails")
const weatherLocation = document.querySelector(".city")
const humidity = document.querySelector(".humidity")
const windSpeed = document.querySelector(".wind")
const weatherImg = document.querySelector(".weather-img")
const weatherTemp = document.querySelector(".weather-temp")
const sunrise = document.querySelector(".sunrise")
const sunset = document.querySelector(".sunset")
const rainSituation = document.querySelector(".rain-situation")
const dateInfo = document.querySelector(".date")

// api parameter
let key = '3dcb5314017a1078e75cb6fa9ca9b1bb'
let URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="



async function weatherInfo(city) {
    try{
        let res = await axios.get(URL + city + `&appid=${key}`);
        let data = res.data;

        // if(searchBox.value === ''){
        //     document.getElementById("error").innerHTML = 'Please enter your city name'
        // }
        if(res.status === 200){
            weatherDetails.style.display = 'block';
            weatherTemp.innerHTML = Math.round(data.main.temp) +"°C";
            rainSituation.innerHTML = data.weather[0].description
            weatherLocation.innerHTML = `${data.name}, ${data.sys.country}`;
            dateInfo.innerHTML = new Date(data.dt*1000).toLocaleDateString('en-US', options);
            humidity.innerHTML = data.main.humidity + '%'
            windSpeed.innerHTML = data.wind.speed + 'km/h'
            sunrise.innerHTML = `Sunrise ${new Date(data.sys.sunrise*1000).toLocaleTimeString('en-US',{ hour: 'numeric', minute: 'numeric'})}`
            sunset.innerHTML = `Sunset ${new Date(data.sys.sunset*1000).toLocaleTimeString('en-US',{ hour: 'numeric', minute: 'numeric'})}`
        }

        if(data.weather[0].main === "Drizzle"){
            weatherImg.src='/images/drizzle.png'

        }
        else if(data.weather[0].main === "Rain"){
            weatherImg.src='/images/rain.png'

        }
        else if(data.weather[0].main === "Clear"){
            weatherImg.src='/images/clear.png'

        }
        else if(data.weather[0].main === "Mist"){
            weatherImg.src='/images/mist.png'

        }
        else if(data.weather[0].main === "Snow"){
            weatherImg.src='/images/snow.png'

        }
        else if(data.weather[0].main === "Clouds"){
            weatherImg.src='/images/clouds.png'

        }

    }
    catch (e) {
        console.log(e)
        document.getElementById("error").innerHTML = 'Invalid city name';
        document.getElementById("error").style.display = "block";
        weatherDetails.style.display = 'none'

        setTimeout(()=>{
            document.getElementById("error").style.display = "none";
        },1000)
    }
}

weatherInfo("Dhaka");

// Trigger search when 'Enter' key is pressed in the search input
searchBox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        weatherInfo(searchBox.value);
        searchBox.value = ''
    }
});

// Trigger search when search button is clicked
searchButton.addEventListener('click', () => {
    weatherInfo(searchBox.value);
    searchBox.value = ''
});


