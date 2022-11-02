<template>
  <div class="user-dashboard__content">
    <div class="heading">
      <h1>Certifikáty</h1>
    </div>

      <div v-for="c in certificates" :key="c" style="display: flex; justify-content: space-between; align-items: center">
        <h2>{{c.title}}</h2>
        <button @click="goToCertificate(c)">Zobrazit</button>
      </div>
      <div v-if="certificates.length === 0" style="display: flex; align-items: center;  height: 100%; margin-top: 10rem; flex-direction: column">
        <h2 style="text-align: center; margin-bottom: 0.4rem">Zatím nemáte žádné certifikáty</h2>

        <div style="color: #808b9d">Pro získání certifikátu prosím projděte jedním z našich kurzů :)</div>
        <button style="margin-top: 1rem" @click="$router.push({path: '/user/workshops'})">Naše kurzy</button>
      </div>

  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  name: 'UserCertificates',
  created() {
    this.getCertificates({ userId: this.user.id })
  },
  methods: {
    ...mapActions(['getCertificates']),
    ...mapMutations(['SET_CURRENT_CERTIFICATE']),
    goToCertificate(c) {
      this.SET_CURRENT_CERTIFICATE(c)
      this.$router.push({path: `/user/certificates/${c.id}`})
    },
  },
  computed: {
    ...mapGetters(['certificates', 'user'])
  }
}

</script>

<style lang="scss" scoped>
.heading {
  width: 100%;
  display: flex;
  align-items: center;
  height: 140px;
}
@media (max-width: 1024px) {
  h1 {
    margin-top: 9rem !important;
  }
}

</style>
