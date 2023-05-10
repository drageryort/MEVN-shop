<template>
  <div class="top_bar">
    <h1 v-if="this.$route.path === '/'" class="top_bar_title">Catalog</h1>
    <div v-else class="btn" @click="$router.back()">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
        <path fill="#fff" fill-rule="evenodd"
              d="M4.364 11.364a.9.9 0 0 0 0 1.272l6 6 1.272-1.272L7.273 13H20v-2H7.273l4.363-4.364-1.272-1.272-6 6Z"
              clip-rule="evenodd"/>
      </svg>
    </div>
    <div v-if="isAuth">
      <button @click="logout">
        <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="24" height="24" viewBox="0 0 384.971 384.971">
          <path fill="#fff" d="M180.455 360.91H24.061V24.061h156.394c6.641 0 12.03-5.39 12.03-12.03s-5.39-12.03-12.03-12.03H12.03C5.39.001 0 5.39 0 12.031V372.94c0 6.641 5.39 12.03 12.03 12.03h168.424c6.641 0 12.03-5.39 12.03-12.03.001-6.641-5.389-12.03-12.029-12.03z"/>
          <path fill="#fff" d="m381.481 184.088-83.009-84.2a11.942 11.942 0 0 0-17.011 0c-4.704 4.74-4.704 12.439 0 17.179l62.558 63.46H96.279c-6.641 0-12.03 5.438-12.03 12.151s5.39 12.151 12.03 12.151h247.74l-62.558 63.46c-4.704 4.752-4.704 12.439 0 17.179a11.931 11.931 0 0 0 17.011 0l82.997-84.2c4.644-4.68 4.692-12.512.012-17.18z"/>
        </svg>
      </button>
    </div>
    <button class="btn-user" @click="modalTrigger()" v-else>
      <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" id="IconChangeColor" height="30" width="30">
        <path fill="#ffffff"
              d="M288 320a224 224 0 1 0 448 0 224 224 0 1 0-448 0zm544 608H160a32 32 0 0 1-32-32v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 0 1-32 32z"
              id="mainIconPathAttribute">

        </path>
      </svg>
    </button>
    <Teleport to="body" v-if="modalFormTrigger">
      <div class="user_form_wrapper">
        <div class="user_form_layout" @click="modalTrigger()"></div>
        <div class="user_form_block">
          <button @click="modalTrigger()" class="btn close_modal_btn">
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
            <div class="form_block_trigger">
              <span>Первый раз у нас.</span>
              <button class="btn btn_form_trigger" @click="changeForm">Пройти регистрацию</button>
            </div>
          </div>
          <div v-else class="form_block">
            <AppRegisterForm/>
            <div class="form_block_trigger">
              <span>Уже зарегистрированы?</span>
              <button class="btn btn_form_trigger" @click="changeForm">Авторизоваться</button>
            </div>
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
      formType: true
    }
  },
  computed: {
    ...mapGetters({
      isAuth: "isAuth",
      modalFormTrigger: "modalFormTrigger"
    })
  },
  methods: {
    modalTrigger(){
      this.$store.commit('modalFromTrigger')
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
    min-height: 290px;
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
      .form_block_trigger{
        display: flex;
        column-gap: 5px;
        align-items: baseline;
        span{
          font-size: 12px;
        }
        .btn_form_trigger{
          font-size: 15px;
          font-weight: 500;
          color: var(--color-toxic-green);
        }
      }
    }
  }
}
</style>