<template>
  <status-modal style="z-index: 10000" v-if="visibleStatusModal"/>
  <div class="container">
    <Header />
    <div class="wrapper">
      <router-view v-slot="{ Component, route }" appear >
          <transition :name="route.meta.transition || 'slide-fade'" mode="out-in" >
            <component :is="Component"  />
          </transition>
      </router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
// import axios from 'axios';
import {mapGetters} from 'vuex'
import Footer from '../components/Footer.vue';
import Header from '../components/Header.vue';
import StatusModal from '../components/StatusModal.vue';
// @ is an alias to /src

export default {
  name: 'Home',
  components: { Footer, Header, StatusModal },
  data() {
    return {
      circImage1: '',
      circImage2: '',
      circImage3: '',
    };
  },
  computed: {
    ...mapGetters(["visibleStatusModal"])
  }
  // async created() {},
};
</script>

<style lang="scss">

.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(50px);
  opacity: 0;
}


.container {
  display: flex;
  flex-direction: column;

  align-items: center;
  min-height: 100vh;
  margin: $home-layout-margin;
}

.wrapper {
  width: 100%;
  flex: 1;
  display: flex;

}

@media (max-width: 1024px) {


  .container {

    margin: 0 1rem;
  }
}

@media (max-width: 768px) {
  .container {
    margin: 0;
  }
}

@media (max-width: 425px) {
  .container {

    margin: 0 0rem;
  }
}
</style>
