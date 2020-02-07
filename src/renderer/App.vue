<template>
  <div id="app">
    <main-screen></main-screen>
  </div>
</template>

<script>
import MainScreen from "./components/MainScreen";
import "bootstrap/dist/css/bootstrap.min.css";


export default {
  name: "mercode-weather",
  components: {
    MainScreen
  }
};
</script>

<style lang="scss">
@import '~@sweetalert2/themes/dark/dark.scss';
body {
  
  background-color: #212121;
  color: #f5f5f5;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  background-color: #212121;
}

::-webkit-scrollbar {
  width: 5px;
  background-color: #212121;
}

::-webkit-scrollbar-thumb {
  border-radius: 3px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #ff4d0d;
}
</style>
