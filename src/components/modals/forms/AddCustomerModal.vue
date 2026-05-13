<template>
  <div
    class="modal fade"
    id="kt_modal_add_customer"
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
          <h2 class="fw-bold">Add a Profile</h2>
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
              <div class="fv-row">
                <!--begin::Label-->
                <label class="required fs-6 fw-semibold mb-2">
                  Social Media
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item name="type">
                  <el-select v-model="formData.social_media">
                    <el-option
                      v-for="(item, i) in accountTypes"
                      :key="`countries-select-option-${i}`"
                      :value="item"
                    >
                      {{ item }}
                    </el-option>
                  </el-select>
                </el-form-item>
                <!--end::Input-->
              </div>
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-semibold mb-2">
                  <span class="required">url</span>

                  <i
                    class="fas fa-exclamation-circle ms-1 fs-7"
                    data-bs-toggle="tooltip"
                    title="Email address must be active"
                  ></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="url">
                  <el-input v-model="formData.url" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="fs-6 fw-semibold mb-2">
                  <span class="required">firefox_profile_path</span>

                  <i
                    class="fas fa-exclamation-circle ms-1 fs-7"
                    data-bs-toggle="tooltip"
                    title="Email address must be active"
                  ></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="firefox_profile_path">
                  <el-input v-model="formData.firefox_profile_path" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--              <div class="fv-row mb-7">-->
              <!--                &lt;!&ndash;begin::Label&ndash;&gt;-->
              <!--                <label class="fs-6 fw-semibold mb-2">-->
              <!--                  <span class="required">firefox profile zip file</span>-->

              <!--                  <i-->
              <!--                    class="fas fa-exclamation-circle ms-1 fs-7"-->
              <!--                    data-bs-toggle="tooltip"-->
              <!--                    title="Email address must be active"-->
              <!--                  ></i>-->
              <!--                </label>-->
              <!--                &lt;!&ndash;end::Label&ndash;&gt;-->

              <!--                &lt;!&ndash;begin::Input&ndash;&gt;-->
              <!--                <el-upload-->
              <!--                  v-model:file-list="fileList"-->
              <!--                  class="upload-demo"-->
              <!--                  :on-remove="handleRemove"-->
              <!--                  action="#"-->
              <!--                  :limit="1"-->
              <!--                  :auto-upload="false"-->
              <!--                >-->
              <!--                  <el-button type="primary">Click to upload</el-button>-->
              <!--                  <template #tip>-->
              <!--                    <div class="el-upload__tip">zip file.</div>-->
              <!--                  </template>-->
              <!--                </el-upload>-->
              <!--                &lt;!&ndash;end::Input&ndash;&gt;-->
              <!--              </div>-->
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
      url: "",
      social_media: "instagram",
      firefox_profile_path: "",
    });

    const fileList = ref([]);

    const rules = ref({
      url: [
        {
          required: true,
          message: "url is required",
          trigger: "change",
        },
      ],
      firefox_profile_path: [
        {
          required: true,
          message: "profile path is required",
          trigger: "change",
        },
      ],
    });

    const handleRemove = () => {
      fileList.value = [];
    };

    const submit = () => {
      // if (!formRef.value) {
      //   return;
      // }
      emit("connect", formData.value.social_media);
      hideModal(addCustomerModalRef.value);
      // const data = new FormData();
      // data.append("url", formData.value.url);
      // data.append("firefox_profile_path", formData.value.firefox_profile_path);
      // if (fileList.value.length > 0) {
      //   data.append("zip_file", fileList.value[0].raw);
      // }

      // formRef.value.validate((valid) => {
      //   if (valid) {
      //     loading.value = true;
      //
      //     ApiService.post("/social-media/profile/", formData.value)
      //       .then((response) => {
      //         loading.value = false;
      //         hideModal(addCustomerModalRef.value);
      //         emit("updateProfiles");
      //       })
      //       .catch((error) => {
      //         loading.value = false;
      //         if (error.response && error.response.data) {
      //           const errors = error.response.data;
      //
      //           Object.entries(errors).forEach(([field, msgs]) => {
      //             msgs.forEach((msg) => {
      //               ElMessage.error(`${field}: ${msg}`);
      //             });
      //           });
      //         } else {
      //           ElMessage.error("Something went wrong");
      //         }
      //       });
      //   } else {
      //     Swal.fire({
      //       text: "Sorry, looks like there are some errors detected, please try again.",
      //       icon: "error",
      //       buttonsStyling: false,
      //       confirmButtonText: "Ok, got it!",
      //       heightAuto: false,
      //       customClass: {
      //         confirmButton: "btn btn-primary",
      //       },
      //     });
      //     return false;
      //   }
      // });
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
