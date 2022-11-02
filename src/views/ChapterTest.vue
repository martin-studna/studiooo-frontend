<template>
  <div class="knowledge">
    <h1 id="chapter-title">{{ currentWorkshop.workshop.title }}</h1>
    <div v-if="!showResults">
      <!-- <h2>1. Přečtěte si otázku</h2>
      <div class="paragraph">

      </div> -->
    </div>

    <div v-if="showResults && success" class="result">
      <div>
        <h3>To je správně, skvěla práce!</h3>
        <div class="result__text">
          Je vidět, že jste dával/a pozor a skutečně se vyznáte
        </div>
        <button style="width: 15rem; margin-top: 2rem" @click="goToNextChapter">
          Pokračovat na další kapitolu
        </button>
      </div>
      <div style="position: relative">
        <img
          src="../assets/success_logo.png"
          alt=""
          style="right: 0"
          class="result__image success"/>
      </div>
    </div>
    <div v-if="showResults && !success" class="result">
      <div>
        <h3 style="margin-top: 0">Skoro to vyšlo. Zkuste to znovu.</h3>
        <div
          class="result__text"
          style="margin-bottom: 1rem; margin-right: 1rem">
          Opakování je matka moudrosti. Zkuste to znovu. Tentokrát to určitě vyjde. Nesprávné odpovědi jsou označeny červeně.
        </div>
        <button class="again-button" @click="$router.go()">
          Zkusit znovu
        </button>
        <button class="video-button" @click="$router.go(-1)">
          Přehrát video
        </button>
      </div>
      <div style="position: relative">
        <img
          src="../assets/failed_chapter_test.svg"
          style="right: 0"
          alt=""
          class="result__image fail"/>
      </div>
    </div>
    <hr v-if="!showResults" />

    <div v-for="(q, i) in questions" :key="q">
      <div style="color: #808b9d">otázka č. {{ i + 1 }}</div>
      <h3 style="margin-top: 0">{{ q.text }}</h3>
      <!-- <div
        v-if="showResults && evaluateQuestion(questions[i])"
        class="correct-answer-container">
        <div class="correct-answer">
          <img src="../assets/success_logo.svg" alt="" />
          <div>
            Výborně, to je správně! Cras elementum. Vivamus porttitor turpis ac
            leo. Curabitur
          </div>
        </div>
      </div> -->
      <!-- <div
        v-if="showResults && !evaluateQuestion(questions[i])"
        class="wrong-answer-container">
        <div class="wrong-answer">
          <img src="../assets/fail_logo.svg" alt="" />
          <div>
            To není úplně správně. to je správně! Cras elementum. Vivamus
            porttitor turpis ac leo.
          </div>
        </div>
      </div> -->
      <div
        v-for="(a, j) in q.answers"
        :key="a"
        class="answer"
        @click="selectAnswer(i, j)">
        <div
          :class="{
            answer__circle: true,
            selected: a.selected && !showResults,
            'correct-answer-selected': showResults && a.correct && a.selected,
            'wrong-answer-selected': showResults && !a.correct && a.selected,
          }"
          style="font-family: Roboto Slab">
          {{ String.fromCharCode(65 + j) }}
        </div>
        <div style="color: #808b9d">{{ a.text }}</div>
      </div>
      <hr style="margin-top: 2.3rem; margin-bottom: 2.3em" />
    </div>
    <button
      :style="{ 'margin-bottom': '6rem', width: '13rem', height: '2.8rem' }"
      :class="{ 'is-complete': !isComplete || showResults }"
      :disabled="!isComplete || showResults"
      @click="send">
      Odeslat
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import VueScrollTo from 'vue-scrollto'
import server from '../common/server';
import { areAllChaptersFinished } from '../common/functions';

