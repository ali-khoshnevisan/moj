<template>
  <!--begin::Step 3-->
  <div data-kt-stepper-element="content">
    <!--begin::Wrapper-->
    <div class="w-100">
      <!--begin::Heading-->
      <div class="pb-10 pb-lg-12">
        <!--begin::Title-->
        <h2 class="fw-bold text-gray-900">Target Info</h2>
        <!--end::Title-->

        <!--begin::Notice-->
        <div class="text-gray-500 fw-semibold fs-6">
          If you need more info, please check out
          <a href="#" class="link-primary fw-bold">Help Page</a>.
        </div>
        <!--end::Notice-->
      </div>
      <!--end::Heading-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="form-label required">Target Account Url</label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          name="urls"
          class="form-control form-control-lg form-control-solid"
          v-slot="{ value, handleChange }"
        >
          <div>
            <div class="d-flex gap-2">
              <input
                v-model="newUrl"
                class="form-control form-control-lg form-control-solid"
                placeholder="Add target"
                @keydown.enter.prevent="addUrl(value, handleChange)"
              />

              <button
                type="button"
                class="btn btn-primary"
                @click="addUrl(value, handleChange)"
              >
                Add
              </button>
            </div>

            <div class="d-flex flex-wrap gap-2 mt-3">
              <span
                v-for="(url, index) in value || []"
                :key="index"
                class="badge badge-light-primary d-flex align-items-center"
              >
                {{ url }}

                <i
                  class="ki-outline ki-cross ms-2 cursor-pointer"
                  @click="remove(index, value, handleChange)"
                />
              </span>
            </div>
          </div>
        </Field>
        <ErrorMessage
          name="urls"
          class="fv-plugins-message-container invalid-feedback"
        ></ErrorMessage>
        <!--end::Input-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="d-flex align-items-center form-label">
          <span class="">Target Posts</span>

          <i
            class="fas fa-exclamation-circle ms-2 fs-7"
            data-bs-toggle="popover"
            data-bs-trigger="hover"
            data-bs-html="true"
            title="add specific post`s urls you want to do actions on. if you dont, actions will do on latest 12 posts of target"
          >
          </i>
        </label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          name="targetPosts"
          class="form-control form-control-lg form-control-solid"
          v-slot="{ value, handleChange }"
        >
          <div>
            <div class="d-flex gap-2">
              <input
                v-model="newTarget"
                class="form-control form-control-lg form-control-solid"
                placeholder="Add target"
                @keydown.enter.prevent="add(value, handleChange)"
              />

              <button
                type="button"
                class="btn btn-primary"
                @click="add(value, handleChange)"
              >
                Add
              </button>
            </div>

            <div class="d-flex flex-wrap gap-2 mt-3">
              <span
                v-for="(tag, index) in value || []"
                :key="index"
                class="badge badge-light-primary d-flex align-items-center"
              >
                {{ tag }}

                <i
                  class="ki-outline ki-cross ms-2 cursor-pointer"
                  @click="remove(index, value, handleChange)"
                />
              </span>
            </div>
          </div>
        </Field>
        <!--        <Field-->
        <!--          name="targetPosts"-->
        <!--          class="form-control form-control-lg form-control-solid"-->
        <!--        />-->
        <!--end::Input-->

        <!--begin::Hint-->
        <!--        <div class="form-text">-->
        <!--          Customers will see this shortened version of your statement descriptor-->
        <!--        </div>-->
        <!--end::Hint-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="d-flex align-items-center required form-label">
          <span class="">Bots</span>

          <i
            class="fas fa-exclamation-circle ms-2 fs-7"
            data-bs-toggle="popover"
            data-bs-trigger="hover"
            data-bs-html="true"
            title="select profile(s) you added before in panel, to do actions on target"
          >
          </i>
        </label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          name="bots"
          v-slot="{ value, handleChange }"
          class="form-select form-select-lg form-select-solid"
        >
          <el-select
            :model-value="value"
            @update:model-value="handleChange"
            multiple
            filterable
            placeholder="Select bots"
            class="w-100"
          >
            <el-option
              v-for="bot in bots"
              :key="bot.id"
              :label="bot.username"
              :value="bot.id"
            />
          </el-select>
        </Field>
        <!--end::Input-->
        <ErrorMessage
          name="bots"
          class="fv-plugins-message-container invalid-feedback"
        ></ErrorMessage>
      </div>
      <!--end::Input group-->
    </div>
    <!--end::Wrapper-->
  </div>
  <!--end::Step 3-->
</template>

<script setup>
import { ErrorMessage, Field } from "vee-validate";
import { onMounted, ref } from "vue";
import ApiService from "@/core/services/ApiService";

onMounted(() => {
  getProfiles();
});

const newTarget = ref("");
const newUrl = ref("");
const bots = ref([]);

const add = (value, handleChange) => {
  const v = newTarget.value.trim();
  if (!v) return;

  const arr = value ? [...value] : [];

  if (!arr.includes(v)) {
    arr.push(v);
  }

  handleChange(arr);
  newTarget.value = "";
};
const addUrl = (value, handleChange) => {
  const v = newUrl.value.trim();
  if (!v) return;

  const arr = value ? [...value] : [];

  if (!arr.includes(v)) {
    arr.push(v);
  }

  handleChange(arr);
  newUrl.value = "";
};

const remove = (index, value, handleChange) => {
  const arr = [...value];
  arr.splice(index, 1);
  handleChange(arr);
};

const getProfiles = () => {
  ApiService.get("/social-media/profile")
    .then((response) => {
      bots.value = response.data.results;
    })
    .catch((error) => {});
};
</script>
