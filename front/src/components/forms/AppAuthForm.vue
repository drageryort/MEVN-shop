<template>
  <form class="user_form" @submit.prevent="authUserService">
    <h2 class="form_title">Авторизация</h2>
    <label class="form_label">
      <input
          class="input-filed form_input"
          type="text"
          v-model="user.email"
          placeholder="Email"
      >
    </label>
    <label class="form_label">
      <input
          class="input-filed form_input"
          type="password"
          v-model="user.password"
          placeholder="Пароль"
      >
    </label>
    <span class="form_error" v-if="false">Пользователь не найден</span>
    <button class="btn btn_submit">Авторизоваться</button>
  </form>
</template>

<script>
export default {
  name: "AppAuthForm",
  data() {
    return {
      user:{
        email:'',
        password: ''
      }
    }
  },
  methods: {
    authUserService(){
      this.$store.dispatch('userAuthAction', this.user)
    }
  }

}
</script>

<style lang="scss" scoped>
  .user_form{
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 15px;
    min-width: 250px;
    .form_title{
      font-size: 30px;
    }
    .form_label{
      .form_input{
        width: 220px;
      }
    }
    .form_error{
      position: absolute;
    }
    .form_btn_submit{

    }
  }
</style>