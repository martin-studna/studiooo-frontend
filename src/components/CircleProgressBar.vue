<template>
<div class="percent">
  <svg>
    <circle class="circle-1" cx="70" cy="70" r="70"></circle>
    <circle class="circle-2" cx="70" cy="70" r="70" :stroke-dashoffset="565.48 - (440*(percentage/100))"></circle>
  </svg>
  <div class="number">
    <div style="font-size: 2.6em; font-weight: 600">{{percentage}}<span>%</span></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'CircleProgressBar',
  components: {},
  props: {
    percentage: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    circlePercentage() {
      const r = 70;
      const c = Math.PI*(r*2);
      const pct = ((100-this.percentage)/100)*c;

      return pct
    }
  },
  mounted() {
    
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.circles {
  width: 200px;
  height: 200px;

}
svg {
  position: relative;
  width: 150px;
  height: 150px;
  z-index: 1000;
  transform: rotate(-90deg);
}

svg .circle-1 {
  width: 100%;
  height: 100%;
  fill: none;
  stroke-width: 8;
  stroke-linecap: round;
  stroke-dasharray: 565.48;
  stroke-dashoffset: 100;
  transform: translate(5px, 5px);
  stroke: $color3;
}

svg .circle-2 {
  width: 100%;
  height: 100%;
  fill: none;
  stroke-width: 10;
  stroke-dasharray: 565.48;
  
  stroke-linecap: round;
  transform: translate(5px, 5px);
  stroke: #55D646;
}

.percent {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  
  z-index: 1000;
}

.percent .number {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.percent .number h2 {
  color: black;
  font-weight: 700;
  font-size: 40px;
  transition: 0.5s;
}
</style>