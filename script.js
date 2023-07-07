function updatePieChart(weatherData) {
  const pieChart = Highcharts.chart("pieChartContainer", {
    chart: {
      type: "pie",
    },
    title: {
      text: "Weather Distribution",
    },
    series: [
      {
        name: "Weather",
        data: [
          {
            name: "Clear",
            y: weatherData.weather[0].main === "Clear" ? 1 : 0,
          },
          {
            name: "Clouds",
            y: weatherData.weather[0].main === "Clouds" ? 1 : 0,
          },
          {
            name: "Rain",
            y: weatherData.weather[0].main === "Rain" ? 1 : 0,
          },
        ],
      },
    ],
  });
}

function updateLineGraph(weatherData) {
  const lineGraph = Highcharts.chart("lineGraphContainer", {
    chart: {
      type: "line",
    },
    title: {
      text: "Temperature Variation",
    },
    xAxis: {
      categories: ["Today", "Tomorrow", "Day after tomorrow"],
    },
    yAxis: {
      title: {
        text: "Temperature (°C)",
      },
    },
    series: [
      {
        name: "Temperature",
        data: [
          weatherData.main.temp,
          weatherData.main.temp + 1,
          weatherData.main.temp + 2,
        ],
      },
    ],
  });
}

function updateBarChart(weatherData) {
  const barChart = Highcharts.chart("barChartContainer", {
    chart: {
      type: "bar",
    },
    title: {
      text: "Humidity",
    },
    xAxis: {
      categories: ["Today"],
    },
    yAxis: {
      title: {
        text: "Humidity (%)",
      },
    },
    series: [
      {
        name: "Humidity",
        data: [weatherData.main.humidity],
      },
    ],
  });
}

async function fetchWeatherData(city) {
  const apiKey = "52774d2ed2dd3f3ede6edc770db87ea9";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

async function fetchAndUpdateCharts() {
  const cityInput = document.getElementById("cityInput");
  const city = cityInput.value;

  const weatherData = await fetchWeatherData(city);
  if (weatherData) {
    updatePieChart(weatherData);
    updateLineGraph(weatherData);
    updateBarChart(weatherData);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", fetchAndUpdateCharts);
});
