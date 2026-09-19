import type { MenuItem } from "@/layouts/default-layout/config/types";

const MainMenuConfig: Array<MenuItem> = [
  {
    pages: [
      {
        heading: "dashboard",
        route: "/dashboard",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-grid-1x2",
      },
      // {
      //   heading: "layoutBuilder",
      //   route: "/builder",
      //   keenthemesIcon: "switch",
      //   bootstrapIcon: "bi-layers",
      // },
      {
        sectionTitle: "Accounts",
        route: "/accounts",
        bootstrapIcon: "bi-people",
        // bootstrapIcon: "bi-person",
        sub: [
          {
            heading: "Instagram",
            route: "/accounts/profiles/instagram",
            // keenthemesIcon: "user",
            // bootstrapIcon: "bi-instagram",
          },
          // {
          //   heading: "X (Twitter)",
          //   route: "/accounts/profiles/twitter",
          // bootstrapIcon: "bi-twitter-x",
          // },
          {
            heading: "Telegram",
            route: "/accounts/profiles/telegram",
            // bootstrapIcon: "bi-telegram",
          },
        ],
      },
      {
        sectionTitle: "Crawling",
        route: "/crawling",
        bootstrapIcon: "bi-search",
        // bootstrapIcon: "bi-globe",
        sub: [
          {
            heading: "Crawlers",
            route: "/crawlers/list",
            // keenthemesIcon: "post",
            // bootstrapIcon: "bi-search",
          },
          {
            heading: "History",
            route: "/crawlers/history",
            // keenthemesIcon: "post",
            // bootstrapIcon: "bi-list-columns",
          },
        ],
      },
      {
        sectionTitle: "Post",
        route: "/post",
        bootstrapIcon: "bi-pencil-square",
        // bootstrapIcon: "bi-postcard",
        sub: [
          {
            heading: "New Post",
            route: "/post/quick-post",
            // keenthemesIcon: "post",
            // bootstrapIcon: "bi-pencil-square",
          },
          {
            heading: "Publish History",
            route: "/post/dashboard",
            // keenthemesIcon: "post",
            // bootstrapIcon: "bi-list-columns",
          },
        ],
      },
      {
        sectionTitle: "Social Actions",
        route: "/action",
        bootstrapIcon: "bi-hand-thumbs-up",
        // bootstrapIcon: "bi-postcard",
        sub: [
          {
            heading: "Like & Comment ...",
            route: "/actions",
            // keenthemesIcon: "action",
            // bootstrapIcon: "bi-hand-thumbs-up",
          },
        ],
      },
      {
        sectionTitle: "Campaign",
        route: "/campaign",
        bootstrapIcon: "bi-megaphone",
        // bootstrapIcon: "bi-postcard",
        sub: [
          {
            heading: "New Campaign",
            route: "/campaign/create",
            // keenthemesIcon: "post",
            // bootstrapIcon: "bi-megaphone",
          },
          {
            heading: "Campaigns List",
            route: "/campaign/list",
            // keenthemesIcon: "post",
            // bootstrapIcon: "bi-card-list",
          },
        ],
      },
    ],
  },
  // {
  //   heading: "accounts",
  //   route: "/accounts",
  //   pages: [
  //     {
  //       heading: "Instagram",
  //       route: "/accounts/profiles/instagram",
  //       keenthemesIcon: "user",
  //       bootstrapIcon: "bi-instagram",
  //     },
  //     {
  //       heading: "X",
  //       route: "/accounts/profiles/twitter",
  //       keenthemesIcon: "user",
  //       bootstrapIcon: "bi-twitter-x",
  //     },
  //     {
  //       heading: "Telegram",
  //       route: "/accounts/profiles/telegram",
  //       keenthemesIcon: "user",
  //       bootstrapIcon: "bi-telegram",
  //     },
  //   ],
  // },
  // {
  //   heading: "crawling",
  //   route: "/crawling",
  //   pages: [
  //     {
  //       heading: "Crawlers",
  //       route: "/crawlers/list",
  //       keenthemesIcon: "post",
  //       bootstrapIcon: "bi-search",
  //     },
  //     {
  //       heading: "History",
  //       route: "/crawlers/history",
  //       keenthemesIcon: "post",
  //       bootstrapIcon: "bi-list-columns",
  //     },
  //   ],
  // },
  // {
  //   heading: "post",
  //   route: "/post",
  //   pages: [
  //     {
  //       heading: "New Post",
  //       route: "/post/quick-post",
  //       keenthemesIcon: "post",
  //       bootstrapIcon: "bi-pencil-square",
  //     },
  //     {
  //       heading: "Publish History",
  //       route: "/post/dashboard",
  //       keenthemesIcon: "post",
  //       bootstrapIcon: "bi-list-columns",
  //     },
  //   ],
  // },
  // {
  //   heading: "social actions",
  //   route: "/action",
  //   pages: [
  //     {
  //       heading: "Like & Comment ...",
  //       route: "/actions",
  //       keenthemesIcon: "action",
  //       bootstrapIcon: "bi-hand-thumbs-up",
  //     },
  //   ],
  // },
  // {
  //   heading: "campaign",
  //   route: "/campaign",
  //   pages: [
  //     {
  //       heading: "New Campaign",
  //       route: "/campaign/create",
  //       keenthemesIcon: "post",
  //       bootstrapIcon: "bi-megaphone",
  //     },
  //     {
  //       heading: "Campaigns List",
  //       route: "/campaign/list",
  //       keenthemesIcon: "post",
  //       bootstrapIcon: "bi-card-list",
  //     },
  //   ],
  // },
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
  //   ],
  // },
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
