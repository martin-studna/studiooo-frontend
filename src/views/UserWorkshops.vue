<template>
  <div class="user-dashboard__content">
    <div class="heading">
      <h1>Studiooo kurzy</h1>
    </div>
    <div class="workshops__body">
      <div v-for="w in workshops" :value="w" :key="w" class="workshop">
        <img style="width: 200px; height: 140px; margin-right: 20px;" :src="w.imageUrl" alt="" v-if="w.imageUrl" />
        <div class="workshop__image" v-else>
        </div>
        <div class="workshop__content">
          <h2>{{ w.title }}</h2>
          <div class="description" style="line-height: 30px; width: 85%">
            {{ w.summary }}
          </div>
        </div>
        <div class="button-container" style="display: flex; align-items: center;">
          <button
            @click="goToWorkshop(w)">
            Zvolit kurz
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'


export default {
  components: {},
  name: 'UserWorkshops',
  created() {
    this.setWorkshops({skip: 0, limit: 8});
  },
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters(['workshops', 'user', 'chapterResults']),
  },
  methods: {
    ...mapActions(['setWorkshops','setWorkshop', 'setChapterResults','getWorkshopResult']),
    ...mapMutations(['SET_CURRENT_WORKSHOP']),
    async goToWorkshop(w) {

      await this.setChapterResults({ userId: this.user.id, workshopId: w.id })
      await this.getWorkshopResult({ userId: this.user.id, workshopId: w.id })

      this.SET_CURRENT_WORKSHOP(w)

      this.$router.push({
                path: `/user/workshops/${w.id}`,
                params: { workshopid: w.id },
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.user-dashboard {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;

  &__content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
}

.heading {
  width: 100%;
  display: flex;
  align-items: center;
  height: 140px;

}

.workshops__body {
  display: flex;
  flex-direction: column;
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 50px;

  &__content {
    max-width: 800px;
  }
}

.workshop__content {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  width: 100%;
}

.workshop {
  display: flex;
  width: 100%;
  height: auto;
  align-items: center;

  margin-bottom: 2.7rem;

  h2 {
    margin-block-start: 0px;
  }

  &__image {
    background: #e1e6ed;
    min-width: 200px;
    height: 140px;
    border-radius: 10px;
    margin-right: 20px;
  }
}

.personal-inputs {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
}

#app {
  padding: 0 !important;
}

@media (max-width: 1024px) {
  .heading {
    margin-top: 6rem;
  }


  .workshops__body {
    margin-right: 0;
  }


  .workshop {
    flex-direction: column;

    h2 {
      margin-top: 1rem;
    }

    &__image {
      width: 100%;
      height: 250px;
      margin-right: 0;
    }

    .button-container {
      width: 100%;
      margin-top: 50px;
      button {
        width: 100%;
      }

    }

  }
}
</style>
