import {$api} from "@/http";

export default class AuthService {
  static async login (email, password) {
    return $api.post('/login',{email, password})
  }
  static async registration (name, email, phone, password) {
    return $api.post('/registration',{name, email, phone, password})
  }
  static async logout () {
    return $api.post('/logout')
  }
  static async getUsers() {
    return $api.get('/users')
  }
  static async refreshToken() {
    return $api.get('/refresh_token')
  }
}