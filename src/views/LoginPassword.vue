<template>
    <main class="main">
      <div   class="login-wrapper">
        <h1>Přihlášení</h1>
          <form @submit.prevent="evaluate" >
            <input
              class="input"
              style="margin-right: 30px; width: 20rem"
              type="password"
              id="login-password"
              v-model="input"
              autocomplete="on"
              placeholder="Heslo"/>
            <input type="submit" value="Pokračovat"/>
          </form>
        <div style="margin-top: 6px; margin-left: 10px; font-size: 14px">
          <a href="/auth/forgotten-password" style="text-decoration: underline">Zapomněli jste heslo?</a>
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
import {mapMutations, mapGetters,mapActions} from 'vuex'
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
		...mapGetters(["email", "password", "redirectToWorkshop", "currentWorkshop", "user"])
	},
  methods: {
    ...mapActions(["getWorkshopResult", "setChapterResults"]),
    async evaluate() {
      this.showMessage = false;


				this.SET_PASSWORD(this.input)
				try {
					const response = await server.post('/auth/login', {
						email: this.email,
						password: this.password,
					});

          let user = response.data

          if (response.data.firstLogin) {
            const update = await server.put(`/users/${user.id}`, {
              firstLogin: false
            })
            user = update.data
          }

					this.SET_USER(user)

          this.SET_AUTHENTICATED(true)
          if (this.redirectToWorkshop) {

             await this.setChapterResults({
                userId: this.user.id,
                workshopId: this.currentWorkshop.workshop.id,
              });
              await this.getWorkshopResult({
                userId: this.user.id,
                workshopId: this.currentWorkshop.workshop.id,
              });

            this.$router.push({
              path: `/user/workshops/${this.currentWorkshop.workshop.id}`,
              params: { workshopid: this.currentWorkshop.workshop.id },
            });
          }
          else {
            this.$router.push({ path: "/user" });
          }
          this.SET_REDIRECT(false)
				} catch (error) {
					console.error(error.response);
					this.showMessage = true;
          if (error.response.data.message === 'The account is not activated')
            this.message = 'Účet nebyl aktivován'
          else
					  this.message = 'Zadali jste špatné heslo';
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
