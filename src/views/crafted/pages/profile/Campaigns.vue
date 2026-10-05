<template>
  <div v-loading="loading" class="card">
    <!--begin::Card header-->
    <div class="card-header border-0 pt-6">
      <!--begin::Filters-->
      <div class="card-title" v-if="campaigns.length > 0 || hasFilters">
        <div class="row align-items-center position-relative my-1">
          <div class="filter-bot col-md-4 col-xs-12">
            <div class="form-label fw-semibold">Accounts</div>
            <el-select
              v-model="filterBots"
              multiple
              collapse-tags
              clearable
              placeholder="All accounts"
              class="w-250px"
              @change="onFilterChange"
            >
              <el-option
                v-for="bot in bots"
                :key="bot.id"
                :value="bot.id"
                :label="bot.username"
              />
            </el-select>
          </div>
          <div class="filter-action col-md-4 col-xs-12">
            <div class="form-label fw-semibold">Actions</div>
            <el-select
              v-model="filterActions"
              multiple
              collapse-tags
              clearable
              placeholder="All actions"
              class="w-250px"
              @change="onFilterChange"
            >
              <el-option
                v-for="action in availableActions"
                :key="action"
                :value="action"
                :label="action"
              />
            </el-select>
          </div>
          <div class="filter-targets col-md-4 col-xs-12">
            <div class="form-label fw-semibold">Targets</div>
            <el-select
              v-model="filterTargets"
              multiple
              filterable
              allow-create
              default-first-option
              collapse-tags
              clearable
              placeholder="Type or pick targets"
              class="w-250px"
              @change="onFilterChange"
            >
              <el-option
                v-for="target in targetOptions"
                :key="target"
                :value="target"
                :label="target"
              />
            </el-select>
          </div>
        </div>
      </div>
      <div class="card-title" v-else></div>
      <!--end::Filters-->

      <div class="card-toolbar">
        <router-link
          :to="{ name: 'createCampaign' }"
          class="btn btn-primary btn-sm"
          data-bs-toggle="tooltip"
        >
          Create Campaign
        </router-link>
      </div>
    </div>
    <!--end::Card header-->

    <div class="card-body pt-0" v-if="campaigns.length > 0 || hasFilters">
      <Datatable
        :key="tableKey"
        :data="campaigns"
        :header="tableHeader"
        :total="totalItems"
        :items-per-page="10"
        :checkbox-enabled="false"
        @page-change="getCampaigns"
      >
        <template v-slot:campaign="{ row: campaign }">
          <img
            width="25"
            class="me-2"
            :src="getIcon(campaign.social_media)"
            alt=""
          />
          {{ campaign.campaign_description }}
        </template>
        <template v-slot:actions="{ row: campaign }">
          <i
            v-for="(action, idx) in campaign.actions"
            :key="idx"
            :class="`bi bi-${actionIcon(action)} fs-2 me-3`"
            :title="action"
          />
        </template>
        <template v-slot:targets="{ row: campaign }">
          <div class="targets d-flex overflow-x-auto mw-450px">
            <div
              v-for="(target, idx) in campaign.urls"
              :key="idx"
              class="me-2 bg-light-primary p-2 rounded"
            >
              {{ targetName(target) }}
            </div>
          </div>
        </template>
        <template v-slot:accounts="{ row: campaign }">
          <div class="symbol-group symbol-hover flex-nowrap">
            <div
              v-for="(bot, idx) in campaign.bots_objects"
              :key="idx"
              class="symbol symbol-35px symbol-circle"
              :title="bot.username"
            >
              <img
                v-if="bot.image"
                alt="Pic"
                :src="'https://46.225.112.201/' + bot.image"
              />
              <span
                v-else
                class="symbol-label fw-bold bg-primary text-inverse-primary"
                >{{ bot.username[0] }}</span
              >
            </div>
          </div>
        </template>
        <!--        <template v-slot:status="{ row: campaign }">-->
        <!--          <div class="status badge" :class="statusClass(campaign.status)">-->
        <!--            {{ campaign.status }}-->
        <!--          </div>-->
        <!--        </template>-->
        <template v-slot:operations="{ row: campaign }">
          <router-link
            :to="{
              name: 'actions',
              query: { campaign: campaign.campaign_description },
            }"
            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
          >
            <KTIcon icon-name="right-square" icon-class="fs-3" />
          </router-link>
          <!--          <button-->
          <!--            type="button"-->
          <!--            class="btn btn-icon btn-bg-light btn-active-color-danger btn-sm"-->
          <!--            @click="removeCampaign(campaign.id)"-->
          <!--          >-->
          <!--            <KTIcon icon-name="trash" icon-class="fs-3" />-->
          <!--          </button>-->
        </template>
      </Datatable>
    </div>

    <div class="card-body p-0" v-else>
      <!--begin::Heading-->
      <div class="card-px text-center pt-20">
        <h2 class="fs-2x fw-bold mb-10">welcome to Campaigns</h2>
        <p class="text-gray-500 fs-5 fw-semibold mb-13">
          <span>you can create a campaign to growth your accounts</span>
        </p>
      </div>
      <!--end::Heading-->

      <div class="text-center px-5 my-20">
        <img
          class="w-250px w-lg-300px theme-light-show"
          :src="getAssetPath('media/illustrations/sketchy-1/1.png')"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { getAssetPath } from "@/core/helpers/assets";
