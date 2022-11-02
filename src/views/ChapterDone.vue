<template>
  <div class="done">
    <div class="done__content">
      <div style="display: flex; flex-direction: column">
        <h2>To je správně, skvělá práce!</h2>
        <div class="content__text">Je vidět, že jste dával/a pozor a skutečně se vyznáte. </div>
        <div style="flex: 1"></div>
        <button class="continue-button" @click="continueToChapter" style="width: 16rem">Pokračovat na další kapitolu</button>
        

      </div>
      <div style="position: relative">
        <img src="../assets/success_logo.png" alt="" class="success-logo">

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'ChapterDone',
  created() {
    
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['currentWorkshop','currentChapterIndex', 'currentChapter']),
    
  },
  methods: {
    ...mapMutations(["SET_CURRENT_CHAPTER", "SET_CURRENT_CHAPTER_INDEX"]),
    continueToChapter() {
      this.SET_CURRENT_CHAPTER_INDEX(this.currentChapterIndex + 1)
      this.SET_CURRENT_CHAPTER(this.currentWorkshop.chapters[this.currentChapterIndex])
      this.$emit('continue-to-chapter')
      this.$router.push({path: `/user/workshops/${this.$route.params.workshopid}/chapters/${this.currentChapter.id}/intro`,
        params: { workshopid: this.$route.params.workshopid, chapterid: this.currentChapter.id }})

    }
  },
};
</script>

<style lang="scss" scoped>
.done {
  &__content {
    background: $color4;
    border-radius: 24px;
    padding: 1rem 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;

    .success-logo {
      position: absolute;
      bottom: -15%;
      right: 0;
      height: 19rem;
      
    }

    .continue-button {
      margin-right: 1rem;
    }

    .video-button {
      background: transparent;
      color: black;

    }

    .content__text {
      color: $color2;
      margin-bottom: 1rem;
      width: 70%
    }
  }
}


@media (max-width: 1024px) {
  .done {
    &__content {
      .success-logo {
        display: none;
      }
    }
  }
}
</style>
