<template>
  <div>
    <syncTxt :txt.sync="txt" />
  </div>
</template>

<script>
import syncTxt from '@/components/syncTxt';

export default {
  name: 'sync',
  data() {
    return {
      txt: 'zzc'
    };
  },
  components: {
    syncTxt
  },
  filters: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {}
};
</script>

<style lang="less" scoped></style>
