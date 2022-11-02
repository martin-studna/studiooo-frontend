<template>
  <div class="user-dashboard__content" >

    <div class="heading" >
      <h1 class="heading__title" >Dobrý den, {{firstname}} <span style='font-size:60px;'>&#128075;</span> </h1>
    </div>
    <div class="overview__body" v-if="workshopsStats?.workshopsStats?.length === 0">
      <div class="content">
        <h1 class="content__title">Vyberte kurz</h1>
        <div class="content__description">
          Vyberte si kurz dle vašich preferencí a získejte nové dovednosti pro digitální svět už dnes! :)
        </div>
        <button
          class="content__button"
          @click="$router.push({ path: '/user/workshops' })">
          Jdeme na to
        </button>
        <img
          src="../assets/computer_table_guy.png"
          alt=""
          class="content__image"/>
      </div>
    </div>
    <div class="user-status"  v-else>
      <div class="user-status__heading">
        <div class="stat-one" >
          <img src="../assets/completed-workshops.svg" alt="" style="align-self: flex-end" class="stat-image">
          <div>
            <div class="number">{{workshopsStats.finishedWorkshopsCount}}</div>
            <div class="description">Dokončené kurzy</div>
          </div>
        </div>
        <div class="stat-one" >
          <img src="../assets/completed-certificates.svg" alt="" style="align-self: flex-end" class="stat-image">
          <div>
            <div class="number">{{workshopsStats.certificateCount}}</div>
            <div class="description">Získané certifikáty</div>
          </div>
        </div>
        <div class="stat-one" >
          <img src="../assets/completed-hours.svg" alt="" style="align-self: flex-end" class="stat-image">
          <div>
            <div class="number">0</div>
            <div class="description">Hodiny</div>
          </div>
        </div>
      </div>
      <div class="user-status__body">
        <div class="user-workshops" data-aos="fade-right" data-aos-delay="300">
          <h3 class="user-workshops-title">Rozdělané kurzy</h3>
          <div class="workshops" style="margin-bottom: 2rem">
            <div v-for="(w,i) in workshopsStats.workshopsStats" :key="w" class="workshop" @click="goToWorkshop(w)">
              <img :src="w.imageUrl" alt="" style="width: 10rem; height: 7rem;  margin-right: 1rem" class="workshop__image"  v-if="w.imageUrl">
              <div style="width: 10rem; height: 7rem; background: #e1e6ed; border-radius: 16px; margin-right: 1rem" class="workshop__image" v-else></div>
              <div>
                <h3 style="margin-top: 0">{{w.title}}</h3>
                <div style="display: flex; color: #808b9d">
                  <div v-html="renderChapters(w)"></div>
                  <div v-html="renderHours(w)"></div>
                </div>
              </div>
              <div style="flex: 1"/>
              <div class="workshop__progress" @mouseover="showPlay[i] = true" @mouseleave="showPlay[i] = false" >
                <img  v-if="showPlay[i]" src="../assets/play-logo.svg" style="margin-left: 8px"/>
                <div v-else>{{Math.round(w.progress * 100)}} %</div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="workshops-vocabulary">
          <h3 class="workshops-vocabulary-title" data-aos="fade-left" data-aos-delay="900">Studioo slovníček</h3>
          <div class="vocabulary" data-aos="fade-left" data-aos-delay="900"></div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
import vocativ from '../common/declension'


