<script>
import Axios from "axios";
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: ["city"],
  data: () => ({
    payload: {}
  }),
  computed: {
    labels: function(){
      return this.payload.list.map(wet => this.getDisplayTime(wet.dt_txt))
    },
    data: function(){
      console.log(this.payload.list.map(wet => Math.floor(wet.temp)))
      return this.payload.list.map(wet => Math.floor(wet.main.temp))
    }
  },
  methods: {
    init: function() {
      Axios.get(
        `https://api.openweathermap.org/data/2.5/forecast/?q=${this.city}&mode=json&APPID=dec442fc0b5e406209e27c81d738a110&units=metric&cnt=7`
      )
        .then(res => {
          console.log(res.data);
          this.payload = res.data;
          this.render();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDisplayTime: function(datestr) {
      const date = new Date(datestr);
      return `${date.getHours()}:00`;
    },
    render() {
      this.renderChart(
        {
          //labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          labels: this.labels,
          datasets: [
            {
              label: "",
              data: this.data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
              ],
              borderWidth: 1
            }
          ]
        },
        {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: false
                }
              }
            ]
          }
        }
      );
    }
  },

  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
</style>