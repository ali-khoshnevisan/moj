import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";

export interface User {
  name: string;
  profile_image: string;
  email: string;
  registration_date: string;
  is_email_verified: boolean;
  is_admin: boolean;
  id: number;
}

export interface Auth {
  access: string;
  refresh: string;
}

export const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const user = ref<User>({} as User);
  const auth = ref<Auth>({} as Auth);
  const isAuthenticated = ref(!!JwtService.getToken());

  function setAuth(data: Auth) {
    isAuthenticated.value = true;
    auth.value = data;
    errors.value = {};
    JwtService.saveToken(auth.value.access);
    ApiService.setHeader();
  }

  function setUser(userData: User) {
    user.value = userData;
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  function purgeAuth() {
    isAuthenticated.value = false;
    user.value = {} as User;
    auth.value = {} as Auth;
    errors.value = [];
    JwtService.destroyToken();
  }

  function login(credentials: User) {
    return new Promise<void>((resolve, reject) => {
      ApiService.post("accounts/token/", credentials)
        .then(({ data }) => {
          setAuth(data);
          resolve();
        })
        .catch(({ response }) => {
          reject(response.data);
          // setError(response.data.non_field_errors);
        });
    })
  }

  function logout() {
    purgeAuth();
  }

  function register(credentials: User) {
    return new Promise<void>((resolve, reject) => {
      ApiService.post("accounts/register/", credentials)
        .then(({ data }) => {
          errors.value = {};
          resolve();
        })
        .catch(({ response }) => {
          reject(response.data);
          // setError(response.data.non_field_errors);
        });
    })
  }

  function forgotPassword(email: string) {
    return ApiService.post("forgot_password", email)
      .then(() => {
        setError({});
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function verifyAuth() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("verify_token", { api_token: JwtService.getToken() })
        .then(({ data }) => {
          setAuth(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
          purgeAuth();
        });
    } else {
      purgeAuth();
    }
  }

  return {
    errors,
    user,
    isAuthenticated,
    setUser,
    login,
    logout,
    register,
    forgotPassword,
    verifyAuth,
  };
});
