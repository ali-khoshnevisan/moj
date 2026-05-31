<template>
  <!--begin::Step 1-->
  <div class="current" data-kt-stepper-element="content">
    <!--begin::Wrapper-->
    <div class="w-100">
      <!--begin::Heading-->
      <div class="pb-10 pb-lg-15">
        <!--begin::Title-->
        <h2 class="fw-bold d-flex align-items-center text-gray-900">
          Choose Social Media Type
          <!--          <i-->
          <!--            class="fas fa-exclamation-circle ms-2 fs-7"-->
          <!--            v-tooltip-->
          <!--            title="Billing is issued based on your selected account type"-->
          <!--          ></i>-->
        </h2>
        <!--end::Title-->

        <!--begin::Notice-->
        <div class="text-gray-500 fw-semibold fs-6">
          Please select the social media you want your campaign to run.
          <!--          <a href="#" class="link-primary fw-bold">Help Page</a>.-->
        </div>
        <!--end::Notice-->
      </div>
      <!--end::Heading-->

      <!--begin::Input group-->
      <div class="fv-row">
        <!--begin::Row-->
        <div class="row">
          <!--begin::Col-->
          <div class="col-lg-6">
            <!--begin::Option-->
            <Field
              type="radio"
              class="btn-check"
              name="social_media"
              value="instagram"
              id="kt_create_account_form_account_type_personal"
            />
            <label
              class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center mb-10"
              for="kt_create_account_form_account_type_personal"
            >
              <KTIcon icon-name="instagram" icon-class="fs-3x me-5" />

              <!--begin::Info-->
              <span class="d-block fw-semibold text-start">
                <span class="text-gray-900 fw-bold d-block fs-4 mb-2">
                  Instagram
                </span>
                <!--                <span class="text-gray-500 fw-semibold fs-6"-->
                <!--                  >If you need more info, please check it out</span-->
                <!--                >-->
              </span>
              <!--end::Info-->
            </label>
            <!--end::Option-->
          </div>
          <!--end::Col-->

          <!--begin::Col-->
          <div class="col-lg-6">
            <!--begin::Option-->
            <Field
              type="radio"
              class="btn-check"
              name="social_media"
              value="twitter"
              id="kt_create_account_form_account_type_corporate"
            />
            <label
              class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center"
              for="kt_create_account_form_account_type_corporate"
            >
              <i class="bi bi-twitter-x fs-3x me-5"></i>

              <!--begin::Info-->
              <span class="d-block fw-semibold text-start">
                <span class="text-gray-900 fw-bold d-block fs-4 mb-2"
                  >Twitter</span
                >
                <!--                <span class="text-gray-500 fw-semibold fs-6"-->
                <!--                  >Create corporate account to mane users</span-->
                <!--                >-->
              </span>
              <!--end::Info-->
            </label>
            <!--end::Option-->
          </div>
          <!--end::Col-->

          <ErrorMessage
            name="social_media"
            class="fv-plugins-message-container invalid-feedback"
          ></ErrorMessage>
        </div>
        <!--end::Row-->
      </div>
      <!--end::Input group-->
    </div>
    <!--end::Wrapper-->
  </div>
  <!--end::Step 1-->
</template>

<script setup lang="ts">
import { ErrorMessage, Field } from "vee-validate";
</script>
