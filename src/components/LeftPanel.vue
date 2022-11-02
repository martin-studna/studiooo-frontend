<template>
  <div>

  </div>
  <div class="left-panel">
    <div class="left-panel__header">
      <router-link :to="{ path: '/' }" >
        <img
          src="../assets/studiooo-logo.svg"
          alt="left-panel-logo"
          style="width: 120px; height: 120px"/>
      </router-link>
    </div>
    <div class="left-panel__menu">
      <router-link :to="{ path: '/user'}" class="menu__tab" >
        <svg
              style="margin-right: 30px;"
              xmlns="http://www.w3.org/2000/svg"
              width="20.999"
              height="21"
              viewBox="0 0 20.999 21">
              <g
                id="Component_26_1"
                data-name="Component 26 – 1"
                transform="translate(0.5 0.5)">
                <path
                  id="Union_2"
                  data-name="Union 2"
                  d="M-3734.715-5394v-10.286H-3725v8.572a1.714,1.714,0,0,1-1.715,1.713Zm-8.57,0a1.714,1.714,0,0,1-1.715-1.713v-8.572h7.428V-5394Zm-1.715-13.143V-5411a3,3,0,0,1,3-3h14a3,3,0,0,1,3,3v3.857Z"
                  transform="translate(3745 5414)"
                  :fill="$route.fullPath === '/user' ? 'black' : '#808B9D'"
                  stroke="rgba(0,0,0,0)"
                  stroke-miterlimit="10"
                  stroke-width="1"/>
              </g>
            </svg>
        <div
          :style="
            $route.fullPath === '/user' ? 'color: black' : 'color: inherit'
          ">
          Přehled
        </div>
      </router-link>
      <router-link :to="{ path: '/user/workshops'}" class="menu__tab" >
       <svg
              style="margin-right: 30px;"
              id="Component_27_1"
              data-name="Component 27 – 1"
              xmlns="http://www.w3.org/2000/svg"
              width="19.529"
              height="22"
              viewBox="0 0 19.529 22">
              <path
                id="Path_1322"
                data-name="Path 1322"
                d="M-1615.484,2714.04l-2.787-6.084a8.476,8.476,0,0,0-8.185-6.032,8.389,8.389,0,0,0-8.506,8.25,8.1,8.1,0,0,0,1.943,5.25,3.452,3.452,0,0,1,.892,2.2v4.237a.694.694,0,0,0,.593.678l8.506,1.375a.663.663,0,0,0,.116.01.721.721,0,0,0,.458-.164.672.672,0,0,0,.251-.524v-2.627l2.606.417a1.433,1.433,0,0,0,1.146-.308,1.347,1.347,0,0,0,.5-1.046v-4.824H-1616A.571.571,0,0,0-1615.484,2714.04Zm-11.291-4.376c-1.636,1.227-2.454,3.682-4.377,3.286-1.109-.229-1.211-2.59-1.227-2.857a5.448,5.448,0,0,1,1.481-3.949,6.079,6.079,0,0,1,2.463-1.592,5.82,5.82,0,0,1,2.172-.277c1.884.125,4.268,1.251,4.251,2.362C-1622.027,2707.62-1625.6,2708.779-1626.775,2709.664Z"
                transform="translate(1634.961 -2701.924)"
                :fill="
                  $route.fullPath.includes('/user/workshops')
                    ? 'black'
                    : '#808B9D'
                "/>
            </svg>
        <div
          :style="
            $route.fullPath.includes('/user/workshops')
              ? 'color: black'
              : 'color: inherit'
          ">
          Kurzy
        </div>
      </router-link>
      <router-link :to="{path: '/user/certificates'}" class="menu__tab" >
        <svg
              style="margin-right: 30px;"
              xmlns="http://www.w3.org/2000/svg"
              width="20.356"
              height="25.207"
              viewBox="0 0 20.356 25.207">
              <g
                id="Group_4860"
                data-name="Group 4860"
                transform="translate(58.882 -2767.988)">
                <path
                  id="Path_1531"
                  data-name="Path 1531"
                  d="M-57.87,2781.142a4.055,4.055,0,0,1,1.7,2.95,2.378,2.378,0,0,0,2.579,2.165,4.055,4.055,0,0,1,3.2,1.165,2.387,2.387,0,0,0,3.367,0,4.042,4.042,0,0,1,3.2-1.166,2.378,2.378,0,0,0,2.582-2.165,4.056,4.056,0,0,1,1.7-2.95,2.392,2.392,0,0,0,.584-3.318,4.059,4.059,0,0,1-.591-3.355,2.388,2.388,0,0,0-1.683-2.917,4.059,4.059,0,0,1-2.609-2.19A2.392,2.392,0,0,0-47,2768.209a4.054,4.054,0,0,1-3.373.013,2.392,2.392,0,0,0-3.2,1.138,4.059,4.059,0,0,1-2.608,2.19,2.385,2.385,0,0,0-1.764,2.305c0,.611.214.791.214,1.65a4.048,4.048,0,0,1-.725,2.317h0A2.393,2.393,0,0,0-57.87,2781.142Zm9.165-9.492a6.4,6.4,0,0,1,6.4,6.4,6.4,6.4,0,0,1-6.4,6.4,6.4,6.4,0,0,1-6.4-6.4A6.4,6.4,0,0,1-48.7,2771.65Z"
                  transform="translate(0)"
                  :fill="
                    $route.fullPath.includes('/user/certificates')
                      ? 'black'
                      : '#808B9D'
                  "/>
                <circle
                  id="Ellipse_35"
                  data-name="Ellipse 35"
                  cx="4.732"
                  cy="4.732"
                  r="4.732"
                  transform="translate(-53.433 2773.333)"
                  :fill="
                    $route.fullPath.includes('/user/certificates')
                      ? 'black'
                      : '#808B9D'
                  "/>
                <path
                  id="Path_1532"
                  data-name="Path 1532"
                  d="M157.88,3101.559a4.6,4.6,0,0,0-3.639,1.327,2.747,2.747,0,0,1-.242.213l1.874,4.263,2.5-2.5,3.532-.151-1.773-4.034A2.705,2.705,0,0,1,157.88,3101.559Z"
                  transform="translate(-201.03 -314.169)"
                  :fill="
                    $route.fullPath.includes('/user/certificates')
                      ? 'black'
                      : '#808B9D'
                  "/>
                <path
                  id="Path_1533"
                  data-name="Path 1533"
                  d="M-40.828,3102.618a4.616,4.616,0,0,0-3.643-1.326,2.706,2.706,0,0,1-2.261-.9l-1.78,4.05,3.532.151,2.5,2.5,1.879-4.276A2.769,2.769,0,0,1-40.828,3102.618Z"
                  transform="translate(-9.793 -313.901)"
                  :fill="
                    $route.fullPath.includes('/user/certificates')
                      ? 'black'
                      : '#808B9D'
                  "/>
              </g>
            </svg>
        <div
          :style="
            $route.fullPath.includes('/user/certificates')
              ? 'color: black'
              : 'color: inherit'
          ">
          Certifikáty
        </div>
      </router-link>
      <router-link :to="{ path: '/user/profile'}" class="menu__tab" >
       <svg
              style="margin-right: 30px;"
              id="Component_28_1"
              data-name="Component 28 – 1"
              xmlns="http://www.w3.org/2000/svg"
              width="20.367"
              height="20"
              viewBox="0 0 20.367 20">
              <circle
                id="Ellipse_19"
                data-name="Ellipse 19"
                cx="5.405"
                cy="5.405"
                r="5.405"
                transform="translate(4.777)"
                :fill="$route.fullPath === '/user/profile'
                  ? 'black'
                  : '#808B9D'"/>
              <path
                id="Path_1317"
                data-name="Path 1317"
                d="M-1621,2669.506a6.949,6.949,0,0,0-8.13-4.164,7.052,7.052,0,0,1-1.5.162,7.053,7.053,0,0,1-1.5-.162,6.949,6.949,0,0,0-8.13,4.164,10.159,10.159,0,0,0-.538,2.128,1.261,1.261,0,0,0,1.246,1.437h17.86a1.252,1.252,0,0,0,1.237-1.426A10.185,10.185,0,0,0-1621,2669.506Z"
                transform="translate(1640.82 -2653.071)"
                :fill="$route.fullPath === '/user/profile'
                  ? 'black'
                  : '#808B9D'"/>
            </svg>
        <div
          :style="
            $route.fullPath === '/user/profile'
              ? 'color: black'
              : 'color: inherit'
          ">
          Můj profil
        </div>
      </router-link>
      <div style="flex: 1"></div>

        <router-link :to="{ path: '/'}" class="menu__tab" >
          <img
            src="../assets/www_logo.svg"
            alt="logout"
            style="margin-right: 30px"/>
          <div style="margin-bottom: 2.5px">Zpět na web</div>
        </router-link>
        <a class="menu__tab" style="margin-bottom: 2rem; cursor: pointer" @click="logout">
          <img
            src="../assets/logout-logo-user.svg"
            alt="logout"
            style="margin-right: 30px"/>
          <div style="margin-bottom: 2.5px">Odhlásit se</div>
        </a>

    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import server from '../common/server';

export default {
  name: 'LeftPanel',
  methods: {
    ...mapMutations(["SET_AUTHENTICATED"]),
    async logout() {
      try {
        await server.post('/auth/logout', {});
        this.SET_AUTHENTICATED(false)
        this.$router.push({path: "/"})
      } catch (error) {
        console.error(error);
      }
    },
  }
};
</script>

<style lang="scss">
.left-panel {
  width: 300px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-weight: 500;

  &__header {
    position: fixed;
    padding: 0 72px;
    height: 150px;
    display: flex;
    justify-content: center;
  }

  &__menu {
    position: fixed;
    top: 8rem;
    height: 80%;
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 0 72px;
    margin-top: 20px;
    color: $color2 !important;
  }

  &__footer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
  }
}

.menu__tab {
  display: flex;
  flex-direction: row;
  height: 50px;

  align-items: center;
  margin-bottom: 10px;
}

.logout-button {
  display: flex;

  align-items: center;
  flex-direction: row;
  background: transparent;
  border: none;
  color: $color2 !important;
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 2rem;
}

@media (max-width: 1024px) {
  .left-panel {
    display: none;
  }
}
</style>
