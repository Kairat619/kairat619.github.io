import { DEFAULT_LOCALE, getDateLocale, type SiteLocale } from "./utils";

type TranslationDictionary = {
  languageName: string;
  languageShort: string;
  skipToContent: string;
  openMenu: string;
  closeMenu: string;
  home: string;
  posts: string;
  tags: string;
  about: string;
  archives: string;
  search: string;
  rssFeed: string;
  socialLinks: string;
  featured: string;
  recentPosts: string;
  allPosts: string;
  footerRights: string;
  goBack: string;
  shareThisPost: string;
  previousPost: string;
  nextPost: string;
  copy: string;
  copied: string;
  updated: string;
  paginationNavigation: string;
  gotoPreviousPage: string;
  gotoNextPage: string;
  prev: string;
  next: string;
  postsPageDesc: string;
  tagsPageDesc: string;
  searchPageDesc: string;
  searchPlaceholder: string;
  searchLabel: string;
  archivesPageDesc: string;
  tag: string;
  articlesWithTag: string;
  page: string;
  homeHeroTitle: string;
  homeIntro: string;
  homeReadMorePrefix: string;
  homeReadmeLabel: string;
  aboutTitle: string;
  discussionTitle: string;
  discussionText: string;
  discussionLinkLabel: string;
  commentsTitle: string;
  commentsEmpty: string;
  commentsPostedOn: string;
  commentsViewOnGitHub: string;
};

const ui: Record<SiteLocale, TranslationDictionary> = {
  en: {
    languageName: "English",
    languageShort: "EN",
    skipToContent: "Skip to content",
    openMenu: "Open Menu",
    closeMenu: "Close Menu",
    home: "Home",
    posts: "Posts",
    tags: "Tags",
    about: "About",
    archives: "Archives",
    search: "Search",
    rssFeed: "RSS Feed",
    socialLinks: "Social Links:",
    featured: "Featured",
    recentPosts: "Recent Posts",
    allPosts: "All Posts",
    footerRights: "All rights reserved.",
    goBack: "Go back",
    shareThisPost: "Share this post on:",
    previousPost: "Previous Post",
    nextPost: "Next Post",
    copy: "Copy",
    copied: "Copied",
    updated: "Updated:",
    paginationNavigation: "Pagination Navigation",
    gotoPreviousPage: "Go to Previous Page",
    gotoNextPage: "Go to Next Page",
    prev: "Prev",
    next: "Next",
    postsPageDesc: "All the articles I've posted.",
    tagsPageDesc: "All the tags used in posts.",
    searchPageDesc: "Search any article ...",
    searchPlaceholder: "Search",
    searchLabel: "Search this site",
    archivesPageDesc: "All the articles I've archived.",
    tag: "Tag:",
    articlesWithTag: 'All the articles with the tag "{tag}".',
    page: "page",
    homeHeroTitle: "Welcome",
    homeIntro:
      "AstroPaper is a minimal, responsive, accessible and SEO-friendly Astro blog theme. This theme follows best practices and provides accessibility out of the box. Light and dark mode are supported by default. Moreover, additional color schemes can also be configured.",
    homeReadMorePrefix: "Read the blog posts or check",
    homeReadmeLabel: "README",
    aboutTitle: "About",
    discussionTitle: "Discussion",
    discussionText:
      "This post was published from a GitHub issue. Join the conversation on the original thread.",
    discussionLinkLabel: "Discuss on GitHub",
    commentsTitle: "Comments",
    commentsEmpty: "No comments yet on this GitHub issue.",
    commentsPostedOn: "Posted on",
    commentsViewOnGitHub: "View on GitHub",
  },
  kk: {
    languageName: "Kazakh",
    languageShort: "ҚАЗ",
    skipToContent: "Мазмұнға өту",
    openMenu: "Мәзірді ашу",
    closeMenu: "Мәзірді жабу",
    home: "Басты бет",
    posts: "Жазбалар",
    tags: "Тегтер",
    about: "Мен туралы",
    archives: "Мұрағат",
    search: "Іздеу",
    rssFeed: "RSS таспасы",
    socialLinks: "Әлеуметтік сілтемелер:",
    featured: "Таңдаулы",
    recentPosts: "Соңғы жазбалар",
    allPosts: "Барлық жазбалар",
    footerRights: "Барлық құқықтар қорғалған.",
    goBack: "Артқа қайту",
    shareThisPost: "Осы жазбаны бөлісу:",
    previousPost: "Алдыңғы жазба",
    nextPost: "Келесі жазба",
    copy: "Көшіру",
    copied: "Көшірілді",
    updated: "Жаңартылды:",
    paginationNavigation: "Беттерге бөлу навигациясы",
    gotoPreviousPage: "Алдыңғы бетке өту",
    gotoNextPage: "Келесі бетке өту",
    prev: "Алдыңғы",
    next: "Келесі",
    postsPageDesc: "Жарияланған барлық мақалалар.",
    tagsPageDesc: "Жазбаларда қолданылған барлық тегтер.",
    searchPageDesc: "Кез келген мақаланы іздеңіз ...",
    searchPlaceholder: "Іздеу",
    searchLabel: "Сайт бойынша іздеу",
    archivesPageDesc: "Мұрағаттағы барлық мақалалар.",
    tag: "Тег:",
    articlesWithTag: '"{tag}" тегі бар барлық мақалалар.',
    page: "бет",
    homeHeroTitle: "Қош келдіңіз",
    homeIntro:
      "AstroPaper — жылдам, ыңғайлы және SEO-ға бейімделген Astro блог тақырыбы. Бұл жоба қолжетімділік пен жақсы тәжірибелерді бастапқыдан қолдайды. Жарық және қараңғы режимі бар, ал түс схемаларын да оңай баптауға болады.",
    homeReadMorePrefix: "Толығырақ білу үшін жазбаларды оқыңыз немесе",
    homeReadmeLabel: "README",
    aboutTitle: "Мен туралы",
    discussionTitle: "Талқылау",
    discussionText:
      "Бұл жазба GitHub issue арқылы жарияланған. Пікір қалдыру немесе талқылауға қосылу үшін бастапқы issue-ге өтіңіз.",
    discussionLinkLabel: "GitHub-та талқылау",
    commentsTitle: "Пікірлер",
    commentsEmpty: "Бұл GitHub issue-де әзірге пікір жоқ.",
    commentsPostedOn: "Жарияланған күні",
    commentsViewOnGitHub: "GitHub-та ашу",
  },
};

