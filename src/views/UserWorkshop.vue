<template>
  <div class="workshop">
    <div v-if="loading" style="background: #f0f4fa; z-index: 1000000; position: fixed; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center">
      <img src="../assets/loading-spinner.gif" alt="">
    </div>
    <div class="workshop__content">
      <div class="content__overview">
        <div class="overview">
          <div>
            <h1>{{ currentWorkshop?.workshop?.title }}</h1>
            <div class="description" style="margin-top: 20px">
              {{ currentWorkshop?.workshop?.overview }}
            </div>
            <div style="flex: 1"></div>
            <div class="beginButtonMobile">
              <button style="width: 98%; margin-top: 40px"  @click="beginWorkshop">

          Spustit kurz
        </button>
            </div>
            <div class="overview__ii" style="cursor: pointer" @click="openII">
              <span style="margin-right: 15px">Powered by:</span>

              <img
                src="../assets/ii-about-logo.svg"
                alt=""
                style="width: 120px"/>
            </div>
          </div>
          <img
            :src="currentWorkshop?.workshop?.imageUrl"
            alt=""
            style="
              width: 400px;
              height: 300px;
              margin-top: 3rem;
              margin-left: 4rem;
            "
            class="overview__image"/>
        </div>
      </div>
      <div class="content__status">
        <div class="status">
          <div class="status__progress">
            <h3>Pokrok v kurzu</h3>
            <div class="progress">
              <CircleProgressBar :percentage="progress" />
            </div>
          </div>
          <div class="status__details">
            <h3>Detaily o kurzu</h3>
            <div class="details">
              <div style="margin-right: 1rem; display: flex; justify-content: center; align-items: center; width: 2rem">
                <img
                  src="../assets/chapters__logo.svg"
                  alt=""/>

              </div>
              <div v-html="renderChapters()"></div>
            </div>
            <div class="details">
              <div style="margin-right: 1rem; display: flex; justify-content: center; align-items: center; width: 2rem">
              <img
                src="../assets/hours_logo.svg"
                alt=""/>
              </div>
              <div v-html="renderHours()"></div>
            </div>
            <div class="details">
              <div style="margin-right: 1rem; display: flex; justify-content: center; align-items: center; width: 2rem">
              <img
                src="../assets/difficulty_logo.svg"/>
              </div>
              <div>Náročnost: {{ currentWorkshop?.workshop?.difficulty }}</div>
            </div>
            <div class="details">
              <div style="margin-right: 1rem; display: flex; justify-content: center; align-items: center; width: 2rem">
              <img
                src="../assets/price_logo.svg"
                alt=""/>
              </div>
              <div>
                {{ currentWorkshop?.workshop?.isPaid ? 'Placený' : 'Zdarma' }}
              </div>
            </div>
          </div>
        </div>
        <button style="width: 90%; margin-top: 40px" class="beginButton" @click="beginWorkshop">
          Spustit kurz
        </button>
      </div>
      <div></div>
    </div>
    <div class="workshop__chapters">
      <h2>Kapitoly ({{ currentWorkshop?.chapters?.length }})</h2>
      <div v-for="(c, i) in currentWorkshop?.chapters" :key="c" class="chapter" @click="goToChapter(c)" style="cursor: pointer">
        <div class="chapter__circle">{{ i }}</div>
        <div class="chapter__title">{{ c.title }}</div>
        <div class="chapter__space" style="flex: 1"></div>
        <div style="display: flex; flex-direction: row; justify-content: space-between; width: 7rem; align-items: center">
          <img class="chapter__time-logo" v-if="c.timeEstimate" src="../assets/hours_logo.svg" alt="" />
          <div class="chapter__time" style="font-family: Poppins" v-if="c.timeEstimate">{{c.timeEstimate}}</div>

        </div>


        <img
          src="../assets/right-arrow-button.svg"
          alt=""
          class="chapter__button"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import server from '../common/server';
import CircleProgressBar from '../components/CircleProgressBar.vue';
// import LoadingSpinner from '../components/LoadingSpinner.vue';


