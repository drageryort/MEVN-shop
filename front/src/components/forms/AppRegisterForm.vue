<template>
  <form class="user_form" @submit.prevent="registerUserService">
    <h2 class="form_title">Регистрация</h2>
    <label class="form_label">
      <input
          class="input-filed form_input"
          type="text"
          v-model="user.email"
          placeholder="Email"
      >
      <span class="form_error" v-if="false"></span>
    </label>
    <label class="form_label">
      <input
          class="input-filed form_input"
          type="password"
          v-model="user.password"
          placeholder="Пароль"
      >
      <span class="form_error" v-if="false"></span>
    </label>
    <label class="form_label">
      <input
          class="input-filed form_input"
          type="password"
          v-model="user.repeatPassword"
          placeholder="Повторить пароль"
      >
      <span class="form_error" v-if="false"></span>
    </label>
    <button class="btn btn_submit">Зарегистрироваться</button>
  </form>
</template>

<script>
export default {
  name: "AppRegisterForm",
  data() {
    return {
      user: {
        email: '',
        password: '',
        repeatPassword: ''
      }
    }
  },
  methods: {
    registerUserService() {
      this.$store.dispatch('userRegistrationAction', this.user)
    }
  }
}
</script>

<style lang="scss" scoped>
.user_form {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 15px;
  min-width: 250px;
  .form_title {
    font-size: 30px;
  }

  .form_label {
    .form_input {
      width: 220px;
    }
  }

  .form_error {
    position: absolute;
  }

  .form_btn_submit {

  }
}
</style>