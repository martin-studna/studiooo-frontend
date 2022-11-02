<template>
  <div class="knowledge">
    <h1 >{{ currentWorkshop.workshop.title }}</h1>
    <div v-if="showResults && success" class="result">
      <div>
        <h3>Gratulujeme! Zvládli jste to.</h3>
        <div class="result__text">Gratulujeme! Máte za sebou kurz Dynamika internetu. Podařilo se vám získat odznak, který najdete na stránce "Můj profil".</div>
        <button style="width: 15rem; margin-top: 2rem">Vyzvednout certifikát</button>
      </div>
      <div style="position: relative">
        <img src="../assets/workshop_test_completed.svg" alt="" class="result__image success">

      </div>
    </div>
    <div v-if="showResults && !success" class="result">
      <div>
        <h3 style="margin-top: 0">Nevzdávejte se!</h3>
        <div class="result__text">Podívejte se na zpětnou vazbu u vyznačených otázek a zkuste to znovu. Chcete-li přejít na další téma, musíte správně odpovědět na všechny otázky.</div>
      </div>
      <div style="position: relative">
        <img src="../assets/failed_workshop_test_logo.svg" alt="" class="result__image fail">

      </div>
    </div>
      <div class="questions">
        <div v-for="(q, i) in currentWorkshop.questions" :key="q" style="width: 50rem">
          <div style="color: #808b9d">otázka č. {{ i + 1 }}</div>
          <h3 style="margin-top: 0">{{ q.text }}</h3>
          <div v-if="showResults && evaluateQuestion(currentWorkshop.questions[i])" class="correct-answer-container">
              <div class="correct-answer">
                <img src="../assets/success_logo.svg" alt="">
                <div>Výborně, to je správně!  </div>
              </div>
          </div>
          <div v-if="showResults && !evaluateQuestion(currentWorkshop.questions[i])" class="wrong-answer-container" >
              <div class="wrong-answer">
                <img src="../assets/fail_logo.svg" alt="">
                <div>To není úplně správně. to je správně! </div>
              </div>
          </div>

          <div v-for="(a, j) in q.answers" :key="a" class="answer" @click="selectAnswer(i,j)" >
            <div :class="{answer__circle: true, selected: (a.selected && !showResults), 'correct-answer-selected': (showResults && a.correct && a.selected), 'wrong-answer-selected': (showResults && !a.correct && a.selected)}" style="font-family: Roboto Slab">{{ String.fromCharCode(65 + j) }}</div>
            <div style="color: #808b9d">{{ a.text }}</div>
          </div>
          <hr style="margin-top: 2.3rem; margin-bottom: 2.3em" />
        </div>
        <div style="width: 50%">
        <button :style="{'margin-bottom': '6rem', width: '13rem', height: '2.8rem'}" :class="{'is-complete': !isComplete || showResults}" :disabled="!isComplete || showResults" @click="send">
          Odeslat
        </button>

        </div>
        </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import server from '../common/server';


