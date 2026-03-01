const form = document.getElementById("form1");
const loc = document.getElementById("location");
const lat = document.getElementById("lat");
const lon = document.getElementById("lon");
const error = document.getElementById("error");
const temp = document.getElementById("temp");
const submitBtn = document.getElementById("submit-btn");
const btnText = document.getElementById("btn-text");
const btnSpinner = document.getElementById("btn-spinner");
const weatherIcon = document.getElementById("weather-icon");
const dataContainer = document.getElementById('dataContainer');
const errorContainer = document.getElementById('errorContainer')

form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  btnText.innerText = "Searching...";
  btnSpinner.classList.remove("hidden");
  dataContainer.classList.add('hidden');
  errorContainer.classList.add('hidden')
  weatherForecast();
  form.reset();
});

let weatherForecast = async () => {
  try {
    const address = document.getElementById("countryInput").value;
    const res = await fetch(`/weather?address=${address}`);
    const data = await res.json();
    console.log(data)
    if (data.error) {
      error.innerText = data.error;
      loc.innerText = "";
      lat.innerText = "";
      lon.innerText = "";
      temp.innerText = "";
      errorContainer.classList.remove('hidden');
    } else {
      error.innerText = '';
      loc.innerText = data.address;
      lat.innerText = data.forecast.latitude;
      lon.innerText = data.forecast.longitude;
      temp.innerText = data.forecast.temperature;
      weatherIcon.src = "https:" + data.forecast.weatherStateIcon;
      weatherIcon.classList.remove("hidden");
      dataContainer.classList.remove('hidden');
    }
  } catch (e) {
    console.log(e);
  }finally{
    submitBtn.disabled = false;
    btnText.innerText = "Get Weather";
    btnSpinner.classList.add("hidden");
  }
};