<template>
    <main class="main">
        <router-view v-slot="{ Component }" >
          <transition name="slide-fade" mode="out-in" >
            <component :is="Component" :key="$route.path"/>
          </transition>
        </router-view>

      <img class="auth__image" src="../assets/register__logo.svg" />
    </main>
</template>

<script>

export default {
	name: "AuthenticationLayout",
  data() {
    return {
      email: '',
      password: '',
      placeholder: 'E-mail',
      input: '',
      inputType: 'text',
      message: 'fwepkfwepof',
      showMessage: false,
    };
  },
  mounted() {},
  computed: {},

};
</script>

<style lang="scss" scoped>

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

.main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  width: 100%;
}
.input {
  border: none;
  background: $color3;
  padding: 15px 14px;
  border-radius: 12px;
  font-size: 12px;
  width: 200px;

  color: #707070;

  &:focus {
    outline: none;
    color: black;
  }
}


@media (max-width: 1024px) {

  .main {
    width: 100% !important;
  }

  .auth__image {
    display: none;
  }
}
</style>
