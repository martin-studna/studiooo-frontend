<template>
  <div class="overview">
    <div class="overview__content">
      <div class="content__left" >
       <router-view
       v-slot="{ Component }"
       @continue-to-chapter="continueToChapter"
       :current-chapter-index="currentChapterIndex">
       <transition mode="out-in" name="slide-fade">
        <component :is="Component" :key="$route.path" />

       </transition>


       </router-view>
      </div>
      <div class="content__right">
        <div>
          <h2>Přehled kurzu</h2>
          <div>
            <div
              v-for="(c, i) in currentWorkshop?.chapters"
              :value="c"
              :key="i"
              class="chapter">
              <div class="chapter__item" @click="expand(i)">
                <div style="font-weight: 500">{{c.title}} <span v-if="chapterResults[i].overviewCompleted && chapterResults[i].testCompleted">- <span style="color: green">dokončeno</span></span></div>
                <img
                  src="../assets/arrow.svg"
                  style="width:17px; height: 17px; transition: 0.2s all ease-in-out;"
                  :class="{ rotate: !expands[i] }"/>
              </div>
              <div  :class="{expand: true, open: !expands[i]}">
                <div :class="{active: i === currentChapterIndex && $route.fullPath.includes('/intro'), expand__item: true}" @click="goToChapter(c)" style="cursor: pointer; margin-top: .3rem">
                  <div class="item__content"  >
                    <img src="../assets/completed-logo.svg" alt="" v-if="chapterResults[i].overviewCompleted" style="margin-right: 5px;">
                    <div v-else class="expand__circle"></div>
                    <div>Podívat se na lekci</div>
                  </div>
                  <div></div>
                </div>
                <div :class="{active: i === currentChapterIndex && $route.fullPath.includes('/knowledge'), expand__item: true}" @click="goToChapterKnowledge(c)" style="cursor: pointer;">
                  <div class="item__content">
                    <img src="../assets/completed-logo.svg" alt="" v-if="chapterResults[i].testCompleted" style="margin-right: 5px;">
                    <div v-else class="expand__circle"></div>
                    <div>Ověřte své znalosti</div>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
            <div
              class="final-test"
              style="cursor: pointer"
              @click="
                $router.push({
                  path: `/user/workshops/${currentWorkshop.workshop.id}/test`,
                })
              ">
              <div>Přeskočit k závěrečnému testu</div>
              <img src="../assets/arrow_button.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'


export default {
  name: "ChapterLayout",
  created() {


    const chapter = this.currentWorkshop.chapters.find(x => x.id === this.$route.params.chapterid)

    chapter.questions.map(q => {
      q.answers = q.answers.map(a => {
        a.selected = false
        return a
      })

      return q
    })

    this.SET_CURRENT_CHAPTER(chapter)
    this.SET_CURRENT_CHAPTER_INDEX(this.currentWorkshop.chapters.indexOf(chapter))


    for (let i = 0; i < this.currentWorkshop.chapters.length; i++) {
      this.expands.push(false);
    }
    this.expands[this.currentChapterIndex] = true
  },

  data () {
    return {
      expands: [],
      currentChapter: null
    }
  },
  computed: {
    ...mapGetters(["currentWorkshop", "chapterResults", "currentChapter", "currentChapterIndex"]),
  },
  watch: {
    '$route.params.chapterid': {
      handler() {

      }
    }
  },
  methods: {
    expand(i) {
      this.expands[i] = !this.expands[i];
    },
    continueToChapter() {
      this.expands = this.expands.fill(false)
      this.expands[this.currentChapterIndex] = true
    },
    goToChapter(c) {
        this.SET_CURRENT_CHAPTER(c);
        this.SET_CURRENT_CHAPTER_INDEX(this.currentWorkshop.chapters.indexOf(c))
        this.$router.push({
          name:  "ChapterIntro",
          params: { workshopid: this.$route.params.workshopid, chapterid: c.id, chapterSection: "intro" },
        });
    },
    goToChapterKnowledge(c) {
      this.SET_CURRENT_CHAPTER(c);
      this.SET_CURRENT_CHAPTER_INDEX(this.currentWorkshop.chapters.indexOf(c))
      this.$router.push({
        name: "ChapterKnowledge", // `/user/workshops/${this.currentWorkshop.workshop.id}/chapters/${c.id}/knowledge`,
        params: { workshopid: this.$route.params.workshopid, chapterid: c.id, chapterSection: "knowledge" },
      });
    },
    ...mapMutations(["SET_CURRENT_CHAPTER", "SET_CURRENT_CHAPTER_INDEX"])
  },
};



</script>

<style lang="scss" scoped>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(50px);
  opacity: 0;
}


.active {
  background: $color3;
  border-radius: 8px;
}

.expand {
  display: flex;
  color: $color2;
  font-size: 16px;
  overflow: hidden;
  max-height: 0;
  flex-direction: column;
  transition: max-height .2s ease-in-out;



  &__item {
    padding: .2rem .6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 5px;

    .item__content {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }

  &__circle {
    border-radius: 50%;
    background: $color2;
    width: 4px;
    height: 4px;
    margin-right: 5px;
  }
}

.expand.open {
    max-height: 500px !important;
}


.overview {
  &__content {
    display: grid;
    grid-template-columns: auto 30%;
    width: 100%;
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


      &__item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        width: 100%;
      }

      .rotate {
        transform: rotate(180deg);
        transition: 0.2s all;
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

@media (max-width: 768px) {
    .overview__content {
      grid-template-columns: 1fr;

      .content__right {
        grid-row-start: 1;
      }
    }
}


</style>
