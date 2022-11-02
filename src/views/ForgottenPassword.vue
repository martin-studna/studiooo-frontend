<template>
    <main class="main">
      <div   class="login-wrapper">
        <h1>Obnova hesla</h1>
          <input
            class="input"
            style="margin-right: 30px; width: 20rem"
            type="text"
            id="login-password"
            v-model="input"
            v-on:keyup.enter="evaluate"
            placeholder="E-mail"/>
          <button type="button" v-on:click="evaluate">Poslat</button>
        <div
          v-if="showMessage"
          style="
            margin-top: 15px;
            margin-left: 10px;
            color: red;
            font-size: 14px;
          ">
          {{ message }}
        </div>
      </div>
    </main>
</template>

<script>
import {mapMutations, mapGetters,} from 'vuex'
import server from '../common/server';

export default {
  data() {
    return {
      input: '',
      message: '',
      showMessage: false,
    };
  },
  mounted() {

     if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) !== true) {
      document.getElementById('login-password').focus()
     }
  },
  computed: {
		...mapGetters(["email", "password", "user"])
	},
  methods: {
    async evaluate() {

			 this.showMessage = false;
			const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
			if (this.input.match(pattern)) {

        try {
          await server.post('/auth/forgotten-password', {
            email: this.input
          })

          this.$router.push({path: '/auth/forgotten-password/confirmation'})

        } catch (error) {
          this.$router.push({path: '/auth/forgotten-password/error'})
        }


			} else {
				this.showMessage = true;
				this.message = 'Zadali jste e-mailovou adresu ve špatném formátu.';
			}
      this.input = '';
    },
    ...mapMutations(["SET_USER", "SET_PASSWORD", "SET_AUTHENTICATED", "SET_REDIRECT"])
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;

  flex-direction: row;
  align-items: center;
  height: 100vh;
}
.input {
  border: none;
  background: $color3;
  padding: 15px 14px;
  border-radius: 12px;
  font-size: 12px;
  width: 200px;
  margin-bottom: .5rem;

  color: #707070;

  &:focus {
    outline: none;
    color: black;
  }
}

@media (max-width: 768px) {
  .login-wrapper {
    width: 100%;
    margin: 0 1rem;
  }

  .main {
    width: 100%;
  }

  .input {
    width: 100%;
    margin-right: 0 !important;
  }

  button {
    margin-top: 1rem;
  }

}
</style>
