<template>
  <div class="faq" style="max-height: 100%">
    <div style="margin-bottom:6rem; width: 100%" >
      <h1  style="margin-top: 150px" >Často kladené otázky</h1>
      <div class="question" @click="expands[0] = !expands[0]">
        <div class="question__heading">
          <div class="circle">
            1
          </div>
          <div class="faq-title" style="margin-left: 1rem;">Jak začnu?</div>
          <div style="flex:1"></div>
          <img src="../assets/arrow.svg" :class="{expand: true, rotate: expands[0]}"  >
        </div>


        <div :class="{expanded: true, open: expands[0]}">
          <div :class="{'question__text': true, open: expands[0]}">
            Je to jednoduché. Vpravo nahoře klikněte na tlačítko "Registrovat" a systém už vás interaktivně provede registračním procesem. Celé to je o třech jednoduchých krocích.
          </div>
        </div>

      </div>
      <div class="question" @click="expands[1] = !expands[1]">
        <div class="question__heading">
          <div class="circle">
            2
          </div>
          <div class="faq-title" style="margin-left: 1rem">Jaký kurz si vybrat?</div>
          <div style="flex:1"></div>
          <img src="../assets/arrow.svg" :class="{expand: true, rotate: expands[1]}"  >
        </div>


        <div :class="{expanded: true, open: expands[1]}">
          <div :class="{'question__text': true, open: expands[1]}">
            Řiďte se štítky, které jsou u našich kurzů. Nejen, že jsou jimi kurzy tematicky rozděleny, ale ukazují i náročnost kurzu.
          </div>
        </div>

      </div>
      <div class="question" @click="expands[2] = !expands[2]">
        <div class="question__heading">
          <div class="circle">
            3
          </div>
          <div class="faq-title" style="margin-left: 1rem">S čím začít?</div>
          <div style="flex:1"></div>
          <img src="../assets/arrow.svg" :class="{expand: true, rotate: expands[2]}"  >
        </div>


        <div :class="{expanded: true, open: expands[2]}">
          <div :class="{'question__text': true, open: expands[2]}">
            Pokud si nejste jisti ani dle štítků, doporučujeme projít naším úvodním kurzem k základům internetu. :)
          </div>
        </div>

      </div>
      <div class="question" @click="expands[3] = !expands[3]">
        <div class="question__heading">
          <div class="circle">
            4
          </div>
          <div class="faq-title" style="margin-left: 1rem">Zapomněl jsem heslo</div>
          <div style="flex:1"></div>
          <img src="../assets/arrow.svg" :class="{expand: true, rotate: expands[3]}"  >
        </div>


        <div :class="{expanded: true, open: expands[3]}">
          <div :class="{'question__text': true, open: expands[3]}">
            To nevadí, stane se. Zažádejte o nové kliknutím na "Zapomenuté heslo" a systém vám vygeneruje nové, které si pak můžete v sekci "Můj profil" změnit.
          </div>
        </div>

      </div>
      <div class="question" @click="expands[4] = !expands[4]">
        <div class="question__heading">
          <div class="circle">
            5
          </div>
          <div class="faq-title" style="margin-left: 1rem">Kurz jsem dokončil, ale nevygeneroval se mi certifikát</div>
          <div style="flex:1"></div>
          <img src="../assets/arrow.svg" :class="{expand: true, rotate: expands[4]}"  >
        </div>


        <div :class="{expanded: true, open: expands[4]}">
          <div :class="{'question__text': true, open: expands[4]}">
            To je zvláštní! a vypadá to na chybu na naší straně. Pokud se Vám něco takového stane, kontaktujte nás na cesky@internetovyinstitut.cz.
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

export default {
  created() {
    this.expands = new Array(5)
    this.expands = this.expands.fill(false)
  },

  data() {
    return {
      expands: []
    };
  }

};
</script>

<style lang="scss" scoped>
.faq-title {
  font-weight: 500;
}

.rotate {
        transform: rotate(-180deg);
        transition: 0.3s all;
}

.expanded {
  display: flex;
  max-height:0;
  overflow: hidden;
  transition: max-height .4s ease-in-out;

}

.expanded.open {

  max-height: 500px;
}


.faq {
  width: 100%;
  font-weight: 300;
}


.expand {
  margin-right: 1rem;
  width: 1.2rem;
  height: 1.2rem;

  transition: .3s ease-in-out;
}

.question {
  width: 100%;
  border: 1.5px solid #B6C1D1;
  margin-bottom: 1rem;
  min-height: 3rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: .7rem 0.5rem;
  width: 100%;
  justify-content: center;
  cursor: pointer;

  &__text {
    margin-left: 3.4rem; color: #808B9D; font-size: .9em; margin-top: .5rem;
    opacity: 0;
    transition: opacity .4s linear;
    transition-delay: .2s;
  }

  &__text.open {

    opacity: 1;
  }

  &__heading {

    display: flex;
    flex-direction: row;
    align-items: center;


    .circle {
      min-width: 2.5rem;
      min-height: 2.5rem;
      background: #E1E6ED;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

  }
}

.answer {
  max-width: 50%;
  font-size: 20;
  color: #808b9d;
  margin-bottom: 3rem;
}

@media (max-width: 1024px) {
  .faq {
    margin: 0 1.5rem;
  }
}
</style>
