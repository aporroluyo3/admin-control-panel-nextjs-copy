import { path } from '@/utils/route.utils';

/* eslint-disable no-unused-vars */
enum Route {
  HOME = '/',
  AUTH = '/auth',
  CROSS_SELL = '/cross-sell',
}

const AUTH_ROUTES = {
  login: path(Route.AUTH, '/login'),
};

const CROSS_SELL_ROUTES = {
  products: path(Route.CROSS_SELL, '/products'),
  product: (handle: string) => path(Route.CROSS_SELL, `/product/${handle}`),
};

const CROSS_SELL_ITEMS = [
  {
    title: 'Products',
    key: 'cross-sell-products',
    path: CROSS_SELL_ROUTES.products,
  },
];

// const ROOTS_LANDING = '/';
// const ROOTS_DASHBOARD = '/dashboards';
// const ROOTS_SITEMAP = '/sitemap';
// const ROOTS_LAYOUT = '/layouts';
// const ROOTS_CORPORATE = '/corporate';
// const ROOTS_PROFILE = '/user-profile';
// const ROOTS_SOCIAL = '/social';
// const ROOTS_BLOG = '/blog';
// const ROOTS_CAREERS = '/careers';
// const ROOTS_ACCOUNT = '/account';
// const ROOTS_AUTH = '/auth';
// const ROOTS_PROJECTS = '/projects';
// const ROOTS_CONTACTS = '/contacts';
// const ROOTS_USER_MGMT = '/user-management';
// const ROOTS_SUBSCRIPTION = '/subscription';
// const ROOTS_INVOICE = '/invoice';
// const ROOTS_FILE_MGMT = '/file-manager';
// const ROOTS_INBOX = '/inbox';
// const ROOTS_CALENDAR = '/calendar';
// const ROOTS_ERRORS = '/errors';
// const ROOTS_ABOUT = '/about';

// const PATH_DASHBOARD = {
//   root: ROOTS_DASHBOARD,
//   default: path(ROOTS_DASHBOARD, '/default'),
//   projects: path(ROOTS_DASHBOARD, '/projects'),
//   ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
//   marketing: path(ROOTS_DASHBOARD, '/marketing'),
//   social: path(ROOTS_DASHBOARD, '/social'),
//   bidding: path(ROOTS_DASHBOARD, '/bidding'),
//   learning: path(ROOTS_DASHBOARD, '/learning'),
//   logistics: path(ROOTS_DASHBOARD, '/logistics'),
// };

// const PATH_SITEMAP = {
//   root: ROOTS_SITEMAP,
// };

// const PATH_LAYOUT = {
//   root: ROOTS_LAYOUT,
//   sidebar: {
//     light: path(ROOTS_LAYOUT, '/sidebar/light'),
//     dark: path(ROOTS_LAYOUT, '/sidebar/dark'),
//     minimized: path(ROOTS_LAYOUT, '/sidebar/minimized'),
//   },
//   header: {
//     light: path(ROOTS_LAYOUT, '/header/light'),
//     dark: path(ROOTS_LAYOUT, '/header/dark'),
//     overlay: path(ROOTS_LAYOUT, '/header/overlay'),
//   },
// };

// const PATH_CORPORATE = {
//   root: ROOTS_CORPORATE,
//   about: path(ROOTS_CORPORATE, '/about'),
//   team: path(ROOTS_CORPORATE, '/team'),
//   faqs: path(ROOTS_CORPORATE, '/faqs'),
//   contact: path(ROOTS_CORPORATE, '/contact'),
//   pricing: path(ROOTS_CORPORATE, '/pricing'),
//   license: path(ROOTS_CORPORATE, '/license'),
// };

// const PATH_USER_PROFILE = {
//   root: ROOTS_PROFILE,
//   details: path(ROOTS_PROFILE, '/details'),
//   preferences: path(ROOTS_PROFILE, '/preferences'),
//   personalInformation: path(ROOTS_PROFILE, '/personal-information'),
//   security: path(ROOTS_PROFILE, '/security'),
//   activity: path(ROOTS_PROFILE, '/activity'),
//   action: path(ROOTS_PROFILE, '/actions'),
//   help: path(ROOTS_PROFILE, '/help'),
//   feedback: path(ROOTS_PROFILE, '/feedback'),
// };

// const PATH_SOCIAL = {
//   root: ROOTS_SOCIAL,
//   feed: path(ROOTS_SOCIAL, '/feed'),
//   activity: path(ROOTS_SOCIAL, '/activity'),
//   followers: path(ROOTS_SOCIAL, '/followers'),
//   settings: path(ROOTS_SOCIAL, '/settings'),
// };

// const PATH_BLOG = {
//   root: ROOTS_BLOG,
//   details: (id: string | number): string => path(ROOTS_BLOG, `/view/${id}`),
// };

