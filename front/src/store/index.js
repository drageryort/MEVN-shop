import {createStore} from "vuex"
import AuthService from "@/services/AuthService";
import {apiUrl} from "@/http";
import axios from "axios";

export default createStore({
  state: {
    userData: {},
    isAuth: false,
    productCardsList: [],
    productCard: {},
    filtersList: {}
  },
  getters: {
    productCardsList(state) {
      return state.productCardsList;
    },
    productCard(state) {
      return state.productCard;
    },
    filtersList(state) {
      return state.filtersList;
    },
    isAuth(state) {
      return state.isAuth;
    }
  },
  mutations: {
    fetchUserData(state, userData){
      state.userData = userData;
      state.isAuth = !!Object.keys(userData).length;
    },
    fetchProductCardsList(state, productCardsList) {
      state.productCardsList = productCardsList;
    },
    fetchFiltersList(state, {filtersListData, queryParams}) {
      const filtersList = {};
      filtersList.list = {};

      console.log(filtersListData)

      const categoryFilterListData = filtersListData.map(el => el['category']);

      filtersList['list']['category'] = (Array.from([...new Set(categoryFilterListData)])).map(el => {
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

      const brandFilterListData = filtersListData.map(el => el['brand']);

      filtersList['list']['brand'] = (Array.from([...new Set(brandFilterListData)])).map(el => {
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


      const priceFilterListData = filtersListData.map(el => el['price']);
      if(queryParams['minPrice'] && queryParams['maxPrice']){
        filtersList.minCurrent = Number(queryParams['minPrice']);
        filtersList.maxCurrent = Number(queryParams['maxPrice']);
      } else{
        filtersList.maxCurrent = Math.max(...priceFilterListData);
        filtersList.minCurrent = Math.min(...priceFilterListData);
      }
      filtersList.min = Math.min(...priceFilterListData);
      filtersList.max = Math.max(...priceFilterListData);


      state.filtersList = filtersList;
    },
    fetchProductCard(state, productCard) {
      state.productCard = productCard;
    }
  },
  actions: {
    async userAuthAction({commit}, {email, password}){
      try {
        const response = await AuthService.login(email,password);
        localStorage.setItem('userStatus', 'authenticated');
        commit("fetchUserData", response.data.user);
      } catch (e){
        console.log(e.response?.data?.message)
      }
    },
    async userRegistrationAction({commit}, {email, password}){
      try {
        const response = await AuthService.registration(email,password);
        localStorage.setItem('userStatus', 'authenticated');
        commit("fetchUserData", response.data.user);
      } catch (e){
        console.log(e.response?.data?.message)
      }
    },
    async userLogoutAction({commit}){
      try {
        await AuthService.logout();
        localStorage.removeItem('userStatus');
        commit("fetchUserData", {});
      } catch (e){
        console.log(e.response?.data?.message)
      }
    },
    async userIsAuthAction({commit}){
      try{
        const response = await axios.get(`${apiUrl}/refresh_token`, {withCredentials: true});
        localStorage.setItem('userStatus', 'authenticated');
        commit("fetchUserData", response.data.user);
      } catch (e) {
        console.log(e.response?.data?.message)
      }
    },
    async getUsersAction(){
      try {
        const response = await AuthService.getUsers();
        console.log(response.data);
      } catch (e){
        console.log(e.response?.data?.message)
      }
    },

    async fetchFiltersListAction({commit}, queryParams) {
      try {
        const filtersListData = await ((await fetch("http://localhost:3000/api/getFilters")).json());
        commit("fetchFiltersList", {filtersListData,queryParams});
      } catch (e) {
        console.log(e);
      }
    },
    async fetchProductCardAction({commit}, routeParam) {
      try {
        const productCard = await ((await fetch(`http://localhost:3000/api/getCard/${routeParam}`)).json())
        commit("fetchProductCard", productCard);
      } catch (e) {
        console.log(e);
      }
    },
    async fetchProductCardsListAction ({commit}, queryString) {
      try {
        const productCardsList = await ((await fetch("http://localhost:3000/api/getCards/?" + queryString)).json());
        commit("fetchProductCardsList", productCardsList);
      } catch (e) {
        console.log(e);
      }
    }
  }
})