<template>
  <!--begin::Navbar-->
  <div class="card mb-5 mb-xxl-8">
    <div class="card-body pt-9 pb-0">
      <!--begin::Details-->
      <div class="d-flex flex-wrap flex-sm-nowrap mb-3">
        <!--begin: Pic-->
        <div class="me-7 mb-4">
          <div
            class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative"
          >
            <el-skeleton style="width: 200px" animated v-if="loading">
              <template #template>
                <el-skeleton-item
                  variant="image"
                  style="width: 200px; height: 200px"
                />
              </template>
            </el-skeleton>
            <img
              v-else-if="profile.profile_image"
              :src="'http://91.107.232.169:6688' + profile.profile_image"
              alt="image"
            />
            <img
              v-else
              :src="getAssetPath('media/profilewebp.webp')"
              alt="image"
            />
            <div
              class="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px"
            ></div>
          </div>
        </div>
        <!--end::Pic-->

        <!--begin::Info-->
        <div class="flex-grow-1" v-if="!loading">
          <!--begin::Title-->
          <div
            class="d-flex justify-content-between align-items-start flex-wrap mb-2"
          >
            <!--begin::User-->
            <div class="d-flex flex-column">
              <!--begin::Name-->
              <div class="d-flex align-items-center mb-2">
                <a
                  href="#"
                  class="text-gray-800 text-hover-primary fs-2 fw-bold me-1"
                  >{{ profile.name }}</a
                >
                <a href="#">
                  <KTIcon icon-name="verify" icon-class="fs-1 text-primary" />
                </a>
              </div>
              <!--end::Name-->

              <!--begin::Info-->
              <div class="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                <a
                  href="#"
                  class="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                >
                  <KTIcon icon-name="profile-circle" icon-class="fs-4 me-1" />
                  {{ profile.is_admin ? "admin" : "user" }}
                </a>
                <a
                  href="#"
                  class="d-flex align-items-center text-gray-500 text-hover-primary mb-2 me-5"
                >
                  <KTIcon icon-name="sms" icon-class="fs-4 me-1" />
                  {{ profile.email }}
                </a>
                <a
                  href="#"
                  class="d-flex align-items-center text-gray-500 text-hover-primary mb-2"
                >
                  <KTIcon
                    :icon-name="
                      profile.is_email_verified ? 'verify' : 'cross-circle'
                    "
                    icon-class="fs-4 me-1"
                  />
                  {{
                    profile.is_email_verified
                      ? "Email verified"
                      : "Email not verified"
                  }}
                </a>
              </div>
              <!--end::Info-->
            </div>
            <!--end::User-->

            <!--begin::Actions-->
            <div class="d-flex my-4">
              <!--              <a-->
              <!--                href="#"-->
              <!--                class="btn btn-sm btn-light me-2"-->
              <!--                id="kt_user_follow_button"-->
              <!--              >-->
              <!--                <KTIcon icon-name="check" icon-class="fs-3 d-none" />-->
              <!--                Follow-->
              <!--              </a>-->

              <!--              <button-->
              <!--                class="btn btn-sm btn-primary me-3"-->
              <!--                data-bs-toggle="collapse"-->
              <!--                data-bs-target="#kt_account_profile_details"-->
              <!--              >-->
              <!--                Edit Profile-->
              <!--              </button>-->

              <!--begin::Menu-->
              <!--              <div class="me-0">-->
              <!--                <button-->
              <!--                  class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"-->
              <!--                  data-kt-menu-trigger="click"-->
              <!--                  data-kt-menu-placement="bottom-end"-->
              <!--                  data-kt-menu-flip="top-end"-->
              <!--                >-->
              <!--                  <i class="bi bi-three-dots fs-3"></i>-->
              <!--                </button>-->
              <!--                <Dropdown3></Dropdown3>-->
              <!--              </div>-->
              <!--end::Menu-->
            </div>
            <!--end::Actions-->
          </div>
          <!--end::Title-->

          <!--begin::Stats-->
          <div class="d-flex flex-wrap flex-stack">
            <!--begin::Wrapper-->
            <div class="d-flex flex-column flex-grow-1 pe-8">
              <!--begin::Stats-->
              <div class="d-flex flex-wrap">
                <!--begin::Stat-->
                <!--                <div-->
                <!--                  class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3"-->
                <!--                >-->
                <!--                  &lt;!&ndash;begin::Number&ndash;&gt;-->
                <!--                  <div class="d-flex align-items-center">-->
                <!--                    <KTIcon-->
                <!--                      icon-name="arrow-up"-->
                <!--                      icon-class="fs-3 text-success me-2"-->
                <!--                    />-->
                <!--                    <div-->
                <!--                      class="fs-2 fw-bold"-->
                <!--                      data-kt-countup="true"-->
                <!--                      data-kt-countup-value="4500"-->
                <!--                      data-kt-countup-prefix="$"-->
                <!--                    >-->
                <!--                      4,500$-->
                <!--                    </div>-->
                <!--                  </div>-->
                <!--                  &lt;!&ndash;end::Number&ndash;&gt;-->

                <!--                  &lt;!&ndash;begin::Label&ndash;&gt;-->
                <!--                  <div class="fw-semibold fs-6 text-gray-500">Earnings</div>-->
                <!--                  &lt;!&ndash;end::Label&ndash;&gt;-->
                <!--                </div>-->
                <!--end::Stat-->

                <!--begin::Stat-->
                <!--                <div-->
                <!--                  class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3"-->
                <!--                >-->
                <!--                  &lt;!&ndash;begin::Number&ndash;&gt;-->
                <!--                  <div class="d-flex align-items-center">-->
                <!--                    <KTIcon-->
                <!--                      icon-name="arrow-down"-->
                <!--                      icon-class="fs-3 text-danger me-2"-->
                <!--                    />-->
                <!--                    <div-->
                <!--                      class="fs-2 fw-bold"-->
                <!--                      data-kt-countup="true"-->
                <!--                      data-kt-countup-value="75"-->
                <!--                    >-->
                <!--                      75-->
                <!--                    </div>-->
                <!--                  </div>-->
                <!--                  &lt;!&ndash;end::Number&ndash;&gt;-->

                <!--                  &lt;!&ndash;begin::Label&ndash;&gt;-->
                <!--                  <div class="fw-semibold fs-6 text-gray-500">Projects</div>-->
                <!--                  &lt;!&ndash;end::Label&ndash;&gt;-->
                <!--                </div>-->
                <!--end::Stat-->

                <!--begin::Stat-->
                <div
                  class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3"
                >
                  <!--begin::Number-->
                  <div class="d-flex align-items-center">
                    <KTIcon
                      icon-name="calendar"
                      icon-class="fs-3 text-success me-2"
                    />
                    <div
                      class="fs-3 fw-bold"
                      data-kt-countup="true"
                      data-kt-countup-value="60"
                      data-kt-countup-prefix="%"
                    >
                      {{ profile.registration_date }}
                    </div>
                  </div>
                  <!--end::Number-->

                  <!--begin::Label-->
                  <div class="fw-semibold fs-6 text-gray-500">
                    registration date
                  </div>
                  <!--end::Label-->
                </div>
                <!--end::Stat-->
              </div>
              <!--end::Stats-->
            </div>
            <!--end::Wrapper-->

            <!--begin::Progress-->
            <div
              class="d-flex align-items-center w-200px w-sm-300px flex-column mt-3"
            >
              <div class="d-flex justify-content-between w-100 mt-auto mb-2">
                <span class="fw-semibold fs-6 text-gray-500"
                  >Profile Compleation</span
                >
                <span class="fw-bold fs-6">50%</span>
              </div>

              <div class="h-5px mx-3 w-100 bg-light mb-3">
                <div
                  class="bg-success rounded h-5px"
                  role="progressbar"
                  style="width: 50%"
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <!--end::Progress-->
          </div>
          <!--end::Stats-->
        </div>
        <el-skeleton style="max-width: 250px" :rows="3" v-else />
        <!--end::Info-->
      </div>
      <!--end::Details-->
    </div>
  </div>
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_profile_details"
      aria-expanded="false"
      aria-controls="kt_account_profile_details"
    >
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">Profile Details</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Content-->
    <div id="kt_account_profile_details" class="collapse show">
      <!--begin::Form-->
      <VForm
        id="kt_account_profile_details_form"
        class="form"
        novalidate
        @submit="saveChanges1()"
        :validation-schema="profileDetailsValidator"
      >
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semibold fs-6"
              >Avatar</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Image input-->
              <div
                class="image-input image-input-outline"
                data-kt-image-input="true"
              >
                <!--begin::Preview existing avatar-->
                <div
                  class="image-input-wrapper w-125px h-125px"
                  :style="`background-image: url(${
                    profileDetails.profile_image
                      ? 'http://91.107.232.169:6688' +
                        profileDetails.profile_image
                      : '/media/avatars/blank.png'
                  })`"
                ></div>
                <!--end::Preview existing avatar-->

                <!--begin::Label-->
                <label
                  class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="change"
                  data-bs-toggle="tooltip"
                  title="Change avatar"
                >
                  <i class="bi bi-pencil-fill fs-7"></i>

                  <!--begin::Inputs-->
                  <input
                    type="file"
                    name="avatar"
                    accept=".png, .jpg, .jpeg"
                    @change="handleAvatarChange"
                  />
                  <input type="hidden" name="avatar_remove" />
                  <!--end::Inputs-->
                </label>
                <!--end::Label-->

                <!--begin::Remove-->
                <span
                  class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="remove"
                  data-bs-toggle="tooltip"
                  @click="removeImage()"
                  title="Remove avatar"
                >
                  <i class="bi bi-x fs-2"></i>
                </span>
                <!--end::Remove-->
              </div>
              <!--end::Image input-->

              <!--begin::Hint-->
              <div class="form-text">Allowed file types: png, jpg, jpeg.</div>
              <!--end::Hint-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semibold fs-6"
              >Full Name</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div class="col-lg-12 fv-row">
                  <Field
                    type="text"
                    name="fname"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="First name"
                    v-model="profileDetails.name"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="fname" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semibold fs-6"
              >Email</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="Email"
                class="form-control form-control-lg form-control-solid"
                placeholder="Email"
                v-model="profileDetails.email"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="Email" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
        </div>
        <!--end::Card body-->

        <!--begin::Actions-->
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button
            type="reset"
            class="btn btn-light btn-active-light-primary me-2"
          >
            Discard
          </button>

          <button
            type="submit"
            id="kt_account_profile_details_submit"
            ref="submitButton1"
            class="btn btn-primary"
          >
            <span class="indicator-label"> Save Changes </span>
            <span class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
        </div>
        <!--end::Actions-->
      </VForm>
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Navbar-->
  <!--  <router-view></router-view>-->
</template>

<script>
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Dropdown3 from "@/components/dropdown/Dropdown3.vue";
import ApiService from "@/core/services/ApiService";
import { useAuthStore } from "@/stores/auth";
import * as Yup from "yup";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "profile-page-layout",
  components: {
    Dropdown3,
    Field,
    ErrorMessage,
    VForm,
  },
  setup() {
    onMounted(() => {
      getUserProfile();
    });

    const loading = ref(false);
    const store = useAuthStore();
    const profile = ref({});
    const avatar = ref(null);
    const profileDetails = ref({
      profile_image: "",
      name: "",
      email: "",
    });

    const profileDetailsValidator = Yup.object().shape({
      fname: Yup.string().required().label("First name"),
      email: Yup.string().label("Webside"),
    });
    const handleAvatarChange = (event) => {
      const file = event.target.files[0];

      if (!file) return;

      profileDetails.value.profile_image = URL.createObjectURL(file);

      avatar.value = file;
    };
    const removeImage = () => {
      profileDetails.value.profile_image = "";
      avatar.value = null;
    };
    const saveChanges1 = () => {
      const data = new FormData();
      data.append("profile_image", avatar.value);
      data.append("name", profileDetails.value.name);
      data.append("email", profileDetails.value.email);
      ApiService.post("accounts/profile/update/", data)
        .then((res) => {
          getUserProfile();
        })
        .catch((error) => {
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
    };

    const getUserProfile = () => {
      loading.value = true;
      ApiService.get("/accounts/profile")
        .then((res) => {
          loading.value = false;
          profile.value = res.data;
          store.setUser(res.data);
          profileDetails.value.name = res.data.name;
          profileDetails.value.email = res.data.email;
          profileDetails.value.profile_image = res.data.profile_image;
        })
        .catch((err) => {
          loading.value = false;
        });
    };

    return {
      profile,
      loading,
      profileDetails,
      profileDetailsValidator,
      getUserProfile,
      getAssetPath,
      handleAvatarChange,
      removeImage,
      saveChanges1,
    };
  },
});
</script>