export function useTranslations(locale: SiteLocale = DEFAULT_LOCALE) {
  return ui[locale];
}

export function formatDate(date: Date, locale: SiteLocale, timeZone: string) {
  return new Intl.DateTimeFormat(getDateLocale(locale), {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone,
  }).format(date);
}

export function formatMonth(month: number, locale: SiteLocale, timeZone: string) {
  const date = new Date(Date.UTC(2024, month - 1, 1));
  return new Intl.DateTimeFormat(getDateLocale(locale), {
    month: "long",
    timeZone,
  }).format(date);
}

export function getSocialLinkTitle(locale: SiteLocale, siteTitle: string, network: string) {
  if (locale === "kk") {
    switch (network) {
      case "Mail":
        return `${siteTitle} сайтына хат жіберу`;
      default:
        return `${siteTitle} сайтын ${network} желісінен ашу`;
    }
  }

  switch (network) {
    case "Mail":
      return `Send an email to ${siteTitle}`;
    default:
      return `${siteTitle} on ${network}`;
  }
}

export function getShareLinkTitle(locale: SiteLocale, network: string) {
  if (locale === "kk") {
    switch (network) {
      case "WhatsApp":
        return "Осы жазбаны WhatsApp арқылы бөлісу";
      case "Facebook":
        return "Осы жазбаны Facebook желісінде бөлісу";
      case "X":
        return "Осы жазбаны X желісінде бөлісу";
      case "Telegram":
        return "Осы жазбаны Telegram арқылы бөлісу";
      case "Pinterest":
        return "Осы жазбаны Pinterest желісінде бөлісу";
      case "Mail":
        return "Осы жазбаны email арқылы бөлісу";
      default:
        return "Осы жазбаны бөлісу";
    }
  }

  switch (network) {
    case "WhatsApp":
      return "Share this post via WhatsApp";
    case "Facebook":
      return "Share this post on Facebook";
    case "X":
      return "Share this post on X";
    case "Telegram":
      return "Share this post via Telegram";
    case "Pinterest":
      return "Share this post on Pinterest";
    case "Mail":
      return "Share this post via email";
    default:
      return "Share this post";
  }
}