import { computed, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import KTIcon from "@/core/helpers/kt-icon/KTIcon.vue";
import ApiService from "@/core/services/ApiService";

const campaigns = ref([]);
const loading = ref(false);
const totalItems = ref(0);
const totalPages = ref(0);

const bots = ref([]);
const availableActions = ref(["like", "follow", "comment", "direct"]);
const filterBots = ref([]);
const filterActions = ref([]);
const filterTargets = ref([]);
const targetOptions = ref([]);
// bumping the key remounts the table so it goes back to page 1
const tableKey = ref(0);

const hasFilters = computed(
  () =>
    filterBots.value.length > 0 ||
    filterActions.value.length > 0 ||
    filterTargets.value.length > 0
);

const tableHeader = ref([
  {
    columnName: "campaign",
    columnLabel: "campaign",
    sortEnabled: false,
    columnWidth: 250,
  },
  {
    columnName: "actions",
    columnLabel: "actions",
    sortEnabled: false,
    columnWidth: 150,
  },
  {
    columnName: "targets",
    columnLabel: "targets",
    sortEnabled: false,
    columnWidth: 250,
  },
  {
    columnName: "accounts",
    columnLabel: "accounts",
    sortEnabled: false,
    columnWidth: 200,
  },
  // {
  //   columnName: "status",
  //   columnLabel: "status",
  //   sortEnabled: false,
  //   columnWidth: 120,
  // },
  {
    columnName: "",
    columnLabel: "operations",
    sortEnabled: false,
    columnWidth: 120,
  },
]);

onMounted(() => {
  getCampaigns();
  getProfiles();
  getTargetOptions();
});

const getTargetOptions = () => {
  ApiService.query("/api/social-media/campaign/targets/", { params: {} })
    .then((response) => {
      targetOptions.value = response.data;
    })
    .catch(() => {});
};

const getProfiles = () => {
  ApiService.query("/api/social-media/profile/", { params: {} })
    .then((response) => {
      bots.value = response.data.results;
    })
    .catch(() => {});
};

const onFilterChange = () => {
  tableKey.value++;
  getCampaigns();
};

const removeCampaign = (id) => {
  loading.value = true;
  ApiService.delete(`/api/social-media/campaign/${id}/`)
    .then(() => {
      loading.value = false;
      getCampaigns();
      getTargetOptions();
    })
    .catch(() => {
      loading.value = false;
    });
};

const getCampaigns = (page = 1) => {
  loading.value = true;
  ApiService.query("/api/social-media/campaign/", {
    params: {
      page,
      bots: filterBots.value.join(",") || undefined,
      actions: filterActions.value.join(",") || undefined,
      targets: filterTargets.value.join(",") || undefined,
    },
  })
    .then((res) => {
      loading.value = false;
      campaigns.value = res.data.results;
      totalItems.value = res.data.count;
      totalPages.value = Math.ceil(res.data.count / 10);
    })
    .catch(() => {
      loading.value = false;
    });
};

const getIcon = (social_media) => {
  if (social_media === "instagram") {
    return getAssetPath("media/svg/brand-logos/instagram-2-1.svg");
  }
  if (social_media === "twitter") {
    return getAssetPath("media/svg/brand-logos/twitter.svg");
  }
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

const targetName = (target) => {
  if (target.includes("/")) {
    return new URL(target).pathname.split("/").filter(Boolean)[0];
  }
  return target;
};

const statusClass = (status) => {
  if (status === "success" || status === "added") {
    return "badge-success";
  }
  if (status === "pending" || status === "requested") {
    return "badge-warning";
  }
  return "badge-danger";
};
</script>
