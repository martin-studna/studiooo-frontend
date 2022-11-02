<template>
  <div class="overview">
    <h1 id="chapter-title-overview">{{ currentChapter.title }}</h1>
    <div class="left__video-wrapper">
      <iframe
        class="video"
        :src="currentChapter.media + '?autoplay=1'"
        allow="autoplay"
        frameborder="0"></iframe>
      <button style="width: 200px" @click="goToKnowledge()">
        Ověřte si své znalosti
      </button>
    </div>
    <div class="left__description-wrapper" style="display: none">
      <h2>{{ currentChapter.title }}</h2>
      <div class="chapter__description">
        {{ currentChapter.description }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import VueScrollTo from 'vue-scrollto'
import server from '../common/server';

export default {
  name: 'ChapterOverview',
  created() {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      'currentWorkshop',
      'user',
      'chapterResults',
      'currentChapter',
      'currentChapterIndex',
    ]),
  },
  watch: {
    '$route.params': {
      handler() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) === true) {
          const element = document.getElementById('chapter-title-overview')
          VueScrollTo.scrollTo(element, 600,  {
            container: 'body',
            easing: 'ease',
            cancelable: false,
            offset: -120,
            x: false,
            y: true,
        })
        }
      }
    }
  },
  methods: {
    ...mapMutations(['UPDATE_CHAPTER_RESULT']),
    async goToKnowledge() {
      try {
        if (!this.chapterResults[this.currentChapterIndex].overviewCompleted) {
          const response = await server.put(
            `/chapter-results/${
              this.chapterResults[this.currentChapterIndex].id
            }`,
            {
              overviewCompleted: true,
            },
          );
          this.UPDATE_CHAPTER_RESULT({
            data: response.data,
            index: this.currentChapterIndex,
          });
        }
      } catch (error) {
        console.error(error);
      }

      this.$router.push({
        path: `/user/workshops/${this.currentWorkshop.workshop.id}/chapters/${this.currentChapter.id}/knowledge`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.active {
  background: $color3;
  border-radius: 8px;
}

.expand {
  color: $color2;
  font-size: 10px;

  &__item {
    padding: 0.2rem 0.6rem;
  }

  &__circle {
    border-radius: 50%;
    background: $color2;
    width: 4px;
    height: 4px;
    margin-right: 5px;
  }
}

.overview {
  &__content {
    display: grid;
    grid-template-columns: auto 30%;
    gap: 3rem;
    width: 100%;
    margin-top: 100px;
  }

  .content__left {
    margin-bottom: 3rem;

    .left__video-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .video {
        background: $color3;
        width: 100%;
        height: 35rem;
        border-radius: 24px;
        margin-bottom: 25px;
      }
    }

    .left__description-wrapper {
      .chapter__description {
        color: $color2;
      }
    }
  }

  .content__right {
    .chapter {
      margin-bottom: 6px;
      display: flex;
      flex-direction: column;
      cursor: pointer;

      .rotate {
        transform: rotate(180deg);
        transition: 0.4s all;
      }
    }

    .final-test {
      margin-top: 45px;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}

@media (max-width: 1024px) {

  .overview .content__left .left__video-wrapper .video {
    height: 20rem;
  }


  .overview__content {
    grid-template-columns: 1fr;

    .content__right {
      grid-row-start: 1;
    }
  }

  .overview {
    &__content {
      display: grid;
      grid-template-columns: auto 30%;
      gap: 3rem;
      width: 100%;
      margin-top: 100px;
    }

    .content__left {
      margin-bottom: 3rem;

      .left__video-wrapper {

        button {
          width: 100% !important;
        }
      }

      .left__description-wrapper {
        .chapter__description {
          color: $color2;
        }
      }
    }
  }
}
</style>
