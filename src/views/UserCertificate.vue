
<template>
  <div>
    <div class="heading" >
    <h1 style="margin-top: 3.5rem">{{currentCertificate.title}}</h1>
    </div>
    <div style="display: flex; justify-content: center; align-items: center; margin-top: 1.5rem">
      <div style="position: relative">
        <img src="../assets/certificate.png" alt="">
        <h3 style="position: absolute; top:34%; left: 36.5%; font-size: 2.4em;font-weight: 600">{{currentCertificate.userFullname}}</h3>
        <h3 style="position: absolute; top:49%; left: 28%; font-size: 2.2em;font-weight: 600">{{currentCertificate.title}}</h3>
        <div style="position: absolute; bottom:6%; left: 5%; font-size: 1em;font-weight: 600">Vystaveno ke dni: ...</div>
        <div style="position: absolute; bottom:6%; left: 30%; font-size: 1em;font-weight: 600">ID {{currentCertificate.id}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserCertificate',
  computed: {
    ...mapGetters(['currentCertificate'])
  }
}
</script>

<style>

</style>
