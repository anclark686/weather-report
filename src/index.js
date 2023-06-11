const decreaseButton = document.getElementById("decreaseTempControl");
const increaseButton = document.getElementById("increaseTempControl");
const tempValue = document.getElementById("tempValue");
const landscape = document.getElementById("landscape");
const skySelect = document.getElementById("skySelect");
const cityNameInput = document.getElementById("cityNameInput");
const cityNameReset = document.getElementById("cityNameReset");
const cityNameSection = document.getElementById("cityNameSection");
const currentTempButton = document.getElementById("currentTempButton");
const headerCityName = document.getElementById('headerCityName');

let locationError = false;
let tempType = "fahrenheit";
let count = 72;
const defaultCity = "Seattle";

cityNameInput.defaultValue = defaultCity;
headerCityName.textContent = defaultCity;

const updateLandscape = (tempValue) => {
    let landscape_text = "";
    if (tempType === "fahrenheit") {
        if (tempValue >= 86) {
            landscape_text = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
        } else if (tempValue >= 71 && tempValue <= 85) {
            landscape_text = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
        } else if (tempValue >= 56 && tempValue <= 70) {
            landscape_text = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
        } else if (tempValue >= 40 && tempValue <= 55) {
            landscape_text = "💨🍃🪵_🍁🍂_🍁_🍃🪵🍂💨";
        } else if (tempValue <= 39) {
            landscape_text = "🌲🌲⛄️🌲⛄️☃️🌲☃️🌲🌲⛄️☃️🌲";
        }
    } else {
        if (tempValue >= 33) {
            landscape_text = "🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂";
        } else if (tempValue >= 22 && tempValue <= 32) {
            landscape_text = "🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷";
        } else if (tempValue >= 13 && tempValue <= 21) {
            landscape_text = "🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃";
        } else if (tempValue >= 6 && tempValue <= 12) {
            landscape_text = "💨🍃🪵_🍁🍂_🍁_🍃🪵🍂💨";
        } else if (tempValue <= 5) {
            landscape_text = "🌲🌲⛄️🌲⛄️☃️🌲☃️🌲🌲⛄️☃️🌲";
        }
    }

    landscape.textContent = landscape_text;
};

const updateTextColor = (tempValue) => {
    if (tempType === "fahrenheit") {
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
    } else {
        if (tempValue >= 30) {
            document.getElementById("tempValue").style.color = "red";
        } else if (tempValue >= 23 && tempValue <= 29) {
            document.getElementById("tempValue").style.color = "orange";
        } else if (tempValue >= 16 && tempValue <= 22) {
            document.getElementById("tempValue").style.color = "yellow";
        } else if (tempValue >= 10 && tempValue <= 15) {
            document.getElementById("tempValue").style.color = "green";
        } else if (tempValue >= 1 && tempValue <= 9) {
            document.getElementById("tempValue").style.color = "teal";
        } else if (tempValue <= 0) {
            document.getElementById("tempValue").style.color = "blue";
        }
    }
};

const findLatitudeAndLongitude = (query) => {
    let latitude, longitude;
    axios.get("http://127.0.0.1:5000/location",
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
    axios.get("http://127.0.0.1:5000/weather",
        {
            params: {
                format: "json",
                lat: latitude,
                lon: longitude
            }
        })
        .then((response) => {
            const tempK = response.data.main.temp;
            console.log(tempType)
            let temp;
            if (tempType === "fahrenheit") {
                temp = Math.floor((tempK - 273.15) * 9 / 5 + 32);
            } else {
                temp = Math.floor((tempK - 273.15));
            }

            tempValue.textContent = temp;
            updateLandscape(temp);
            updateTextColor(temp);
            count = temp;

            const skyData = response.data.weather[0].main;
            UpdateSkySelect(skyData);
        })
        .catch((error) => {
            console.log(error)
            console.log("error in findLocation!");
        });
}

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

const UpdateSkySelect = (skyData) => {
    switch (skyData) {
        case "Clouds":
            document.getElementById("skySelect").value = "Cloudy";
            break;
        case "Rain":
            document.getElementById("skySelect").value = "Rainy";
            break;
        case "Snow":
            document.getElementById("skySelect").value = "Snowy";
            break;
        default:
            document.getElementById("skySelect").value = "Sunny";
            break;
    };
    updateSky();
}

const updateSky = () => {
    const skySelect = document.getElementById("skySelect").value;
    const sky = document.getElementById("sky");
    const gardenContent = document.getElementById("gardenContent");

    switch (skySelect) {
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
        default:
            sky.textContent = "☁️ ☁️ ☁️ ☀️ ☁️ ☁️";
            gardenContent.classList = "garden__content sunny";
            break;
    };
};

updateSky();

const setFahrenheit = () => {
    if (tempType === "celsius") {
        const currTemp = tempValue.textContent;
        const newTemp = Math.floor(currTemp * (9 / 5) + 32);
        tempValue.textContent = newTemp;
        count = newTemp;
    }
    tempType = "fahrenheit";
}
const setCelsius = () => {
    if (tempType === "fahrenheit") {
        const currTemp = tempValue.textContent;
        const newTemp = Math.floor((currTemp - 32) * 5 / 9);
        tempValue.textContent = newTemp;
        count = newTemp;
    }
    tempType = "celsius";
}

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
        findLatitudeAndLongitude(cityName)
    });

    cityNameInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const cityName = cityNameInput.value;
            findLatitudeAndLongitude(cityName);
        }
    });

    cityNameReset.addEventListener("click", () => {
        cityNameInput.value = defaultCity;
        headerCityName.textContent = defaultCity;
        changeCity()
    });

    const fButton = document.getElementById("fahrenheit");
    fButton.addEventListener("click", setFahrenheit);

    const cButton = document.getElementById("celsius");
    cButton.addEventListener("click", setCelsius);
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);
