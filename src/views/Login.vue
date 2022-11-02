<template>
  <div style="max-height: 100%">

    <main class="main" >
      <div style="max-width: 500px" >
        <h1>Přihlášení</h1>
          <input
            class="input"
            style="margin-right: 30px"
            :type="inputType"
            v-model="input"
            v-on:keyup.enter="evaluate"
            :placeholder="placeholder"/>
          <button type="button" v-on:click="evaluate">Pokračovat</button>
        <div style="margin-top: 6px; margin-left: 10px; font-size: 14px">
          <a href="/register" style="text-decoration: underline">Nemáte ještě účet?</a>
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
import {mapMutations} from 'vuex'
import server from '../common/server';

export default {
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
  methods: {
    async evaluate() {
      this.showMessage = false;
      if (this.placeholder === 'E-mail') {
        const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (this.input.match(pattern)) {
          this.placeholder = 'Heslo';
          this.email = this.input;
          this.showMessage = false;
          this.inputType = 'password';
        } else {
          this.showMessage = true;
          this.message = 'Zadali jste e-mailovou adresu ve špatném formátu.';
        }
      } else if (this.placeholder === 'Heslo') {
        const pattern = /^[a-zA-Z0-9]+$/;
        if (this.input.length < 6) {
          this.message = 'Heslo musí obsahovat alespoň 6 znaků.';
          this.showMessage = true;
        } else if (!this.input.match(pattern)) {
          this.message = 'Heslo musí obsahovat jenom alfanumerické znaky.';
          this.showMessage = true;
        } else if (this.input.search(/[0-9]/) < 0) {
          this.message = 'Heslo musí obsahovat alespoň jedno číslo.';
          this.showMessage = true;
        } else if (this.input.search(/[a-zA-Z]/) < 0) {
          this.message = 'Heslo musí obsahovat alespoň jedno písmeno.';
          this.showMessage = true;
        } else {
          this.password = this.input;
          try {
            const response = await server.post('/auth/login', {
              email: this.email,
              password: this.password,
            });

            this.SET_USER(response.data)

            this.$router.push({ path: "/user" });
          } catch (error) {
            console.error(error);
            this.showMessage = true;
            this.message = 'Zadali jste špatné heslo';
          }
        }
      }

      this.input = '';
    },
    ...mapMutations(["SET_USER"])
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
</style>
