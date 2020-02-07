<template>
  <div class="container" v-if="loaded">
    <div class="weather-header text-center my-3">
      <div class="d-flex justify-content-center">
        <Icon :name="weatherIcon" scale="5" class="mt-4 mr-1"></Icon>
        <div class="weather-deg">{{ temp }}°C</div>
      </div>
      <div class="weather-status text-muted">{{ status }}</div>
      <div class="weather-city text-muted d-flex justify-content-center">
        <p>{{ city }} | {{ payload.sys.country }}</p>
        <Icon name="pen" scale="1.2" class="ml-2 mt-1" @click="this.changeLocation"></Icon>
      </div>
    </div>
    <div class="weather-utils d-flex justify-content-around mt-2">
      <div class="util-item">
        <Icon name="tint" scale="1.5" class="mr-2"></Icon>Humidity
        <b>{{ humidity }} %</b>
      </div>
      <div class="util-item">
        <Icon name="wind" scale="1.5" class="mr-2"></Icon>Wind
        <b>{{ wind }} m/s</b>
      </div>
      <div class="util-item">
        <Icon name="cloud" scale="1.5" class="mr-2"></Icon>Cloud
        <b>{{ clouds }} %</b>
      </div>
    </div>

    <weather-chart v-if="this.chartloaded" :payload="this.chartPayload"></weather-chart>
  </div>
</template>

<script>
import Axios from "axios";
import WeatherChart from "./WeatherChart";
import Icon from "vue-awesome/components/Icon";
import Swal from "sweetalert2/src/sweetalert2.js";
import { ipcRenderer } from "electron";

export default {
  components: { "weather-chart": WeatherChart, Icon },
  data: () => ({
    loaded: false,
    chartloaded: false,
    city: "",
    payload: {},
    weatherIconMap: {
      Thunderstorm: "cloud-showers-heavy",
      Drizzle: "cloud-rain",
      Rain: "cloud-rain",
      Snow: "snowflake",
      Clear: "sun",
      Clouds: "cloud",
      Other: "smog"
      // Others are  must be fog
    },
    chartPayload: {}
  }),
  computed: {
    temp: function() {
      return Math.floor(this.payload.main.temp);
    },
    humidity: function() {
      return this.payload.main.humidity;
    },
    wind: function() {
      return this.payload.wind.speed;
    },
    status: function() {
      return this.payload.weather[0].description;
    },
    clouds: function() {
      return this.payload.clouds.all;
    },
    weatherIcon: function() {
      const type = this.payload.weather[0].main;
      if (this.weatherIconMap.hasOwnProperty(type)) {
        return this.weatherIconMap[type];
      }
      return this.weatherIconMap.Other;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      ipcRenderer.send("loadCity");
      ipcRenderer.on("loadCity", (event, data) => {
        if (data) {
          this.city = data;
          this.updateWeather();
        } else {
          this.getInitalCity()
            .then(res => {
              this.city = res.data.city;
              this.updateWeather();
            })
            .catch(err => {
              console.log(err);
              Swal.fire({
                title: "Error",
                icon: "error",
                text: `Error: ${err}`
              });
            });
        }
      });
    },
    updateWeather() {
      this.getCurrentData();
      this.getChartData();
    },

    async getInitalCity() {
      const res = await Axios.get("http://ip-api.com/json/", {});

      return res;
    },
    getCurrentData() {
      Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&APPID=dec442fc0b5e406209e27c81d738a110&units=metric`
      )
        .then(res => {
          this.payload = res.data;
          this.loaded = true;
        })
        .catch(err => {
          this.loaded = false;
          console.log(err);
        });
    },
    getChartData: function() {
      Axios.get(
        `https://api.openweathermap.org/data/2.5/forecast/?q=${this.city}&mode=json&APPID=dec442fc0b5e406209e27c81d738a110&units=metric&cnt=7`
      )
        .then(res => {
          this.chartPayload = res.data;
          this.chartloaded = true;
        })
        .catch(err => {
          this.loaded = false;
          console.log(err);
        });
    },
    async checkCity(city) {
      const res = await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&callback=test&APPID=dec442fc0b5e406209e27c81d738a110`
      );
      return res;
    },
    async changeLocation() {
      Swal.fire({
        title: "Type your location",
        input: "text"
      }).then(({ value }) => {
        if (!(typeof value === "undefined")) {
          this.checkCity(value)
            .then(res => {
              this.city = value;
              this.updateWeather();
              ipcRenderer.send("saveCity", this.city);
            })
            .catch(err => {
              Swal.fire({
                title: "Error",
                icon: "error",
                text: "Location not found"
              });
            });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  font-family: "Work Sans", sans-serif;
  font-weight: 300;
}

b {
  font-weight: 400;
  font-size: 18px;
  color: #ff4d0d;
}

.container {
  max-width: 570px;
  max-height: 700px;
  .weather-header {
    .weather-status {
      font-size: 26px;
      text-transform: capitalize;
    }
    .weather-city {
      font-size: 18px;
      text-transform: capitalize;

      svg {
        opacity: 0.1;
        transition: 0.2s;
        &:hover {
          opacity: 1;
        }
      }
    }
    .weather-deg {
      font-size: 75px;
    }
  }
}
</style>