export default {
  name: 'WorkshopTest',
  created() {
    const questions = this.currentWorkshop.questions.map(q => {
      q.answers = q.answers.map(a => {
        a.selected = false
        return a
      })

      return q
    })

    this.SET_CURRENT_WORKSHOP({...this.currentWorkshop, questions})
  },
  data() {
    return {
      showResults: false,
      expands: [],
      success: false,
    };
  },
  computed: {
    ...mapGetters(['currentWorkshop', 'user', 'workshopResult']),
    isComplete() {
      let isComplete = false

      let isSelected = false
      for (let i = 0; i < this.currentWorkshop.questions.length; i++) {
        isSelected = false
        for (let j = 0; j < this.currentWorkshop.questions[i].answers.length; j++) {
          if (this.currentWorkshop.questions[i].answers[j].selected) {
            isSelected = true
            break
          }
        }
        if (!isSelected) {
          break
        }
      }

      if (isSelected) {
        isComplete = true
      }

      return isComplete
    }
  },
  methods: {
    ...mapMutations(["SET_CURRENT_WORKSHOP" ,"SET_WORKSHOP_RESULT"]),
    selectAnswer(questionIndex, answerIndex) {
      if (this.showResults) return

      let isAnswerSelected = false
      const workshop = this.currentWorkshop


      workshop.questions[questionIndex].answers.forEach(a => {
        if (a.selected)
          isAnswerSelected = true
      })

      if (!isAnswerSelected && !workshop.questions[questionIndex].answers[answerIndex].selected) {
        workshop.questions[questionIndex].answers[answerIndex].selected = true
      }
      else if (isAnswerSelected && workshop.questions[questionIndex].answers[answerIndex].selected) {
        workshop.questions[questionIndex].answers[answerIndex].selected = !workshop.questions[questionIndex].answers[answerIndex].selected
      }

      this.SET_CURRENT_WORKSHOP(workshop)
    },
    evaluateQuestion(question) {
      const selected = question.answers.filter(x => x.selected === true)


      let isCorrect = true

      selected.forEach(a => {
        if (a.selected && !a.correct)
          isCorrect = false
      })

      return isCorrect
    },
    evaluateAnswers() {
      let success = false

      let correctAnswer = false
      for (let i = 0; i < this.currentWorkshop.questions.length; i++) {
        correctAnswer = false
        for (let j = 0; j < this.currentWorkshop.questions[i].answers.length; j++) {

          if (this.currentWorkshop.questions[i].answers[j].selected && this.currentWorkshop.questions[i].answers[j].correct) {
            correctAnswer = true
            break
          }
        }

        if (!correctAnswer) {
          break
        }
      }

      if (correctAnswer) {
        success = true
      }

      return success
    },
    async send() {


      if (this.evaluateAnswers()) {
        try {
          await server.get(`certificate-results?userid=${this.user.id}&workshopid=${this.currentWorkshop.workshop.id}`)

          if (!this.testResults.testCompleted) {
            const response = await server.put(`/workshop-results/${this.workshopResult.id}`, {
              testCompleted: true,
              completed: true
            })
            this.SET_WORKSHOP_RESULT(response.data)
          }

        this.success = true


        } catch (error) {
          console.error(error);
        }
      } else {
        this.success = false
      }

      this.showResults = true
    }
  },
};
</script>

<style lang="scss" scoped>

.correct-answer {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #55D646;
  background: #C8F5C3;
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
  color: #EF5A64;
  background: #FCBBC0;
  padding: 1.5rem 1rem;
  border-radius: 24px;

  img {
    width: 2.3rem;
    height: 2.3rem;
    margin-right: 1rem;
  }
}



.success {
  height: 23rem;
  position:absolute;
  bottom: -24% !important;
}

.fail {
  height: 14.5rem;
}

.result {
  background: #E4EAF2;
  padding: 3rem 4rem;
  border-radius: 24px;
  margin-bottom: 2rem;
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr;

  &__image {
    position: absolute;
    left: 40%;
    bottom: -50%;



  }

  &__text {
    color:#808B9D;
  }
}

.questions {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  background: #55D646 !important;
  color: white !important;
  -webkit-box-shadow: 0px 6px 15px 1px #55D646; /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
  -moz-box-shadow: 0px 6px 15px 1px #55D646; /* Firefox 3.5 - 3.6 */
  box-shadow: 0px 6px 15px 1px #55D646; /* Opera 10.5, IE 9, Firefox 4+, Chrome 6+, iOS 5 */
}

.wrong-answer-selected {
  background: #EF5A64 !important;
  color: white !important;
  -webkit-box-shadow: 0px 6px 15px 1px #F47079; /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
  -moz-box-shadow: 0px 6px 15px 1px #F47079; /* Firefox 3.5 - 3.6 */
  box-shadow: 0px 6px 15px 1px #F47079; /* Opera 10.5, IE 9, Firefox 4+, Chrome 6+, iOS 5 */
}

.is-complete {
background: #808B9D;
border-color: #808B9D;
cursor: not-allowed;
}



.paragraph {
  color: $color2;

  margin-bottom: 45px;
}

.expand {
  color: $color2;
  font-size: 10px;

  &__item {
    padding: .2rem .6rem;
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
}
</style>
