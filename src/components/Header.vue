<template>
  <header :class="{ header: true, open: openMenu }">
    <div class="header__content">
      <router-link :to="{ path: '/'}">
        <img src="../assets/studiooo-logo.svg" style="height: 20px" />
      </router-link>
      <div class="headerLinks">
        <router-link :to="{ path: '/workshops' }" >Naše kurzy</router-link>
        <router-link :to="{ path: '/contact'}" > Kontakt</router-link>
        <router-link :to="{path: '/faq'}" >FAQ</router-link>
      </div>
      <div v-if="authenticated" class="logout">
        <div class="user-image">
          <router-link :to="{path: '/user'}" >
            {{ initials }}
          </router-link>
        </div>
        <button class="logout__button" :onclick="logout">
          <div style="margin-right: 10px">Odhlásit se</div>
          <img src="../assets/logout-image.svg" style="margin-top: 2px" />
        </button>
      </div>
      <div v-else>
        <button
          class="headerLogin"
          @click="$router.push({ path: '/auth/login/email' })"
          type="button"
          style="
            background: transparent;
            color: black;
            border: 2px solid black;
            margin-right: 0.7rem;
          ">
          Přihlásit
        </button>
        <button
          class="headerLogin"
          @click="$router.push({ path: '/auth/register/email' })"
          type="button">
          Registrovat
        </button>
      </div>
    </div>
    <div :class="{ 'header__content-mobile': true, open: openMenu }">
      <div class="header-top">
        <router-link :to="{ path: '/'}" >
          <img src="../assets/studiooo-logo.svg" class="logo" />
        </router-link>
        <div class="hamburger" @click="open">
          <div :class="{ line: true, open: openMenu }"></div>
          <div :class="{ line: true, open: openMenu }"></div>
          <div :class="{ line: true, shorter: true, open: openMenu }"></div>
        </div>
      </div>
      <div :class="{ 'header-menu': true, open: openMenu }" v-if="openMenu">
        <a
          @click="
            open();
            $router.push({ path: '/' });
          "

          :class="{ link: true, open: openMenu }"
          data-aos="fade-right"
          data-aos-delay="400">
          Domů
        </a>
        <a

           @click="
            open();
            $router.push({ path: '/workshops' });
          "

          :class="{ link: true, open: openMenu }"
          data-aos="fade-right"
          data-aos-delay="450">
          Naše kurzy
        </a>
        <a
          @click="
            open();
            $router.push({ path: '/contact' });
          "

          :class="{ link: true, open: openMenu }"
          data-aos="fade-right"
          data-aos-delay="500">
          Kontakt
        </a>
        <a
          @click="
            open();
            $router.push({ path: '/faq' });
          "

          :class="{ link: true, open: openMenu }"
          data-aos="fade-right"
          data-aos-delay="550">
          FAQ
        </a>
        <div style="flex: 1"></div>
        <div style="display: flex; flex-direction: column" >

            <div
              key=1
              v-show="authenticated"
              class="logout animated fade-up-animation-buttons"
              style="justify-content: flex-start">
              <div class="user-image" style="width: 48px; height: 48px">
                <router-link :to="{ path: '/user'}"  style="font-size: 1.1em">
                  {{ initials }}
                </router-link>
              </div>
              <button class="logout__button" :onclick="logout">
                <div style="margin-right: 20px; font-size: 1.5em">
                  Odhlásit se
                </div>
                <img
                  src="../assets/logout-image.svg"
                  style="width: 30px; height: 30px"/>
              </button>
            </div>

            <div v-show="!authenticated" class="animated fade-up-animation-buttons">
              <button
                style="width: 100%; margin-bottom: 12px"
                @click="
                  open();
                  $router.push({ path: '/auth/register/email' });
                ">
                Registrovat
              </button>
              <button
                style="width: 100%; background: transparent; color: black"
                @click="
                  open();
                  $router.push({ path: '/auth/login/email' });
                ">
                Přihlásit se
              </button>
            </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-if="openMenu" :class="{ 'header-overlay': openMenu }"></div>
    </transition>
  </header>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import server from '../common/server';

export default {
  name: 'Header',
  data() {
    return {
      token: null,
      isLoggedIn: false,
      initials: '',
      openMenu: false,
    };
  },
  computed: {
    ...mapGetters(['authenticated', 'user']),
  },
  created() {
    if (!this.user) return

    const tokens = this.user.fullname.split(' ');

    this.initials = '';
    tokens.forEach((token) => {
      this.initials += token[0];
    });
  },
  methods: {
    ...mapMutations(['SET_AUTHENTICATED']),
    open() {
      this.openMenu = !this.openMenu;
      if (this.openMenu) document.body.style.overflowY = 'hidden';
      else document.body.style.overflowY = 'auto';
    },
    async logout() {
      try {
        await server.post('/auth/logout', {});
        this.SET_AUTHENTICATED(false);
        this.isLoggedIn = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(50px);
  opacity: 0;
}


.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s
}

.fade-enter,
.fade-leave-to {
    opacity: 0
}

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

  z-index: 10;

  &__content {
    flex: 1;
    display: flex;
    max-width: 1920px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: $home-layout-margin;
  }

  &Links {
    display: flex;
    justify-content: space-between;
    max-width: 393px;
    font-weight: 600;
    flex-grow: 1;
    margin: 0 1rem;
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

.user-image {
  border-radius: 100%;
  min-width: 40px;
  min-height: 40px;
  background: rgb(245, 116, 116);
  background: linear-gradient(
    90deg,
    rgba(245, 116, 116, 1) 0%,
    rgba(242, 22, 73, 1) 1%
  );

  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 0.03rem;
}

.logout {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  &__button {
    background: transparent;
    border: none;
    padding: 0;
    font-size: 16px;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 40px;
    margin-left: 14px;
  }
}



.header__content-mobile {
  display: none;
}

@media (max-width: 1024px) {
  .header__content {
    padding: 0 2.5rem;
  }

  .header__content-mobile {
    padding: 0 1.5rem;
  }
}

@media (max-width: 900px) {
  .headerLogin {
    /* width: 100px; */
  }
}

@media (max-width: 768px) {
  .header-menu {
    flex-direction: column;
    margin-top: 4rem;
    margin-left: 0.5rem;
    height: 82%;
    display: flex;

    .link {
      font-weight: 500;
      font-size: 1.8em;
      margin-top: 2rem;
      color: black;
    }
  }

  .header-top {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    width: 100%;
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
