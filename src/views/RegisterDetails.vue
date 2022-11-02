<template>
  <div style="max-height: 100%">
    <main class="main">
      <div class="form">
        <h1 >Super, dokončete registraci zadáním vašeho jména.</h1>
				<div style="display: flex; flex-direction: column">
          <form  @submit.prevent="evaluate">
          <input
            class="input"
            style="margin-right: 30px; margin-bottom: 20px; width: 20rem"
            id="register-title"
            type="text"
            autocomplete="on"
            v-model="inputTitle"
            placeholder="Uveďte váš vysokoškolský titul"/>
          <input
            class="input"
            style="margin-right: 30px; margin-bottom: 20px; width: 20rem"
            type="text"
            autocomplete="on"
            v-model="inputFirstname"
            placeholder="Uveďte vaše křestní jméno"/>
          <input
            class="input"
            style="margin-right: 30px; margin-bottom: 20px; width: 20rem"
            type="text"
            autocomplete="on"
            v-model="inputLastname"
            placeholder="Uveďte vaše příjmení"/>
          <Select
            style="margin-bottom:2rem; height: 3.5rem !important; width: 20rem"
            placeholder="Pohlaví"
            autocomplete="on"
            :values="[
              '',
              'Muž',
              'Žena',
              'Jiné'
            ]"
            v-model:value="inputGender"/>

          <input
            type="submit"
            style="margin-bottom: 20px"
            value="Pokračovat"/>
          </form>
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
import {mapGetters, mapMutations} from 'vuex'
import server from '../common/server';
import Select from '../components/Select.vue'

export default {
  components: {Select},
  data() {
    return {
      placeholder: 'E-mail',
      inputTitle: '',
      inputFirstname: '',
      inputLastname: '',
      inputGender: '',
      inputType: 'text',
      message: '',
      showMessage: false,
      fullnameStage: false,
    };
  },
  mounted() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) !== true) {
      document.getElementById('register-title').focus()
    }
  },
  computed: {
    ...mapGetters(["email", 'password'])
  },
  methods: {
    ...mapMutations(['SET_USER']),
    checkInputs() {
      if (this.inputFirstname.length === 0) {
        this.message = "Nezadali jste Vaše křestní jméno."
        this.showMessage = true
        return false
      }
      if (this.inputLastname.length === 0) {
        this.message = "Nezadali jste Vaše příjmení."
        this.showMessage = true
        return false
      }
      if (this.inputGender.length === 0) {
        this.message = "Nezadali jste Vaše pohlaví."
        this.showMessage = true
        return false
      }

      return true
    },
    async evaluate() {
      this.showMessage = false;

      if (this.checkInputs()) {
        try {
          let gender = ''
          switch (this.inputGender) {
            case '':
              gender = 'UNKNOWN'
              break;
            case 'Muž':
              gender = 'MALE'
              break;
            case 'Žena':
              gender = 'FEMALE'
              break;
            default:
              break;
          }

          const user = {
            title: this.inputTitle,
            email: this.email,
            password: this.password,
            fullname: `${this.inputFirstname} ${this.inputLastname}`,
            gender
          }

          const response = await server.post(`/auth/register`, user)

          this.SET_USER(response.data)



        } catch (error) {
          console.error(error);
        }


        this.$router.push({ path: "/auth/register/confirmation" });
      }


      this.inputGender = '';
      this.inputTitle = '';
      this.inputFirstname = '';
      this.inputLastname = '';
      this.inputLastname = '';
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
