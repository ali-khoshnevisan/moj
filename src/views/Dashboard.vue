<template>
  <div class="dashboard-grid">
    <el-card class="welcome-card">
      <div class="welcome-content">
        <div class="d-flex flex-column">
          <h2>Welcome back, {{ profile.name }}</h2>
          <p class="text-muted">You have 5 new Direct messages.</p>

          <div class="welcome-stats">
            <div>
              <div class="stat-label">TODAY'S POSTS</div>
              <div class="stat-value">
                12
                <span class="positive">+7%</span>
              </div>
              <el-progress
                :percentage="70"
                :show-text="false"
                status="success"
              />
            </div>

            <div>
              <div class="stat-label">GROWTH RATE</div>
              <div class="stat-value">
                78.4%
                <span class="negative">-1%</span>
              </div>
              <el-progress
                :percentage="78"
                :show-text="false"
                status="exception"
              />
            </div>
          </div>
        </div>

        <div class="welcome-image">
          <img
            height="200px"
            :src="getAssetPath('media/illustrations/sigma-1/7.png')"
          />
        </div>
      </div>
    </el-card>

    <el-card class="metric-card">
      <div class="metric-header">TOTAL FOLLOWERS</div>

      <div class="metric-number">
        <!--        {{ totalFollowers }}-->
        250
        <span class="positive">+2%</span>
      </div>

      <div class="card-body pt-2 pb-4 d-flex flex-wrap align-items-center">
        <!--begin::Chart-->
        <div class="d-flex flex-center me-5 pt-2">
          <div
            id="kt_card_widget_17_chart"
            :style="{
              minWidth: `${100}px`,
              minHeight: `${100}px`,
            }"
            :data-kt-size="100"
            :data-kt-line="11"
          ></div>
        </div>
        <!--end::Chart-->

        <!--begin::Labels-->
        <div class="d-flex flex-column content-justify-center flex-row-fluid">
          <!--begin::Label-->
          <div class="d-flex fw-semibold align-items-center">
            <!--begin::Bullet-->
            <div class="bullet w-8px h-3px rounded-2 bg-success me-3"></div>
            <!--end::Bullet-->

            <!--begin::Label-->
            <div class="text-gray-500 flex-grow-1 me-4">Instagram</div>
            <!--end::Label-->

            <!--begin::Stats-->
            <div class="fw-bolder text-gray-700 text-xxl-end">420</div>
            <!--end::Stats-->
          </div>
          <!--end::Label-->

          <!--begin::Label-->
          <div class="d-flex fw-semibold align-items-center my-3">
            <!--begin::Bullet-->
            <div class="bullet w-8px h-3px rounded-2 bg-primary me-3"></div>
            <!--end::Bullet-->

            <!--begin::Label-->
            <div class="text-gray-500 flex-grow-1 me-4">X</div>
            <!--end::Label-->

            <!--begin::Stats-->
            <div class="fw-bolder text-gray-700 text-xxl-end">150</div>
            <!--end::Stats-->
          </div>
          <!--end::Label-->
        </div>
        <!--end::Labels-->
      </div>

      <!--      <div class="fake-chart"></div>-->
    </el-card>

    <el-card class="metric-card">
      <div class="metric-header">ACTIVE PROFILES</div>

      <div class="metric-number">
        {{ activProfilesCount }}
        <!--        <span class="negative">-1%</span>-->
      </div>

      <div class="card-body pt-2 pb-4 d-flex flex-wrap align-items-center">
        <!--begin::Chart-->
        <div class="d-flex flex-center me-5 pt-2">
          <div
            id="kt_card_widget_18_chart"
            :style="{
              minWidth: `${100}px`,
              minHeight: `${100}px`,
            }"
            :data-kt-size="100"
            :data-kt-line="11"
          ></div>
        </div>
        <!--end::Chart-->

        <!--begin::Labels-->
        <div class="d-flex flex-column content-justify-center flex-row-fluid">
          <!--begin::Label-->
          <div class="d-flex fw-semibold align-items-center">
            <!--begin::Bullet-->
            <div class="bullet w-8px h-3px rounded-2 bg-success me-3"></div>
            <!--end::Bullet-->

            <!--begin::Label-->
            <div class="text-gray-500 flex-grow-1 me-4">Instagram</div>
            <!--end::Label-->

            <!--begin::Stats-->
            <div class="fw-bolder text-gray-700 text-xxl-end">1</div>
            <!--end::Stats-->
          </div>
          <!--end::Label-->

          <!--begin::Label-->
          <div class="d-flex fw-semibold align-items-center my-3">
            <!--begin::Bullet-->
            <div class="bullet w-8px h-3px rounded-2 bg-primary me-3"></div>
            <!--end::Bullet-->

            <!--begin::Label-->
            <div class="text-gray-500 flex-grow-1 me-4">X</div>
            <!--end::Label-->

            <!--begin::Stats-->
            <div class="fw-bolder text-gray-700 text-xxl-end">1</div>
            <!--end::Stats-->
          </div>
          <!--end::Label-->

          <!--begin::Label-->
          <div class="d-flex fw-semibold align-items-center">
            <!--begin::Bullet-->
            <div
              class="bullet w-8px h-3px rounded-2 me-3"
              style="background-color: #e4e6ef"
            ></div>
            <!--end::Bullet-->

            <!--begin::Label-->
            <div class="text-gray-500 flex-grow-1 me-4">Telegram</div>
            <!--end::Label-->

            <!--begin::Stats-->
            <div class="fw-bolder text-gray-700 text-xxl-end">0</div>
            <!--end::Stats-->
          </div>
          <!--end::Label-->
        </div>
        <!--end::Labels-->
      </div>
      <!--      <div class="gauge-wrapper">-->
      <!--        <el-progress type="dashboard" :percentage="100" :stroke-width="12">-->
      <!--          <template #default="{ percentage }">-->
      <!--            <span>{{ percentage }}%</span>-->
      <!--          </template>-->
      <!--        </el-progress>-->
      <!--      </div>-->
    </el-card>

    <el-card class="small-metric">
      <div class="card-top">
        <div class="col-6">SCHEDULED POSTS</div>
        <el-select v-model="schedulDate">
          <el-option>Today</el-option>
          <el-option>Next 7 days</el-option>
          <el-option>Next 30 days</el-option>
        </el-select>
      </div>

      <div class="instagram-schedule d-flex justify-content-between mt-7">
        <i class="bi bi-instagram fs-1"></i>
        32 posts
      </div>

      <div class="instagram-schedule d-flex justify-content-between mt-7">
        <i class="bi bi-twitter-x fs-1"></i>
        32 posts
      </div>

      <!--      <div class="small-info">-->
      <!--        <span>Conversion rate</span>-->
      <!--        <span class="positive">+7%</span>-->
      <!--      </div>-->

      <!--      <el-progress :percentage="75" :show-text="false" />-->
    </el-card>

    <el-card class="small-metric">
      <div class="card-top">
        <div class="col-6">LAST POST STATISTICS</div>
        <div class="social-tabs">
          <div
            v-for="item in platformOptions"
            :key="item.value"
            class="social-tab"
            :class="[
              item.value,
              { active: lastStatisticsPlatform === item.value },
            ]"
            @click="changePlatform(item.value)"
          >
            <i class="fs-1" :class="item.icon"></i>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-between mt-7">
        <i class="bi bi-hand-thumbs-up fs-1"></i>
        32 likes
      </div>

      <div class="instagram-schedule d-flex justify-content-between mt-7">
        <i class="bi bi-chat fs-1"></i>
        32 comments
      </div>
    </el-card>

    <el-card class="small-metric">
      <div class="card-top">
        <span class="mt-3">NEXT PUBLISH TIME</span>
      </div>
      <div class="instagram-schedule d-flex justify-content-between mt-3">
        <i class="bi bi-instagram fs-1"></i>
        2026/10/09 23:59
      </div>

      <div class="instagram-schedule d-flex justify-content-between mt-3">
        <i class="bi bi-twitter-x fs-1"></i>
        2026/10/09 23:59
      </div>
      <div class="instagram-schedule d-flex justify-content-between mt-3">
        <i class="bi bi-telegram fs-1"></i>
        2026/10/09 23:59
      </div>
    </el-card>

    <el-card class="small-metric">
      <div class="card-top">
        <span>ACTIVE SUBSCRIPTIONS</span>
        <span>Last 7 days</span>
      </div>

      <h2>2,986 <span class="positive">+4%</span></h2>

      <div class="bar-chart">
        <span
          v-for="i in 20"
          :key="i"
          :style="{ height: `${20 + (i % 6) * 8}px` }"
        />
      </div>
    </el-card>

    <el-card class="info-card">
      <div class="info-content">
        <img
          width="35px"
          :src="getAssetPath('media/svg/brand-logos/instagram-2-1.svg')"
        />
        <div>
          <div class="info-title">132 Comments</div>
          <div class="text-muted">12 comments today</div>
        </div>
      </div>
    </el-card>

    <el-card class="info-card">
      <div class="info-content">
        <img
          width="35px"
          :src="getAssetPath('media/svg/brand-logos/instagram-2-1.svg')"
        />

        <div>
          <div class="info-title">78 Likes</div>
          <div class="text-muted">32 today</div>
        </div>
      </div>
    </el-card>

    <el-card class="info-card">
      <div class="info-content">
        <img
          width="35px"
          :src="getAssetPath('media/svg/brand-logos/twitter-2.svg')"
        />

        <div>
          <div class="info-title">623 Likes</div>
          <div class="text-muted">16 today</div>
        </div>
      </div>
    </el-card>

    <el-card class="info-card">
      <div class="info-content">
        <img
          width="35px"
          :src="getAssetPath('media/svg/brand-logos/twitter-2.svg')"
        />

        <div>
          <div class="info-title">132 Comments</div>
          <div class="text-muted">21 today</div>
        </div>
      </div>
    </el-card>
  </div>
  <div class="row gx-5 gx-xl-7">
    <!--    &lt;!&ndash;begin::Col&ndash;&gt;-->
    <div class="col-md-6 my-10">
      <widget1 />
    </div>
    <!--    <div class="col-md-5 mb-10">-->
    <!--      <widget2 />-->
    <!--    </div>-->
    <!--    &lt;!&ndash;    <div class="col-md-2 mb-10">&ndash;&gt;-->
    <!--    &lt;!&ndash;      <widget3 :chartSize="100" :class-name="'h-100'" />&ndash;&gt;-->
    <!--    &lt;!&ndash;    </div>&ndash;&gt;-->
    <!--    <div class="col-md-3 mb-10">-->
    <!--      <list-widget1 />-->
    <!--    </div>-->
    <!--    <div class="col-md-3 mb-10">-->
    <!--      <follow-widget />-->
    <!--    </div>-->
    <!--    <div class="col-md-3 mb-10">-->
    <!--      <comment-widget />-->
    <!--    </div>-->
    <!--    <div class="col-md-3 mb-10">-->
    <!--      <direct-widget />-->
    <!--    </div>-->
    <!--    &lt;!&ndash;    <div class="col-md-12 mb-5 col-xs-12">&ndash;&gt;-->
    <!--    &lt;!&ndash;      <widget />&ndash;&gt;-->
    <!--    &lt;!&ndash;    </div>&ndash;&gt;-->
    <!--    &lt;!&ndash;    <div class="col-md-6 mb-5 col-xs-12">&ndash;&gt;-->
    <!--    &lt;!&ndash;      <widget3 />&ndash;&gt;-->
    <!--    &lt;!&ndash;    </div>&ndash;&gt;-->
    <!--    <div class="col-xl-12 mb-5 mb-xl-10">-->
    <!--      &lt;!&ndash;      <Widget5 className="card card-xl-stretch mb-xl-8" />&ndash;&gt;-->
    <!--    </div>-->
    <!--    &lt;!&ndash;end::Col&ndash;&gt;-->
    <!--  </div>-->
    <!--  <div class="row g-5 g-xl-10 mb-5 mb-xl-10">-->
    <!--    &lt;!&ndash;begin::Col&ndash;&gt;-->
    <!--    <div class="col-xxl-6">-->
    <!--      &lt;!&ndash;      <Widget8&ndash;&gt;-->
    <!--      &lt;!&ndash;        className="h-xl-100"&ndash;&gt;-->
    <!--      &lt;!&ndash;        :image="getAssetPath('media/stock/600x600/img-65.jpg')"&ndash;&gt;-->
    <!--      &lt;!&ndash;      />&ndash;&gt;-->
    <!--    </div>-->
    <!--    &lt;!&ndash;end::Col&ndash;&gt;-->

    <!--    &lt;!&ndash;begin::Col&ndash;&gt;-->
    <!--    <div class="col-xl-6">-->
    <!--      &lt;!&ndash;      <Widget9 className="h-lg-100" :height="300" />&ndash;&gt;-->
    <!--    </div>-->
    <!--    &lt;!&ndash;end::Col&ndash;&gt;-->
    <!--  </div>-->
    <!--  <div class="row g-5 g-xl-10 mb-5 mb-xl-10">-->
    <!--    <div class="col-xl-8"></div>-->
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Widget1 from "@/components/widgets/charts/Widget1.vue";
import ListWidget1 from "@/components/widgets/lists/Widget1.vue";
import FollowWidget from "@/components/widgets/lists/WidgetFollow.vue";
import CommentWidget from "@/components/widgets/lists/WidgetComment.vue";
import DirectWidget from "@/components/widgets/lists/WidgetDirect.vue";
import Widget2 from "@/components/widgets/lists/Widget2.vue";
import Widget3 from "@/components/dashboard-default-widgets/Widget3.vue";
import Widget from "@/components/widgets/lists/Widget7.vue";
import Widget5 from "@/components/widgets/lists/Widget5.vue";
import Widget6 from "@/components/dashboard-default-widgets/Widget6.vue";
import Widget7 from "@/components/dashboard-default-widgets/Widget7.vue";
import Widget8 from "@/components/dashboard-default-widgets/Widget8.vue";
import Widget9 from "@/components/dashboard-default-widgets/Widget9.vue";
import Widget10 from "@/components/dashboard-default-widgets/Widget10.vue";
import MixedWidget5 from "@/components/widgets/mixed/Widget5.vue";
import { Opportunity, Money, ShoppingCart } from "@element-plus/icons-vue";
import ApiService from "@/core/services/ApiService";
import { useAuthStore } from "@/stores/auth";
import { getCSSVariableValue } from "@/assets/ts/_utils";

