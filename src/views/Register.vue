<template>
  <div style="max-height: 100%">
    <main class="main">
      <div style="max-width: 500px">
        <h1 v-if="!fullnameStage">Vytvořte si účet</h1>
        <h1 v-else>Super, dokončete registraci Jaké je Vaše jméno?</h1>
        <div v-if="!fullnameStage" style="margin-bottom: 20px; color: #808b9d">
          Vytvořte si jednoduše ve třech krocích váš účet a začněte s našimi výukovými kurzy ještě dnes!
        </div>
          <input
            class="input"
            style="margin-right: 30px; margin-bottom: 20px"
            :type="inputType"
            v-model="input"
            :placeholder="placeholder"/>
          <button
            type="button"
            style="margin-bottom: 20px"
            v-on:click="evaluate">
            Pokračovat
          </button>
        <div style="font-size: 10px; color: #808b9d">
          Budete-li pokračovat, vyjadřujete svůj souhlas s našimi
          <a style="text-decoration: underline" href="/contract">smluvními podmínkami a zásadami.</a>
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

export default {
  data() {
    return {
      email: '',
      password: '',
      placeholder: 'E-mail',
      input: '',
      inputType: 'text',
      message: '',
      showMessage: false,
      fullnameStage: false,
    };
  },
  mounted() {},
  computed: {},
  methods: {
    evaluate() {
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
          this.fullnameStage = true;
          this.placeholder = 'Jméno a příjmení';
        }
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
</style>
