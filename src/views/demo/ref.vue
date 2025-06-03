<template>
  <div>
    <record ref="refRecord" />

    <div class="m-t-10 text-c" @click="getRecord" ref="refRecordTxt" data-id="txt">getRecord</div>
  </div>
</template>

<script>
import record from '@/components/record';
import lodash from 'lodash';

export default {
  name: 'refPage',
  data() {
    return {
      code: 1
    };
  },
  components: {
    record
  },
  filters: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    getRecord() {
      // 获取dom
      console.info(this.$refs.refRecordTxt);
      console.info(this.$refs.refRecordTxt.innerText);
      console.info(this.$refs.refRecordTxt.getAttribute('class'));
      console.info(this.$refs.refRecordTxt.getAttribute('data-id'));
      console.info('----');
      // 获取子组件方法
      this.$refs.refRecord.getData();
      const numData = lodash.cloneDeep(this.$refs.refRecord.numData);
      console.info('numData', numData);
    }
  }
};
</script>

<style lang="less" scoped></style>
