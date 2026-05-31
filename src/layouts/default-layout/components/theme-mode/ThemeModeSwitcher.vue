<template>
  <!--begin::Menu-->
  <el-switch
    v-model="mode"
    size="large"
    :active-action-icon="Sunny"
    :inactive-action-icon="Moon"
  />
  <!--  <div-->
  <!--    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-muted menu-active-bg menu-state-primary fw-semibold py-4 fs-base w-175px"-->
  <!--    data-kt-menu="true"-->
  <!--    data-kt-element="theme-mode-menu"-->
  <!--  >-->
  <!--    &lt;!&ndash;begin::Menu item&ndash;&gt;-->
  <!--    <div class="menu-item px-3 my-0">-->
  <!--      <router-link-->
  <!--        :to="path"-->
  <!--        :class="{ active: themeMode === 'light' }"-->
  <!--        class="menu-link px-3 py-2"-->
  <!--        @click="setMode('light')"-->
  <!--      >-->
  <!--        <span class="menu-icon" data-kt-element="icon">-->
  <!--          <KTIcon icon-name="night-day" icon-class="fs-2" />-->
  <!--        </span>-->
  <!--        <span class="menu-title">Light</span>-->
  <!--      </router-link>-->
  <!--    </div>-->
  <!--    &lt;!&ndash;end::Menu item&ndash;&gt;-->
  <!--    &lt;!&ndash;begin::Menu item&ndash;&gt;-->
  <!--    <div class="menu-item px-3 my-0">-->
  <!--      <router-link-->
  <!--        :to="path"-->
  <!--        :class="{ active: themeMode === 'dark' }"-->
  <!--        class="menu-link px-3 py-2"-->
  <!--        @click="setMode('dark')"-->
  <!--      >-->
  <!--        <span class="menu-icon" data-kt-element="icon">-->
  <!--          <KTIcon icon-name="moon" icon-class="fs-2" />-->
  <!--        </span>-->
  <!--        <span class="menu-title">Dark</span>-->
  <!--      </router-link>-->
  <!--    </div>-->
  <!--    &lt;!&ndash;end::Menu item&ndash;&gt;-->
  <!--    &lt;!&ndash;begin::Menu item&ndash;&gt;-->
  <!--    <div class="menu-item px-3 my-0">-->
  <!--      <router-link-->
  <!--        :to="path"-->
  <!--        :class="{ active: themeMode === 'system' }"-->
  <!--        class="menu-link px-3 py-2"-->
  <!--        @click="setMode('system')"-->
  <!--      >-->
  <!--        <span class="menu-icon" data-kt-element="icon">-->
  <!--          <KTIcon icon-name="screen" icon-class="fs-2" />-->
  <!--        </span>-->
  <!--        <span class="menu-title">System</span>-->
  <!--      </router-link>-->
  <!--    </div>-->
  <!--    &lt;!&ndash;end::Menu item&ndash;&gt;-->
  <!--  </div>-->
  <!--end::Menu-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useThemeStore } from "@/stores/theme";
import { useConfigStore } from "@/stores/config";
import { Sunny, Moon } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "kt-theme-switcher",
  component: {},
  setup() {
    const storeTheme = useThemeStore();
    const storeConfig = useConfigStore();
    const route = useRoute();
    const mode = ref(false);

    onMounted(() => {
      mode.value = themeMode.value === "light";
    });

    watch(
      () => mode.value,
      (value) => {
        setTimeout(() => {
          setMode();
        }, 150);
      }
    );

    const themeMode = computed(() => {
      return storeTheme.mode;
    });

    const path = computed(() => route.path);

    const setMode = () => {
      let configMode: "light" | "dark" | "system" = mode.value
        ? "light"
        : "dark";
      let sidebarMode = mode.value ? "light-sidebar" : "dark-sidebar";

      storeConfig.setLayoutConfigProperty("general.mode", configMode);
      storeConfig.setLayoutConfigProperty("general.layout", sidebarMode);

      storeTheme.setThemeMode(configMode);
    };

    return {
      themeMode,
      mode,
      Sunny,
      Moon,
      setMode,
      path,
      getAssetPath,
    };
  },
});
</script>
