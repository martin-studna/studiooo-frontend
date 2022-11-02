<template>
  <div class="select-wrapper">
    <div class="select-placeholder">{{ placeholder }}</div>
    <select class="select" @change="selectOption"  >
      <option
        v-for="v in values"
        :value="v"
        :selected="value === v"
        :key="v">
        {{ v }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    placeholder: {
      type: String,
    },
    value: {
      type: String,
      default: '',
    },
    values: {
      type: Array,
    },
  },
  methods: {
    selectOption(event) {
      this.$emit('update:value', event.target.value)
    }
  }
};
</script>

<style lang="scss" scoped>
.select-wrapper {
  background: $color3;
  border-radius: 14px;
  width: 300px;
  
  padding: 10px 20px;
}

.select-placeholder {
  font-size: 10px;
  color: #707070;
}

.select {
  border: none;
  background: transparent;
  width: 100%;
  font-size: 16px;
  margin-top: 3px;
  padding: 0;
  outline: none;

  &:focus {
    outline: none;
  }
}
</style>
