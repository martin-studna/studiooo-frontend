<template>
  <div style="max-height: 100%">
    <main class="main">
      <div class="form" data-aos="fade-left" data-aos-delay="200">
        <h1 style="font-size: 2.2em">Email pro obnovu hesla odeslán!</h1>
      </div>
    </main>
  </div>
</template>

<script>



export default {
  computed: {
  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  height: 100vh;
}
.input {
  border: none;
  background: $color3;
  padding: 15px 14px;
  border-radius: 12px;
  font-size: 12px;
  width: 200px;

  color: #707070;

  &:focus {
    outline: none;
    color: black;
  }
}

@media (max-width: 768px) {
  .form {
    margin: 0 1rem;
  }
}

@media (max-width: 425px) {
  .input {
    width: 100%;
  }
}
</style>
