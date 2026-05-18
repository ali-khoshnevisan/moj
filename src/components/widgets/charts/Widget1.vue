<template>
  <!--begin::Charts Widget 1-->
  <div class="card" :class="widgetClasses">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <!--begin::Title-->
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Actions Statistics</span>

        <span class="text-muted fw-semibold fs-7"
          >{{ count }} actions in your account until now</span
        >
      </h3>
      <!--end::Title-->

      <!--begin::Toolbar-->
      <!--      <div class="card-toolbar">-->
      <!--        &lt;!&ndash;begin::Menu&ndash;&gt;-->
      <!--        <button-->
      <!--          type="button"-->
      <!--          class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"-->
      <!--          data-kt-menu-trigger="click"-->
      <!--          data-kt-menu-placement="bottom-end"-->
      <!--          data-kt-menu-flip="top-end"-->
      <!--        >-->
      <!--          <KTIcon icon-name="category" icon-class="fs-2" />-->
      <!--        </button>-->
      <!--        <Dropdown1></Dropdown1>-->
      <!--        &lt;!&ndash;end::Menu&ndash;&gt;-->
      <!--      </div>-->
      <!--end::Toolbar-->
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body">
      <!--begin::Chart-->
      <apexchart
        ref="chartRef"
        type="bar"
        :options="chart"
        :series="series"
        :height="height"
      ></apexchart>
      <!--end::Chart-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Charts Widget 1-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import {
  computed,
  defineComponent,
  onBeforeMount,
  onMounted,
  ref,
  watch,
} from "vue";
import { useThemeStore } from "@/stores/theme";
import type { ApexOptions } from "apexcharts";
import Dropdown1 from "@/components/dropdown/Dropdown1.vue";
import { getCSSVariableValue } from "@/assets/ts/_utils";
import type VueApexCharts from "vue3-apexcharts";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "widget-1",
  props: {
    widgetClasses: String,
    height: Number,
  },
  components: {
    Dropdown1,
  },
  setup() {
    const chartRef = ref<typeof VueApexCharts | null>(null);
    const chart = ref<ApexOptions>({});
    const count = ref<Number>(0);
    const store = useThemeStore();

    const series = ref([
      {
        name: "counts",
        data: [0, 0, 0, 0, 0],
      },
      // {
      //   name: "May",
      //   data: [76, 85, 101, 98, 50],
      // },
    ]);

    const themeMode = computed(() => {
      return store.mode;
    });

    onBeforeMount(() => {
      Object.assign(chart.value, chartOptions());
    });

    const refreshChart = () => {
      if (!chartRef.value) {
        return;
      }

      chartRef.value.updateOptions(chartOptions());
    };

    watch(themeMode, () => {
      refreshChart();
    });
    onMounted(() => {
      getActionsCount();
      getLikesCount();
      getCommentsCount();
      getFollowsCount();
      getDirectsCount();
      getPostsCount();
    });

    const getActionsCount = () => {
      ApiService.get("/social-media/actions/count")
        .then((res) => {
          count.value = res.data.count;
        })
        .catch((err) => {});
    };
    const getLikesCount = () => {
      ApiService.get("/social-media/actions/count", "?action=like")
        .then((res) => {
          series.value[0].data[0] = res.data.count;
          series.value[1].data[0] = res.data.count;
        })
        .catch((err) => {});
    };
    const getCommentsCount = () => {
      ApiService.get("/social-media/actions/count", "?action=comment")
        .then((res) => {
          series.value[0].data[2] = res.data.count;
          series.value[1].data[2] = res.data.count;
        })
        .catch((err) => {});
    };
    const getFollowsCount = () => {
      ApiService.get("/social-media/actions/count", "?action=follow")
        .then((res) => {
          series.value[0].data[1] = res.data.count;
          series.value[1].data[1] = res.data.count;
        })
        .catch((err) => {});
    };
    const getDirectsCount = () => {
      ApiService.get("/social-media/actions/count", "?action=direct")
        .then((res) => {
          series.value[0].data[3] = res.data.count;
          series.value[1].data[3] = res.data.count;
        })
        .catch((err) => {});
    };
    const getPostsCount = () => {
      ApiService.get("/social-media/actions/count", "?action=post")
        .then((res) => {
          series.value[0].data[4] = res.data.count;
          series.value[1].data[4] = res.data.count;
        })
        .catch((err) => {});
    };

    return {
      chart,
      series,
      chartRef,
      count,
      getAssetPath,
    };
  },
});

const chartOptions = (): ApexOptions => {
  const labelColor = getCSSVariableValue("--bs-gray-500");
  const borderColor = getCSSVariableValue("--bs-gray-200");
  const baseColor = getCSSVariableValue("--bs-warning");
  const secondaryColor = getCSSVariableValue("--bs-gray-300");

  return {
    chart: {
      fontFamily: "inherit",
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        borderRadius: 5,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Like", "follow", "comment", "direct", "post"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
    },
    fill: {
      opacity: 1,
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      hover: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function (val) {
          return val + " action";
        },
      },
    },
    colors: [baseColor, secondaryColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  };
};
</script>
