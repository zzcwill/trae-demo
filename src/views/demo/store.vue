<template>
  <div>
    <div>store</div>
    <div>userInfo.token</div>
    <div>{{ userInfo.token }}</div>
    <div>userInfo2.token</div>
    <div>{{ userInfo2.token }}</div>
    <div>appInfo.name</div>
    <div>{{ appInfo.name }}</div>
    <br />
    <div>filter</div>
    <div>{{ code }}</div>
    <div>{{ code | codeFilter }}</div>
    <!-- 全局过滤器直接使用 -->
    <div>{{ code | buyfilter }}</div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'store',
  data() {
    return {
      code: 1
    };
  },
  computed: {
    ...mapGetters(['userInfo']),
    userInfo2() {
      return this.$store.state.user.userInfo;
    },
    ...mapState({
      appInfo: (state) => state.app.appInfo
    })
  },
  filters: {
    codeFilter: function (value) {
      let arr = ['no', 'yes'];
      return arr[value] || '-';
    }
  },
  created() {
    this.actionByAppInfo({
      name: 'appTest'
    });
  },
  mounted() {},
  destroyed() {},
  methods: {
    ...mapActions(['actionByAppInfo'])
  }
};
</script>

<style lang="less" scoped></style>
