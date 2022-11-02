<template>
  <main class="workshop">
    <div class="workshop__content">
      <div class="content__left">
        <div class="content">
          <div style="margin: 2rem 2rem; width: 100%; display: flex; flex-direction:row; position: relative">
            <div style="display: flex; flex-direction: column">
              <h1 style="font-weight: 600">
                {{ currentWorkshop.workshop.title }}
              </h1>
              <div style="color: #808b9d">
                {{ currentWorkshop.workshop.summary }}
              </div>
              <div style="flex: 1"></div>
              <div class="content__ii" style="cursor: pointer" @click="openII">>
                <div style="margin-right: 1rem">Powered by:</div>
                <img
                  src="../assets/logo_ii_white_text.svg"
                  alt=""
                  style="height: 1.8rem"/>
              </div>
            </div>
            <img :src="currentWorkshop.workshop.imageUrl" class="content__image"  >
          </div>
        </div>
      </div>

      <div class="content__right">
        <h2>Co vás v kurzu čeká?</h2>
        <div style="color: #808b9d">{{ currentWorkshop.workshop.overview }}</div>
        <h2>Detaily o kurzu</h2>
        <div class="workshop__detail">
          <div style="margin-right: 1rem; display: flex; justify-content: center; align-items: center; width: 2rem">
          <img
            src="../assets/chapters__logo.svg"
            alt=""/>
          </div>
          <div v-html="renderChapters()"></div>
        </div>
        <div class="workshop__detail">
          <div style="margin-right: 1rem; display: flex; justify-content: center; align-items: center; width: 2rem">
          <img
            src="../assets/hours_logo.svg"
            alt=""/>
          </div>
          <div v-html="renderHours()"></div>
        </div>
        <div class="workshop__detail">
          <div style="margin-right: 1rem; display: flex; justify-content: center; align-items: center; width: 2rem">
          <img
            src="../assets/difficulty_logo.svg"
            alt=""/>
          </div>
          <div style="color: #808b9d">Náročnost: {{ currentWorkshop.workshop.difficulty }}</div>
        </div>
        <div class="workshop__detail">
          <div style="margin-right: 1rem; display: flex; justify-content: center; align-items: center; width: 2rem">
          <img
            src="../assets/price_logo.svg"
            alt=""/>
          </div>
          <div style="color: #808b9d">
            {{ currentWorkshop.workshop.isPaid ? 'Placený' : 'Zdarma' }}
          </div>
        </div>

        <button style="width: 100%; margin-top: 1rem" @click="goToWorkshop">
          Spustit kurz
        </button>
      </div>
      <div style="margin: 0 1rem; margin-bottom: 4rem">
        <h2>Přehled celého kurzu</h2>
        <div style="color: #808b9d">{{ currentWorkshop.workshop.content }}</div>
        <h3>Jednotlivé kapitoly</h3>
        <div
          v-for="(c) in currentWorkshop.chapters"
          :key="c"
          style="margin-bottom: 2rem">
          <span style="font-weight: bold">{{c.title}} &nbsp;</span>
          <span>{{ c.description }}</span>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'Workshop',
  created() {
    this.getWorkshop({ id: this.$route.params.workshopid });
  },
  computed: {
    ...mapGetters([
      'currentWorkshop',
      'authenticated',
      'user',
      'redirectToWorkshop',
    ]),
  },
  methods: {
    ...mapMutations(['SET_CURRENT_WORKSHOP', 'SET_REDIRECT']),
    ...mapActions(['getWorkshop', 'setChapterResults', 'getWorkshopResult']),
    async goToWorkshop() {
      this.SET_CURRENT_WORKSHOP(this.currentWorkshop);

      if (!this.authenticated) {
        this.SET_REDIRECT(true);
        this.$router.push({ path: '/auth/login/email' });
      } else {
        try {
          await this.setChapterResults({
            userId: this.user.id,
            workshopId: this.currentWorkshop.workshop.id,
          });
          await this.getWorkshopResult({
            userId: this.user.id,
            workshopId: this.currentWorkshop.workshop.id,
          });
        } catch (error) {
          console.error(error);
        }

        this.$router.push({
          path: `/user/workshops/${this.currentWorkshop.workshop.id}`,
          params: { workshopid: this.currentWorkshop.workshop.id },
        });
      }
    },
    openII() {
      window.open('https://internetovyinstitut.cz', '_blank')
    },
    renderHours() {
      if (this.currentWorkshop?.workshop?.hours === 1)
        return `<div style="color: #808b9d">Hodina: 1<div>`
      if (this.currentWorkshop?.workshop?.hours > 1 && this.currentWorkshop?.workshop?.hours < 5)
        return `<div style="color: #808b9d">Hodiny: ${this.currentWorkshop?.workshop?.hours}</div>`
      return `<div style="color: #808b9d">Hodin: ${this.currentWorkshop?.workshop?.hours}</div>`
    },
    renderChapters() {
      if (this.currentWorkshop?.workshop?.chapterNumber === 1)
        return `<div style="color: #808b9d">Kapitola: 1<div>`
      if (this.currentWorkshop?.workshop?.chapterNumber > 1 && this.currentWorkshop?.workshop?.chapterNumber < 5)
        return `<div style="color: #808b9d">Kapitoly: ${this.currentWorkshop?.workshop?.chapterNumber}</div>`
      return `<div style="color: #808b9d">Kapitol: ${this.currentWorkshop?.workshop?.chapterNumber}</div>`
    },
  },
};
</script>

<style lang="scss" scoped>
.content__image {
  width: 500px; height: 300px;margin-top:5rem
}

.workshop {
  &__content {
    display: grid;
    width: 100%;
    column-gap: 3rem;
    margin-top: 130px;
    grid-template-columns: auto 30%;

    .content__left {
      .content {
        width: 100%;

        border-radius: 24px;
        background: #e1e6ed;
        display: flex;
        justify-content: center;
      }
    }

    .content__right {
    }
  }

  .content__ii {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 4rem;
    color: #fff;
    padding: 1rem;
    width: 17rem;
    margin-top: 1rem;
    border-radius: 17px;
    background: linear-gradient(135deg, #f57474, #f21649);

  }

  .workshop__detail {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 0.7rem;
  }
}

@media (max-width: 1440px) {

  .content__image {
    display: none !important;
  }
}


@media (max-width: 1024px) {
  .workshop {
    margin: 0 1rem;


  }
}

@media (max-width: 768px) {
  .workshop {
    margin: 0 0rem;

    &__content {
      grid-template-columns: 1fr;
      margin-top: 6rem;

      .content__left {
        .content {
          border-radius: 0;
        }
      }

      .content__right {
        margin: 0 1rem;
      }
    }
  }
}



</style>
