<template>
  <router-link :to="`/product/${cardData['url']}`" class="card">
    <picture class="card_picture">
      <img :src="cardData['imageSrc']" alt="">
    </picture>
    <span class="card_promo" v-if="promoStatus">Promo</span>
    <div class="card_info">
      <div>
        <h2 class="card_title">
          {{cardData['title']}}
        </h2>
      </div>
      <ul class="card_list">
        <li
            v-for="(value, name) of cardData['commonParams']"
            :key="name + cardData['_id']"
        >
          <span>{{name}}</span>: <span>{{value}}</span>
        </li>
      </ul>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'AppProductCard',
  props: {
    cardData: Object
  },
  computed: {
    promoStatus () {
      return this.cardData['promo'];
    }
  }
}
</script>

<style lang="scss" scoped>
  .card{
    width: calc((100% - (20px*2)) / 3);
    .card_picture{
      padding: 15px;
      margin: 0 0 16px;
      height: 200px;
      width: 100%;
      background: var(--color-white);
      border-radius: 15px;
      overflow: hidden;
      filter: drop-shadow(0px 1px 7px rgba(0, 0, 0, 0.05));
      img{}
    }
    .card_promo{
      padding: 5px 10px;
      background: var(--color-red);
      border-radius: 15px;
      font-weight: bold;
      position: absolute;
      top: 0;
      left: 0;
    }
    .card_info{
      .card_views{
        padding: 0 5px;
        background: var(--color-white);
        border-radius: 8px;
        font-size: 11px;
        line-height: 18px;
        color: var(--color-black);
      }
      .card_title{
        font-weight: 400;
        font-size: 16px;
        line-height: 18px;
      }

      .card_list{
        .params_name{

        }
        .params_value{

        }
      }
    }
  }
</style>
