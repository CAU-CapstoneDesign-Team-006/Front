<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon"
    >
      <template slot="links">


        <sidebar-item :link="{name: '지도보기', icon: 'ni ni-pin-3 text-orange', path: '/maps'}"/>

        <sidebar-item :link="{name: '혜택게시판', icon: 'ni ni-bullet-list-67 text-yellow', path: '/tables'}"/>

        <sidebar-item :link="{name : '소통게시판', icon: 'ni ni-chat-round text-blue', path :'/communication'}"/>

        <sidebar-item :link="{name : '정보게시판', icon: 'ni ni-chat-round text-blue', path :'/infocommunication'}"/>
        
        <sidebar-item :link="{name: 'HOT HOT HOT !!!', icon: 'ni ni-favourite-28 text-red', path : '/hotBoard'}"/>

        <div v-if="this.$store.state.type == 0">
          <sidebar-item
            :link="{
              name: 'Dashboard',
              icon: 'ni ni-tv-2 text-primary',
              path: '/dashboard'
            }"
          />
        </div>
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'vue', //vue|blue|orange|green|red|primary
        isg: 'y'
      };
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    },
    created(){
      
    }
  };
</script>
<style lang="scss">
</style>
