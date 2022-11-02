<template>
  <div style="max-height: 100%">
    <main class="main">
      <div class="form">
        <h1 >Zadejte své heslo</h1>
        <div  style="margin-bottom: 20px; color: #808b9d">
          Zkuste s malými i velkými písmeny a číslicí. Znalci mohou přidat i nějaký ten znak. :)
        </div>
        <form  @submit.prevent="evaluate">
          <input
            class="input"
            id="register-password"
            style="margin-right: 30px; margin-bottom: 20px; width: 20rem"
            type="password"
            v-model="input"
            autocomplete="on"
            placeholder="Heslo"/>
          <input
            class="input"
            id="register-confirm-password"
            style="margin-right: 30px; margin-bottom: 20px; width: 20rem"
            type="password"
            v-model="confirmInput"
            placeholder="Heslo ještě jednou"/>
          <input
            type="submit"
            style="margin-bottom: 20px" value="Pokračovat" />



        </form>
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
import {mapGetters, mapMutations} from 'vuex'

export default {
  data() {
    return {
      input: '',
      confirmInput: '',
      message: '',
      showMessage: false,
      fullnameStage: false,
    };
  },
  mounted() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) !== true) {
      document.getElementById('register-password').focus()
    }
  },
  computed: {
		...mapGetters(["email", "password"])
	},
  methods: {
		...mapMutations(["SET_PASSWORD"]),
    evaluate() {
      this.showMessage = false;

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

        } else if (this.input !== this.confirmInput) {
          this.message = 'Hesla se neshodují.';
          this.showMessage = true;
        }
        else {
					this.SET_PASSWORD(this.input)
          this.$router.push({path: "/auth/register/details"})
        }
      	this.input = '';
        this.confirmInput = '';
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
