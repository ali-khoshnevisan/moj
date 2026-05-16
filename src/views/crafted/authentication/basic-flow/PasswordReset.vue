<template>
  <!--begin::Wrapper-->
  <div class="w-lg-500px p-10">
    <!--begin::Form-->
    <VForm
      v-if="step === 'email'"
      class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      @submit="onSubmitForgotPassword"
      id="kt_login_password_reset_form"
      :validation-schema="forgotPassword"
    >
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Title-->
        <h1 class="text-gray-900 mb-3">Forgot Password ?</h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-500 fw-semibold fs-4">
          Enter your email to reset your password.
        </div>
        <!--end::Link-->
      </div>
      <!--begin::Heading-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <label class="form-label fw-bold text-gray-900 fs-6">Email</label>
        <Field
          class="form-control form-control-solid"
          type="email"
          placeholder=""
          name="email"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

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
    <VForm
      v-else-if="step === 'code'"
      class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      @submit="onSubmitCode"
      id="kt_login_password_reset_form"
      :validation-schema="emailVerify"
    >
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Title-->
        <h1 class="text-gray-900 mb-3">Forgot Password ?</h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-500 fw-semibold fs-4">
          Enter the code we sent to your email to verify
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
    <VForm
      v-else-if="step === 'password'"
      class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      @submit="onChangePassword"
      id="kt_login_password_reset_form"
      :validation-schema="newPassword"
    >
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Title-->
        <h1 class="text-gray-900 mb-3">Forgot Password ?</h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-500 fw-semibold fs-4">Enter new password</div>
        <!--end::Link-->
      </div>
      <!--begin::Heading-->

      <!--begin::Input group-->
      <div class="mb-10 fv-row" data-kt-password-meter="true">
        <!--begin::Wrapper-->
        <div class="mb-1">
          <!--begin::Label-->
          <label class="form-label fw-bold text-gray-900 fs-6">
            Password
          </label>
          <!--end::Label-->

          <!--begin::Input wrapper-->
          <div class="position-relative mb-3">
            <Field
              class="form-control form-control-lg form-control-solid"
              type="password"
              placeholder=""
              name="new_password"
              autocomplete="off"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="new_password" />
              </div>
            </div>
          </div>
          <!--end::Input wrapper-->
          <!--begin::Meter-->
          <div
            class="d-flex align-items-center mb-3"
            data-kt-password-meter-control="highlight"
          >
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
            ></div>
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
            ></div>
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
            ></div>
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px"
            ></div>
          </div>
          <!--end::Meter-->
        </div>
        <!--end::Wrapper-->
        <!--begin::Hint-->
        <div class="text-muted">
          Use 8 or more characters with a mix of letters, numbers & symbols.
        </div>
        <!--end::Hint-->
      </div>
      <div class="fv-row mb-10">
        <label class="form-label fw-bold text-gray-900 fs-6"
          >Confirm Password</label
        >
        <Field
          class="form-control form-control-solid"
          placeholder=""
          name="confirm_new_password"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="confirm_new_password" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

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
import { defineComponent, nextTick, onMounted, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore } from "@/stores/auth";
import * as Yup from "yup";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { PasswordMeterComponent } from "@/assets/ts/components";
import otpInput from "@/components/OtpInput/OtpInput.vue";
import ApiService from "@/core/services/ApiService";
import { string } from "yup";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "password-reset",
  components: {
    otpInput,
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const store = useAuthStore();
    let step = ref("email");
    let email = ref<string>("");
    let hash = ref<string>("");

    const submitButton = ref<HTMLButtonElement | null>(null);

    //Create form validation object
    const forgotPassword = Yup.object().shape({
      email: Yup.string().email().required().label("Email"),
    });
    const emailVerify = Yup.object().shape({
      code: Yup.string().required().label("code"),
    });
    const newPassword = Yup.object().shape({
      new_password: Yup.string().required().label("Password"),
      confirm_new_password: Yup.string()
        .required()
        .oneOf([Yup.ref("new_password")], "Passwords must match")
        .label("Password Confirmation"),
    });

    const updateCode = (code) => {
      if (code.length === 6) {
        onSubmitCode(code);
      }
    };

    const onSubmitForgotPassword = async (values: any) => {
      values = values as string;

      // eslint-disable-next-line
      submitButton.value!.disabled = true;
      // Activate loading indicator
      submitButton.value?.setAttribute("data-kt-indicator", "on");
      email.value = values.email;
      ApiService.setEmailHeader(email.value);

      ApiService.get("accounts/reset-password-send-email")
        .then((response) => {
          step.value = "code";
        })
        .catch((error) => {
          console.log(error);
        });

      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    };

    const onSubmitCode = async (code: number) => {
      // eslint-disable-next-line
      submitButton.value!.disabled = true;
      // Activate loading indicator
      submitButton.value?.setAttribute("data-kt-indicator", "on");
      ApiService.post("accounts/reset-password-send-email/", {
        code,
      })
        .then((response) => {
          hash.value = response.data.hash;
          ApiService.setHashHeader(hash.value);
          step.value = "password";
        })
        .catch((error) => {
          ElMessage.error(error.response.data.message);
        });

      nextTick(() => {
        PasswordMeterComponent.bootstrap();
      });

      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    };

    const onChangePassword = async (values: any) => {
      values = values as string;
      // eslint-disable-next-line
      submitButton.value!.disabled = true;
      // Activate loading indicator
      submitButton.value?.setAttribute("data-kt-indicator", "on");
      ApiService.post("accounts/reset-password/", values).then((response) => {
        ApiService.removeEmailHeader();
        ApiService.removeHashHeader();
      });

      nextTick(() => {
        PasswordMeterComponent.bootstrap();
      });

      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    };

    return {
      onSubmitForgotPassword,
      onSubmitCode,
      onChangePassword,
      updateCode,
      forgotPassword,
      emailVerify,
      newPassword,
      step,
      submitButton,
    };
  },
});
</script>
