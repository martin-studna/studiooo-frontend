<template>
	<div class="modal">
		<div class="overlay" style="cursor: pointer" @click="disappear">
		</div>
		<div class="form animated fade-down-animation">
      <img v-if="!visibleSuccess" src="../assets/loading-spinner.gif" style="width: 100px; height: 100px">
			<img v-if="visibleSuccess" src="../assets/success-logo-modal.svg" alt="">
			<h2 v-if="visibleSuccess">{{successTitle}}</h2>
			<div style="text-align: center; description; color: #808B9D;" v-if="visibleSuccess">
				{{successMessage}}
			</div>
				<button style="" @click="disappear" class="button" v-if="visibleSuccess">Ok</button>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'


export default {
	computed: {
		...mapGetters(["successTitle", "successMessage", "visibleSuccess"])
	},
	methods: {
		...mapMutations(['SET_VISIBLE_STATUS_MODAL','SET_VISIBLE_SUCCESS']),
		disappear() {
			this.SET_VISIBLE_STATUS_MODAL(false)
      this.SET_VISIBLE_SUCCESS(false)
		},
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