export default defineComponent({
  name: "main-dashboard",
  components: {
    Opportunity,
    Money,
    ShoppingCart,
    Widget1,
    ListWidget1,
    FollowWidget,
    CommentWidget,
    DirectWidget,
    Widget2,
    Widget,
    Widget3,
    Widget5,
    Widget6,
    Widget7,
    Widget8,
    Widget9,
    Widget10,
    MixedWidget5,
  },
  setup(props, { expose }) {
    onMounted(() => {
      getUserProfile();
      getActiveProfiles();
      initChart();
      initChart2();
    });

    const profile = ref({});
    const profiles = ref([]);
    const activProfilesCount = ref([]);
    const totalFollowers = ref(0);
    const lastStatisticsPlatform = ref("instagram");
    const platformOptions = [
      {
        value: "instagram",
        label: "Instagram",
        icon: "bi bi-instagram",
      },
      {
        value: "twitter",
        label: "Twitter",
        icon: "bi bi-twitter-x",
      },
    ];
    const publishPlatformOptions = [
      {
        value: "instagram",
        label: "Instagram",
        icon: "bi bi-instagram",
      },
      {
        value: "twitter",
        label: "Twitter",
        icon: "bi bi-twitter-x",
      },
      {
        value: "telegram",
        label: "Telegram",
        icon: "bi bi-telegram",
      },
    ];
    const schedulDate = ref("Next 7 days");
    const loading = ref(false);
    const store = useAuthStore();

    const initChart = () => {
      expose();
      var el = document.getElementById("kt_card_widget_18_chart");

      if (!el) {
        return;
      }

      var options = {
        size: el.getAttribute("data-kt-size")
          ? parseInt(el.getAttribute("data-kt-size") as string)
          : 70,
        lineWidth: el.getAttribute("data-kt-line")
          ? parseInt(el.getAttribute("data-kt-line") as string)
          : 11,
        rotate: el.getAttribute("data-kt-rotate")
          ? parseInt(el.getAttribute("data-kt-rotate") as string)
          : 90,
        //percent:  el.getAttribute('data-kt-percent') ,
      };

      var canvas = document.createElement("canvas");
      var span = document.createElement("span");

      var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      canvas.width = canvas.height = options.size;

      el.appendChild(span);
      el.appendChild(canvas);

      ctx.translate(options.size / 2, options.size / 2); // change center
      ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

      //imd = ctx.getImageData(0, 0, 240, 240);
      var radius = (options.size - options.lineWidth) / 2;

      var drawCircle = function (
        color: string,
        lineWidth: number,
        percent: number
      ) {
        percent = Math.min(Math.max(0, percent || 1), 1);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
        ctx.strokeStyle = color;
        ctx.lineCap = "round"; // butt, round or square
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      };

      // Init
      drawCircle("#E4E6EF", options.lineWidth, 100 / 100);
      drawCircle(getCSSVariableValue("--bs-primary"), options.lineWidth, 1 / 1);
      drawCircle(getCSSVariableValue("--bs-success"), options.lineWidth, 1 / 2);
    };
    const initChart2 = () => {
      expose();
      var el = document.getElementById("kt_card_widget_17_chart");

      if (!el) {
        return;
      }

      var options = {
        size: el.getAttribute("data-kt-size")
          ? parseInt(el.getAttribute("data-kt-size") as string)
          : 70,
        lineWidth: el.getAttribute("data-kt-line")
          ? parseInt(el.getAttribute("data-kt-line") as string)
          : 11,
        rotate: el.getAttribute("data-kt-rotate")
          ? parseInt(el.getAttribute("data-kt-rotate") as string)
          : 90,
        //percent:  el.getAttribute('data-kt-percent') ,
      };

      var canvas = document.createElement("canvas");
      var span = document.createElement("span");

      var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      canvas.width = canvas.height = options.size;

      el.appendChild(span);
      el.appendChild(canvas);

      ctx.translate(options.size / 2, options.size / 2); // change center
      ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

      //imd = ctx.getImageData(0, 0, 240, 240);
      var radius = (options.size - options.lineWidth) / 2;

      var drawCircle = function (
        color: string,
        lineWidth: number,
        percent: number
      ) {
        percent = Math.min(Math.max(0, percent || 1), 1);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
        ctx.strokeStyle = color;
        ctx.lineCap = "round"; // butt, round or square
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      };

      // Init
      // drawCircle("#E4E6EF", options.lineWidth, 100 / 100);
      drawCircle(getCSSVariableValue("--bs-dark"), options.lineWidth, 1 / 1);
      drawCircle(
        getCSSVariableValue("--bs-pink"),
        options.lineWidth,
        420 / 570
      );
    };
    const changePlatform = (item) => {
      lastStatisticsPlatform.value = item;
    };

    const getUserProfile = () => {
      loading.value = true;
      ApiService.get("/accounts/profile")
        .then((res) => {
          loading.value = false;
          profile.value = res.data;
          store.setUser(res.data);
        })
        .catch((err) => {
          loading.value = false;
        });
    };

    const getActiveProfiles = () => {
      loading.value = true;
      ApiService.get("/social-media/profile", "?status=added")
        .then((response) => {
          loading.value = false;
          profiles.value = response.data.results;
          activProfilesCount.value = response.data.count;
          response.data.results.forEach((profile) => {
            totalFollowers.value =
              totalFollowers.value + Number(profile.followers);
          });
        })
        .catch((error) => {
          loading.value = false;
        });
    };

    return {
      profile,
      schedulDate,
      platformOptions,
      publishPlatformOptions,
      lastStatisticsPlatform,
      activProfilesCount,
      totalFollowers,
      getAssetPath,
      changePlatform,
    };
  },
});
</script>