// const PATH_CAREERS = {
//   root: ROOTS_CAREERS,
//   new: path(ROOTS_CAREERS, `/new`),
// };

// const PATH_ACCOUNT = {
//   root: ROOTS_ACCOUNT,
//   settings: path(ROOTS_ACCOUNT, '/settings'),
//   security: path(ROOTS_ACCOUNT, '/security'),
//   activity: path(ROOTS_ACCOUNT, '/activity'),
//   billing: path(ROOTS_ACCOUNT, '/billing'),
//   statements: path(ROOTS_ACCOUNT, '/statements'),
//   referral: path(ROOTS_ACCOUNT, '/referral'),
//   api: path(ROOTS_ACCOUNT, '/api-keys'),
//   logs: path(ROOTS_ACCOUNT, '/logs'),
// };

// const PATH_AUTH = {
//   root: ROOTS_AUTH,
//   signin: path(ROOTS_AUTH, '/signin'),
//   signup: path(ROOTS_AUTH, '/signup'),
//   passwordReset: path(ROOTS_AUTH, '/password-reset'),
//   passwordConfirm: path(ROOTS_AUTH, '/password-confirmation'),
//   welcome: path(ROOTS_AUTH, '/welcome'),
//   verifyEmail: path(ROOTS_AUTH, '/verify-email'),
//   accountDelete: path(ROOTS_AUTH, '/account-delete'),
// };

// const PATH_ERROR = {
//   root: ROOTS_ERRORS,
//   error400: path(ROOTS_ERRORS, '/400'),
//   error403: path(ROOTS_ERRORS, '/403'),
//   error404: path(ROOTS_ERRORS, '/404'),
//   error500: path(ROOTS_ERRORS, '/500'),
//   error503: path(ROOTS_ERRORS, '/503'),
// };

// const PATH_PROJECTS = {
//   root: ROOTS_PROJECTS,
//   details: (id: string | number): string => path(ROOTS_PROJECTS, `/view/${id}`),
// };

// const PATH_CONTACTS = {
//   root: ROOTS_CONTACTS,
//   details: (id: string | number): string => path(ROOTS_CONTACTS, `/view/${id}`),
//   new: path(ROOTS_CONTACTS, '/new'),
//   editDetails: (id: string | number): string =>
//     path(ROOTS_CONTACTS, `/edit/${id}`),
// };

// const PATH_USER_MGMT = {
//   root: ROOTS_USER_MGMT,
//   users: {
//     all: path(ROOTS_USER_MGMT, '/users'),
//     details: (id: string | number): string =>
//       path(ROOTS_USER_MGMT, `/view/${id}`),
//   },
//   roles: {
//     all: path(ROOTS_USER_MGMT, '/roles'),
//     details: (id: string | number): string =>
//       path(ROOTS_USER_MGMT, `/roles/view/${id}`),
//   },
//   permissions: path(ROOTS_USER_MGMT, '/permissions'),
// };

// const PATH_INVOICE = {
//   root: ROOTS_INVOICE,
//   new: path(ROOTS_INVOICE, `/new`),
//   details: (id: string | number): string =>
//     path(ROOTS_USER_MGMT, `/view/${id}`),
// };

// const PATH_FILE = {
//   root: ROOTS_FILE_MGMT,
//   files: path(ROOTS_FILE_MGMT, `/files`),
//   blank: path(ROOTS_FILE_MGMT, `/blank`),
// };

// const PATH_INBOX = {
//   root: ROOTS_INBOX,
//   new: path(ROOTS_INBOX, `/new`),
//   details: (id: string | number): string => path(ROOTS_INBOX, `/view/${id}`),
//   blank: path(ROOTS_INBOX, `/blank`),
// };

// const PATH_CALENDAR = {
//   root: ROOTS_CALENDAR,
// };

// const PATH_SUBSCRIPTION = {
//   root: ROOTS_SUBSCRIPTION,
//   list: path(ROOTS_SUBSCRIPTION, `/list`),
//   new: path(ROOTS_SUBSCRIPTION, `/new`),
//   details: (id: string | number): string =>
//     path(ROOTS_SUBSCRIPTION, `/view/${id}`),
// };

// const PATH_START = {
//   root: 'https://mantine-analytics-dashboard-docs.netlify.app/getting-started',
// };

// const PATH_DOCS = {
//   help: 'https://github.com/design-sparx/antd-multipurpose-dashboard/blob/main/README.md',
//   components: 'https://6546507b657a74164abf2db6-oniqlpqtfs.chromatic.com/',
//   productRoadmap:
//     'https://kelvink96.notion.site/1af2c000eb4f4b1688684cb2d88d5ee4?v=eb14f3050b7d4357821dbcb4bb61b636&p=752cacbf390f4d1cbc0e625550391d9b&pm=s',
// };

