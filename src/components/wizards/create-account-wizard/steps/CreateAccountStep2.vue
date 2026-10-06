<template>
  <!--begin::Step 2-->
  <div data-kt-stepper-element="content">
    <!--begin::Wrapper-->
    <div class="w-100">
      <!--begin::Heading-->
      <div class="pb-10 pb-lg-15">
        <!--begin::Title-->
        <h2 class="fw-bold text-gray-900">Campaign Info</h2>
        <!--end::Title-->

        <!--begin::Notice-->
        <div class="text-gray-500 fw-semibold fs-6">
          in this step you create your campaign info
          <!--          <a href="#" class="link-primary fw-bold">Help Page</a>.-->
        </div>
        <!--end::Notice-->
      </div>
      <!--end::Heading-->

      <!--begin::Input group-->
      <!--      <div class="mb-10 fv-row">-->
      <!--        &lt;!&ndash;begin::Label&ndash;&gt;-->
      <!--        <label class="d-flex align-items-center form-label mb-3">-->
      <!--          Specify Team Size-->
      <!--          <i-->
      <!--            class="fas fa-exclamation-circle ms-2 fs-7"-->
      <!--            v-tooltip-->
      <!--            title="Provide your team size to help us setup your billing"-->
      <!--          ></i>-->
      <!--        </label>-->
      <!--        &lt;!&ndash;end::Label&ndash;&gt;-->

      <!--        &lt;!&ndash;begin::Row&ndash;&gt;-->
      <!--        <div class="row mb-2" data-kt-buttons="true">-->
      <!--          &lt;!&ndash;begin::Col&ndash;&gt;-->
      <!--          <div class="col">-->
      <!--            &lt;!&ndash;begin::Option&ndash;&gt;-->
      <!--            <Field-->
      <!--              type="radio"-->
      <!--              class="btn-check"-->
      <!--              id="accountTeamSize1"-->
      <!--              name="accountTeamSize"-->
      <!--              value="1-1"-->
      <!--            />-->
      <!--            <label-->
      <!--              class="btn btn-outline btn-outline-dashed btn-outline-default w-100 p-4"-->
      <!--              for="accountTeamSize1"-->
      <!--            >-->
      <!--              <span class="fw-bold fs-3">1-1</span>-->
      <!--            </label>-->
      <!--            &lt;!&ndash;end::Option&ndash;&gt;-->
      <!--          </div>-->
      <!--          &lt;!&ndash;end::Col&ndash;&gt;-->

      <!--          &lt;!&ndash;begin::Col&ndash;&gt;-->
      <!--          <div class="col">-->
      <!--            &lt;!&ndash;begin::Option&ndash;&gt;-->
      <!--            <Field-->
      <!--              type="radio"-->
      <!--              class="btn-check"-->
      <!--              name="accountTeamSize"-->
      <!--              id="accountTeamSize2"-->
      <!--              value="2-10"-->
      <!--            />-->
      <!--            <label-->
      <!--              class="btn btn-outline btn-outline-dashed btn-outline-default w-100 p-4"-->
      <!--              for="accountTeamSize2"-->
      <!--            >-->
      <!--              <span class="fw-bold fs-3">2-10</span>-->
      <!--            </label>-->
      <!--            &lt;!&ndash;end::Option&ndash;&gt;-->
      <!--          </div>-->
      <!--          &lt;!&ndash;end::Col&ndash;&gt;-->

      <!--          &lt;!&ndash;begin::Col&ndash;&gt;-->
      <!--          <div class="col">-->
      <!--            &lt;!&ndash;begin::Option&ndash;&gt;-->
      <!--            <Field-->
      <!--              type="radio"-->
      <!--              class="btn-check"-->
      <!--              name="accountTeamSize"-->
      <!--              id="accountTeamSize3"-->
      <!--              value="10-50"-->
      <!--            />-->
      <!--            <label-->
      <!--              class="btn btn-outline btn-outline-dashed btn-outline-default w-100 p-4"-->
      <!--              for="accountTeamSize3"-->
      <!--            >-->
      <!--              <span class="fw-bold fs-3">10-50</span>-->
      <!--            </label>-->
      <!--            &lt;!&ndash;end::Option&ndash;&gt;-->
      <!--          </div>-->
      <!--          &lt;!&ndash;end::Col&ndash;&gt;-->

      <!--          &lt;!&ndash;begin::Col&ndash;&gt;-->
      <!--          <div class="col">-->
      <!--            &lt;!&ndash;begin::Option&ndash;&gt;-->
      <!--            <Field-->
      <!--              type="radio"-->
      <!--              class="btn-check"-->
      <!--              name="accountTeamSize"-->
      <!--              id="accountTeamSize4"-->
      <!--              checked-->
      <!--              value="50+"-->
      <!--            />-->
      <!--            <label-->
      <!--              class="btn btn-outline btn-outline-dashed btn-outline-default w-100 p-4"-->
      <!--              for="accountTeamSize4"-->
      <!--            >-->
      <!--              <span class="fw-bold fs-3">50+</span>-->
      <!--            </label>-->
      <!--            &lt;!&ndash;end::Option&ndash;&gt;-->
      <!--          </div>-->
      <!--          &lt;!&ndash;end::Col&ndash;&gt;-->
      <!--        </div>-->
      <!--        &lt;!&ndash;end::Row&ndash;&gt;-->

      <!--        &lt;!&ndash;begin::Hint&ndash;&gt;-->
      <!--        <div class="form-text">-->
      <!--          Customers will see this shortened version of your statement descriptor-->
      <!--        </div>-->
      <!--        &lt;!&ndash;end::Hint&ndash;&gt;-->
      <!--      </div>-->
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="mb-10 fv-row">
        <!--begin::Label-->
        <label class="form-label mb-3">Campaign Name</label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          type="text"
          class="form-control form-control-lg form-control-solid"
          name="campaign_description"
        />
        <ErrorMessage
          name="campaign_description"
          class="fv-plugins-message-container invalid-feedback"
        ></ErrorMessage>
        <!--end::Input-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="mb-10 fv-row">
        <!--begin::Label-->
        <label class="d-flex align-items-center form-label mb-5">
          Select Actions
          <i
            class="fas fa-exclamation-circle ms-2 fs-7"
            v-tooltip
            title="select actions you want done in your campaign"
          ></i>
        </label>
        <!--end::Label-->

        <!--begin::Options-->
        <div class="mb-0">
          <!--begin:Option-->
          <label class="d-flex flex-stack mb-5 cursor-pointer">
            <!--begin:Label-->
            <span class="d-flex align-items-center me-2">
              <!--begin::Icon-->
              <span class="symbol symbol-50px me-6">
                <span class="symbol-label">
                  <KTIcon icon-name="like" icon-class="fs-1 text-gray-600" />
                </span>
              </span>
              <!--end::Icon-->

              <!--begin::Description-->
              <span class="d-flex flex-column">
                <span class="fw-bold text-gray-800 text-hover-primary fs-5"
                  >Like</span
                >
                <span class="fs-6 fw-semibold text-gray-500"
                  >like posts and post`s comments of target account</span
                >
              </span>
              <!--end:Description-->
            </span>
            <!--end:Label-->

            <!--begin:Input-->
            <span class="form-check form-check-custom form-check-solid">
              <Field
                class="form-check-input"
                type="checkbox"
                name="actions"
                value="like"
              />
            </span>
            <!--end:Input-->
          </label>
          <!--end::Option-->
          <label class="d-flex flex-stack mb-5 cursor-pointer">
            <!--begin:Label-->
            <span class="d-flex align-items-center me-2">
              <!--begin::Icon-->
              <span class="symbol symbol-50px me-6">
                <span class="symbol-label">
                  <KTIcon
                    icon-name="user-tick"
                    icon-class="fs-1 text-gray-600"
                  />
                </span>
              </span>
              <!--end::Icon-->

              <!--begin::Description-->
              <span class="d-flex flex-column">
                <span class="fw-bold text-gray-800 text-hover-primary fs-5"
                  >Follow</span
                >
                <span class="fs-6 fw-semibold text-gray-500"
                  >follow target account</span
                >
              </span>
              <!--end:Description-->
            </span>
            <!--end:Label-->

            <!--begin:Input-->
            <span class="form-check form-check-custom form-check-solid">
              <Field
                class="form-check-input"
                type="checkbox"
                name="actions"
                value="follow"
              />
            </span>
            <!--end:Input-->
          </label>
          <!--end::Option-->
          <label class="d-flex flex-stack mb-5 cursor-pointer">
            <!--begin:Label-->
            <span class="d-flex align-items-center me-2">
              <!--begin::Icon-->
              <span class="symbol symbol-50px me-6">
                <span class="symbol-label">
                  <KTIcon
                    icon-name="message-text"
                    icon-class="fs-1 text-gray-600"
                  />
                </span>
              </span>
              <!--end::Icon-->

              <!--begin::Description-->
              <span class="d-flex flex-column">
                <span class="fw-bold text-gray-800 text-hover-primary fs-5"
                  >Comment</span
                >
                <span class="fs-6 fw-semibold text-gray-500"
                  >comment on posts of target account with Ai</span
                >
              </span>
              <!--end:Description-->
            </span>
            <!--end:Label-->

            <!--begin:Input-->
            <span class="form-check form-check-custom form-check-solid">
              <Field
                class="form-check-input"
                type="checkbox"
                checked
                name="actions"
                value="comment"
              />
            </span>
            <!--end:Input-->
          </label>

          <label class="d-flex flex-stack mb-0 cursor-pointer">
            <!--begin:Label-->
            <span class="d-flex align-items-center me-2">
              <!--begin::Icon-->
              <span class="symbol symbol-50px me-6">
                <span class="symbol-label">
                  <KTIcon
                    icon-name="message-text"
                    icon-class="fs-1 text-gray-600"
                  />
                </span>
              </span>
              <!--end::Icon-->

              <!--begin::Description-->
              <span class="d-flex flex-column">
                <span class="fw-bold text-gray-800 text-hover-primary fs-5"
                  >Direct</span
                >
                <span class="fs-6 fw-semibold text-gray-500"
                  >Direct message to target account with Ai</span
                >
              </span>
              <!--end:Description-->
            </span>
            <!--end:Label-->

            <!--begin:Input-->
            <span class="form-check form-check-custom form-check-solid">
              <Field
                class="form-check-input"
                type="checkbox"
                checked
                name="actions"
                value="direct"
              />
            </span>
            <!--end:Input-->
          </label>
        </div>

        <ErrorMessage
          name="actions"
          class="fv-plugins-message-container invalid-feedback"
        ></ErrorMessage>
        <!--end::Options-->
      </div>

      <div class="fv-row mb-5" v-if="isCommentSelected">
        <label class="d-flex align-items-center required form-label">
          <span class="">Comment Prompt</span>

          <i
            class="fas fa-exclamation-circle ms-2 fs-7"
            data-bs-toggle="popover"
            data-bs-trigger="hover"
            data-bs-html="true"
            title="you can write a prompt for Ai to manage comments contents"
          >
          </i>
        </label>

        <Field
          as="textarea"
          rows="3"
          name="comment_prompt"
          class="form-control form-control-lg form-control-solid"
        />
      </div>

      <div class="fv-row mb-0" v-if="isDirectSelected">
        <label class="d-flex align-items-center required form-label">
          <span class="">Direct Prompt</span>

          <i
            class="fas fa-exclamation-circle ms-2 fs-7"
            data-bs-toggle="popover"
            data-bs-trigger="hover"
            data-bs-html="true"
            title="you can write a prompt for Ai to manage direct messages content"
          >
          </i>
        </label>

        <Field
          name="direct_prompt"
          as="textarea"
          rows="3"
          class="form-control form-control-lg form-control-solid"
        />
      </div>
      <!--end::Input group-->
    </div>
    <!--end::Wrapper-->
  </div>
  <!--end::Step 2-->
</template>

<script setup>
import { ErrorMessage, Field, useFieldValue } from "vee-validate";
import { computed } from "vue";

const actions = useFieldValue("actions");

const isCommentSelected = computed(() => actions.value.includes("comment"));
const isDirectSelected = computed(() => actions.value.includes("direct"));
</script>
