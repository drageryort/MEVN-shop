<template>
  <div class="design_page">
    <div class="navigation">
      <div class="btn" @click="$router.back()">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
          <path fill="#222" fill-rule="evenodd" d="M4.364 11.364a.9.9 0 0 0 0 1.272l6 6 1.272-1.272L7.273 13H20v-2H7.273l4.363-4.364-1.272-1.272-6 6Z" clip-rule="evenodd"/>
        </svg>
      </div>
    </div>
    <div class="main">
      <div class="top_block">
        <div class="preview_picture_wrapper">
          <picture class="preview_picture">
            <img class="preview_image" :src="productCard['imageSrc']" alt="preview image">
          </picture>
          <span class="promo" v-if="productCard['promo']">Promo</span>
        </div>
        <div class="info_list_block">
          <h2 class="title">{{productCard['title']}}</h2>
          <h3 class="sub_title">Characteristics:</h3>
          <ul class="info_list">
            <li class="info_list_el"
                v-for="(value, name) of productCard['commonParams']"
                :key="name + productCard['_id']"
            >
              <span class="info_list_el_name">{{name}}</span>: <span class="info_list_el_value">{{value}}</span>
            </li>
            <li class="info_list_el"
                v-for="(value, name) of productCard['customParams']"
                :key="name + productCard['_id']"
            >
              <span class="info_list_el_name">{{name}}</span>: <span class="info_list_el_value">{{value}}</span>
            </li>
          </ul>
        </div>
      </div>
      <p class="description_block">{{productCard['description']}}</p>
    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex";

export default{
  name: 'ProductCardView',
  components: {},
  computed: {
    pathParam () {
      return this.$route['params']['id'];
    },
    ...mapGetters({
      productCard: "productCard"
    })

  },
  beforeMount() {
    this.$store.dispatch('fetchProductCardAction', this.pathParam);
  }
}
</script>

<style lang="scss" scoped>
.design_page{
  display: flex;
  padding: 24px 32px;
  .navigation{
    padding: 0 32px;
    svg{}
  }
  .main{
    display: flex;
    flex-direction: column;
    row-gap: 40px;
    width: 100%;
    padding: 0 32px;
    .top_block{
      display: flex;
      column-gap: 40px;
      padding: 20px 40px;
      .preview_picture_wrapper{
        width: 40%;
        .preview_picture{
          .preview_image{
            height: max-content;
            max-height: 250px;
          }
        }
        .promo{
          padding: 5px 10px;
          background: var(--color-red);
          border-radius: 15px;
          font-weight: bold;
          font-size: 12px;
          color: var(--color-white);
          position: absolute;
          top: 0;
          left: 0;
        }
      }
      .info_list_block{
        .title{
          font-size: 24px;
          font-weight: 600;
        }
        .sub_title{
          margin: 20px 0 0;
          font-size: 20px;
          font-weight: 500;
        }
        .info_list{
          .info_list_el{
            .info_list_el_name{
              font-weight: 500;
              text-transform: capitalize;
            }
            .info_list_el_value{

            }
          }
        }
      }
    }
  }
}
</style>