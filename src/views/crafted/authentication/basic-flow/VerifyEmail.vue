<template>
  <!--begin::Wrapper-->
  <div class="w-lg-500px p-md-10 p-sm-5">
    <!--begin::Form-->
    <VForm
      class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      @submit="onSubmitVerifyEmail"
      id="kt_login_password_reset_form"
    >
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Title-->
        <h1 class="text-gray-900 mb-3">Verify your email</h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-500 fw-semibold fs-4">
          Enter the code that we sent to your email address.
        </div>
        <!--end::Link-->
      </div>
      <!--begin::Heading-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <label class="form-label fw-bold text-gray-900 fs-6">Code</label>
        <Field name="code" v-slot="{ field }">
          <otp-input
            :inputLength="6"
            v-model="field.value"
            @update:model-value="updateCode($event)"
          />
        </Field>
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="code" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <div class="d-flex justify-content-between align-items-center mb-10">
        <!-- Timer -->
        <div class="text-gray-600 fw-semibold">
          Resend code in
          <span class="text-primary fw-bold">
            {{ formattedTime }}
          </span>
        </div>

        <!-- Resend Button -->
        <button
          type="button"
          class="btn btn-sm btn-light-primary"
          :disabled="timer > 0"
          @click="resendCode"
        >
          Resend Code
        </button>
      </div>

      <!--begin::Actions-->
      <div class="d-flex flex-wrap justify-content-center pb-lg-0">
        <button
          type="submit"
          ref="submitButton"
          id="kt_password_reset_submit"
          class="btn btn-lg btn-primary fw-bold me-4"
        >
          <span class="indicator-label"> Submit </span>
          <span class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>

        <router-link to="/sign-up" class="btn btn-lg btn-light-primary fw-bold"
          >Cancel</router-link
        >
      </div>
      <!--end::Actions-->
    </VForm>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  computed,
  onBeforeUnmount,
} from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import otpInput from "@/components/OtpInput/OtpInput.vue";
import { hideModal } from "@/core/helpers/modal";

export default defineComponent({
  name: "password-reset",
  components: {
    Field,
    VForm,
    otpInput,
    ErrorMessage,
  },
  setup() {
    onBeforeUnmount(() => {
      clearInterval(interval.value);
    });
    onMounted(() => {
      startTimer();
      generateCode();
    });

    const store = useAuthStore();
    const router = useRouter();
    const timer = ref(120);
    const interval = ref<ReturnType<typeof setInterval>>();

    const submitButton = ref<HTMLButtonElement | null>(null);

    //Create form validation object
    // const verifyEmail = Yup.object().shape({
    //   code: Yup.string().required().label("Code"),
    // });

    const formattedTime = computed(() => {
      const minutes = Math.floor(timer.value / 60)
        .toString()
        .padStart(2, "0");

      const seconds = (timer.value % 60).toString().padStart(2, "0");

      return `${minutes}:${seconds}`;
    });

    const startTimer = () => {
      clearInterval(interval.value);

      timer.value = 120;

      interval.value = setInterval(() => {
        if (timer.value > 0) {
          timer.value--;
        } else {
          clearInterval(interval.value);
        }
      }, 1000);
    };

    const resendCode = async () => {
      generateCode();

      startTimer();
    };

    const generateCode = () => {
      ApiService.setEmailHeader(store.user.email);
      ApiService.get("/api/accounts/email-verification").then(() => {
        ApiService.removeEmailHeader();
      });
    };

    const updateCode = (code) => {
      if (code.length === 6) {
        onSubmitVerifyEmail(code);
      }
    };

    const onSubmitVerifyEmail = (code) => {
      ApiService.setEmailHeader(store.user.email);
      // values = values as string;

      // eslint-disable-next-line
      submitButton.value!.disabled = true;
      // Activate loading indicator
      submitButton.value?.setAttribute("data-kt-indicator", "on");

      ApiService.post("/api/accounts/email-verification/", { code })
        .then(() => {
          ApiService.removeEmailHeader();
          Swal.fire({
            text: "Your email has been verified",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semibold btn-light-primary",
            },
          }).then(() => {
            router.push({ name: "sign-in" });
          });
        })
        .catch((error) => {
          Swal.fire({
            text: error.response.data.message as string,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Try again!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semibold btn-light-danger",
            },
          });
        });

      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    };

    return {
      onSubmitVerifyEmail,
      updateCode,
      resendCode,
      formattedTime,
      timer,
      // verifyEmail,
      submitButton,
    };
  },
});
</script>
