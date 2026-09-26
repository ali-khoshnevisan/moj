<template>
  <div
    class="modal fade"
    id="kt_modal_edit_profile"
    ref="addActionModalRef"
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
          <h2 class="fw-bold">Profile</h2>
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
              <div class="row">
                <div class="col-md-12">
                  <label class="required fs-6 fw-semibold mb-2">Name</label>

                  <el-form-item prop="name">
                    <el-input
                      v-model="formData.name"
                      type="text"
                      placeholder=""
                    />
                  </el-form-item>
                </div>
                <div class="col-md-12">
                  <label class="required fs-6 fw-semibold mb-2">Email</label>

                  <el-form-item prop="name">
                    <el-input
                      v-model="formData.email"
                      type="text"
                      placeholder=""
                    />
                  </el-form-item>
                </div>
                <div class="col-md-8">
                  <label class="required fs-6 fw-semibold mb-2">IMAGE</label>

                  <el-form-item prop="name">
                    <el-upload
                      v-model:file-list="fileList"
                      :limit="1"
                      action="#"
                      list-type="picture-card"
                      :auto-upload="false"
                    >
                      <el-icon><Plus /></el-icon>

                      <template #file="{ file }">
                        <div>
                          <img
                            class="el-upload-list__item-thumbnail"
                            :src="file.url"
                            alt=""
                          />
                          <span class="el-upload-list__item-actions">
                            <span
                              class="el-upload-list__item-preview"
                              @click="handlePictureCardPreview(file)"
                            >
                              <el-icon><zoom-in /></el-icon>
                            </span>
                            <span
                              v-if="!disabled"
                              class="el-upload-list__item-delete"
                              @click="handleRemove(file)"
                            >
                              <el-icon><Delete /></el-icon>
                            </span>
                          </span>
                        </div>
                      </template>
                    </el-upload>

                    <el-dialog v-model="mediaPreviewVisible">
                      <img w-full :src="dialogImageUrl" alt="Preview Image" />
                    </el-dialog>
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer flex-center">
            <button
              type="reset"
              id="kt_modal_add_customer_cancel"
              class="btn btn-light me-3"
            >
              Discard
            </button>
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
import { defineComponent, onMounted, ref } from "vue";
import ApiService from "@/core/services/ApiService";
import { useAuthStore } from "@/stores/auth";
import { Delete, Plus, ZoomIn } from "@element-plus/icons-vue";
import { hideModal } from "@/core/helpers/modal";

export default defineComponent({
  name: "customers-listing",
  components: {
    Plus,
    ZoomIn,
    Delete,
  },
  setup() {
    const loading = ref(false);
    const store = useAuthStore();
    const mediaPreviewVisible = ref(false);
    const dialogImageUrl = ref(null);
    const addActionModalRef = ref(null);
    const fileList = ref([]);
    const formData = ref({
      name: "",
      email: "",
    });

    onMounted(() => {
      formData.value.name = store.user.name;
      formData.value.email = store.user.email;
      if (store.user.profile_image) {
        fileList.value.push({
          url: store.user.profile_image,
        });
      }
    });

    const rules = ref({
      url: [
        {
          required: true,
          message: "url is required",
          trigger: "change",
        },
      ],
      actions: [
        {
          required: true,
          message: "actions is required",
          trigger: "change",
        },
      ],
    });

    const handlePictureCardPreview = (file) => {
      mediaPreviewVisible.value = true;
      dialogImageUrl.value = file.url;
    };
    const handleRemove = () => {
      fileList.value = [];
    };

    const submit = () => {
      const data = new FormData();
      data.append("name", formData.value.name);
      data.append("email", formData.value.email);
      data.append("profile_image", fileList.value[0]?.url);
      ApiService.post("/api/accounts/profile/update/", formData.value)
        .then((response) => {
          hideModal(addActionModalRef.value);
        })
        .catch((error) => {});
    };

    return {
      loading,
      addActionModalRef,
      formData,
      rules,
      fileList,
      mediaPreviewVisible,
      dialogImageUrl,
      submit,
      handlePictureCardPreview,
      handleRemove,
      getAssetPath,
    };
  },
});
</script>
