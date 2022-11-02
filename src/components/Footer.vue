<template>
  <footer class="footer">
    <div class="footer__content">
      <div class="left-links">
        <img src="../assets/studiooo-logo.svg" style="height: 20px" class="footer-logo" />
        <div class="left-links__text">
          <router-link :to="{ path: '/faq'}" style="margin-right: 40px" class="footer-link">FAQ</router-link>
          <router-link :to="{ path: '/contract'}" class="footer-link-contract">Ochrana soukromí a smluvní podmínky</router-link>
        </div>
      </div>
      <div
          class="footer-socials">
        <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/internetovyinstitut/">
          <img src="../assets/facebook.svg" />
        </a>
        <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/cesky_ii">
          <img src="../assets/twitter.svg" />
        </a>
        <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/company/internetovyinstitut/about/">
          <img src="../assets/linkedin.svg" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="scss" scoped>
.footer {
  height: $header-footer-height;
  background: $color1;
  color: $color2;
  width: 100%;
  font-weight: 300;


  &__content {
    max-width: 1920px;
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.footer-socials {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 150px;
}

.left-links {
  display: flex;
  align-items: center;
  flex-direction: row;

}

.left-links__text {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 110px;
}

.footer-link-contract {
    min-width: 20rem;

}

@media (max-width: 1024px) {
  .footer__content {
  margin: 0rem 2rem;
  }
}


@media (max-width: 768px) {
  .footer {
    height:10rem

  }

  .footer-link {
    margin-bottom: 1rem;
  }

  .footer-logo {
    margin-bottom: 2rem;
    height: 2rem !important;
  }

  .footer-link-contract {
    min-width: 17rem;
    margin-bottom: 1rem;
  }



  .footer__content {
    flex-direction: column;
    align-items: flex-start;
    margin: 0 1.5rem;
  }

  .left-links {
    flex-direction: column;
    align-items: flex-start;
    width: auto;
  }

  .left-links__text {
    flex-direction:  column;
    align-items: flex-start;
    margin-left: 0;
  }
  .footer-socials {
  margin-bottom: 5rem;
  }
}


</style>
