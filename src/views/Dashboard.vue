<template>
  <div v-loading="loading">
    <!--begin::Hero / account overview-->
    <div class="card mb-5 mb-xl-8 bg-primary">
      <div
        class="card-body d-flex align-items-center justify-content-between flex-wrap py-8"
      >
        <div class="d-flex align-items-center">
          <div class="symbol symbol-60px symbol-circle me-5">
            <span class="symbol-label bg-white bg-opacity-25">
              <el-icon :size="28" color="#fff"><User /></el-icon>
            </span>
          </div>
          <div>
            <h2 class="fs-2 fw-bold mb-1 text-white">
              Welcome back{{
                accountInfo.full_name ? ", " + accountInfo.full_name : ""
              }}
            </h2>
            <div class="text-white opacity-75 fs-6">
              {{ accountInfo.email }}
            </div>
          </div>
        </div>

        <div class="d-flex align-items-center gap-8 flex-wrap">
          <el-progress
            type="dashboard"
            :percentage="overallSuccessRate"
            :width="90"
            :stroke-width="8"
            color="#fff"
          >
            <template #default="{ percentage }">
              <span class="text-white fw-bold fs-4">{{ percentage }}%</span>
              <div class="text-white opacity-75 fs-8">Success rate actions</div>
            </template>
          </el-progress>

          <span
            :class="`badge badge-light-${
              accountInfo.is_active ? 'success' : 'danger'
            } fs-6 fw-bold`"
          >
            <el-icon class="me-1">
              <CircleCheckFilled v-if="accountInfo.is_active" />
              <CircleCloseFilled v-else />
            </el-icon>
            {{ accountInfo.is_active ? "Active" : "Inactive" }}
          </span>
        </div>
      </div>
    </div>
    <!--end::Hero-->

    <!--begin::KPI row-->
    <div class="row g-5 g-xl-8 mb-5 mb-xl-8">
      <div class="col-xl-4 col-md-6" v-for="stat in kpiCards" :key="stat.label">
        <div class="card card-xl-stretch">
          <div class="card-body py-6">
            <div class="d-flex align-items-center justify-content-between mb-4">
              <div class="symbol symbol-45px symbol-circle">
                <span :class="`symbol-label bg-light-${stat.color}`">
                  <el-icon :size="20" :class="`text-${stat.color}`">
                    <component :is="stat.icon" />
                  </el-icon>
                </span>
              </div>
              <span :class="`badge badge-light-${stat.color} fs-8 fw-bold`"
                >{{ stat.progress }}% {{ stat.progressLabel }}</span
              >
            </div>
            <div class="fs-2qx fw-bold text-gray-900 mb-1">
              {{ stat.value }}
            </div>
            <div class="text-muted fs-7 mb-3">{{ stat.label }}</div>
            <el-progress
              :percentage="stat.progress"
              :color="stat.hex"
              :stroke-width="6"
              :show-text="false"
            />
          </div>
        </div>
      </div>
    </div>
    <!--end::KPI row-->

    <!--begin::Next up + upcoming schedule-->
    <div class="row g-5 g-xl-8 mb-5 mb-xl-8">
      <div class="col-xl-5">
        <div class="card card-xl-stretch">
          <div class="card-body d-flex flex-column justify-content-center py-8">
            <template v-if="upcoming.next_publish">
              <div class="d-flex align-items-center mb-5">
                <div class="symbol symbol-55px symbol-circle me-5">
                  <span class="symbol-label bg-light-info">
                    <el-icon :size="24" class="text-info"><Clock /></el-icon>
                  </span>
                </div>
                <div>
                  <div class="text-muted fs-7 mb-1">Next scheduled publish</div>
                  <div class="fs-3 fw-bold text-gray-900">
                    {{ upcoming.next_publish.label }}
                  </div>
                  <div class="text-muted fs-7 text-capitalize">
                    {{ upcoming.next_publish.platform }} ·
                    {{ formatDateTime(upcoming.next_publish.send_date) }}
                  </div>
                </div>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <span class="badge badge-light-info fs-5 fw-bold">
                  {{ formatCountdown(upcoming.next_publish.send_date) }}
                </span>
                <span class="text-muted fs-7">
                  {{ upcoming.total_scheduled }} scheduled ·
                  {{ upcoming.due_within_24h }} in next 24h
                </span>
              </div>
            </template>
            <div v-else class="text-center py-6 text-muted">
              <el-icon :size="32" class="mb-2"><Clock /></el-icon>
              <div class="fs-6">Nothing scheduled right now</div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-7">
        <div class="card card-xl-stretch">
          <div class="card-header border-0 pt-5">
            <h3 class="card-title fw-bold fs-4 d-flex align-items-center">
              <el-icon class="me-2 text-info"><Calendar /></el-icon>
              Upcoming Schedule
            </h3>
          </div>
          <div class="card-body pt-0">
            <div
              class="d-flex align-items-center mb-5"
              v-for="item in upcoming.items"
              :key="item.source + '-' + item.id"
            >
              <div class="symbol symbol-40px symbol-circle me-4">
                <span class="symbol-label bg-light-info">
                  <el-icon :size="18" class="text-info">
                    <component :is="platformIcon(item.platform)" />
                  </el-icon>
                </span>
              </div>
              <div class="flex-grow-1 me-3">
                <span class="text-gray-900 fw-bold fs-6 d-block">{{
                  item.label
                }}</span>
                <span class="text-muted fs-7 text-capitalize"
                  >{{ item.platform }} ·
                  {{ formatDateTime(item.send_date) }}</span
                >
              </div>
              <span class="badge badge-light-warning fs-8 fw-bold">{{
                formatCountdown(item.send_date)
              }}</span>
            </div>
            <div
              v-if="!upcoming.items.length"
              class="text-muted fs-7 text-center py-10"
            >
              <el-icon :size="28" class="mb-2 d-block mx-auto"
                ><DocumentDelete
              /></el-icon>
              Nothing scheduled
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--end::Next up + upcoming schedule-->

    <!--begin::Trend charts-->
    <div class="row g-5 g-xl-8 mb-5 mb-xl-8">
      <div class="col-xl-7">
        <div class="card card-xl-stretch">
          <div class="card-header border-0 pt-5">
            <h3 class="card-title fw-bold fs-4 d-flex align-items-center">
              <el-icon class="me-2 text-success"><TrendCharts /></el-icon>
              Activity Trend (last 14 days)
            </h3>
          </div>
          <div class="card-body pt-0">
            <apexchart
              :key="'activity-' + chartKey"
              type="area"
              height="260"
              :options="activityTrendOptions"
              :series="activityTrendSeries"
            />
          </div>
        </div>
      </div>

      <div class="col-xl-5">
        <div class="card card-xl-stretch">
          <div class="card-header border-0 pt-5">
            <h3 class="card-title fw-bold fs-4 d-flex align-items-center">
              <el-icon class="me-2 text-warning"><Calendar /></el-icon>
              Schedule Forecast (next 7 days)
            </h3>
          </div>
          <div class="card-body pt-0">
            <apexchart
              :key="'schedule-' + chartKey"
              type="bar"
              height="260"
              :options="scheduleTrendOptions"
              :series="scheduleTrendSeries"
            />
          </div>
        </div>
      </div>
    </div>
    <!--end::Trend charts-->

    <!--begin::Breakdown charts-->
    <div class="row g-5 g-xl-8 mb-5 mb-xl-8">
      <div
        class="col-xl-6 col-lg-6"
        v-for="breakdown in breakdownCards"
        :key="breakdown.title"
      >
        <div class="card card-xl-stretch">
          <div class="card-header border-0 pt-5">
            <h3 class="card-title fw-bold fs-4 d-flex align-items-center">
              <el-icon class="me-2 text-primary"><PieChart /></el-icon>
              {{ breakdown.title }}
            </h3>
          </div>
          <div class="card-body pt-0">
            <template v-if="breakdown.total > 0">
              <apexchart
                :key="chartKey + '-' + breakdown.title"
                type="donut"
                height="230"
                :options="donutOptions(breakdown)"
                :series="Object.values(breakdown.data)"
              />
            </template>
            <div
              v-else
              class="d-flex flex-column align-items-center py-10 text-muted"
            >
              <el-icon :size="32" class="mb-2"><DocumentDelete /></el-icon>
              <span class="fs-7">No data yet</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--end::Breakdown charts-->

    <!--begin::Recent activity-->
    <div class="row g-5 g-xl-8">
      <div class="col-xl-6">
        <div class="card card-xl-stretch">
          <div class="card-header border-0 pt-5">
            <h3 class="card-title fw-bold fs-4 d-flex align-items-center">
              <el-icon class="me-2 text-info"><Files /></el-icon>
              Recent Posts
            </h3>
          </div>
          <div class="card-body pt-0">
            <div
              class="d-flex align-items-center mb-6"
              v-for="post in summary.crawler.recent_posts"
              :key="post.id"
            >
              <div class="symbol symbol-40px symbol-circle me-4">
                <span
                  :class="`symbol-label bg-light-${statusColor(post.status)}`"
                >
                  <el-icon
                    :size="18"
                    :class="`text-${statusColor(post.status)}`"
                  >
                    <Link />
                  </el-icon>
                </span>
              </div>
              <div class="flex-grow-1 me-3">
                <a
                  :href="post.url"
                  target="_blank"
                  class="text-gray-900 fw-bold text-hover-primary fs-6 d-block"
                  >{{ post.title || post.url }}</a
                >
                <span class="text-muted fs-7 text-capitalize">{{
                  post.account_platform
                }}</span>
              </div>
              <el-tag :type="tagType(post.status)" size="small" round>{{
                post.status
              }}</el-tag>
            </div>
            <div
              v-if="!summary.crawler.recent_posts.length"
              class="text-muted fs-7 text-center py-10"
            >
              <el-icon :size="28" class="mb-2 d-block mx-auto"
                ><DocumentDelete
              /></el-icon>
              No posts yet
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-6">
        <div class="card card-xl-stretch">
          <div class="card-header border-0 pt-5">
            <h3 class="card-title fw-bold fs-4 d-flex align-items-center">
              <el-icon class="me-2 text-warning"><Lightning /></el-icon>
              Recent Actions
            </h3>
          </div>
          <div class="card-body pt-0">
            <div
              class="d-flex align-items-center mb-6"
              v-for="act in summary.social_media.recent_actions"
              :key="act.id"
            >
              <div class="symbol symbol-40px symbol-circle me-4">
                <span
                  :class="`symbol-label bg-light-${statusColor(act.status)}`"
                >
                  <el-icon
                    :size="18"
                    :class="`text-${statusColor(act.status)}`"
                  >
                    <component :is="actionIcon(act.action)" />
                  </el-icon>
                </span>
              </div>
              <div class="flex-grow-1 me-3">
                <span class="text-gray-900 fw-bold fs-6 d-block">{{
                  act.bot_username || "—"
                }}</span>
                <span class="text-muted fs-7 text-capitalize"
                  >{{ act.action }} · {{ act.social_media }}</span
                >
              </div>
              <el-tag :type="tagType(act.status)" size="small" round>{{
                act.status
              }}</el-tag>
            </div>
            <div
              v-if="!summary.social_media.recent_actions.length"
              class="text-muted fs-7 text-center py-10"
            >
              <el-icon :size="28" class="mb-2 d-block mx-auto"
                ><DocumentDelete
              /></el-icon>
              No actions yet
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--end::Recent activity-->
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted, computed } from "vue";
import ApiService from "@/core/services/ApiService";
import VueApexCharts from "vue3-apexcharts";
import {
  User,
  CircleCheckFilled,
  CircleCloseFilled,
  PieChart,
  DocumentDelete,
  Files,
  Lightning,
  Link,
  Connection,
  Star,
  ChatDotRound,
  UserFilled,
  Picture,
  Position,
  Operation,
  TrendCharts,
  Clock,
  Calendar,
} from "@element-plus/icons-vue";

const COLOR_HEX = {
  primary: "#009ef7",
  success: "#50cd89",
  warning: "#ffc700",
  danger: "#f1416c",
  info: "#7239ea",
  secondary: "#a1a5b7",
};

const ACTION_ICON_MAP = {
  like: "Star",
  comment: "ChatDotRound",
  follow: "UserFilled",
  post: "Picture",
  direct: "Position",
};

const PLATFORM_ICON_MAP = {
  instagram: "Picture",
  twitter: "ChatDotRound",
  telegram: "Position",
  web: "Link",
};

const STATUS_COLOR_MAP = {
  success: "success",
  added: "success",
  enable: "success",
  created: "success",
  sent: "success",
  failed: "danger",
  disable: "danger",
  trash: "danger",
  rejected: "danger",
  pending: "warning",
  requested: "warning",
  "checking-profile": "warning",
  "profile-is-not-login": "danger",
  "grab-profile": "info",
  "ai-generated": "info",
  "check-bot": "warning",
};

const emptySummary = () => ({
  account: {},
  crawler: {
    total_accounts: 0,
    accounts_by_status: {},
    total_posts: 0,
    posts_by_status: {},
    recent_posts: [],
  },
  social_media: {
    total_profiles: 0,
    profiles_by_platform: {},
    profiles_by_status: {},
    total_actions: 0,
    actions_by_status: {},
    recent_actions: [],
    total_telegram_bots: 0,
    telegram_bots_by_status: {},
  },
  campaigns: {
    total_campaigns: 0,
    active_campaigns: 0,
    campaigns_by_status: {},
  },
  upcoming: {
    total_scheduled: 0,
    due_within_24h: 0,
    next_publish: null,
    items: [],
  },
  trends: {
    activity: { categories: [], posts: [], actions: [] },
    schedule: { categories: [], scheduled: [] },
  },
});

export default defineComponent({
  name: "dashboard-page",
  components: {
    apexchart: VueApexCharts,
    User,
    CircleCheckFilled,
    CircleCloseFilled,
    PieChart,
    DocumentDelete,
    Files,
    Lightning,
    Link,
    Connection,
    Star,
    ChatDotRound,
    UserFilled,
    Picture,
    Position,
    Operation,
    TrendCharts,
    Clock,
    Calendar,
  },
  setup() {
    const loading = ref(true);
    const chartKey = ref(0);
    const nowTick = ref(Date.now());
    let tickTimer = null;

    const summary = ref(emptySummary());

    const accountInfo = computed(() => summary.value.account || {});
    const upcoming = computed(() => summary.value.upcoming);

    const pct = (part, total) =>
      total > 0 ? Math.round((part / total) * 100) : 0;

    const overallSuccessRate = computed(() => {
      const successfulActions =
        summary.value.social_media.actions_by_status.success || 0;
      const totalActions = summary.value.social_media.total_actions || 0;
      return pct(successfulActions, totalActions);
    });

    // NOTE: icon names for stat.icon reference the Element Plus icon
    // components registered above (e.g. "Connection", "Files"). Swap any
    // that don't match your installed @element-plus/icons-vue version.
    const kpiCards = computed(() => {
      const c = summary.value.crawler;
      const sm = summary.value.social_media;
      const cmp = summary.value.campaigns;

      const createdPosts =
        (c.posts_by_status.created || 0) +
        (c.posts_by_status["ai-generated"] || 0);
      const successActions = sm.actions_by_status.success || 0;
      const addedProfiles = sm.profiles_by_status.added || 0;
      const enabledAccounts = c.accounts_by_status.enable || 0;
      const successCampaigns = cmp.campaigns_by_status.success || 0;

      return [
        {
          label: "Crawler Accounts",
          value: c.total_accounts,
          icon: "Connection",
          color: "primary",
          hex: COLOR_HEX.primary,
          progress: pct(enabledAccounts, c.total_accounts),
          progressLabel: "enabled",
        },
        {
          label: "Crawled Posts",
          value: c.total_posts,
          icon: "Files",
          color: "info",
          hex: COLOR_HEX.info,
          progress: pct(createdPosts, c.total_posts),
          progressLabel: "created",
        },
        {
          label: "Social Profiles",
          value: sm.total_profiles + sm.total_telegram_bots,
          icon: "UserFilled",
          color: "success",
          hex: COLOR_HEX.success,
          progress:
            pct(addedProfiles, sm.total_profiles) +
            pct(sm.telegram_bots_by_status.enable || 0, sm.total_telegram_bots),
          progressLabel: "added",
        },
        {
          label: "Total Actions",
          value: sm.total_actions,
          icon: "Lightning",
          color: "warning",
          hex: COLOR_HEX.warning,
          progress: pct(successActions, sm.total_actions),
          progressLabel: "success",
        },
        {
          label: "Campaigns",
          value: cmp.total_campaigns,
          icon: "Position",
          color: "danger",
          hex: COLOR_HEX.danger,
          progress: pct(cmp.active_campaigns, cmp.total_campaigns),
          progressLabel: "active",
        },
        {
          label: "Successful Campaigns",
          value: successCampaigns,
          icon: "TrendCharts",
          color: "success",
          hex: COLOR_HEX.success,
          progress: pct(successCampaigns, cmp.total_campaigns),
          progressLabel: "success",
        },
        // {
        //   label: "Telegram Bots",
        //   value: sm.total_telegram_bots,
        //   icon: "Position",
        //   color: "info",
        //   hex: COLOR_HEX.info,
        //   progress: pct(
        //     sm.telegram_bots_by_status.enable || 0,
        //     sm.total_telegram_bots
        //   ),
        //   progressLabel: "enabled",
        // },
      ];
    });

    const breakdownCards = computed(() => {
      const cards = [
        {
          title: "Crawler Accounts by Status",
          data: summary.value.crawler.accounts_by_status,
        },
        {
          title: "Crawled Posts by Status",
          data: summary.value.crawler.posts_by_status,
        },
        {
          title: "Profiles by Platform",
          data: summary.value.social_media.profiles_by_platform,
        },
        {
          title: "Actions by Status",
          data: summary.value.social_media.actions_by_status,
        },
      ];
      return cards.map((card) => ({
        ...card,
        total: Object.values(card.data).reduce((a, b) => a + b, 0),
      }));
    });

    const activityTrendSeries = computed(() => {
      const t = summary.value.trends.activity;
      return [
        { name: "Posts Crawled", data: t.posts || [] },
        { name: "Actions Completed", data: t.actions || [] },
      ];
    });

    const activityTrendOptions = computed(() => ({
      chart: { toolbar: { show: false }, zoom: { enabled: false } },
      xaxis: {
        categories: summary.value.trends.activity.categories || [],
        labels: {
          rotate: 0,
          style: { fontSize: "10px" },
          formatter: (val) => shortDateLabel(val),
        },
      },
      colors: [COLOR_HEX.info, COLOR_HEX.success],
      stroke: { curve: "smooth", width: 2 },
      fill: {
        type: "gradient",
        gradient: { opacityFrom: 0.4, opacityTo: 0.05 },
      },
      dataLabels: { enabled: false },
      legend: { position: "top" },
      grid: { strokeDashArray: 4 },
    }));

    const scheduleTrendSeries = computed(() => [
      {
        name: "Scheduled",
        data: summary.value.trends.schedule.scheduled || [],
      },
    ]);

    const scheduleTrendOptions = computed(() => ({
      chart: { toolbar: { show: false } },
      xaxis: {
        categories: summary.value.trends.schedule.categories || [],
        labels: {
          style: { fontSize: "10px" },
          formatter: (val) => shortDateLabel(val),
        },
      },
      colors: [COLOR_HEX.warning],
      plotOptions: { bar: { borderRadius: 6, columnWidth: "45%" } },
      dataLabels: { enabled: true },
      legend: { show: false },
      grid: { strokeDashArray: 4 },
    }));

    const statusColor = (status) => STATUS_COLOR_MAP[status] || "secondary";

    const tagType = (status) => {
      const color = statusColor(status);
      const map = {
        success: "success",
        danger: "danger",
        warning: "warning",
        info: "info",
        secondary: "info",
      };
      return map[color] || "info";
    };

    const actionIcon = (action) => ACTION_ICON_MAP[action] || "Operation";
    const platformIcon = (platform) =>
      PLATFORM_ICON_MAP[platform] || "Position";

    const donutOptions = (breakdown) => {
      const labels = Object.keys(breakdown.data).map((k) =>
        k.replace(/-/g, " ")
      );
      const colors = Object.keys(breakdown.data).map(
        (k) => COLOR_HEX[statusColor(k)] || COLOR_HEX.secondary
      );
      return {
        labels,
        colors,
        legend: { position: "bottom", fontSize: "12px" },
        dataLabels: {
          enabled: true,
          formatter: (val) => Math.round(val) + "%",
        },
        stroke: { width: 2 },
        plotOptions: {
          pie: {
            donut: {
              size: "65%",
              labels: {
                show: true,
                total: { show: true, label: "Total", fontSize: "13px" },
              },
            },
          },
        },
      };
    };

    const formatDateTime = (dateStr) => new Date(dateStr).toLocaleString();

    const shortDateLabel = (isoDate) =>
      new Date(isoDate + "T00:00:00").toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      });

    const formatCountdown = (dateStr) => {
      const target = new Date(dateStr).getTime();
      const diff = target - nowTick.value;
      if (diff <= 0) return "Due now";
      const minutes = Math.floor(diff / 60000);
      const days = Math.floor(minutes / (60 * 24));
      const hours = Math.floor((minutes % (60 * 24)) / 60);
      const mins = minutes % 60;
      if (days > 0) return `in ${days}d ${hours}h`;
      if (hours > 0) return `in ${hours}h ${mins}m`;
      return `in ${mins}m`;
    };

    const fetchSummary = () => {
      loading.value = true;
      ApiService.get("/dashboard/summary/", "")
        .then((response) => {
          summary.value = { ...emptySummary(), ...response.data };
          chartKey.value += 1; // forces apexcharts to fully re-render with new series
          loading.value = false;
        })
        .catch(() => {
          loading.value = false;
        });
    };

    onMounted(() => {
      fetchSummary();
      // keeps "in Xh Ym" countdowns fresh without re-fetching from the API
      tickTimer = setInterval(() => {
        nowTick.value = Date.now();
      }, 60000);
    });

    onUnmounted(() => {
      if (tickTimer) clearInterval(tickTimer);
    });

    return {
      loading,
      chartKey,
      summary,
      accountInfo,
      upcoming,
      overallSuccessRate,
      kpiCards,
      breakdownCards,
      activityTrendSeries,
      activityTrendOptions,
      scheduleTrendSeries,
      scheduleTrendOptions,
      statusColor,
      tagType,
      actionIcon,
      platformIcon,
      donutOptions,
      formatDateTime,
      formatCountdown,
      shortDateLabel,
      fetchSummary,
    };
  },
});
</script>
