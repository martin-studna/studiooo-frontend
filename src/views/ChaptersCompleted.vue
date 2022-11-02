<template>
  <div class="done">
    <div class="done__content">
      <div style="display: flex; flex-direction: column">
        <h2>Už jen krůček!</h2>
        <div class="content__text">Jednotlivé kapitoly jste zvládl/a na jedničku. Teď už jen potvrdit své znalosti v testu. Hodně štěstí!</div>
        <div style="flex: 1"></div>
        <button class="continue-button" @click="$router.push({
                  path: `/user/workshops/${currentWorkshop.workshop.id}/test`,
                })" style="width: 16rem">Pokračovat na závěrečný test</button>
        

      </div>
      <div style="position: relative">
        <img src="../assets/completed_logo.svg" alt="" class="success-logo">

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
    height: 17rem;

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
      
    }
  }
}
</style>