export default {
  name: 'UserWorkshop',
  components: { CircleProgressBar },
  async created() {
    try {
      await this.getWorkshop({ id: this.$route.params.workshopid });
      const response = await server.get(
        `/workshop-results/stats?userid=${this.user.id}&workshopid=${this.$route.params.workshopid}`,
      );
      this.progress = Math.round(response.data * 100);
    } catch (error) {
      console.error(error);
    }

    this.loading = false;
  },
  data() {
    return {
      progress: 0,
      loading: true,
    };
  },
  computed: {
    ...mapGetters(['currentWorkshop', 'user']),
  },
  methods: {
    openII() {
      window.open('https://internetovyinstitut.cz', '_blank')
    },
    beginWorkshop() {
      const c = this.currentWorkshop.chapters[0];
      this.SET_CURRENT_CHAPTER(c);
      this.$router.push({
        path: `/user/workshops/${this.$route.params.workshopid}/chapters/${c.id}/intro`,
        params: { workshopid: this.$route.params.workshopid, chapterid: c.id },
      });
    },
    goToChapter(c) {
      this.SET_CURRENT_CHAPTER(c);
      this.$router.push({
        path: `/user/workshops/${this.$route.params.workshopid}/chapters/${c.id}/intro`,
        params: { workshopid: this.$route.params.workshopid, chapterid: c.id },
      });
    },
    renderHours() {
      if (this.currentWorkshop?.workshop?.hours === 1)
        return `<div>Hodina: 1<div>`
      if (this.currentWorkshop?.workshop?.hours > 1 && this.currentWorkshop?.workshop?.hours < 5)
        return `<div>Hodiny: ${this.currentWorkshop?.workshop?.hours}</div>`
      return `<div>Hodin: ${this.currentWorkshop?.workshop?.hours}</div>`
    },
    renderChapters() {
      if (this.currentWorkshop?.workshop?.hours === 1)
        return `<div>Kapitola: 1<div>`
      if (this.currentWorkshop?.workshop?.hours > 1 && this.currentWorkshop?.workshop?.hours < 5)
        return `<div>Kapitoly: ${this.currentWorkshop?.workshop?.hours}</div>`
      return `<div>Kapitol: ${this.currentWorkshop?.workshop?.hours}</div>`
    },
    ...mapMutations(['SET_CURRENT_CHAPTER']),
    ...mapActions(['getWorkshop']),
  },
};
</script>

<style lang="scss" scoped>
.lets-begin-img {
  position: relative;
  bottom: 2rem;
  left: -10rem;
}

.beginButtonMobile {
  display: none;
  width: 100%;
}

.workshop {
  display: flex;
  width: 100%;
  flex-direction: column;
  &__content {
    display: grid;
    grid-template-columns: auto 40%;
    gap: 1rem;
    width: 100%;
    margin-top: 100px;
    .content__overview {
      .overview {
        display: flex;
        flex-direction: row;
        background: $color3;
        padding: 1.5rem 2rem;
        width: 100%;
        border-radius: 24px;

        &__ii {
          margin-bottom: 20px;
          margin-top: 2rem;
          color: $color2;

          display: flex;
          align-items: center;
        }
      }
    }

    .content__status {
      display: flex;
      flex-direction: column;
      align-items: center;
      .status {
        display: grid;
        width: 100%;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;

        &__progress {
          padding-left: 40px;

          .progress {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        &__details {
          .details {
            margin-bottom: 1rem;
            display: flex;
            flex-direction: row;
            align-items: center;
            color: $color2;
          }
        }
      }
    }
  }

  &__chapters {
    margin-bottom: 5rem;
    .chapter {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 60px;

      &__time {
        font-family: 'Roboto';
        color: $color2;

        &-logo {
          margin-right: 15px;
        }
      }



      &__circle {
        border-radius: 50%;
        background-color: $color3;
        min-width: 42px;
        min-height: 42px;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 20px;
      }

      &__button {
        margin-left: 200px;
        cursor: pointer;
      }
    }
  }

  .circle {
    width: 30px;
    height: 30px;
    background: $color3;
    border-radius: 50%;
    margin-right: 15px;
  }


}

@media (max-width: 1439px) {


  .overview__image {
    display: none;
  }
}


@media (max-width: 1024px) {
  .lets-begin-img {
    display: none;
  }

  .workshop__content .content__status .status__progress .progress {
    justify-content: flex-start;
  }

  .beginButtonMobile {
    display: flex;
    justify-content: center;
  }

  .beginButton {
    display: none;
  }


  .overview {
   margin-top: 3rem;
  }

    .workshop__content {
      grid-template-columns: 1fr;

      .content__status {
        .status {
          grid-template-columns: 1fr;

          &__progress {
            padding-left: 0rem;
          }
        }
      }
    }

    .workshop__chapters {
      .chapter {
        &__title {
          flex-grow: 1;
        }

        &__space {
          display: none;
        }

        &__time {
          display: none;
        }

        &__time-logo {
          display: none;
        }

        &__button {
          margin-left: 0px;
          cursor: pointer;
        }

        &__circle {
        }
      }
    }
  }
</style>
