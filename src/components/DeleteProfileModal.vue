<template>
	<div class="modal">
		<div :class="{overlay: true,'fade-in-animation': fadeToggle, 'fade-out-animation': !fadeToggle}" style="cursor: pointer" @click="disappear">
		</div>
		<div :class="{form: true, animated: true, 'fade-down-animation': fadeToggle, 'fade-up-animation': !fadeToggle}">
			<img src="../assets/delete_profile_logo.svg" alt="">
			<h2>Opravdu chcete smazat Váš účet?</h2>
			<div style="text-align: center; description; color: #808B9D;">
				Pokud si opravdu přejete smazat Váš účet, klikněte na Ano. Budeme rádi, když to s námi kdykoliv zkusíte znovu. :)
			</div>
			<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem">
				<button @click="deleteAccount" class="button">Ano</button>
				<button style="background: transparent; color: black" @click="disappear" class="button">Ne</button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import server from '../common/server';


export default {
  data() {
    return {
      fadeToggle: true,
    }
  },
	computed: {
		...mapGetters(["user"])
	},
	methods: {
		...mapMutations(['SET_VISIBLE_DELETE_PROFILE_MODAL', 'SET_AUTHENTICATED']),
		disappear() {
      this.fadeToggle = false
      setTimeout(() => {
        this.SET_VISIBLE_DELETE_PROFILE_MODAL(false)
        this.fadeToggle = true
      }, 300);
		},
		async deleteAccount() {
			try {
        await server.delete('/auth/unregister', {});
        this.SET_AUTHENTICATED(false)
        this.SET_VISIBLE_DELETE_PROFILE_MODAL(false)
        this.$router.push({path: "/"})

      } catch (error) {
        console.error(error);
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
	height: 3.5rem;
	min-width: 22.3rem !important;
}

.form {
	width: 33rem;

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
		padding: 2rem 2rem;

		h2 {
			text-align: center;
		}
	}

	.form-input {
		min-width: 10rem !important;
	}

	.button {
		width: 140px !important;
	}
}

</style>
