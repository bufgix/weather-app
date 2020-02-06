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

<style>
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  background-color: #e4e4e4;
}

::-webkit-scrollbar {
  width: 5px;
  background-color: #e4e4e4;
}

::-webkit-scrollbar-thumb {
  border-radius: 3px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #212529;
}
</style>
