<template>
  <div style="display:flex; flex-direction: column">
    <div class="heading">
      <h1>Internetový institut - Pro pochopení života s internetem</h1>
    </div>
    <div class="aboutii__body">
      <h2>O nás a ii</h2>
      <div class="description__1">
        <div style="max-width: 900px">
          <div style="margin-bottom: 30px">
            Online a offline život se již nedá rozlišit. Proto se zaměřujeme na
            odhalení jejich souvislostí a reálných důsledků. Jedině skrze
            pochopení těchto souvislostí jsme schopni jako společnost na ně
            reagovat a činit efektivní rozhodnutí pro naši budoucnost ať už v
            oblasti ekonomiky, vzdělávání či mnoho dalších. Žijeme v době, kdy
            nám internet transformuje životy, ať jsme toho aktivními účastníky,
            či ne.
          </div>
          <div>
            Jsme nezávislá a nezisková organizace. Náš funding je projektový.
          </div>
        </div>
        <!-- <IIAboutLogo style="max-width: 500px; max-height: 200px" /> -->
        <img
          src="../assets/ii-about-logo.svg"
          alt="ii-about-logo"
          style="max-width: 500px; max-height: 200px"/>
      </div>

      <h2>Naše Aktivity</h2>
      <div class="description__2">
        <div style="margin-bottom: 30px">
          Komunikujeme & artikulujeme: Spolu s partnery vedeme
          multidisciplinární výzkum a analýzy, mostíme komunikační bariéru mezi
          sektory a vytváříme kanál pro evidence based policy. Sdružujeme a
          propojujeme akademickou, privátní a vládní sféru pro rozvoj
          relevantních debat.
        </div>
        <div>
          Vedeme výzkum & Osvětu: Pro relevantní reprezentaci faktů je třeba
          relevantních poznatků. Rozvoj expertízy s tím úzce souvisí a proto
          přednášíme i školíme ve všech úrovních poznání.
        </div>
      </div>
    </div>
    <div class="footer">
      <button
        class="button-ii"
        @click="openII">
        www.internetovyinstitut.cz
      </button>
    </div>
  </div>
</template>

<script>
// import IIAboutLogo from '../assets/ii-about-logo.svg';

export default {
  name: 'AboutII',
  // components: { IIAboutLogo },
  data() {
    return {
      fullname: '',
    };
  },
  methods: {
    openII() {
      window.open('https://internetovyinstitut.cz', '_blank')
    }
  }
};
</script>

<style lang="scss" scoped>
.heading {
  width: 100%;
  display: flex;
  align-items: center;
  height: 140px;
  margin-top: 7rem;
}

.aboutii__body {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-right: 40px;
}

.description__1 {
  color: $color2;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.description__2 {
  color: $color2;
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.button-ii {
  width: auto;
  padding: 0 90px;
}

#app {
  padding: 0 !important;
}
</style>
