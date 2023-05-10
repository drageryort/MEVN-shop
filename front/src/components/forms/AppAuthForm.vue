<template>
  <form class="user_form" @submit.prevent="authUserService">
    <h2 class="form_title">Авторизация</h2>
    <label class="form_label">
      <input
          class="input-filed form_input"
          :class="{
            'error': v$.user.email.$error,
            'valid': !v$.user.email.$error && v$.user.email.$dirty}"
          type="text"
          v-model.trim="user.email"
          placeholder="Email"
          @focusin="cleanUserError()"
      >
      <span
          v-if="v$.user.email.$error"
          class="field_error"
      >
        {{ v$.user.email.$errors[0].$message }}
      </span>
    </label>
    <label class="form_label">
      <input
          class="input-filed form_input"
          :class="{
            'error': v$.user.password.$error,
            'valid': !v$.user.password.$error && v$.user.password.$dirty}"
          type="password"
          v-model.trim="user.password"
          placeholder="Пароль"
          @focusin="cleanUserError()"
      >
      <span
          v-if="v$.user.password.$error"
          class="field_error"
      >{{ v$.user.password.$errors[0].$message }}
      </span>
    </label>
    <div class="form_button_block">
      <span class="form_error" v-if="userErrorMessage">{{userErrorMessage}}</span>
      <button class="btn btn_submit" :disabled="v$.user.$invalid">Авторизоваться</button>
    </div>
  </form>
</template>

<script>
import {useVuelidate} from '@vuelidate/core'
import {required, email, helpers, minLength, maxLength} from '@vuelidate/validators'
import {mapGetters} from "vuex";

export default {
  name: "AppAuthForm",
  setup() {
    return {v$: useVuelidate()}
  },
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  computed:{
    ...mapGetters(['userErrorMessage'])
  },
  validations() {
    return {
      user: {
        email: {
          email: helpers.withMessage('Значение не похоже на email', email),
          required: helpers.withMessage('Поле обязательно к заполнению', required),
          $autoDirty: true,
        },
        password: {
          minLength: helpers.withMessage('Минимальное количество знаков - 6', minLength(6)),
          maxLength: helpers.withMessage('Максимальное количество знаков - 20', maxLength(20)),
          required: helpers.withMessage('Поле обязательно к заполнению', required),
          $autoDirty: true,
        },
      }
    }
  },
  methods: {
    authUserService() {
      this.$store.dispatch('userAuthAction', this.user)
    },
    cleanUserError() {
      this.$store.commit('fetchUserError', '')
    }
  }
}
</script>

<style lang="scss" scoped>
.user_form {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  min-width: 250px;
  .form_title {
    font-size: 30px;
  }
  .form_label {
    .form_input {
      width: 220px;
      &.error{
        background: rgba(230, 22, 16, .2);
        border: 1px solid var(--color-red);
      }
      &.valid{
        background: rgba(122, 177, 14, .2);
        border: 1px solid var(--color-toxic-green);
      }
    }
    .field_error{
      font-weight: 300;
      font-size: 12px;
      color: var(--color-red);
      position: absolute;
      left: 0;
      bottom: -15px;
    }
  }
  .form_button_block{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    .form_error {
      position: absolute;
      bottom: -15px;
      font-size: 12px;
      font-weight: 300;
      color: var(--color-red);
    }
    .form_btn_submit {

    }
  }
}
</style>