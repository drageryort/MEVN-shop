<template>
  <div class="home">
    <div class="home_top_bar">
      <h1 class="home_top_bar_title">Catalog</h1>
    </div>
    <div class="main">
      <div class="navbar">
        <AppFilterBar
            :productFilterList="productCardsList"
        />
      </div>
      <div class="product_card_list">
        <AppProductCard v-for="cardData in productCardsList"
                        :key="cardData['_id']"
                        :cardData="cardData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import AppProductCard from '@/components/homeView/AppProductCard'
import AppFilterBar from '@/components/homeView/AppFilterBar'
import { serialize } from 'object-to-formdata';

export default {
  name: 'HomeView',
  components: {
    AppProductCard,
    AppFilterBar
  },
  computed: {
    queryParam() {
      return this.$route['query']
    },
    ...mapGetters({
      productCardsList: 'productCardsList',
    }),
  },
  mounted() {
      const queryString = new URLSearchParams(serialize(this.queryParam)).toString();
      this.$store.dispatch('fetchProductCardsListAction', queryString);
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 24px 32px;
  background: var(--color-home-gray);
  color: var(--color-white);

  .home_top_bar {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 20px;

    .home_top_bar_title {
      font-size: 24px;
      line-height: 40px;
      color: var(--color-white);
    }
  }

  .main {
    display: flex;
    column-gap: 30px;

    .navbar {
      width: 200px;
    }

    .product_card_list {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      width: calc(100% - 200px - 30px);
    }
  }

}
</style>
