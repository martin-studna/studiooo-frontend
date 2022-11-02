<template>
  <div style="max-height: 100%">
    <main class="main">
      <div  class="form">
        <h1 >Vytvořte si účet</h1>
        <div style="margin-bottom: 20px; color: #808b9d">
          Vytvořte si jednoduše ve třech krocích váš účet a začněte s našimi výukovými kurzy ještě dnes!
        </div>
          <form @submit.prevent="evaluate" >
            <input
              class="input"
              id="register-email"
              style="margin-right: 30px; margin-bottom: 20px; width: 20rem"
              type="text"
              autocomplete="off"
              v-model="input"
              placeholder="Zadejte svůj e-mail"/>
            <input
              type="submit"
              style="margin-bottom: 20px" value="Pokračovat">
          </form>
        <div style="font-size: 10px; color: #808b9d">
          Budete-li pokračovat, vyjadřujete svůj souhlas s našimi
          <router-link :to="{ path: '/contract'}" style="text-decoration: underline">smluvními podmínkami a zásadami.</router-link>
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
  </div>
</template>

<script>
import {mapMutations} from 'vuex';
import server from '../common/server';

export default {


  data() {
    return {
      email: '',
      password: '',
      input: '',
      message: '',
      showMessage: false,
      fullnameStage: false,
    };
  },
  mounted() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) !== true) {
      document.getElementById('register-email').focus()
    }
  },
  computed: {},
  methods: {
		...mapMutations(["SET_EMAIL"]),
    async evaluate() {
      this.showMessage = false;

        // match email by regex pattern
        const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (this.input.match(pattern)) {
          try {
            // ask server whether or not an user with this email already exists
            const response  = await server.get(`/users/email/${this.input}`)
            if (response.data) {
              this.showMessage = true;
              this.message = 'Uživatel s tímto emailem již existuje.';
              return
            }
          } catch (error) {
            console.error(error);
          }


					this.SET_EMAIL(this.input)
          this.showMessage = false;
					this.$router.push({ path: '/auth/register/password' })
        } else {
          this.showMessage = true;
          this.message = 'Zadali jste e-mailovou adresu ve špatném formátu.';
        }
      this.input = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: space-around;
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

  color: #707070;

  &:focus {
    outline: none;
    color: black;
  }
}

@media (max-width: 768px) {
  .form {
    margin: 0 1rem;
  }
}

@media (max-width: 425px) {
  .input {
    width: 100%;
  }
}
</style>
