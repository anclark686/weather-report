const decreaseButton = document.getElementById("decreaseTempControl");
const increaseButton = document.getElementById("increaseTempControl");
const tempValue = document.getElementById("tempValue");
const landscape = document.getElementById("landscape");

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
    if (tempValue > 80) {
        document.getElementById("tempValue").style.color = "red";
    } else if (tempValue >= 70 && tempValue <= 79) {
        document.getElementById("tempValue").style.color = "orange";
    } else if (tempValue >= 60 && tempValue <= 69) {
        document.getElementById("tempValue").style.color = "yellow";
    } else if (tempValue >= 50 && tempValue <= 59) {
        document.getElementById("tempValue").style.color = "green";
    } else if (tempValue <= 49) {
        document.getElementById("tempValue").style.color = "teal";
    }
};

let count = 72;
updateLandscape(count);
updateTextColor(count);


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