<style scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
}

.welcome-card {
  grid-column: span 6;
}

.metric-card {
  grid-column: span 3;
}

.small-metric {
  grid-column: span 3;
}

.info-card {
  grid-column: span 3;
}

.welcome-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.welcome-image {
  color: var(--el-color-primary);
}

.welcome-stats {
  display: flex;
  gap: 40px;
  margin-top: 30px;
}

.stat-label {
  font-size: 12px;
  color: #909399;
  margin-bottom: 6px;
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
}

.metric-header {
  font-size: 12px;
  color: #909399;
  margin-bottom: 10px;
}

.metric-number {
  font-size: 34px;
  font-weight: 700;
}

.metric-subtitle {
  margin-top: 10px;
  color: #909399;
  font-size: 14px;
}

.card-top {
  display: flex;
  justify-content: space-between;
  color: #909399;
  font-size: 13px;
  align-items: center;
}

.small-metric h2 {
  margin: 15px 0;
}

.small-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.fake-chart,
.mini-chart {
  height: 60px;
  margin-top: 15px;
  border-radius: 6px;
  background: linear-gradient(to top, rgba(64, 158, 255, 0.2), transparent);
}

.bar-chart {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  height: 60px;
  margin-top: 15px;
}

.bar-chart span {
  width: 8px;
  background: var(--el-color-primary);
  border-radius: 3px;
}

