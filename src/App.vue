<template>
  <div id="app">
    <div class="m-top">
      <router-link class="m-link" v-for="nav in navs" :key="nav.path" :to="nav.path">{nav.name}</router-link>
    </div>
    <div class="m-content">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import UTopic from "./module/topic/views/UTopic.vue";
import { LIST_TYPE } from "./module/topic/store";
export default {
  name: 'App',
  components: {
    // UTopic
  },
  computed: {
    navs(){
      return [{
        name: "热门",
        path: LIST_TYPE.HOT
      },{
        name: "最新",
        path: LIST_TYPE.NEW
      },{
        name: "热榜",
        path: LIST_TYPE.TOP
      }]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.m-link {
  display: inline-block;
  color: #fff;
  height: 60px;
  line-height: 60px;
  font-size: 10px;
  padding: 0 20px;
}

.router-link-active {
  background: #00a6ff;
}
</style>
