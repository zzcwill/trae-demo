<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'app',
  computed: {
    ...mapGetters(['token'])
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      await this.$store.dispatch('actionByUserInfo');
    }
  }
};
</script>

<style lang="less"></style>
