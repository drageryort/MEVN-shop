<template>
  <div class="layout">
    <div class="layout-main">
      <AppHeader/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";

export default {
  name: "CommonLayout",
  components: { AppHeader}
}
</script>

<style lang="scss">

.layout {
  display: flex;
  height: 100vh;
  .layout-main {
    padding: 24px 32px;
    background: var(--color-home-gray);
    color: var(--color-white);
    width: calc(100% - 40px);
    overflow-y: scroll;
  }
}
</style>