export default {
  name: 'UserOverview',
  mounted() {
    this.firstname = vocativ(this.user.fullname.split(' ')[0])
    this.getWorkshopsStats({userId: this.user.id})
    this.showPlay = new Array(this.workshopsStats.length)
    this.showPlay.fill(false)
  },
  computed: {
    ...mapGetters(["user", 'workshopsStats'])
  },
  data() {
    return {
      firstname: '',
      showPlay: []
    };
  },
  methods: {
    renderHours(w) {
      if (w?.hours === 1)
        return `<div style="font-weight: 300">Hodina: 1<div>`
      if (w?.hours > 1 && w?.hours < 5)
        return `<div style="font-weight: 300">Hodiny: ${w?.hours}</div>`
      return `<div style="font-weight: 300">Hodin: ${w?.hours}</div>`
    },
    renderChapters(w) {
      if (w?.chapterCount === 1)
        return `<div style="margin-right: 2.5rem; font-weight: 300">Kapitola: 1<div>`
      if (w?.chapterCount > 1 && w?.chapterCount < 5)
        return `<div style="margin-right: 2.5rem; font-weight: 300">Kapitoly: ${w?.chapterCount}</div>`
      return `<div style="margin-right: 2.5rem; font-weight: 300">Kapitol: ${w?.chapterCount}</div>`
    },

    ...mapActions(['setChapterResults','getWorkshopResult', 'getWorkshopsStats']),
    ...mapMutations(['SET_CURRENT_WORKSHOP']),

    async goToWorkshop(w) {

      await this.setChapterResults({ userId: this.user.id, workshopId: w.workshopId })
      await this.getWorkshopResult({ userId: this.user.id, workshopId: w.workshopId })

      this.SET_CURRENT_WORKSHOP(w)

      this.$router.push({
                path: `/user/workshops/${w.workshopId}`,
                params: { workshopid: w.workshopId },
      })
    }
  }
};
</script>

<style lang="scss" scoped>

.workshops {
  margin-right: 2rem;
}

.workshop {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;

}

.workshop__progress {
  color: #55D646;
  border-radius: 50%;
  cursor: pointer;
  min-width: 3.5rem;
  min-height: 3.5rem;
  font-size: .8em;
  font-weight: 700;
  border: 3px solid #55D646;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all .2s;
  transition-timing-function: cubic-bezier(0, 0, 0.35, 1.0);

  &:hover {
    transform: scale(1.2);
  }
}

.user-status__heading {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  margin: 0 1rem;
}

.user-status__body {
  display: grid;
  margin: 0 1rem;

  grid-template-columns: 66% auto;
  gap: 1rem;
  margin-top: 1.5rem;
}

.vocabulary {
  border-radius: 24px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  min-height: 20rem;
}

.stat-one {
  position: relative;
  border-radius: 24px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 2rem 1.8rem;
  display: flex;
  flex-direction: column;

  .number {
    font-weight: 500;
    margin-top: 1rem;
    font-size: 5.2em;
  }

  .description {
    margin-bottom: 0;
    margin-top: -15px;
    margin-left: 8px;
    font-weight: 300;
  }

  img {
    align-self: flex-end;
    width: 4rem;
    height: 4rem;
    position: absolute;
    top: 7%;
    right: 3%;
  }
}



.user-dashboard__content {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;

}

.heading {
  width: 100%;
  display: flex;
  align-items: center;
  height: auto;

  &__title {
    display: flex;
    align-items: center
  }
}

.overview__body {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
}

.content {
  background: $color4;
  padding: 40px 60px;
  border-radius: 40px;
  margin-top: 40px;
  position: relative;

  &__title {
    margin-block-start: 0 !important;
  }

  &__image {
    position: absolute;
    top: -210px;
    right: 30px;
    max-width: 700px;
    max-height: 700px;
    z-index: 1;
  }

  &__description {
    color: $color2;
    margin-bottom: 70px;
    margin-right: 600px;
  }
}

#app {
  padding: 0 !important;
}

@media (max-width: 1300px) {
  .content__image {
    display: none;
  }

  .content__description {
    margin-right: 0;
  }
}

@media (max-width: 1024px) {

  .stat-one {
    padding: 1rem 1rem;

    .number {
      font-size: 2.3em;
      margin-bottom: .5rem;
      margin-top: 0rem;
    }

    .description {
      margin-left: 4px;
    }
  }


  .heading {

    font-size: 1.2em;
    margin: 0 1rem;
    margin-top: 8rem;
    margin-bottom: 2rem;
  }

  .user-status__heading {
    grid-template-columns: 1fr;

  }

  .user-status__body {
    grid-template-columns: 1fr;
  }


  .stat-image {
    display: none;
  }
}

@media (max-width: 600px) {
  .heading {
    &__title {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .workshop__image {
    display: none;
  }
}
</style>
