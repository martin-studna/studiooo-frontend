<template>
  <header :class="{ header: true, open: openMenu }">
    <div :class="{ 'header__content-mobile': true, open: openMenu }">
      <div class="header-top">
        <div class="hamburger" @click="open">
          <div :class="{ line: true, open: openMenu }"></div>
          <div :class="{ line: true, open: openMenu }"></div>
          <div :class="{ line: true, shorter: true, open: openMenu }"></div>
        </div>
        <a @click="$router.push({ path: '/'})"  >
          <img src="../assets/studiooo-logo.svg" class="logo" />
        </a>
      </div>
      <div :class="{ 'header-menu': true, open: openMenu }" v-if="openMenu">
        <div

          style="
            display: flex;
            flex-direction: column;
            height: 100%;
            margin-left: 1rem;
          ">
          <a @click="open();$router.push({ path: '/user'})" class="menu__tab" data-aos="fade-right" data-aos-delay="450">
            <svg
              style="margin-right: 30px; width:25px; height: 25px"
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
              class="link"
              :style="
                $route.fullPath === '/user'
                  ? 'color: black !important'
                  : 'color: #808B9D !important'
              ">
              Přehled
            </div>
          </a>
          <a @click="open(); $router.push({ path: '/user/workshops'})" class="menu__tab" data-aos="fade-right" data-aos-delay="500">
            <svg
              style="margin-right: 30px; width:25px; height: 25px"
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
              class="link"
              :style="
                $route.fullPath.includes('/user/workshops')
                  ? 'color: black'
                  : 'color: #808B9D'
              ">
              Kurzy
            </div>
          </a>
          <a class="menu__tab" @click="open(); $router.push({ path: '/user/certificates'})" data-aos="fade-right" data-aos-delay="550">
            <svg
              style="margin-right: 30px; width:25px; height: 25px"
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
              class="link"
              :style="
                $route.fullPath.includes('/user/certificates')
                  ? 'color: black'
                  : 'color: #808B9D'
              ">
              Certifikáty
            </div>
          </a>
          <a @click="open();$router.push({ path: '/user/profile'})" class="menu__tab" data-aos="fade-right" data-aos-delay="600">
            <svg
              style="margin-right: 30px; width:25px; height: 25px"
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
              class="link"
              :style="
                $route.fullPath === '/user/profile'
                  ? 'color: black'
                  : 'color: #808B9D'
              ">
              Můj profil
            </div>
          </a>
          <div style="flex: 1"></div>
          <div
            style="display: flex; flex-direction: column"
            data-aos="fade-up"
            data-aos-delay="600">
            <router-link :to="{ path: '/'}" class="menu__tab"  style="cursor:pointer">
              <img
                src="../assets/www_logo.svg"
                alt=""
                style="margin-right: 30px; width:25px; height: 25px;"/>
              <div
                class="link" style="color: #808B9D">
                Zpět na web
              </div>
            </router-link>
            <a class="menu__tab" @click="logout" style="cursor: pointer">
              <img
                src="../assets/logout-logo-user.svg"
                alt=""
                style="margin-right: 30px; width:25px; height: 25px"/>
              <div
                class="link" style="color: #808B9D">
                Odhlásit se
              </div>
            </a>
          </div>
        </div>
      </div>
      <transition name="fade">
        <div v-if="openMenu" :class="{ 'header-overlay': openMenu }"></div>
      </transition>
    </div>
  </header>
</template>

<script>
import {mapMutations} from 'vuex'
import server from '../common/server';

export default {
  data() {
    return {
      token: null,
      isLoggedIn: false,
      initials: '',
      openMenu: false,
    };
  },
  computed: {},
  created() {},
  methods: {
    ...mapMutations(["SET_AUTHENTICATED"]),
    open() {
      this.openMenu = !this.openMenu;
      if (this.openMenu) document.body.style.overflowY = 'hidden';
      else document.body.style.overflowY = 'auto';
    },
    async logout() {
      try {
        await server.post('/auth/logout', {});
        this.SET_AUTHENTICATED(false)
        this.isLoggedIn = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

.menu__tab {
  margin-bottom: 1.2rem;
}

.link {
  font-size: 10px;
}

.header {
  display: none;
}

.header__content-mobile {
  display: none;
}

@media (max-width: 1024px) {
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: $header-footer-height;
    background-color: $color1;
    padding: $home-layout-margin;
    z-index: 10000;
    padding: 0 2rem;

    &__content {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
    }

    &Links {
      display: flex;
      justify-content: space-between;
      width: 393px;
      font-weight: bold;
    }

    &Login {
      background-color: black;
      color: white;
      font-weight: bold;
      border: none;
      font-family: 'Roboto Slab';
      border-radius: 12px;
      width: 144px;
      height: 40px;
    }
  }

  .header-menu {
    flex-direction: column;
    margin-top: 4rem;
    margin-left: 0.5rem;
    height: 82%;
    display: flex;
    z-index: 1000;

    .link {
      font-weight: 500;
      font-size: 1.3em;
    }
  }

  .header-top {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    width: 100%;
    z-index: 1000;
  }

  .logo {
    height: 25px;
  }

  .header {
    box-shadow: #09204611 0px 7px 20px 9px;
    height: 6rem;
  }

  .header-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #f0f4faf8;
    z-index: 8;
  }

  .header.open {
    height: 100%;
    display: flex;
    align-items: flex-start;
    background: transparent;
  }

  .header__content {
    display: none;
  }

  .header__content-mobile {
    display: flex;
    flex-direction: column;
    width: 100%;
    z-index: 100;

    .hamburger {
      display: flex;
      flex-direction: column;
      cursor: pointer;

      .line {
        background: black;
        width: 2.1rem;
        height: 4px;
        border-radius: 2.5px;
        margin: 4px 0;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: 0.35s ease-in-out;
        -moz-transition: 0.35s ease-in-out;
        -o-transition: 0.35s ease-in-out;
        transition: 0.35s ease-in-out;
      }
      .shorter {
        width: 60%;
        align-self: flex-end;
      }

      .shorter.open {
        width: 100%;
      }

      .line.open:nth-child(1) {
        -webkit-transform: translateY(13.5px) rotate(135deg);
        -moz-transform: translateY(13.5px) rotate(135deg);
        -o-transform: translateY(13.5px) rotate(135deg);
        transform: translateY(13.5px) rotate(135deg);
      }

      .line.open:nth-child(2) {
        opacity: 0;
        transform: translateX(-20px);
      }

      .line.open:nth-child(3) {
        -webkit-transform: translateY(-10px) rotate(-135deg);
        -moz-transform: translateY(-10px) rotate(-135deg);
        -o-transform: translateY(-10px) rotate(-135deg);
        transform: translateY(-10px) rotate(-135deg);
      }
    }
  }

  .header__content-mobile.open {
    display: flex;
    margin-top: 1.5rem;
    width: 100%;
    height: 95%;
  }
}
</style>
