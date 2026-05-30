import type { MenuItem } from "@/layouts/default-layout/config/types";

const MainMenuConfig: Array<MenuItem> = [
  {
    pages: [
      {
        heading: "dashboard",
        route: "/dashboard",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-grid-1x2-fill",
      },
      // {
      //   heading: "layoutBuilder",
      //   route: "/builder",
      //   keenthemesIcon: "switch",
      //   bootstrapIcon: "bi-layers",
      // },
    ],
  },
  {
    heading: "account management",
    route: "/accounts",
    pages: [
      {
        sectionTitle: "Profiles",
        route: "/profiles",
        keenthemesIcon: "user",
        bootstrapIcon: "bi-person-fill",
        sub: [
          {
            heading: "Instagram",
            route: "/accounts/profiles/instagram",
          },
          {
            heading: "Twitter",
            route: "/accounts/profiles/twitter",
          },
          {
            heading: "Telegram",
            route: "/accounts/profiles/telegram",
          },
        ],
      },
    ],
  },
  {
    heading: "crawling",
    route: "/crawling",
    pages: [
      {
        heading: "Crawlers",
        route: "/crawlers/list",
        keenthemesIcon: "post",
        bootstrapIcon: "bi-browser-chrome",
      },
      {
        heading: "History",
        route: "/crawlers/history",
        keenthemesIcon: "post",
        bootstrapIcon: "bi-list-columns",
      },
    ],
  },
  {
    heading: "action",
    route: "/action",
    pages: [
      {
        heading: "Actions",
        route: "/actions",
        keenthemesIcon: "action",
        bootstrapIcon: "bi-hand-thumbs-up-fill",
      },
      {
        sectionTitle: "Post",
        route: "/post",
        keenthemesIcon: "post",
        bootstrapIcon: "bi-pencil-square",
        sub: [
          {
            heading: "New Post",
            route: "/post/quick-post",
          },
          {
            heading: "Publish History",
            route: "/post/dashboard",
          },
        ],
      },
      {
        sectionTitle: "campaign",
        route: "/campaign",
        keenthemesIcon: "post",
        bootstrapIcon: "bi-megaphone",
        sub: [
          {
            heading: "New Campaign",
            route: "/campaign/create",
          },
          {
            heading: "campaigns",
            route: "/campaign/list",
          },
        ],
      },
    ],
  },
  // {
  //   heading: "apps",
  //   route: "/apps",
  //   pages: [
  //     {
  //       sectionTitle: "customers",
  //       route: "/customers",
  //       keenthemesIcon: "abstract-38",
  //       bootstrapIcon: "bi-printer",
  //       sub: [
  //         {
  //           heading: "gettingStarted",
  //           route: "/apps/customers/getting-started",
  //         },
  //         {
  //           heading: "customersListing",
  //           route: "/apps/customers/customers-listing",
  //         },
  //         {
  //           heading: "customerDetails",
  //           route: "/apps/customers/customer-details",
  //         },
  //       ],
  //     },
  //     {
  //       sectionTitle: "subscriptions",
  //       route: "/subscriptions",
  //       keenthemesIcon: "basket",
  //       bootstrapIcon: "bi-cart",
  //       sub: [
  //         {
  //           heading: "getStarted",
  //           route: "/apps/subscriptions/getting-started",
  //         },
  //         {
  //           heading: "subscriptionList",
  //           route: "/apps/subscriptions/subscription-list",
  //         },
  //         {
  //           heading: "addSubscription",
  //           route: "/apps/subscriptions/add-subscription",
  //         },
  //         {
  //           heading: "viewSubscription",
  //           route: "/apps/subscriptions/view-subscription",
  //         },
  //       ],
  //     },
  //     {
  //       heading: "calendarApp",
  //       route: "/apps/calendar",
  //       keenthemesIcon: "calendar-8",
  //       bootstrapIcon: "bi-calendar3-event",
  //     },
  //     {
  //       sectionTitle: "chat",
  //       route: "/chat",
  //       keenthemesIcon: "message-text-2",
  //       bootstrapIcon: "bi-chat-left",
  //       sub: [
  //         {
  //           heading: "privateChat",
  //           route: "/apps/chat/private-chat",
  //         },
  //         {
  //           heading: "groupChat",
  //           route: "/apps/chat/group-chat",
  //         },
  //         {
  //           heading: "drawerChat",
  //           route: "/apps/chat/drawer-chat",
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export default MainMenuConfig;