.info-content {
  display: flex;
  align-items: center;
  gap: 14px;
}

.icon {
  width: 42px;
  height: 42px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
}

.blue {
  background: #409eff;
}

.green {
  background: #67c23a;
}

.black {
  background: #111;
}

.info-title {
  font-size: 18px;
  font-weight: 600;
}

.text-muted {
  color: #909399;
}

.positive {
  color: #67c23a;
  font-size: 14px;
}

.negative {
  color: #f56c6c;
  font-size: 14px;
}

.warning {
  color: #e6a23c;
  font-size: 14px;
}

.gauge-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.social-tabs {
  display: flex;
  gap: 7px;
}

.social-tab {
  width: 40px;
  height: 40px;
  border: 1px solid #dcdfe6;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s;
  font-size: 15px;
}

.social-tab:hover {
  border-color: #409eff;
}

.social-tab {
  &.active {
    border-color: #409eff;
    color: #a50228;
    i {
      color: #ffffff;
    }
    &.twitter {
      background: #000;
    }
    &.telegram {
      background: linear-gradient(135deg, rgb(55, 174, 226), rgb(30, 150, 212));
    }
    &.instagram {
      background: linear-gradient(
        135deg,
        #feda75,
        #fa7e1e,
        #d62976,
        #962fbf,
        #4f5bd5
      );
    }
  }
}

.welcome-card,
.metric-card,
.small-metric,
.info-card {
  border-radius: 8px;
}
@media (max-width: 1200px) {
  .welcome-card,
  .metric-card,
  .small-metric,
  .info-card {
    grid-column: span 12;
  }
}
</style>
