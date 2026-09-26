<template>
  <div
    class="modal fade"
    id="kt_modal_add_telegram_bot"
    ref="addCustomerModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_customer_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Add telegram bot</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_customer_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <el-form
          @submit.prevent="submit()"
          :model="formData"
          :rules="rules"
          ref="formRef"
        >
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_add_customer_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_customer_header"
              data-kt-scroll-wrappers="#kt_modal_add_customer_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::Input group-->
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-semibold mb-2">
                  <span class="required">token</span>

                  <i
                    class="fas fa-exclamation-circle ms-1 fs-7"
                    data-bs-toggle="tooltip"
                    title="enter token of your bot you created on telegram"
                  ></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="token">
                  <el-input v-model="formData.token" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-semibold mb-2">
                  <span class="required">channel name</span>

                  <i
                    class="fas fa-exclamation-circle ms-1 fs-7"
                    data-bs-toggle="tooltip"
                    title="enter the channel id you want the bot has activity on"
                  ></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="channel">
                  <el-input v-model="formData.channel" placeholder="@channel" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-semibold mb-2">
                  <span class="">header text</span>

                  <i
                    class="fas fa-exclamation-circle ms-1 fs-7"
                    data-bs-toggle="tooltip"
                    title="this text always add to the top of tour posts"
                  ></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="text_header">
                  <el-input v-model="formData.text_header" type="textarea" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-semibold mb-2">
                  <span class="">footer text</span>

                  <i
                    class="fas fa-exclamation-circle ms-1 fs-7"
                    data-bs-toggle="tooltip"
                    title="this text always add to the end of tour posts"
                  ></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="text_footer">
                  <el-input v-model="formData.text_footer" type="textarea" />
                </el-form-item>
                <!--end::Input-->
              </div>
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button
              type="reset"
              id="kt_modal_add_customer_cancel"
              class="btn btn-light me-3"
            >
              Discard
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary"
              type="submit"
            >
              <span v-if="!loading" class="indicator-label">
                Submit
                <KTIcon icon-name="arrow-right" icon-class="fs-2 me-2 me-0" />
              </span>
              <span v-if="loading" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
            <!--end::Button-->
          </div>
          <!--end::Modal footer-->
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script>
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref } from "vue";
import { hideModal } from "@/core/helpers/modal";
import { countries } from "@/core/data/countries";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "add-customer-modal",
  components: {},
  setup(props, { emit }) {
    const formRef = ref(null);
    const addCustomerModalRef = ref(null);
    const loading = ref(false);
    const accountTypes = ref(["instagram"]);
    const formData = ref({
      token: "",
      channel: "",
      text_header: "",
      text_footer: "",
    });

    const fileList = ref([]);

    const rules = ref({
      token: [
        {
          required: true,
          message: "token is required",
          trigger: "change",
        },
      ],
      channel: [
        {
          required: true,
          message: "channel is required",
          trigger: "change",
        },
        {
          validator: (rule, value, callback) => {
            if (!value) return callback();

            if (!value.startsWith("@")) {
              callback(new Error("channel must start with @"));
            } else if (value === "@") {
              callback(new Error("channel name is not valid"));
            } else {
              callback();
            }
          },
          trigger: "change",
        },
      ],
    });

    const handleRemove = () => {
      fileList.value = [];
    };

    const submit = () => {
      if (!formRef.value) {
        return;
      }
      // const data = new FormData();
      // data.append("url", formData.value.url);
      // data.append("firefox_profile_path", formData.value.firefox_profile_path);
      // if (fileList.value.length > 0) {
      //   data.append("zip_file", fileList.value[0].raw);
      // }

      formRef.value.validate((valid) => {
        if (valid) {
          loading.value = true;

          ApiService.post("/api/crawler/telegram-bot/", formData.value)
            .then((response) => {
              hideModal(addCustomerModalRef.value);
              loading.value = false;
              emit("updateProfiles");
            })
            .catch((error) => {
              hideModal(addCustomerModalRef.value);
              loading.value = false;
              if (error.response && error.response.data) {
                const errors = error.response.data;

                Object.entries(errors).forEach(([field, msgs]) => {
                  msgs.forEach((msg) => {
                    ElMessage.error(`${field}: ${msg}`);
                  });
                });
              } else {
                ElMessage.error("Something went wrong");
              }
            });
        } else {
          Swal.fire({
            text: "Sorry, looks like there are some errors detected, please try again.",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
          return false;
        }
      });
    };

    return {
      accountTypes,
      formData,
      fileList,
      rules,
      submit,
      handleRemove,
      formRef,
      loading,
      addCustomerModalRef,
      getAssetPath,
      countries,
    };
  },
});
</script>
