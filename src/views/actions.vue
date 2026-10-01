<template>
  <div v-loading="pageLoading" class="card">
    <div class="card-header border-0 pt-6" v-if="generalTotalActions > 0">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <div class="row align-items-center position-relative my-1">
          <!--          <KTIcon-->
          <!--            icon-name="magnifier"-->
          <!--            icon-class="fs-1 position-absolute ms-6"-->
          <!--          />-->
          <div class="filter-action col-md-3 col-xs-12">
            <label class="form-label fw-semibold">Action</label>
            <select
              v-model="filterActions"
              @change.prevent="getActions()"
              class="form-select form-select-solid form-select-lg w-250px"
            >
              <option :value="null" label="" selected></option>
              <option
                v-for="(action, idx) in availableActions"
                :key="idx"
                :value="action"
              >
                {{ action }}
              </option>
            </select>
          </div>
          <div class="filter-bot col-md-3 col-xs-12">
            <label class="form-label fw-semibold">Account</label>
            <select
              v-model="filterBot"
              @change.prevent="getActions()"
              class="form-select form-select-solid form-select-lg w-250px"
            >
              <option :value="null" label="" selected></option>
              <option
                v-for="(bot, idx) in bots"
                :key="idx"
                :value="bot.id"
                :label="bot.username"
              >
                {{ bot.username }}
              </option>
            </select>
          </div>
          <div class="filter-status col-md-3 col-xs-12">
            <label class="form-label fw-semibold">Status</label>
            <select
              v-model="filterStatus"
              @change.prevent="getActions()"
              class="form-select form-select-solid form-select-lg w-250px"
            >
              <option :value="null" label="" selected></option>
              <option
                v-for="(status, idx) in filterStatusOptions"
                :key="idx"
                :value="status"
                :label="status"
              >
                {{ status }}
              </option>
            </select>
          </div>
          <div class="filter-campaign col-md-3 col-xs-12">
            <label class="form-label fw-semibold">Campaign</label>
            <select
              v-model="filterCampaign"
              @change.prevent="onCampaignChange()"
              class="form-select form-select-solid form-select-lg w-250px"
            >
              <option :value="null" label="" selected></option>
              <option
                v-for="(campaign, idx) in campaigns"
                :key="idx"
                :value="campaign.campaign_description"
              >
                {{ campaign.campaign_description }}
              </option>
            </select>
          </div>
        </div>
        <!--end::Search-->
      </div>
      <!--begin::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Toolbar-->
        <div
          v-if="selectedIds.length === 0"
          class="d-flex justify-content-end"
          data-kt-customer-table-toolbar="base"
        >
          <!--begin::Add customer-->
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_add_action"
          >
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Add Action
          </button>
          <!--end::Add customer-->
        </div>
        <!--end::Toolbar-->
        <!--begin::Group actions-->
        <div
          v-else
          class="d-flex justify-content-end align-items-center"
          data-kt-customer-table-toolbar="selected"
        >
          <div class="fw-bold me-5">
            <span class="me-2">{{ selectedIds.length }}</span
            >Selected
          </div>
          <button type="button" class="btn btn-info" @click="retryActions()">
            <KTIcon icon-name="arrows-circle" icon-class="fs-2" />
            Retry Actions
          </button>
        </div>
        <!--end::Group actions-->
        <!--begin::Group actions-->
        <div
          class="d-flex justify-content-end align-items-center d-none"
          data-kt-customer-table-toolbar="selected"
        >
          <div class="fw-bold me-5">
            <span
              class="me-2"
              data-kt-customer-table-select="selected_count"
            ></span
            >Selected
          </div>
          <button
            type="button"
            class="btn btn-danger"
            data-kt-customer-table-select="delete_selected"
          >
            Delete Selected
          </button>
        </div>
        <!--end::Group actions-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <div class="card-body pt-0" v-if="generalTotalActions > 0">
      <Datatable
        @on-sort="sort"
        @on-items-select="onItemSelect"
        :data="tableData"
        :header="tableHeader"
        :total="totalActions"
        :items-per-page="10"
        @page-change="getActions"
        :checkbox-enabled="true"
        checkbox-label="id"
      >
        <template v-slot:bot="{ row: customer }">
          <img
            width="25px"
            class="me-1"
            :src="getIcon(customer.bot_info.social_media)"
          />
          {{
            customer.bot_info.username
              ? customer.bot_info.username
              : customer.bot_info.url
          }}
        </template>
        <template v-slot:url="{ row: customer }">
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="customer.url"
            placement="top"
          >
            <a :href="customer.url" target="_blank">view link</a>
          </el-tooltip>
        </template>
        <template v-slot:campaign="{ row: customer }">
          {{ customer.campaign?.campaign_description }}
        </template>
        <template v-slot:status="{ row: customer }">
          <div class="status badge" :class="statusClass(customer.status)">
            {{ customer.status }}
          </div>
        </template>
        <template v-slot:detail="{ row: customer }">
          <el-tooltip class="box-item" effect="dark" placement="top">
            <template #content>
              <div
                :style="{
                  whiteSpace: 'pre-wrap',
                  overflowWrap: 'break-word',
                  wordBreak: 'break-word',
                }"
                dir="auto"
              >
                {{ customer.text }}
              </div>
            </template>
            <div class="post-text" dir="auto">
              {{ customer.text }}
            </div>
          </el-tooltip>
          <!--          {{ formatDate(customer.text) }}-->
        </template>
        <template v-slot:action="{ row: customer }">
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="customer.action"
            placement="top"
          >
            <i :class="`bi bi-${actionIcon(customer.action)} fs-1`" />
          </el-tooltip>
        </template>
      </Datatable>
    </div>
    <div class="card-body p-0" v-else>
      <!--begin::Heading-->
      <div class="card-px text-center pt-20">
        <h2 class="fs-2x fw-bold mb-10">welcome to Actions</h2>
        <p class="text-gray-500 fs-5 fw-semibold mb-13">
          <span
            >you can make some actions (like, comment, ...) on your social
            accounts</span
          >
        </p>
        <button
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_add_action"
        >
          <KTIcon icon-name="plus" icon-class="fs-2" />
          Create Action
        </button>
        <!--end::Action-->
      </div>
      <!--end::Heading-->

      <div class="text-center px-5 my-20">
        <img
          class="w-250px w-lg-300px theme-light-show"
          :src="getAssetPath('media/illustrations/sketchy-1/13.png')"
          alt=""
        />
      </div>
    </div>
  </div>
  <div
    class="modal fade"
    id="kt_modal_add_action"
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
          <h2 class="fw-bold">Add an Action</h2>
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
              <div class="d-flex flex-column mb-7 fv-row">
                <!--begin::Label-->
                <label class="fs-6 fw-semibold mb-2">
                  <span class="required">Social Media Type</span>

                  <i
                    class="fas fa-exclamation-circle ms-1 fs-7"
                    data-bs-toggle="tooltip"
                    title="Social Media Type"
                  ></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-select
                  v-model="formData.social_media"
                  @change="getProfiles"
                >
                  <el-option
                    v-for="(item, i) in socialMedidaTypes"
                    :key="`countries-select-option-${i}`"
                    :value="item"
                  >
                    {{ item }}
                  </el-option>
                </el-select>
                <!--end::Input-->
              </div>

              <div class="d-flex flex-column mb-7 fv-row">
                <!--begin::Label-->
                <label class="fs-6 fw-semibold mb-2">
                  <span class="required">Action Type</span>

                  <i
                    class="fas fa-exclamation-circle ms-1 fs-7"
                    data-bs-toggle="tooltip"
                    title="Account Type"
                  ></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-select v-model="formData.action">
                  <el-option value="">Select an Action...</el-option>
                  <el-option
                    v-for="(item, i) in actions"
                    :key="`countries-select-option-${i}`"
                    :value="item"
                  >
                    {{ item }}
                  </el-option>
                </el-select>
                <!--end::Input-->
              </div>

              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-semibold mb-2">URL</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="name">
                  <el-input v-model="formData.url" type="text" placeholder="" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-semibold mb-2"
                  >Bot Username</label
                >
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="name">
                  <el-select multiple v-model="formData.bot">
                    <el-option
                      v-for="(item, i) in bots"
                      :key="`countries-select-option-${i}`"
                      :value="item.id"
                      :label="item.username"
                    >
                      {{ item.username }}
                    </el-option>
                  </el-select>
                </el-form-item>
                <!--end::Input-->
              </div>
              <div
                class="fv-row mb-7"
                v-if="
                  formData.action === 'comment' || formData.action === 'direct'
                "
              >
                <!--begin::Label-->
                <label class="required fs-6 fw-semibold mb-2">Content</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="name">
                  <el-input
                    v-model="formData.text"
                    type="textarea"
                    placeholder=""
                  />
                </el-form-item>
                <!--end::Input-->
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
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import arraySort from "array-sort";
import { MenuComponent } from "@/assets/ts/components";
import ApiService from "@/core/services/ApiService";
import { hideModal } from "@/core/helpers/modal";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "customers-listing",
  components: {
    Datatable,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const socialMedidaTypes = ref(["instagram", "twitter"]);
    const loading = ref(false);
    const pageLoading = ref(false);
    const totalActions = ref(0);
    const generalTotalActions = ref(0);
    const addActionModalRef = ref(null);
    const filterSocialMedia = ref(null);
    const filterBot = ref(null);
    const filterStatus = ref(null);
    const filterStatusOptions = ref([
      "success",
      "pending",
      "requested",
      "failed",
    ]);
    const filterCampaign = ref(route.query.campaign ?? null);
    const filterActions = ref(null);
    const availableActions = ref(["like", "follow", "comment", "direct"]);
    const formData = ref({
      url: "",
      action: "",
      bot: [],
      social_media: "",
      text: "",
      working: true,
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

    const actions = ref(["follow", "like", "comment", "direct"]);
    const bots = ref([]);
    const campaigns = ref([]);

    const tableHeader = ref([
      {
        columnName: "bot",
        columnLabel: "bot",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnName: "url",
        columnLabel: "url",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnName: "status",
        columnLabel: "status",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnName: "campaign",
        columnLabel: "campaign",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "detail",
        columnLabel: "detail",
        sortEnabled: true,
        columnWidth: 400,
      },
      {
        columnName: "Type",
        columnLabel: "action",
        sortEnabled: true,
        columnWidth: 150,
      },
    ]);
    const selectedIds = ref([]);

    const tableData = ref([]);
    const initCustomers = ref([]);

    const statusClass = (status) => {
      if (status === "success") {
        return "badge-success";
      }
      if (status === "pending" || status === "requested") {
        return "badge-warning";
      }
      return "badge-danger";
    };

    onMounted(() => {
      initialData();
      initCustomers.value.splice(0, tableData.value.length, ...tableData.value);
    });

    const initialData = () => {
      getTotalActions();
      getCampaigns();
      getProfiles();
    };

    const onCampaignChange = () => {
      if (route.query.campaign) {
        router.replace({ name: "actions", query: {} });
      }
      getActions();
    };

    const getCampaigns = (page = 1) => {
      loading.value = true;
      ApiService.get("/api/social-media/campaign", `?page=${page}`)
        .then((res) => {
          loading.value = false;
          campaigns.value = res.data.results;
          // totalItems.value = res.data.count;
          // totalPages.value = Math.ceil(res.data.count / 10);
        })
        .catch((err) => {
          loading.value = false;
        });
    };

    const getProfiles = (social_media) => {
      ApiService.query("/api/social-media/profile/", {
        params: { social_media },
      })
        .then((response) => {
          bots.value = response.data.results;
        })
        .catch((error) => {});
    };

    const submit = () => {
      loading.value = true;
      ApiService.post("/api/social-media/actions/", formData.value)
        .then((response) => {
          loading.value = false;
          hideModal(addActionModalRef.value);
          getActions();
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

    const getActions = (page = 1) => {
      pageLoading.value = true;
      const actions = filterActions.value
        ? filterActions.value
        : "like,comment,follow,direct";
      ApiService.query("/api/social-media/actions/", {
        params: {
          page,
          actions,
          social_media: filterSocialMedia.value,
          bot: filterBot.value,
          status: filterStatus.value,
          campaign_description: filterCampaign.value,
        },
      })
        .then((response) => {
          totalActions.value = response.data.count;
          pageLoading.value = false;
          tableData.value = response.data.results;
        })
        .catch((error) => {
          pageLoading.value = false;
        });
    };

    const getTotalActions = () => {
      pageLoading.value = true;
      const actions = filterActions.value
        ? filterActions.value
        : "like,comment,follow,direct";
      ApiService.query("/api/social-media/actions/count/", {
        params: {
          actions,
        },
      })
        .then((response) => {
          generalTotalActions.value = response.data.count;
          getActions();
        })
        .catch((error) => {
          pageLoading.value = false;
        });
    };

    const retryActions = () => {
      loading.value = true;
      ApiService.post("/api/social-media/retry-actions/", {
        ids: selectedIds.value,
      })
        .then((response) => {
          selectedIds.value.length = 0;
          getActions();
          loading.value = false;
        })
        .catch((error) => {
          loading.value = false;
        });
    };

    const deleteCustomer = (id) => {
      for (let i = 0; i < tableData.value.length; i++) {
        if (tableData.value[i].id === id) {
          tableData.value.splice(i, 1);
        }
      }
    };

    const getIcon = (social_media) => {
      if (social_media === "instagram") {
        return getAssetPath("media/svg/brand-logos/instagram-2-1.svg");
      }
      if (social_media === "twitter") {
        return getAssetPath("media/svg/brand-logos/twitter.svg");
      }
      if (social_media === "telegram") {
        return getAssetPath("media/svg/brand-logos/telegram.svg");
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

    const actionIcon = (action) => {
      if (action === "like") {
        return "hand-thumbs-up";
      }
      if (action === "comment") {
        return "chat";
      }
      if (action === "follow") {
        return "person-add";
      }
      if (action === "direct") {
        return "chat-left-text";
      }
    };

    const formatDate = (iso) => {
      const date = new Date(iso);
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    return {
      socialMedidaTypes,
      formData,
      bots,
      filterStatus,
      filterSocialMedia,
      campaigns,
      filterBot,
      filterCampaign,
      loading,
      pageLoading,
      rules,
      addActionModalRef,
      totalActions,
      generalTotalActions,
      actions,
      filterActions,
      filterStatusOptions,
      tableData,
      availableActions,
      tableHeader,
      deleteCustomer,
      formatDate,
      actionIcon,
      onCampaignChange,
      getIcon,
      statusClass,
      search,
      searchItems,
      selectedIds,
      retryActions,
      sort,
      onItemSelect,
      getAssetPath,
      getActions,
      getProfiles,
      submit,
    };
  },
});
</script>

<style lang="scss" scoped>
.post-text {
  text-overflow: ellipsis;
  max-width: 400px;
  overflow: hidden;
  white-space: nowrap;
  &.rtl {
    direction: rtl;
  }
}
</style>
