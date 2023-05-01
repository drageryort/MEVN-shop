<template>
    <component :is="'CommonLayout'"/>
</template>
<script>
import CommonLayout from "@/layouts/CommonLayout";
export default {
  name: "App",
  components: {
    CommonLayout
  },
  computed: {
    layout() {
      return this.$route["meta"]["layout"]
    }
  },
  created() {
    if(localStorage.getItem('token')){
      this.$store.dispatch('userIsAuthAction');
    }
  }
}
</script>


<style lang="scss">
@import './assets/styles/common/fonts/fonts.min.css';
@import './assets/styles/common/global/global.min.css';
</style>