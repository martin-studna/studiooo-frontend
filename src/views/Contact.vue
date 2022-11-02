<template>
  <div class="contact" style="max-height: 100%">
    <div  class="contact__content">
      <div class="left">
        <h1>Kontaktujte nás</h1>
      </div>
      <div class="right">
        <div style="display: flex; flex-direction: row">
          <Input
            placeholder="Jméno"
            v-model:value="firstname"
            style="margin-right: 1rem; width: 50% !important"/>
          <Input
            placeholder="Příjmení"
            v-model:value="lastname"
            style="width: 50% !important"/>
        </div>
        <Input
          placeholder="Předmět"
          v-model:value="subject"
          style="width: 100%; margin: 1rem 0"/>
        <Input
          placeholder="E-mail"
          v-model:value="email"
          style="width: 100%; margin: 1rem 0"/>
        <div class="form-text-wrapper">
          <div class="placeholder">Vaše zpráva</div>
          <textarea class="form-text" v-model="message"></textarea>
        </div>
        <div v-if="showErrorMessage" style="margin-top: 1rem; margin-left: .5rem; font-weight: 400; color: red">{{errorMessage}}</div>
        <button style="margin-top: 1rem" @click="sendEmail">Odeslat</button>
      </div>
    </div>
  </div>
</template>

<script>
import emailjs from 'emailjs-com';
import {mapMutations} from 'vuex'
import Input from '../components/Input.vue';

export default {
  components: { Input },
  data() {
    return {
      firstname: '',
      lastname: '',
      subject: '',
      email: '',
      message: '',
      showErrorMessage: false,
      errorMessage: '',
    };
  },
  methods: {
    ...mapMutations(["SET_VISIBLE_STATUS_MODAL", "SET_VISIBLE_SUCCESS", "SET_SUCCESS_TITLE"]),
    validateInputs() {
      const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (this.firstname === '') {
        this.showErrorMessage = true
        this.errorMessage = 'Nezadali jste Vaše křestní jméno.'
        return false
      }
      if (this.lastname === '') {
        this.showErrorMessage = true
        this.errorMessage = 'Nezadali jste Vaše příjmení.'
        return false
      }
      if (this.subject === '') {
        this.showErrorMessage = true
        this.errorMessage = 'Nezadali jste předmět Vaší zprávy.'
        return false
      }
      if (this.email === '') {
        this.showErrorMessage = true
        this.errorMessage = 'Nezadali jste Váš e-mail.'
        return false
      }
      if (this.message === '') {
        this.showErrorMessage = true
        this.errorMessage = 'Vaše zpráva je prázdná.'
        return false
      }
      if (!this.email.match(pattern)) {
        this.showErrorMessage = true
        this.errorMessage = 'Zadali jste e-mail ve špatném formátu.'
        return false
      }

      return true
    },
    sendEmail() {
      const templateParams = {
        name: `${this.firstname} ${this.lastname}`,
        subject: this.subject,
        email: this.email,
        message: this.message,
      };

      if (this.validateInputs()) {
        this.SET_VISIBLE_STATUS_MODAL(true)
        emailjs.send('service_g7r1kyc', 'template_aw2j2n5', templateParams).then(
          () => {
            this.firstname = ''
            this.lastname = ''
            this.email = ''
            this.message = ''
            this.subject = ''
            this.showErrorMessage = false
            this.SET_VISIBLE_SUCCESS(true)
            this.SET_SUCCESS_TITLE("E-mail byl úspěšně odeslán.")
          },
          () => {
            this.errorMessage = 'Je nám líto. Někde nastala chyba.'
            this.showErrorMessage = true
          },
        );
      }


    },
  },
};
</script>

<style lang="scss" scoped>
.form-text-wrapper {
  background: $color3;
  border-radius: 14px;
  padding: 10px 20px;
}

.form-text {
  text-decoration: none;
  border: none;
  background: transparent;

  width: 100%;
  height: 20rem;
  flex: 0 1;
  font-size: 16px;
  margin-top: 3px;
  outline: none;
  padding: 0;
  resize: none;
}

.form-text:focus {
  outline: none;
}

.placeholder {
  font-size: 10px;
  color: #707070;
}

.right {
  padding: 5rem 5rem;
}

.contact {
  display: flex;
  flex: 1;
  width: 100%;
  margin-bottom: 3rem;

  &__content {
    width: 100%;
    margin-top: 6rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .left {
    display: flex;
    justify-content: center;

    h1 {
      margin-top: 16rem;
      font-size: 2.6em;
      font-weight: 500;
    }
  }
}

@media (max-width: 1024px) {
  .contact {
    margin: 0 1.5rem;
  }

  .right {
    padding: 2rem 2.5rem;
  }
}

@media (max-width: 768px) {
  .contact {
    .left {
      h1 {
        margin-top: 4rem;
      }
    }
  }

  .contact__content {
    grid-template-columns: 1fr;
  }

  .right {
    padding: 2rem 2.5rem;
  }
}

@media (max-width: 425px) {
  .right {
    padding: 2rem 0rem;
    margin-bottom: 3rem;
  }
}
</style>
