import type { App } from "vue";
import type { AxiosResponse } from "axios";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/core/services/JwtService";
import { useAuthStore } from "@/stores/auth";

/**
 * @description service to call HTTP request via Axios
 */
class ApiService {
  /**
   * @description property to share vue instance
   */
  public static vueInstance: App;

  /**
   * @description initialize vue axios
   */
  public static init(app: App<Element>) {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
    ApiService.vueInstance.axios.defaults.baseURL =
      import.meta.env.VITE_APP_API_URL;

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          ApiService.checkRefreshToken();
        }
        return Promise.reject(error);
      }
    );
    ApiService.setHeader();
  }

  public static changeBaseUrl(url): void {
    ApiService.vueInstance.axios.defaults.baseURL = url;
  }

  public static checkRefreshToken(): void {
    const refresh = JwtService.getRefreshToken();
    ApiService.post("accounts/token/refresh/", { refresh })
      .then((response) => {
        JwtService.saveToken(response.data.access);
        window.location.reload();
      })
      .catch((error) => {
        ApiService.handleUnauthorized();
      });
  }

  private static handleUnauthorized() {
    const router = ApiService.vueInstance.config.globalProperties.$router;
    const store = useAuthStore();
    delete ApiService.vueInstance.axios.defaults.headers.common[
      "Authorization"
    ];
    router.push({ name: "sign-in" });

    store.logout();
  }
  /**
   * @description set the default HTTP request headers
   */
  public static setHeader(): void {
    if (JwtService.getToken()) {
      ApiService.vueInstance.axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${JwtService.getToken()}`;
    }
    ApiService.vueInstance.axios.defaults.headers.common["Accept"] =
      "application/json";
  }

  public static setEmailHeader(email: string): void {
    ApiService.vueInstance.axios.defaults.headers.common["EMAIL"] = email;
  }
  public static setHashHeader(hash: string): void {
    ApiService.vueInstance.axios.defaults.headers.common[
      "reset-password-hash"
    ] = hash;
  }

  public static removeEmailHeader(): void {
    delete ApiService.vueInstance.axios.defaults.headers.common["EMAIL"];
  }
  public static removeHashHeader(): void {
    delete ApiService.vueInstance.axios.defaults.headers.common[
      "reset-password-hash"
    ];
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static query(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(resource, params);
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param slug: string
   * @returns Promise<AxiosResponse>
   */
  public static get(
    resource: string,
    slug = "" as string
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(`${resource}/${slug}`);
  }

  /**
   * @description set the POST HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static post(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.post(`${resource}`, params);
  }

  /**
   * @description send the UPDATE HTTP request
   * @param resource: string
   * @param slug: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static update(
    resource: string,
    slug: string,
    params: any
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}/${slug}`, params);
  }

  /**
   * @description Send the PUT HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static put(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}`, params);
  }

  public static patch(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.patch(`${resource}`, params);
  }

  /**
   * @description Send the DELETE HTTP request
   * @param resource: string
   * @returns Promise<AxiosResponse>
   */
  public static delete(resource: string): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.delete(resource);
  }
}

export default ApiService;