export default {
  name: 'ChapterTest',
  mounted() {},
  data() {
    return {
      questions: [],
      expands: [],
      showResults: false,
      success: false,
      done: false,
      selectedAnswers: [],
    };
  },
  computed: {
    ...mapGetters([
      'currentWorkshop',
      'user',
      'chapterResults',
      'currentChapter',
      'currentChapterIndex',
    ]),
    isComplete() {
      let isComplete = false;

      let isSelected = false;
      for (let i = 0; i < this.questions.length; i++) {
        isSelected = false;
        for (let j = 0; j < this.questions[i].answers.length; j++) {
          if (this.questions[i].answers[j].selected) {
            isSelected = true;
            break;
          }
        }
        if (!isSelected) {
          break;
        }
      }

      if (isSelected) {
        isComplete = true;
      }

      return isComplete;
    },
  },
  watch: {
    '$route.params': {
      async handler() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) === true) {
          const element = document.getElementById('chapter-title')
          VueScrollTo.scrollTo(element, 600,  {
            container: 'body',
            easing: 'ease',
            cancelable: false,
            offset: -120,
            x: false,
            y: true,
        })
        }

        if (this.chapterResults[this.currentChapterIndex].testCompleted) {
          try {
            const response = await server.get(
              `chapter-entries/${this.currentChapter.id}`,
            );
            this.questions = response.data
          } catch (error) {
            console.error(error);
          }

          this.showResults = true;
          this.success = true;
        } else {
          this.showResults = false;
          this.success = false;
          this.questions = this.currentWorkshop.chapters[
            this.currentChapterIndex
          ].questions
            .sort(() => Math.random() - Math.random())
            .slice(0, 3);
          this.questions.forEach((q) => {
            q.answers.forEach((a) => {
              a.selected = false;
            });
          });
        }
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(['setChapterResults']),
    ...mapMutations([
      'UPDATE_CHAPTER_RESULT',
      'UPDATE_CURRENT_CHAPTER',
      'SET_CURRENT_CHAPTER_INDEX',
      'SET_CURRENT_CHAPTER',
    ]),
    goToNextChapter() {
      this.SET_CURRENT_CHAPTER_INDEX(this.currentChapterIndex + 1);
      this.SET_CURRENT_CHAPTER(
        this.currentWorkshop.chapters[this.currentChapterIndex],
      );
      this.$router.push({
        path: `/user/workshops/${this.$route.params.workshopid}/chapters/${
          this.currentWorkshop.chapters[this.currentChapterIndex].id
        }/intro`,
        params: {
          workshopid: this.$route.params.workshopid,
          chapterid: this.currentWorkshop.chapters[this.currentChapterIndex].id,
        },
      });
    },
    evaluateQuestion(question) {
      const selected = question.answers.filter((x) => x.selected === true);

      let isCorrect = true;

      selected.forEach((a) => {
        if (a.selected && !a.correct) isCorrect = false;
      });

      return isCorrect;
    },
    selectAnswer(questionIndex, answerIndex) {
      // const chapter = this.currentChapter
      let selectedAnswerIndex = -1;

      if (this.showResults) return;

      this.questions[questionIndex].answers.forEach((a, i) => {
        if (a.selected) {
          selectedAnswerIndex = i;
        }
      });

      if (!this.questions[questionIndex].answers[answerIndex].selected) {
        if (selectedAnswerIndex !== -1)
          this.questions[questionIndex].answers[
            selectedAnswerIndex
          ].selected = false;
        this.questions[questionIndex].answers[answerIndex].selected = true;
      } else if (this.questions[questionIndex].answers[answerIndex].selected) {
        this.questions[questionIndex].answers[answerIndex].selected =
          !this.questions[questionIndex].answers[answerIndex].selected;
      }

      this.UPDATE_CURRENT_CHAPTER({ questions: this.questions });
    },
    goToKnowledge() {
      this.$router.push({
        path: `/user/workshops/${this.currentWorkshop.id}/chapters/${this.currentChapter.id}/knowledge`,
      });
    },
    async evaluateAnswers() {
      let success = false;
      this.selectedAnswers = [];

      let correctAnswer = true;
      for (let i = 0; i < this.questions.length; i++) {

        for (let j = 0; j < this.questions[i].answers.length; j++) {
          if (this.questions[i].answers[j].selected) {
            this.selectedAnswers.push(this.questions[i].answers[j]);
          }
          if (
            this.questions[i].answers[j].selected &&
            !this.questions[i].answers[j].correct
          ) {
            correctAnswer = false;
            // break;
          }
        }

        // if (!correctAnswer) {
        //   break;
        // }
      }

      try {
        await server.post(`/chapter-entries/`, {
          chapterId: this.currentChapter.id,
          answers: this.selectedAnswers,
        });
      } catch (error) {
        console.error(error);
      }

      if (correctAnswer) {
        success = true;
      }


      return success;
    },
    async send() {

      const result = await this.evaluateAnswers()

      // Check that answers are correct
      if (result) {
        try {
          if (!this.chapterResults[this.currentChapterIndex].testCompleted) {
            const response = await server.put(
              `/chapter-results/${
                this.chapterResults[this.currentChapterIndex].id
              }`,
              {
                testCompleted: true,
              },
            );
            this.UPDATE_CHAPTER_RESULT({
              data: response.data,
              index: this.currentChapterIndex,
            });
          }
          await this.setChapterResults({
            userId: this.user.id,
            workshopId: this.currentWorkshop.workshop.id,
          });

          if (areAllChaptersFinished(this.chapterResults)) {
            this.done = true;

          }

          this.success = true;
        } catch (error) {
          console.error(error);
        }
      } else {
        // this.$router.push({path: `/user/workshops/${this.currentWorkshop.workshop.id}/chapters/${this.currentChapter.id}/failed`})
      }
      const chapterTitle = document.getElementById("chapter-title")
      VueScrollTo.scrollTo(chapterTitle, 600,{
            container: 'body',
            easing: 'ease',
            cancelable: false,
            offset: -120,
            x: false,
            y: true,
        })

      this.showResults = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.correct-answer {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #55d646;
  background: #c8f5c3;
  padding: 1.5rem 1rem;
  border-radius: 24px;

  img {
    width: 2.3rem;
    height: 2.3rem;
    margin-right: 1rem;
  }
}

.correct-answer-container {
  margin-bottom: 1.5rem;
}

.wrong-answer-container {
  margin-bottom: 1.5rem;
}

.wrong-answer {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #ef5a64;
  background: #fcbbc0;
  padding: 1.5rem 1rem;
  border-radius: 24px;

  img {
    width: 2.3rem;
    height: 2.3rem;
    margin-right: 1rem;
  }
}

.success {
  position: absolute;
  height: 20rem;
  bottom: -24% !important;
}

.fail {
  position: absolute;
  height: 20rem;
  bottom: -24% !important;
}

.result {
  background: #e4eaf2;
  padding: 3rem 4rem;
  border-radius: 24px;
  margin-bottom: 2rem;
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr;

  &__image {
    position: absolute;
    /* left: 40%;
    bottom: -50%; */
  }

  &__text {
    color: #808b9d;
  }
}

.active {
  background: $color3;
  border-radius: 8px;
}

.selected {
  background: black !important;
  color: white !important;
  -webkit-box-shadow: 0px 6px 15px 1px rgba(23, 23, 34, 0.35); /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
  -moz-box-shadow: 0px 6px 15px 1px rgba(23, 23, 34, 0.35); /* Firefox 3.5 - 3.6 */
  box-shadow: 0px 6px 15px 1px rgba(23, 23, 34, 0.35); /* Opera 10.5, IE 9, Firefox 4+, Chrome 6+, iOS 5 */
}

.correct-answer-selected {
  background: #55d646 !important;
  color: white !important;
  -webkit-box-shadow: 0px 6px 15px 1px #55d646; /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
  -moz-box-shadow: 0px 6px 15px 1px #55d646; /* Firefox 3.5 - 3.6 */
  box-shadow: 0px 6px 15px 1px #55d646; /* Opera 10.5, IE 9, Firefox 4+, Chrome 6+, iOS 5 */
}

.wrong-answer-selected {
  background: #ef5a64 !important;
  color: white !important;
  -webkit-box-shadow: 0px 6px 15px 1px #f47079; /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
  -moz-box-shadow: 0px 6px 15px 1px #f47079; /* Firefox 3.5 - 3.6 */
  box-shadow: 0px 6px 15px 1px #f47079; /* Opera 10.5, IE 9, Firefox 4+, Chrome 6+, iOS 5 */
}

.is-complete {
  background: #808b9d;
  border-color: #808b9d;
  cursor: not-allowed;
}

.paragraph {
  color: $color2;

  margin-bottom: 45px;
}

.again-button {
  margin-right: 1rem;
}

.video-button {
  background: transparent;
  color: black;
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

.knowledge {
  .answer {
    display: flex;
    align-items: center;
    margin-bottom: 0.8rem;
    cursor: pointer;

    &__circle {
      min-width: 40px;
      min-height: 40px;
      border-radius: 50%;
      background: $color4;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 1rem;
      color: $color2;
      transition: all 0.4s ease-in-out;
    }
  }

  .answer:hover .answer__circle {
    /* background: black;
    color: white; */
    -webkit-box-shadow: 0px 6px 15px 1px rgba(23, 23, 34, 0.35); /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
    -moz-box-shadow: 0px 6px 15px 1px rgba(23, 23, 34, 0.35); /* Firefox 3.5 - 3.6 */
    box-shadow: 0px 6px 15px 1px rgba(23, 23, 34, 0.35); /* Opera 10.5, IE 9, Firefox 4+, Chrome 6+, iOS 5 */
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

@media (max-width: 768px) {
  .knowledge__content {
    grid-template-columns: 1fr;

    .content__right {
      grid-row-start: 1;
    }
  }

  .result {
    width: 100%;

    grid-template-columns: 1fr;

    &__image {
      display: none;
    }
  }
}

@media (max-width: 425px) {
  .again-button {
    margin-bottom: .5rem;
    margin-right: 0;
  }
}
</style>
