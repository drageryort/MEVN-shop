import {createStore} from "vuex"

export default createStore({
  state: {
    productCardsList: [],
    productCard: {},
    filterListData: {}
  },
  getters: {
    productCardsList(state) {
      return state.productCardsList;
    },
    productCard(state) {
      return state.productCard;
    },
    filterCategoriesList(state) {
      return state.filterListData;
    }
  },
  mutations: {
    fetchProductCardsList(state, productCardsList) {
      state.productCardsList = productCardsList;
    },
    fetchFilterCategoriesList(state, {productCardsList, queryParams}) {
      const filterListData = {};
      filterListData.list = {};


      const categoryFilterListData = productCardsList.map(el => el['commonParams']['category']);
      filterListData['list']['category'] = (Array.from([...new Set(categoryFilterListData)])).map(el => {
          if(queryParams['category'] && queryParams['category'].includes(el)){
            return {
              value:el,
              checked: true
            }
          }
          return {
            value:el,
            checked: false
          }
      });

      const brandFilterListData = productCardsList.map(el => el['commonParams']['brand']);
      filterListData['list']['brand'] = (Array.from([...new Set(brandFilterListData)])).map(el => {
        if(queryParams['brand'] && queryParams['brand'].includes(el)){
          return {
            value:el,
            checked: true
          }
        }
        return {
          value:el,
          checked: false
        }
      });


      const priceFilterListData = productCardsList.map(el => Number(el['commonParams']['price'].replace(/ /g,'')));
      if(queryParams['minPrice'] && queryParams['maxPrice']){
        filterListData.minCurrent = Number(queryParams['minPrice']);
        filterListData.maxCurrent = Number(queryParams['maxPrice']);
      } else{
        filterListData.maxCurrent = Math.max(...priceFilterListData);
        filterListData.minCurrent = Math.min(...priceFilterListData);
      }
      filterListData.min = Math.min(...priceFilterListData);
      filterListData.max = Math.max(...priceFilterListData);


      state.filterListData = filterListData;
    },
    fetchProductCard(state, productCard) {
      state.productCard = productCard;
    }
  },
  actions: {
    async fetchCardsListAction({commit}) {
      try {
          const productCardsList = await ((await fetch("http://localhost:3000/products/getCards")).json());
          commit("fetchProductCardsList", productCardsList);
      } catch (e) {
        console.log(e);
      }
    },
    async fetchFilterListAction({commit}, queryParams) {
      try {
        const productCardsList = await ((await fetch("http://localhost:3000/products/getCards")).json());
        commit("fetchFilterCategoriesList", {productCardsList,queryParams});
      } catch (e) {
        console.log(e);
      }
    },
    async fetchCardAction({commit}, routeParam) {
      try {
        const productCard = await ((await fetch(`http://localhost:3000/products/getCard/${routeParam}`)).json())
        commit("fetchProductCard", productCard);
      } catch (e) {
        console.log(e);
      }
    },
    async fetchFilteredCardsListAction ({commit}, queryString) {
      try {
        const productCardsList = await ((await fetch("http://localhost:3000/products/filterCards/?" + queryString)).json());
        commit("fetchProductCardsList", productCardsList);
      } catch (e) {
        console.log(e);
      }
    }
  }
})