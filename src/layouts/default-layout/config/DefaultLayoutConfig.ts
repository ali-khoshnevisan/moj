import type LayoutConfigTypes from "@/layouts/default-layout/config/types";

const config: LayoutConfigTypes = {
  general: {
    mode: "light",
    primaryColor: "#50CD89",
    pageWidth: "default",
    layout: "light-sidebar",
    iconsType: "duotone",
  },
  header: {
    display: true,
    default: {
      container: "fluid",
      fixed: {
        desktop: true,
        mobile: true,
      },
      menu: {
        display: false,
        iconType: "bootstrap",
      },
    },
  },
  sidebar: {
    display: true,
    default: {
      minimize: {
        desktop: {
          enabled: true,
          default: false,
          hoverable: true,
        },
      },
      menu: {
        iconType: "bootstrap",
      },
    },
  },
  toolbar: {
    display: true,
    container: "fluid",
    fixed: {
      desktop: false,
      mobile: false,
    },
  },
  pageTitle: {
    display: true,
    breadcrumb: true,
    direction: "column",
  },
  content: {
    container: "fluid",
  },
  footer: {
    display: false,
    container: "fluid",
    fixed: {
      desktop: false,
      mobile: false,
    },
  },
  illustrations: {
    set: "sketchy-1",
  },
  scrolltop: {
    display: true,
  },
};

export default config;
