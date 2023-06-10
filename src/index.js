const decreaseButton = document.getElementById("decreaseTempControl");
const increaseButton = document.getElementById("increaseTempControl");
const tempValue = document.getElementById("tempValue");
const landscape = document.getElementById("landscape");
const skySelect = document.getElementById("skySelect");
const cityNameInput = document.getElementById("cityNameInput");
const cityNameReset = document.getElementById("cityNameReset");
const cityNameSection = document.getElementById("cityNameSection");
const currentTempButton = document.getElementById("currentTempButton");
const cityNameInputDefault = document.getElementById("cityNameInput").defaultValue = "Seattle";
const headerCityNameDefault = document.getElementById("headerCityName").textContent = "Seattle";

let locationError = false;

const updateLandscape = (tempValue) => {
    let landscape_text = "";

    if (tempValue >= 80) {
        landscape_text = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
    } else if (tempValue >= 70 && tempValue <= 79) {
        landscape_text = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
    } else if (tempValue >= 60 && tempValue <= 69) {
        landscape_text = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
    } else if (tempValue <= 59) {
        landscape_text = "🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲";
    }

    landscape.textContent = landscape_text;
};

const updateTextColor = (tempValue) => {
    if (tempValue >= 80) {
        document.getElementById("tempValue").style.color = "red";
    } else if (tempValue >= 70 && tempValue <= 79) {
        document.getElementById("tempValue").style.color = "orange";
    } else if (tempValue >= 60 && tempValue <= 69) {
        document.getElementById("tempValue").style.color = "yellow";
    } else if (tempValue >= 50 && tempValue <= 59) {
        document.getElementById("tempValue").style.color = "green";
    } else if (tempValue >= 30 && tempValue <= 49) {
        document.getElementById("tempValue").style.color = "teal";
    } else if (tempValue <= 29) {
        document.getElementById("tempValue").style.color = "blue";
    }
};

const findLatitudeAndLongitude = (query) => {
    let latitude, longitude;
    axios.get("https://ada-weather-report-proxy-server.onrender.com/location",
        {
            params: {
                q: query,
                format: "json"
            }
        })
        .then((response) => {
            latitude = response.data[0].lat;
            longitude = response.data[0].lon;
            findWeather(latitude, longitude);
        })
        .catch((error) => {
            locationError = true;
            const errorSpan = document.createElement("span");
            errorSpan.id = "invalid"
            errorSpan.innerHTML = "Invalid City"
            cityNameSection.appendChild(errorSpan)
            console.log("error in findLatitudeAndLongitude!");
        });
}

const findWeather = (latitude, longitude) => {
    axios.get("https://ada-weather-report-proxy-server.onrender.com/weather",
        {
            params: {
                format: "json",
                lat: latitude,
                lon: longitude
            }
        })
        .then((response) => {
            const tempK = response.data.main.temp;
            const tempF = (tempK - 273.15) * 9 / 5 + 32;
            document.getElementById("tempValue").textContent = Math.floor(tempF);
            updateLandscape(tempF);
            updateTextColor(tempF);
            return tempF;
        })
        .catch((error) => {
            console.log("error in findLocation!");
        });
}

let count = 72;
updateLandscape(count);
updateTextColor(count);

const changeCity = () => {
    const cityName = document.getElementById("cityNameInput").value;
    const cityHeader = document.getElementById("headerCityName");

    cityHeader.textContent = cityName[0].toUpperCase() + cityName.substring(1);

    if (locationError) {
        const invalid = document.getElementById("invalid")
        invalid.remove();
        locationError = false;
    }
};

const updateSky = () => {
    const skySelect = document.getElementById("skySelect").value;
    const sky = document.getElementById("sky");
    const gardenContent = document.getElementById("gardenContent");

    switch (skySelect) {
        case "Sunny":
            sky.textContent = "☁️ ☁️ ☁️ ☀️ ☁️ ☁️";
            gardenContent.classList = "garden__content sunny";
            break;
        case "Cloudy":
            sky.textContent = "☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️";
            gardenContent.classList = "garden__content cloudy";
            break;
        case "Rainy":
            sky.textContent = "🌧🌈🌩️🌧🌧💧🌩️🌧🌦🌧💧🌧🌧";
            gardenContent.classList = "garden__content rainy";
            break;
        case "Snowy":
            sky.textContent = "🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨";
            gardenContent.classList = "garden__content snowy";
            break;
    };
};

updateSky();

const registerEventHandlers = () => {
    decreaseButton.addEventListener("click", () => {
        count--;
        tempValue.textContent = count;
        updateLandscape(count);
        updateTextColor(count);
    });

    increaseButton.addEventListener("click", () => {
        count++;
        tempValue.textContent = count;
        updateLandscape(count);
        updateTextColor(count);
    });

    cityNameInput.addEventListener("input", changeCity);

    skySelect.addEventListener("change", updateSky);

    currentTempButton.addEventListener("click", () => {
        const cityName = cityNameInput.value;
        tempF = findLatitudeAndLongitude(cityName)
    });

    cityNameReset.addEventListener("click", () => {
        cityNameInput.value = cityNameInputDefault
        document.getElementById("headerCityName").textContent = "Seattle";
        changeCity()
    });
};


document.addEventListener("DOMContentLoaded", registerEventHandlers);
