<template>
	<div :class="{modal: true}">
		<div :class="{overlay: true, 'fade-in-animation': fadeToggle, 'fade-out-animation': !fadeToggle}" @click="disappear" style="cursor: pointer">
		</div>
		<div  :class="{form: true, animated: true, 'fade-down-animation': fadeToggle, 'fade-up-animation': !fadeToggle}">
			<h2>Změna heslo</h2>
			<Input placeholder="Staré heslo" type="password" v-model:value="oldPassword" class="form-input" id="old-password"  />
			<Input placeholder="Nové heslo" type="password" v-model:value="newPassword" class="form-input"  />
			<Input placeholder="Nové heslo pro kontrolu" type="password" v-model:value="confirmNewPassword" class="form-input"  />
			<div style="color: red">{{errorMessage}}</div>
			<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem">
				<button @click="changePassword"  class="button">Uložit</button>
				<button style="background: transparent; color: black" @click="disappear" class="button">Zrušit</button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import server from '../common/server'
import Input from './Input.vue'

export default {
	components: { Input },
	name: "ChangePasswordModal",
	computed: {
		...mapGetters(["user","visibleChangePasswordModal"])
	},
	mounted () {
			const oldPassword = document.getElementById('old-password')
			if (oldPassword)
				oldPassword.focus()
	},
	data () {
		return {
			fadeToggle: true,
			oldPassword: '',
			newPassword: '',
			confirmNewPassword: '',
			message: '',
			showMessage: false,
			errorMessage: ''
		}
	},
	methods: {
		...mapMutations(['SET_VISIBLE_CHANGE_PASSWORD_MODAL','SET_VISIBLE_STATUS_MODAL', 'SET_VISIBLE_SUCCESS','SET_VISIBLE_ERROR_MESSAGE_MODAL', 'SET_SUCCESS_MESSAGE', 'SET_SUCCESS_TITLE']),
		disappear() {
			this.fadeToggle = false
			setTimeout(() => {
				this.SET_VISIBLE_CHANGE_PASSWORD_MODAL(false)
				this.fadeToggle = true
				this.errorMessage = ''
			},300)
		},
		isPasswordCorrect(input) {
			const pattern = /^[a-zA-Z0-9]+$/;
        if (input.length < 6) {
          this.message = 'Heslo musí obsahovat alespoň 6 znaků.';
          this.showMessage = true;
					return false
        }
				if (!input.match(pattern)) {
          this.message = 'Heslo musí obsahovat jenom alfanumerické znaky.';
          this.showMessage = true;
					return false
        }
				if (input.search(/[0-9]/) < 0) {
          this.message = 'Heslo musí obsahovat alespoň jedno číslo.';
          this.showMessage = true;
					return false
        }
				if (input.search(/[a-zA-Z]/) < 0) {
          this.message = 'Heslo musí obsahovat alespoň jedno písmeno.';
          this.showMessage = true;
					return false
        }


				return true
		},
		async changePassword() {
			try {
				if (this.newPassword !== this.confirmNewPassword) {
          this.message = 'Hesla se neshodují.';
          this.showMessage = true;
        }
        else if (this.newPassword === this.oldPassword) {
          this.message = "Zadal jste stejné heslo"
          this.showMessage = true
        }
				else if (this.isPasswordCorrect(this.newPassword)) {
					await server.put(`/users/${this.user.id}/change-password`, {
						oldPassword: this.oldPassword,
						newPassword: this.newPassword,
						confirmPassword: this.confirmNewPassword
					})

					this.SET_VISIBLE_CHANGE_PASSWORD_MODAL(false)
					this.SET_VISIBLE_STATUS_MODAL(true)
					this.SET_VISIBLE_SUCCESS(true)
					this.SET_SUCCESS_TITLE("Heslo úspěšně změněno!")
				}
				this.oldPassword = ''
				this.newPassword = ''
				this.confirmNewPassword = ''
				this.errorMessage = ''

			} catch (error) {
				if (error.response.status === 400)
					this.errorMessage = "Toto není Vaše staré heslo."
				else if (error.response.status === 500)
					this.errorMessage = "Omlouváme se. Došlo k chybě v našem systému."

			}
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
	height: 3.7rem;
	min-width: 22.3rem !important;
}

.form {

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



@media (max-width: 550px) {
	.form {
		width: 90%;
	}

	.form-input {
		min-width: 10rem !important;
	}

	.button {
		width: 140px !important;
	}
}



</style>
