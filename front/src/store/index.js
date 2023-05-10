import {createStore} from "vuex"

import products from "@/store/modules/products";
import users from "@/store/modules/users";

export default createStore({
  modules: {
    products,
    users
  }
})