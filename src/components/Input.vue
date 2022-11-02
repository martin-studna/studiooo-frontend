<template>
  <div class="input-wrapper">
    <div class="placeholder">{{ placeholder }}</div>
    <input :type="type" class="input" :value="value" @input="onInput" />
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
    },
    value: {
      type: String,
    },
  },
  methods: {
    onInput(event) {
      this.$emit('update:value', event.target.value);
    },
    // onChange(event) { // Supports .lazy
    //   // Can add validation here
    //   this.$emit('change', event.target.value);
    // },
  }
};
</script>

<style lang="scss" scoped>
.input-wrapper {
  background: $color3;
  border-radius: 14px;
  padding: 10px 20px;
  
  width: 300px;
}

.input {
  text-decoration: none;
  border: none;
  background: transparent;
  
  width: 100%;
  flex: 0 1;
  font-size: 16px;
  margin-top: 3px;
  outline: none;
  padding: 0;
}

.input:focus {
  outline: none;
}

.placeholder {
  font-size: 10px;
  color: #707070;
}
</style>
