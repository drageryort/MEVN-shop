<template>
  <form @submit.prevent class="filter_form" ref="filterForm">
    <span class="filter_list_title">Price</span>
    <div
        class="data_price_field_wrapper"
        style="display: flex; justify-content: space-between; text-align: center"
    >
      <span
          class="data_price_filed"
          style="
          display: inline-block;
          padding: 10px;
          border: solid 1px;
          border-radius: 5px;
          width: 100px;
          margin: 3px;
        "
      >{{ filtersList['minCurrent'] }}</span
      >
      <span
          class="data_price_filed"
          style="
          display: inline-block;
          padding: 10px;
          border: solid 1px;
          border-radius: 5px;
          width: 100px;
          margin: 3px;
        "
      >{{ filtersList['maxCurrent'] }}</span
      >
    </div>

    <MultiRangeSlider
        baseClassName="multi-range-slider-bar-only"
        :minValue="filtersList['minCurrent']"
        :maxValue="filtersList['maxCurrent']"
        :max="filtersList['max']"
        :min="filtersList['min']"
        :step="1"
        @input="updateBarValues"
    />
    <ul class="filter_list"
        v-for="(filterList,filterName) of filtersList['list']"
        :key="filterName"
    >
      <span class="filter_list_title">{{filterName}}</span>
      <li class="filter_list_el"
          v-for="filterEl of filterList"
          :key="filterEl"
      >
        <label class="btn">
          <input type="checkbox" class="input" :value="filterEl['value']" :name="filterName" :checked="filterEl['checked']">
          <span class="input_name">{{filterEl['value']}}</span>
        </label>
      </li>
    </ul>
    <button class="btn btn_blue" @click="updateFilter" >Update</button>
  </form>
</template>

<script>
import MultiRangeSlider from "multi-range-slider-vue";
import {mapGetters} from "vuex";

export default {
  name: 'AppFilterBar',
  components: {
    MultiRangeSlider
  },
  data () {
    return {}
  },
  computed:{
    ...mapGetters(['filtersList']),
  },
  created() {
    this.$store.dispatch('fetchFiltersListAction', this.$route['query']);
  },
  methods: {
    formDataToObject (formData) {
      let object = {};
      formData.forEach((value, key) => {
        // Reflect.has in favor of: object.hasOwnProperty(key)
        if(!Reflect.has(object, key)){
          object[key] = value;
          return;
        }
        if(!Array.isArray(object[key])){
          object[key] = [object[key]];
        }
        object[key].push(value);
      });
      return object
    },
    updateBarValues(e) {
      this.filtersList['minCurrent'] = e.minValue;
      this.filtersList['maxCurrent'] = e.maxValue;
    },
    updateFilter () {
      const formData = new FormData(this.$refs.filterForm);
      formData.set('minPrice', this.filtersList['minCurrent']);
      formData.set('maxPrice', this.filtersList['maxCurrent']);
      const formDataObject = this.formDataToObject(formData);
      const queryString = new URLSearchParams(formData).toString();
      this.$router.push({ name: "HomeView", query: formDataObject });
      this.$store.dispatch('fetchProductCardsListAction', queryString);
    }
  }
}
</script>

<style lang="scss" scoped>
  .filter_form{
    .btn{
      width: 100%;
    }
    .filter_list_title{
      font-size: 18px;
      font-weight: 600;
      text-transform: capitalize;
    }
    .filter_list{
      padding: 5px 0;
      .filter_list_el{
        padding: 5px 0;
        .input_name{
          margin: 0 0 0 5px;
        }
      }
    }
    .data_price_field_wrapper{
      .data_price_filed{}
    }
  }

</style>