// const PATH_CHANGELOG = {
//   root: '',
// };

// const PATH_GITHUB = {
//   org: 'https://github.com/design-sparx',
//   personal: 'https://github.com/kelvink96',
//   repo: 'https://github.com/design-sparx/antd-multipurpose-dashboard',
// };

// const PATH_SOCIALS = {
//   behance: 'https://www.behance.net/kelvink96',
//   dribbble: 'https://dribbble.com/kelvink96',
//   facebook: 'https://www.facebook.com/kelvinkk96',
//   instagram: 'https://www.instagram.com/kelvink_96/',
//   linkedin: 'https://www.linkedin.com/in/kelvink96/',
//   youtube: 'https://twitter.com/kelvink_96',
// };

// const PATH_ABOUT = {
//   root: ROOTS_ABOUT,
// };

// const DASHBOARD_ITEMS = [
//   { title: 'default', path: PATH_DASHBOARD.default },
//   { title: 'projects', path: PATH_DASHBOARD.projects },
//   { title: 'ecommerce', path: PATH_DASHBOARD.ecommerce },
//   { title: 'marketing', path: PATH_DASHBOARD.marketing },
//   { title: 'social', path: PATH_DASHBOARD.social },
//   { title: 'bidding', path: PATH_DASHBOARD.bidding },
//   { title: 'learning', path: PATH_DASHBOARD.learning },
//   { title: 'logistics', path: PATH_DASHBOARD.logistics },
// ];

// const CORPORATE_ITEMS = [
//   { title: 'about', path: PATH_CORPORATE.about },
//   { title: 'team', path: PATH_CORPORATE.team },
//   { title: 'faq', path: PATH_CORPORATE.faqs },
//   { title: 'contact us', path: PATH_CORPORATE.contact },
//   { title: 'pricing', path: PATH_CORPORATE.pricing },
//   { title: 'license', path: PATH_CORPORATE.license },
// ];

// const USER_PROFILE_ITEMS = [
//   { title: 'details', path: PATH_USER_PROFILE.details },
//   { title: 'preferences', path: PATH_USER_PROFILE.preferences },
//   { title: 'information', path: PATH_USER_PROFILE.personalInformation },
//   { title: 'security', path: PATH_USER_PROFILE.security },
//   { title: 'activity', path: PATH_USER_PROFILE.activity },
//   { title: 'actions', path: PATH_USER_PROFILE.action },
//   { title: 'help', path: PATH_USER_PROFILE.help },
//   { title: 'feedback', path: PATH_USER_PROFILE.feedback },
// ];

// const AUTHENTICATION_ITEMS = [
//   { title: 'sign in', path: PATH_AUTH.signin },
//   { title: 'sign up', path: PATH_AUTH.signup },
//   { title: 'welcome', path: PATH_AUTH.welcome },
//   { title: 'verify email', path: PATH_AUTH.verifyEmail },
//   { title: 'password reset', path: PATH_AUTH.passwordReset },
//   { title: 'account deleted', path: PATH_AUTH.accountDelete },
// ];

// const ERROR_ITEMS = [
//   { title: '400', path: PATH_ERROR.error400 },
//   { title: '403', path: PATH_ERROR.error403 },
//   { title: '404', path: PATH_ERROR.error404 },
//   { title: '500', path: PATH_ERROR.error500 },
//   { title: '503', path: PATH_ERROR.error503 },
// ];

export {
  Route,
  AUTH_ROUTES,
  CROSS_SELL_ROUTES,
  CROSS_SELL_ITEMS,
  // PATH_CALENDAR,
  // PATH_USER_MGMT,
  // PATH_INBOX,
  // PATH_PROJECTS,
  // PATH_LAYOUT,
  // PATH_CORPORATE,
  // PATH_CONTACTS,
  // PATH_DASHBOARD,
  // PATH_CHANGELOG,
  // PATH_CAREERS,
  // PATH_ACCOUNT,
  // PATH_GITHUB,
  // PATH_AUTH,
  // PATH_INVOICE,
  // PATH_BLOG,
  // PATH_ERROR,
  // PATH_DOCS,
  // PATH_SUBSCRIPTION,
  // PATH_USER_PROFILE,
  // PATH_FILE,
  // PATH_SOCIAL,
  // PATH_START,
  // PATH_LANDING,
  // PATH_SITEMAP,
  // DASHBOARD_ITEMS,
  // CORPORATE_ITEMS,
  // USER_PROFILE_ITEMS,
  // PATH_SOCIALS,
  // AUTHENTICATION_ITEMS,
  // ERROR_ITEMS,
  // PATH_ABOUT,
};
