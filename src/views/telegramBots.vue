<template>
  <div v-if="tableData.length > 0" v-loading="loading" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Bots List</span>

        <!--        <span class="text-muted mt-1 fw-semibold fs-7"-->
        <!--          >Over 500 new products</span-->
        <!--        >-->
      </h3>
      <div class="card-toolbar">
        <button
          class="btn btn-sm btn-light-primary"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_add_telegram_bot"
        >
          <KTIcon icon-name="plus" icon-class="fs-2" />
          Add Bot
        </button>
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
      <!--begin::Table container-->
      <div class="table-responsive">
        <!--begin::Table-->
        <table class="table align-middle gs-0 gy-4">
          <!--begin::Table head-->
          <thead>
            <tr class="fw-bold text-muted bg-light">
              <th class="ps-4 min-w-225px rounded-start">Channel</th>
              <th class="min-w-125px">header</th>
              <th class="min-w-125px">footer</th>
              <th class="min-w-100px">Status</th>
              <th class="pe-4 min-w-200px text-end rounded-end">action</th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <template v-for="(item, index) in tableData" :key="index">
              <tr>
                <td>
                  <div class="fw-bold text-muted">
                    {{ item.channel }}
                  </div>
                </td>

                <td>
                  <a
                    href="#"
                    class="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item.text_header }}</a
                  >
                  <!--                  <span class="text-muted fw-semibold text-muted d-block fs-7"-->
                  <!--                    >followers</span-->
                  <!--                  >-->
                </td>

                <td>
                  <a
                    href="#"
                    class="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item.text_footer }}</a
                  >
                  <!--                  <span class="text-muted fw-semibold text-muted d-block fs-7"-->
                  <!--                    >followings</span-->
                  <!--                  >-->
                </td>

                <td>
                  <span
                    :class="`badge badge-light-${getStatusClass(item.status)}
                    fs-7 fw-bold`"
                    >{{ item.status }}</span
                  >
                </td>

                <td class="text-end">
                  <!--                  <a-->
                  <!--                    href="#"-->
                  <!--                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"-->
                  <!--                  >-->
                  <!--                    <KTIcon icon-name="switch" icon-class="fs-3" />-->
                  <!--                  </a>-->

                  <button
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    @click="refreshBotStatus(item.id)"
                  >
                    <KTIcon icon-name="arrows-circle" icon-class="fs-3" />
                  </button>

                  <button
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    data-bs-target="#kt_modal_edit_telegram_bot"
                    data-bs-toggle="modal"
                    @click="getTelegramDetail(item.id)"
                  >
                    <KTIcon icon-name="pencil" icon-class="fs-3" />
                  </button>

                  <button
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                    @click="removeProfile(item.id)"
                  >
                    <KTIcon icon-name="trash" icon-class="fs-3" />
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
          <!--end::Table body-->
        </table>
        <!--end::Table-->
      </div>
      <!--end::Table container-->
    </div>
    <!--begin::Body-->
  </div>
  <div v-else v-loading="loading" class="card">
    <div class="card-body p-0">
      <!--begin::Heading-->
      <div class="card-px text-center pt-20">
        <h2 class="fs-2x fw-bold mb-10">welcome to Telegram Bot</h2>
        <p class="text-gray-500 fs-5 fw-semibold mb-13">
          <span>you can add your bots here</span>
        </p>
        <button
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_add_telegram_bot"
        >
          <KTIcon icon-name="plus" icon-class="fs-2" />
          Add Bot
        </button>
        <!--end::Action-->
      </div>
      <!--end::Heading-->

      <div class="text-center px-15">
        <img
          class="w-100"
          :src="getAssetPath('media/telegram-guide.png')"
          alt=""
        />
      </div>
    </div>
  </div>

  <AddCustomerModal ref="addBotModal" @updateProfiles="getProfiles" />
  <div
    class="modal fade"
    id="kt_modal_edit_telegram_bot"
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
          @submit.prevent="editBot()"
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

<script setup>
import { getAssetPath } from "@/core/helpers/assets";
import { onMounted, ref } from "vue";
import AddCustomerModal from "@/components/modals/forms/AddCustomerModal.vue";
import arraySort from "array-sort";
import { MenuComponent } from "@/assets/ts/components";
import ApiService from "@/core/services/ApiService";
import { hideModal } from "@/core/helpers/modal";
import { ElMessage } from "element-plus";

const selectedIds = ref([]);
const loading = ref(false);
const addBotModal = ref(null);
const botId = ref(null);
const addCustomerModalRef = ref(null);

const tableData = ref([]);
const initCustomers = ref([]);
const formData = ref({
  token: "",
  channel: "",
  text_header: "",
  text_footer: "",
});

onMounted(() => {
  getProfiles();
  initCustomers.value.splice(0, tableData.value.length, ...tableData.value);
});

const getProfiles = () => {
  loading.value = true;
  ApiService.get("/crawler/telegram-bot")
    .then((response) => {
      loading.value = false;
      tableData.value = response.data.results;
    })
    .catch((error) => {
      loading.value = false;
    });
};

const deleteFewCustomers = () => {
  selectedIds.value.forEach((item) => {
    deleteCustomer(item);
  });
  selectedIds.value.length = 0;
};

const removeProfile = (id) => {
  loading.value = true;
  ApiService.delete("/crawler/telegram-bot/" + id + "/")
    .then((response) => {
      loading.value = false;
      getProfiles();
    })
    .catch((error) => {
      loading.value = false;
    });
};

const getTelegramDetail = (id) => {
  loading.value = true;
  botId.value = id;
  ApiService.get("/crawler/telegram-bot/" + id)
    .then((response) => {
      formData.value.channel = response.data.channel;
      formData.value.token = response.data.token;
      formData.value.text_footer = response.data.text_footer;
      formData.value.text_header = response.data.text_header;
      loading.value = false;
    })
    .catch((error) => {
      loading.value = false;
    });
};

const refreshBotStatus = (id) => {
  loading.value = true;
  ApiService.patch("/crawler/telegram-bot/" + id + "/", { status: "enable" })
    .then((response) => {
      loading.value = false;
      getProfiles();
    })
    .catch((error) => {
      loading.value = false;
    });
};

const editBot = () => {
  loading.value = true;
  hideModal(addCustomerModalRef.value);
  ApiService.patch("/crawler/telegram-bot/" + botId.value + "/", formData.value)
    .then((response) => {
      getProfiles();
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

const getStatusClass = (status) => {
  if (status === "check-bot") {
    return "warning";
  }
  if (status === "enable") {
    return "success";
  }
  if (status === "disable") {
    return "reject";
  }
};

const platformImage = (platform) => {
  if (platform === "instagram") {
    return getAssetPath("media/svg/brand-logos/instagram-2-1.svg");
  }
  if (platform === "twitter") {
    return getAssetPath("media/svg/brand-logos/twitter-2.svg");
  }
};

const deleteCustomer = (id) => {
  for (let i = 0; i < tableData.value.length; i++) {
    if (tableData.value[i].id === id) {
      tableData.value.splice(i, 1);
    }
  }
};

const search = ref("");
const searchItems = () => {
  tableData.value.splice(0, tableData.value.length, ...initCustomers.value);
  if (search.value !== "") {
    let results = [];
    for (let j = 0; j < tableData.value.length; j++) {
      if (searchingFunc(tableData.value[j], search.value)) {
        results.push(tableData.value[j]);
      }
    }
    tableData.value.splice(0, tableData.value.length, ...results);
  }
  MenuComponent.reinitialization();
};

const searchingFunc = (obj, value) => {
  for (let key in obj) {
    if (!Number.isInteger(obj[key]) && !(typeof obj[key] === "object")) {
      if (obj[key].indexOf(value) != -1) {
        return true;
      }
    }
  }
  return false;
};

const sort = (sort) => {
  const reverse = sort.order === "asc";
  if (sort.label) {
    arraySort(tableData.value, sort.label, { reverse });
  }
};
const onItemSelect = (selectedItems) => {
  selectedIds.value = selectedItems;
};
</script>

<style scoped lang="scss"></style>
