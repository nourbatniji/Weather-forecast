const apiKey = "e6ce68e9272f40b7bf7161618241512";

async function getWeather() {
    let location = document.getElementById("locationInput").value || "auto:ip";
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`;
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        displayWeather(data);
    }
}
getWeather()

function displayWeather(data) {
    const { location, current, forecast } = data;

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = daysOfWeek[currentDate.getDay()];
    const tomorrow = daysOfWeek[(currentDate.getDay() + 1) % 7];
    const dayAfterTomorrow = daysOfWeek[(currentDate.getDay() + 2) % 7];

    const tomorrowWeather = forecast.forecastday[1];
    const dayAfterTomorrowWeather = forecast.forecastday[2];

    const tomorrowTemp = tomorrowWeather.day.avgtemp_c;
    const tomorrowNightTemp = tomorrowWeather.day.mintemp_c;;
    const tomorrowCondition = tomorrowWeather.day.condition.text;
    const tomorrowIcon = tomorrowWeather.day.condition.icon;

    const dayAfterTomorrowTemp = dayAfterTomorrowWeather.day.avgtemp_c;
    const dayAfterTomorrowNightTemp = dayAfterTomorrowWeather.day.mintemp_c;;
    const dayAfterTomorrowCondition = dayAfterTomorrowWeather.day.condition.text;
    const dayAfterTomorrowIcon = dayAfterTomorrowWeather.day.condition.icon;

    const temp = `
        <div class="content col-lg-4 px-0 rounded-start-3 ">
                    <div class="heading  d-flex align-items-center justify-content-between">
                        <div class="day">
                            <p class="mb-0">${today}</p>
                        </div>
                        <div class="date">
                            <p class="mb-0">${formattedDate}</p>
                        </div>
                    </div>
                    <div class="contentt">
                        <h3 class="mb-0">${location.name}</h3>
                        <div class="number">${current.temp_c}<sup>o</sup>C
                            <img src="https:${current.condition.icon}" alt="">
                        </div>
                        <p class="desc">${current.condition.text}</p>
                        <div class="info d-flex ">
                            <div class="d-flex align-items-baseline justify-content-center me-3">
                                <i class="fa-solid fa-umbrella fa-rotate-by me-2" style="--fa-rotate-angle: 45deg;"></i>
                                <p class="mb-0">20%</p>
                            </div>
                            <div class="d-flex align-items-baseline justify-content-center me-3"> <i
                                    class="fa-solid fa-wind  me-2"></i>
                                <p class="mb-0">18km/h</p>
                            </div>
                            <div class="d-flex align-items-baseline justify-content-center me-3"> <i
                                    class="fa-regular fa-compass  me-2"></i>
                                <p class="mb-0">East</p>
                            </div>
                        </div>
                    </div>
                </div>
                    <div class="content center col-lg-4 px-0  ">
                        <div class="heading text-center">
                            <p class="mb-0">${tomorrow}</p>
                        </div>
                        <div class="contentt d-flex justify-content-center align-items-center flex-column">
                            <img src="https:${tomorrowIcon}" class="my-4" alt="">
                            <div class="number day">${tomorrowTemp}<sup>o</sup>C</div>
                            <div class="number night">${tomorrowNightTemp}<sup>o</sup>C</div>
                            <p class="desc">${tomorrowCondition}</p>
                        </div>
                    </div>
                 <div class="content last  col-lg-4 px-0 rounded-end-3 ">
                    <div class="heading text-center">
                        <p class="mb-0">${dayAfterTomorrow}</p>
                    </div>
                    <div class="contentt d-flex justify-content-center align-items-center flex-column">
                        <img src="https:${dayAfterTomorrowIcon}"  class="my-4" alt="">
                        <div class="number day">${dayAfterTomorrowTemp}<sup>o</sup>C</div>
                        <div class="number night">${dayAfterTomorrowNightTemp}<sup>o</sup>C</div>
                        <p class="desc">${dayAfterTomorrowCondition}</p>
                    </div>
                </div>
    `;

    document.getElementById("myRow").innerHTML = temp;
}

