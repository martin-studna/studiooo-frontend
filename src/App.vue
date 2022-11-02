<template>
  <router-view />
</template>

<script>
import AOS from 'aos'
import 'aos/dist/aos.css'
import {mapMutations} from 'vuex'
import server from './common/server';


export default {
  name: 'App',
  created () {
    AOS.init({ once: true, duration: 1000, showInSequence: true });
    this.checkLoggedIn()

  },
  methods: {
    async checkLoggedIn() {
      try {
        await server.get('/auth/me');
        this.SET_AUTHENTICATED(true)
      } catch (error) {
        console.log("not logged in");
        this.SET_AUTHENTICATED(false)
      }
    },
    ...mapMutations(["SET_AUTHENTICATED"])
  }
};
</script>

<style lang="scss">
.description {
  color: $color2;
  line-height: 26px;
  font-weight: 300;
}

.circ {
  border-color: 0;
  border-radius: 50%;
  width: 100px;
  height: 100px;
}

#app {
  width: 100%;

}
</style>
