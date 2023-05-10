import AuthService from "@/services/AuthService";

export default{
  state: {
    userData: {},
    userErrorMessage: '',
    isAuth: false,
    modalFormTrigger: false
  },
  getters: {
    isAuth(state) {
      return state.isAuth;
    },
    userErrorMessage(state){
      return state.userErrorMessage;
    },
    modalFormTrigger(state){
      return state.modalFormTrigger;
    }
  },
  mutations: {
    fetchUserData(state, userData){
      state.userData = userData;
      state.isAuth = !!Object.keys(userData).length;
    },
    fetchUserError(state, errorMessage){
      state.userErrorMessage = errorMessage
    },
    modalFromTrigger(state){
      state.modalFormTrigger = !state.modalFormTrigger
    }
  },
  actions: {
    async userAuthAction({commit}, {email, password}){
      try {
        const response = await AuthService.login(email,password);
        localStorage.setItem('userStatus', 'authenticated');
        commit("fetchUserData", response.data.user);
        commit("fetchUserError", '');
        commit("modalFromTrigger");
      } catch (e){
        commit("fetchUserError", e.response?.data?.message);
      }
    },
    async userRegistrationAction({commit}, {name, email, phone, password}){
      try {
        const response = await AuthService.registration(name, email, phone, password);
        localStorage.setItem('userStatus', 'authenticated');
        commit("fetchUserData", response.data.user);
        commit("fetchUserError", '');
        commit("modalFromTrigger");
      } catch (e){
        commit("fetchUserError", e.response?.data?.message);
      }
    },
    async userLogoutAction({commit}){
      try {
        await AuthService.logout();
        localStorage.removeItem('userStatus');
        commit("fetchUserData", {});
        commit("fetchUserError", '');
      } catch (e){
        commit("fetchUserError", e.response?.data?.message);
      }
    },
    async userIsAuthAction({commit}){
      try{
        const response = AuthService.refreshToken()
        localStorage.setItem('userStatus', 'authenticated');
        commit("fetchUserData", response.data.user);
        commit("fetchUserError", '');
      } catch (e) {
        commit("fetchUserError", e.response?.data?.message);
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
  }
}