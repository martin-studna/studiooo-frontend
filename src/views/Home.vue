<template>
  <main class="main">
    <div class="landing">
      <div style="display: flex; justify-content: center; flex-direction: column">
        <h1 >Získejte nové dovednosti pro digitální svět</h1>
        <div style="margin-bottom: 40px; text-align: left" class="description" >
          Rozvíjejte svou kariéru nebo podnikání vlastním tempem pomocí našich výukových kurzů, které zvýší vaši digitální gramotnost, posílí vaši sebedůvěru a pomohou vám uspět v dnešním světě.
        </div>
        <div class="landing__buttons">
          <button class="beginButton" @click="authenticated ? $router.push({path: '/user'}) : $router.push({path: '/auth/register/email'})">Začněte</button>
          <button class="aboutButton" @click="$router.push({path: '/workshops'})">O kurzech</button>
        </div>
      </div>
      <div style="display: flex;justify-content: center;">
      <img :src="landingImage"/>

      </div>
    </div>
    <div
      style=""
        class="circles"
      data-aos="fade-up">
      <div class="circle-block">
        <div class="circle-image" style="position: relative; bottom: 1%">
          <img class="image" src="../assets/principles_logo.png" />
        </div>
        <h3>Chci chápat principy</h3>
        <div class="description">
          Chcete se vyznat v dnešním světě? Nestačí vám jen konzumovat internet, ale rádi byste pochopily principy, na kterých stojí? Pak jste tu správně.
        </div>
      </div>
      <div class="circle-block">
        <div class="circle-image" style="position: relative; bottom: 13%" >
          <img class="image" src="../assets/bulb_logo.png" />
        </div>
        <h3>Chci rozvíjet své digitální dovednosti</h3>
        <div class="description">
          Chcete získat či rozvíjet své digitální dovednosti? Naše kurzy vám v tom pomohou. Ať už jste student, učitel, úředník či nadšenec. :)
        </div>
      </div>
      <div class="circle-block">
        <div class="circle-image" style="position: relative; top: 8%">
          <img class="image" src="../assets/learning_logo.png" />
        </div>
        <h3>Chci se učit flexibilně a po svém</h3>
        <div class="description">
          Naše kurzy vás nikam nehoní. Je jen na vás jaké tempo si zvolíte, jakou kapitolou začnete nebo kdy dorazíte do cíle.
        </div>
      </div>
    </div>
    <div
      style="margin-bottom: 200px width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; width:100%">
      <h1 data-aos="fade-up" style="margin-bottom:2rem">Naše kurzy</h1>
      <div class="grid-container">
        <div v-for="w in workshops" class="grid-item" style="cursor:pointer" :key="w" data-aos="fade-up" @click="$router.push({path: `/workshops/${w.id}`, params: { workshopid: w.id}})">
          <img v-if="w.imageUrl" :src="w.imageUrl" />
          <div style="" class="workshop-item__image" v-else></div>
          <h3>{{ w.title }}</h3>
          <div class="description">{{ w.summary }}</div>
        </div>
      </div>
    </div>
    <div
      data-aos="fade-up"
      class="red-advert-wrapper">
      <div
        class="red-advert">
          <div style="display: flex; justify-content: center;  flex-direction: column">
            <img src="../assets/ii-logo-white.svg" alt=""  class="red-logo-ii-mobile" >
            <h1 style="font-weight: 500; font-size: 2.2em">Powered by Internetový Institut</h1>
            <div style="margin-bottom: 40px">
              Online a offline život se již nedá rozlišit. Proto se zaměřujeme na odhalení jejich souvislostí a reálných důsledků pro náš život.
            </div>
            <button onclick="window.open('https://www.internetovyinstitut.cz/', '_blank')" style="color: black; background: white; border-color: white">Více o ii</button>
            <know-more class="learn-more-img"/>
          </div>
          <div style="display: flex; justify-content: center; align-items: center">
          <img src="../assets/ii-logo-white.svg" alt=""  class="red-logo-ii" >
          </div>
      </div>
    </div>
    <div class="workshops__bottom" data-aos="fade-up">
      <img src="../assets/workshop__home.svg" class="workshop-image" />
      <div class="bottom__description">
        <h1>Získejte nové dovednosti pro digitální svět</h1>
        <div style="margin-bottom: 30px; text-align: left" class="description">
          Rozvíjejte svou kariéru nebo podnikání vlastním tempem pomocí
          flexibilních personalizovaných výukových kurzů, které zvýší vaši
          digitální gramotnost, posílí vaši sebedůvěru a pomohou vám uspět.
        </div>
        <button class="beginButton" @click="authenticated ? $router.push({path: '/user'}) : $router.push({path: '/auth/register/email'})" style="z-index: 2">Začněte</button>
        <lets-go
          src="../assets/lets_go.svg"
          style="left: 25px; bottom: 33px; position: relative; width: 200px"/>

      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import server from '../common/server';
