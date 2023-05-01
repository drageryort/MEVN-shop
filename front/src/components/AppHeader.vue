<template>
  <div class="top_bar">
    <button @click="getUsers">Test</button>
    <h1 v-if="this.$route.path === '/'" class="top_bar_title">Catalog</h1>
    <div v-else class="btn" @click="$router.back()">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
        <path fill="#fff" fill-rule="evenodd"
              d="M4.364 11.364a.9.9 0 0 0 0 1.272l6 6 1.272-1.272L7.273 13H20v-2H7.273l4.363-4.364-1.272-1.272-6 6Z"
              clip-rule="evenodd"/>
      </svg>
    </div>
    <div v-if="isAuth">
      <button @click="logout"> logout</button>
    </div>
    <button class="btn-user" @click="modalForm = !modalForm" v-else>
      <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" id="IconChangeColor" height="30" width="30">
        <path fill="#ffffff"
              d="M288 320a224 224 0 1 0 448 0 224 224 0 1 0-448 0zm544 608H160a32 32 0 0 1-32-32v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 0 1-32 32z"
              id="mainIconPathAttribute">

        </path>
      </svg>
    </button>
    <Teleport to="body" v-if="modalForm">
      <div class="user_form_wrapper">
        <div class="user_form_layout" @click="closeModal"></div>
        <div class="user_form_block">
          <button @click="closeModal" class="btn close_modal_btn">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" id="IconChangeColor">
              <rect width="48" height="48" fill="white" fill-opacity="0.01"></rect>
              <path d="M14 14L34 34" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
                    id="mainIconPathAttribute"></path>
              <path d="M14 34L34 14" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
                    id="mainIconPathAttribute"></path>
            </svg>
          </button>
          <div v-if="formType" class="form_block">
            <AppAuthForm/>
            <button class="btn btn_form_trigger" @click="changeForm">Первый раз у нас. Пройти регистрацию</button>
          </div>
          <div v-else class="form_block">
            <AppRegisterForm/>
            <button class="btn btn_form_trigger" @click="changeForm">Уже зарегистрированы? Авторизоваться</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
import AppRegisterForm from "@/components/forms/AppRegisterForm";
import AppAuthForm from "@/components/forms/AppAuthForm";
import {mapGetters} from "vuex";


export default {
  name: "AppHeader",
  components: {AppAuthForm, AppRegisterForm},
  data() {
    return {
      modalForm: false,
      formType: false
    }
  },
  computed: {
    ...mapGetters({
      isAuth: "isAuth"
    })
  },
  methods: {
    closeModal(){
      this.modalForm = false
    },
    changeForm(){
      this.formType = !this.formType
    },
    logout(){
      this.$store.dispatch("userLogoutAction")
    },
    getUsers(){
      this.$store.dispatch("getUsersAction")
    }
  }
}
</script>

<style lang="scss" scoped>
.top_bar {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 20px;

  .top_bar_title {
    font-size: 24px;
    line-height: 40px;
    color: var(--color-white);
  }
}

.user_form_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .7);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  .user_form_layout{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .7);
    position: absolute;
    top: 0;
    left: 0;
  }
  .user_form_block {
    padding: 30px;
    background: var(--color-white);
    border-radius: 12px;
    .close_modal_btn {
      width: 30px;
      height: 30px;
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 5;
    }
    .form_block{
      display: flex;
      flex-direction: column;
      row-gap: 20px;
      .btn_form_trigger{
        font-size: 14px;
        span{
          font-size: 15px;
          color: var(--color-toxic-green);
        }
      }
    }
  }
}
</style>