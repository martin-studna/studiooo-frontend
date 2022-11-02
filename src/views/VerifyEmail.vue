<template>
  <div style="max-height: 100%">
    <main class="main">
      <div class="form" data-aos="fade-left" data-aos-delay="200">
        <h1 style="font-size: 2.3em; margin-left: 2rem" v-if="message === 'ok'">Váš učet je aktivován!</h1>
        <h1 style="font-size: 2.3em; margin-left: 2rem" v-else>Je nám líto. Někde nestala chyba. Zkuste to prosím znovu.</h1>
        <div style="margin-bottom: 1rem"></div>
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
  mounted() {
    this.message = this.$route.query.message
  },
  data() {
    return {
      message: ''
    }
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
  max-width: 35vw;
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
    margin: 0 2rem;
  }
}

@media (max-width: 425px) {
  .input {
    width: 100%;
  }
}
</style>
