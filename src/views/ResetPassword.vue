<template>
  <main class="main">
    <div class="login-wrapper">
      <h1>Obnova hesla</h1>
      <div style="display: flex; flex-direction: column">
        <form @submit.prevent="resetPassword">
          <input
            class="input"
            style="margin-right: 30px; width: 20rem"
            type="password"
            id="login-password"
            v-model="newPassword"
            placeholder="Nové heslo"/>
          <input
            class="input"
            style="margin-right: 30px; width: 20rem"
            type="password"
            id="login-password"
            v-model="confirmNewPassword"
            placeholder="Nové heslo pro kontrolu"/>
          <input type="submit" value="Pokračovat" />
        </form>
      </div>
      <div
        v-if="showMessage"
        style="margin-top: 15px; margin-left: 10px; color: red; font-size: 14px">
        {{ message }}
      </div>
    </div>
  </main>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import server from '../common/server';

export default {
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      message: '',
      showMessage: false,
    };
  },
  mounted() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      ) !== true
    ) {
      document.getElementById('login-password').focus();
    }
  },
  computed: {
    ...mapGetters(['email', 'password', 'user']),
  },
  methods: {
    isPasswordCorrect(input) {
      const pattern = /^[a-zA-Z0-9]+$/;
      if (input.length < 6) {
        this.message = 'Heslo musí obsahovat alespoň 6 znaků.';
        this.showMessage = true;
        return false;
      }
      if (!input.match(pattern)) {
        this.message = 'Heslo musí obsahovat jenom alfanumerické znaky.';
        this.showMessage = true;
        return false;
      }
      if (input.search(/[0-9]/) < 0) {
        this.message = 'Heslo musí obsahovat alespoň jedno číslo.';
        this.showMessage = true;
        return false;
      }
      if (input.search(/[a-zA-Z]/) < 0) {
        this.message = 'Heslo musí obsahovat alespoň jedno písmeno.';
        this.showMessage = true;
        return false;
      }

      return true;
    },

    async resetPassword() {
      try {
        if (this.newPassword !== this.confirmNewPassword) {
          this.message = 'Hesla se neshodují.';
          this.showMessage = true;
        } else if (this.isPasswordCorrect(this.newPassword)) {
          let response = await server.put(`/auth/${this.$route.query.token}/reset-password`, {
            newPassword: this.newPassword,
            confirmPassword: this.confirmNewPassword,
          });

          const { email, password } = response.data

          response = await server.post('/auth/login', {
						email,
						password: this.newPassword,
					});

          this.SET_USER(response.data)
          this.SET_AUTHENTICATED(true)
          this.showMessage = false;
          this.$router.push({ path: '/auth/reset-password/completed' });
        }
        this.oldPassword = '';
        this.newPassword = '';
        this.confirmNewPassword = '';
        
      } catch (error) {
        this.showMessage = true;
        this.message = 'Omlouváme se. Došlo k chybě v našem systému.';
      }
    },
    ...mapMutations([
      'SET_USER',
      'SET_PASSWORD',
      'SET_AUTHENTICATED',
      'SET_REDIRECT',
    ]),
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
  margin-bottom: 0.5rem;

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
