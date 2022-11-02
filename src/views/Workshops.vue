<template>
    <main>
      <div class="intro">
        <div style="display: flex; flex-direction: column; justify-content: center; width: 100%">
          <h1>Studioo on-line kurzy</h1>
          <div style=" color: #808b9d;">
            Vítejte na stránce s našimi on-line kurzy. Můžete vybírat dle vlastních preferencí a studovat tempem, které vám vyhovuje.  Dle ikonek u kurzu zjistíte základní údaje. Případně se veškeré detaily dozvíte po kliknutí na "Detail kurzu".
          </div>
        </div>
        <div>
        <img
          src="../assets/workshops__logo.svg"
          style="width: 100%"/>

        </div>
      </div>

      <div class="workshops-container">
        <div v-for="w in workshops" :key="w" class="workshop" data-aos="fade-up" data-aos-delay="300">
          <img :src="w.imageUrl" alt="" class="workshop__image" v-if="w.imageUrl" style="max-width: 400px; max-height: 250px; background: none">
          <div class="workshop__image" v-else></div>
          <div class="workshop__content">
            <h2 style="margin-top: 0">{{ w.title }}</h2>
            <div class="description" style="width: 90%">{{ w.summary }}</div>
            <div
              style="
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-top: 20px;
                margin-bottom: 30px;
              ">
              <img src="../assets/chapters__logo.svg" alt="">
              <div style="margin-left: 20px" class="description">
                Počet kapitol: {{w?.chapterNumber}}
              </div>
              <img src="../assets/hours_logo.svg" alt="" style="margin-left: 1rem">
              <div style="margin-left: 20px" class="description">
                Počet hodin: {{ w.hours }}
              </div>
            </div>
            <button @click="$router.push({path: `/workshops/${w.id}`, params: { workshopid: w.id}})">Začít</button>
          </div>
        </div>
      </div>
    </main>
</template>

<script>
import server from '../common/server';

export default {
  name: 'Workshops',

  created() {
    this.getWorkshops();
  },
  data() {
    return {
      workshops: {
        type: Array,
        default: [],
      },
    };
  },
  methods: {
    async getWorkshops() {
      try {
        const response = await server.get('/workshops?skip=0&limit=6');
        this.workshops = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>



.intro {
  display: grid;
  width: 100%;
  margin-top: 80px;
  grid-template-columns: 40% 60%;
}

.workshops-container {
  margin-top: 80px;
  margin-bottom: 120px;
}

.circle {
  height: 35px;
  width: 35px;
  border-radius: 50%;
  background-color: $color3;
}

.workshop__content {
  display: flex;
  flex-direction: column;
}

.workshop__image {
  background: $color3;
  height: 300px;
  margin-right: 50px;
  border-radius: $border-radius-image;
}
.workshop {
  display: flex;
  flex-direction: row;
  margin-bottom: 40px;
  align-items: center;
}

@media (max-width: 1024px) {
  main {
  margin: 0rem 1.5rem;
  }
}

@media (max-width: 768px) {

  main {
  margin: 0rem 1.5rem;
  }

  .intro {
    display: flex;
    margin-top: 160px;
  }

  .intro img {
    display: none;
  }

  .workshop {
    flex-direction: column;

    &__image {
      width: 100%;
      margin-right: 0;
      margin-bottom: 3rem;
    }
  }
}
</style>
