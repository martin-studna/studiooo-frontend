<template>
  <div class="failed">
    <div class="failed__content">
      <h2>Skoro to vyšlo. Zkuste to znovu.</h2>
      <div class="content__text">Opakování je matka moudrosti. Zkuste to znovu. Tentokrát to určitě vyjde.</div>
      <div>
        <button class="again-button" @click="$router.go(-1)">Zkusit znovu</button>
        <button class="video-button" @click="$router.go(-2)">Přehrát video</button>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'ChapterOverview',
  created() {
    this.currentChapter = this.currentWorkshop.chapters.find(
      (x) => x.id === this.$route.params.chapterid,
    );

    this.currentChapter.questions = this.currentChapter.questions.map(q => {
      q.answers = q.answers.map(a => {
        a.selected = false
        return a
      })

      return q
    })


    this.currentChapterIndex = this.currentWorkshop.chapters.indexOf(this.currentChapter)


    for (let i = 0; i < this.currentWorkshop.chapters.length; i++) {
      this.expands.push(false);
    }
    this.expands[this.currentChapterIndex] = true
    
  },
  data() {
    return {
      currentChapter: null,
      expands: [],
      currentChapterIndex: 0
    };
  },
  computed: {
    ...mapGetters(['currentWorkshop','chapterResults']),
  },
  methods: {
    ...mapMutations(["UPDATE_CHAPTER_RESULT"]),

  },
};
</script>

<style lang="scss" scoped>
.failed {
  &__content {
    background: $color4;
    border-radius: 24px;
    padding: 1rem 2rem;

    .again-button {
      margin-right: 1rem;
    }

    .video-button {
      background: transparent;
      color: black;

    }

    .content__text {
      color: $color2;
      margin-bottom: 1rem;
      width: 50%
    }
  }
}

</style>
