<template>
  <div class="container" v-if="!loading">
    <div class="weather-header text-center my-3">
      <div class="d-flex justify-content-center">
        <Icon :name="weatherIcon" scale="5" class="mt-4 mr-1"></Icon>
        <div class="weather-deg">{{ temp }}°C</div>
      </div>
      <div class="weather-status text-muted">{{ status }}</div>
      <div class="weather-city text-muted">{{ city }} | {{ payload.sys.country }}</div>
    </div>
    <div class="weather-utils d-flex justify-content-around mt-2">
      <div class="util-item">
        <Icon name="tint" scale="1.5" class="mr-2"></Icon>Humidity:
        <b>{{ humidity }} %</b>
      </div>
      <div class="util-item">
        <Icon name="wind" scale="1.5" class="mr-2"></Icon>Wind:
        <b>{{ wind }} m/s</b>
      </div>
      <div class="util-item">
        <Icon name="cloud" scale="1.5" class="mr-2"></Icon>Cloud
        <b>{{ clouds }} %</b>
      </div>
    </div>

    <weather-chart :city="this.city"></weather-chart>
  </div>
</template>

<script>
import Axios from "axios";
import WeatherChart from "./WeatherChart";
import Icon from "vue-awesome/components/Icon";

export default {
  components: { "weather-chart": WeatherChart, Icon },
  data: () => ({
    loading: true,
    city: "Gaziantep",
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
    }
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
      Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&APPID=dec442fc0b5e406209e27c81d738a110&units=metric`
      )
        .then(res => {
          this.payload = res.data;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
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

body {
  background-color: #e4e4e4;
}

b {
  font-weight: 400;
}

.container {
  max-width: 560px;
  max-height: 660px;
  .weather-header {
    .weather-status {
      font-size: 24px;
      text-transform: capitalize;
    }
    .weather-city {
      text-transform: capitalize;
    }
    .weather-deg {
      font-size: 75px;
    }
  }
}
</style>