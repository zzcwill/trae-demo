<template>
  <div class="record">
    <div class="item">
      {{ txt }}
    </div>
    <div class="item" @click="changeAyncTxt">子组件改变父组件值</div>
  </div>
</template>
<script>
export default {
  name: 'syncTxt',
  props: {
    txt: {
      type: String,
      default: ''
    }
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    changeAyncTxt() {
      let txt = 'test';
      this.$emit('update:txt', txt);
    }
  }
};
</script>
<style lang="less" scoped>
.record {
  display: flex;
  justify-content: center;
}
.item {
  margin-right: 30px;
  color: #059f87;
}
.item span {
  margin-left: 6px;
  font-size: 24px;
  color: #feab1a;
}
</style>