import KnowMore from '../components/KnowMore.vue';
import LetsGo from '../components/LetsGo.vue';

export default {
  name: 'Home',
  components: {LetsGo, KnowMore},
  data() {
    return {
      circImage1: '',
      circImage2: '',
      circImage3: '',
      landingImage: null,
      landingImages: ['https://studiooo.cz/computer_table.png',"https://studiooo.cz/computer-table-2.png", "https://studiooo.cz/computer-table-3.png"],
      workshops: {
        type: Array,
        default: [],
      },
    };
  },
  created() {
    this.landingImage =  this.landingImages[Math.floor(Math.random()*this.landingImages.length)]
    this.getWorkshops();
  },
  computed: {
    ...mapGetters(["authenticated"])
  },
  methods: {
    async getWorkshops() {
      try {
        const response = await server.get('/workshops?skip=0&limit=9');
        this.workshops = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.learn-more-img {
  position: absolute;
  bottom: 3.25rem;
  left: 14.6rem
}


.red-logo-ii-mobile {
  display: none;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  width: 100%;
  align-items: center;
  margin-bottom: 70px;
}

.circle-block {
  display: flex;
  flex-direction: column;

  align-items: center;
}

.circles {
  display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 4rem;
        width: 100%;
        margin-top: 200px;
        margin-bottom: 200px;
        text-align: center;
}

.circle-image {
  width: 100px;
  height: 100px;

}

.red-advert-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
}

.red-advert {
  background: linear-gradient(135deg,#F57474, #F21649);;
  width: 100%;
  border-radius: 24px;
  padding: 3rem 3rem;
  color: white;
  font-weight: 300;
  display: grid;
  grid-template-columns: 80% auto;
}

.header {
  display: flex;
  width: 100%;
  height: 80px;
  background-color: $color1;

  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 80px;

  &Links {
    display: flex;
    justify-content: space-between;
    width: 393px;
    font-weight: bold;
  }

  &Login {
    background-color: black;
    color: white;
    font-weight: bold;
    border: none;
    font-family: 'Roboto Slab';
    border-radius: 12px;
    width: 144px;
    height: 40px;
  }
}

.landing {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2rem;
  width: 100%;

  h1 {
    font-size: 40px;
  }
}

.beginButton {
  margin-right: 10px;
}

.aboutButton {
  background-color: transparent;
  color: black;
}

.grid-container {
  display: grid;
  margin-bottom: 100px;

  height: auto;
  grid-template-columns: repeat(auto-fill, minmax(26rem, 1fr));
  gap: 4rem;
  width: 100%;
  grid-column-start: auto;
  justify-items: center;
}

.workshops__bottom {
  display: grid;
  grid-template-columns: auto 30%;
  column-gap: 5rem;
}

.bottom__description {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.workshop-image {
  height: auto;
  max-width: 1120px;
  margin-right: 40px;
  width: 100%;
}

.workshop-item__image {
  background: $color3;
  width: 100%;
  height: 14rem;
  border-radius: $border-radius-image;
}

.grid-item {
  padding: 20px;

  width: auto;
  height: auto;
  max-width: 26rem;
  text-align: center;
}

.red-logo-ii {
  width: 9rem;
}

@media (max-width: 1024px) {
  .learn-more-img {
    display: none;
  }

  .landing {
    padding: 0 1rem;
  }

  .red-logo-ii {
    display: none;
  }

  .red-logo-ii-mobile {
    display: block;
    width: 8rem;
    margin-top: 2rem;
  }



  .workshops__bottom {
    padding: 0 1rem;
  }
}

@media (max-width: 768px) {

  .grid-container {
    gap: 0;
    grid-template-columns: 1fr;
  }

  .landing img {
    display: none;

  }

  .circles {
    padding: 0 1.5rem;
    grid-template-columns: 1fr;
  }

  .red-advert {
    border-radius: 0;
  }

  .landing {
    display: flex;
    width: 100%;
    padding: 3rem 1.5rem;


    &__buttons {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }


  .workshop-image {
    display: none;
  }
  .workshops__bottom {
    grid-template-columns: 0;
    column-gap: 0;
    display: flex;
    padding: 0 1.5rem;
  }
}


@media (max-width: 375px) {

  .grid-container {
    grid-template-columns: 1fr;
  }



  .circles {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 330px) {
  .beginButton {
    width: 120px;

  }

  .aboutButton {
    width: 120px;

  }
}
</style>
