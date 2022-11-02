<template>
    <main class="main">
      <div class="input-wrapper">
        <h1>Přihlášení</h1>
          <form @submit.prevent="evaluate" autocomplete="on">
            <input
              class="input"
              style="margin-right: 30px; width: 20rem"
              type="text"
              id="login-email"
              autocomplete="on"
              v-model="input"
              placeholder="E-mail"/>
            <input type="submit" value="Pokračovat"/>
          </form>
        <div style="margin-top: 6px; margin-left: 10px; font-size: 14px">
          <router-link :to="{ path: '/auth/register/email'}" style="text-decoration: underline">Nemáte ještě účet?</router-link>
        </div>
        <div style="margin-top: 6px; margin-left: 10px; font-size: 14px">
          <router-link :to="{ path: '/auth/send-email'}" style="text-decoration: underline">Aktivovat účet</router-link>
        </div>
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
import {mapMutations} from 'vuex'
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
      document.getElementById('login-email').focus()
    }

  },
  computed: {
	},
  methods: {
    async evaluate() {
      this.showMessage = false;
			const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
			if (this.input.match(pattern)) {
        try {
          const response = await server.get(`/users/email/${this.input}`)
          if (!response.data) {
            this.showMessage = true;
            this.message = 'Je nám líto. Žádný účet není veden pod touto e-mailovou adresou.';
          }
          else {
            this.showMessage = false;
            this.SET_EMAIL(this.input)
            this.$router.push({path: '/auth/login/password'})
          }
        } catch (error) {
          console.error(error);
        }
			} else {
				this.showMessage = true;
				this.message = 'Zadali jste e-mailovou adresu ve špatném formátu.';
			}
      this.input = '';
    },
    ...mapMutations(["SET_USER","SET_EMAIL"])
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100vh;
  width: 100% !important;
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

@media (max-width: 1024px) {
  .input-wrapper {

    margin: 0 1rem;
  }

}

@media (max-width: 768px) {

  .input-wrapper {
    width: 100%;
    margin: 0 1rem;
  }

  .main {
    width: 100% !important;
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
