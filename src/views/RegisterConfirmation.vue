<template>
  <div style="max-height: 100%">
    <main class="main">
      <div class="form">
        <h1 style="font-size: 2.7em">Už to skoro je!</h1>
        <div style="margin-bottom: 1rem">Aktivujte si svůj Studiooo. účet kliknutím na odkaz v e-mailu, který jsme právě zaslali na adresu <span style="font-weight: 600">{{email}}</span> </div>
        <div>Nedostali jste e-mail? Mrkněte do složky se spamem nebo si ho nechte poslat znovu.</div>
        <div>
          <router-link :to="{ path: '/auth/send-email' }" style="text-decoration: underline !important">Poslat znovu</router-link>

        </div>
      </div>
    </main>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'


export default {
  computed: {
    ...mapGetters(["email"])
  },
  methods: {

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
