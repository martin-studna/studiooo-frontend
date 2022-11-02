<template>
	<div class="modal">
		<div class="overlay">
		</div>
		<div class="form">
			<img src="../assets/profile_logo.svg" alt="">
			<h2>Pomozte nám doplnit Váš profil</h2>
			<Input placeholder="Studuji na" v-model:value="school" class="form-input"  />
			<Input placeholder="Obor" v-model:value="field" class="form-input"  />
			<Input placeholder="Pracuji jako" v-model:value="job" class="form-input"  />
			<Input placeholder="Instituce" v-model:value="institution" class="form-input" />
			<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem">
				<button style="background: transparent; color: black" @click="disappear">Přeskočit</button>
				<button @click="updateProfile">Uložit</button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Input from './Input.vue'

export default {
	components: { Input },
	computed: {
		...mapGetters(["user"])
	},
  data() {
    return {
      school: '',
      field: '',
      job: '',
      institution: ''
    }
  },
  mounted() {

  },
	methods: {
		...mapActions(["updateUser"]),
    updateProfile() {

      this.updateUser({id: this.user.id, updates: {
        employment: this.job,
        field: this.field,
        institution: this.institution,
        school: this.school,
        formShown: true
      }})
			this.$emit('disappear-additional-info-modal')
    },
		disappear() {
			this.$emit('disappear-additional-info-modal')
      this.updateUser({id: this.user.id, updates: {
				formShown: true
			}})
		}
	}
}
</script>

<style lang="scss" scoped>
.overlay {
	position: fixed;
	width: 100%;
	height: 100%;
	background: #2C2C2C;
	filter: blur(6px);
	opacity: 0.45;
	z-index: 9;
}

.modal {
	position: fixed;
	width: 100%;
	min-height: 100%;
	z-index: 10;

	display: flex;
	justify-content: center;
	align-items: center;
}

.form-input {
	margin-bottom: 1rem;
	height: 3.5rem;
	min-width: 22.3rem !important;
}

.form {
	width: 33rem;
	min-height: 30rem;
	border-radius: 24px;
	background: #F0F4FA;
	z-index: 100;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 2rem 4rem;

	h2 {
		font-size: 1.4em;
	}

	img {
		width: 3rem;
		height: 3rem;
	}

}

.overlay {
	position:fixed;
	width: 100%;
	min-height: 100vh;

}



</style>
