(function () {
  const supportedLanguages = ["zh-Hant", "ja", "en"];
  const languageLabels = {
    "zh-Hant": "\u7e41\u4e2d",
    ja: "\u65e5\u672c\u8a9e",
    en: "English",
  };

  function getLanguageFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang");
    return supportedLanguages.includes(lang) ? lang : "";
  }

  function getCurrentLanguage() {
    const savedLanguage = localStorage.getItem("aoi-lang");
    return (
      getLanguageFromUrl() ||
      (supportedLanguages.includes(savedLanguage) ? savedLanguage : "zh-Hant")
    );
  }

  const currentLanguage = getCurrentLanguage();
  let currentDictionary = {};
  let fallbackDictionary = {};
  let languageSwitcherBuilt = false;

  async function loadDictionary(lang) {
    const response = await fetch(`locales/${lang}.json`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Locale request failed: ${response.status}`);
    }
    return response.json();
  }

  const ready = Promise.all([
    loadDictionary("zh-Hant"),
    currentLanguage === "zh-Hant" ? Promise.resolve(null) : loadDictionary(currentLanguage),
  ])
    .then(([fallback, current]) => {
      fallbackDictionary = fallback || {};
      currentDictionary = current || fallbackDictionary;
    })
    .catch((error) => {
      console.warn(error);
      fallbackDictionary = {};
      currentDictionary = {};
    });

  function t(key) {
    return currentDictionary[key] || fallbackDictionary[key] || key;
  }

  function setText(selector, key) {
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = t(key);
    });
  }

  function setHtml(selector, key) {
    document.querySelectorAll(selector).forEach((element) => {
      element.innerHTML = t(key);
    });
  }

  function setAttr(selector, attr, key) {
    document.querySelectorAll(selector).forEach((element) => {
      element.setAttribute(attr, t(key));
    });
  }

  function createLanguageSwitcher() {
    const wrapper = document.createElement("div");
    wrapper.className = "language-menu";

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "language-menu-trigger";
    trigger.setAttribute("aria-label", "Select language");
    trigger.setAttribute("aria-haspopup", "menu");
    trigger.setAttribute("aria-expanded", "false");
    trigger.innerHTML = '<span class="material-symbols-outlined">language</span>';

    const menu = document.createElement("div");
    menu.className = "language-menu-list";
    menu.setAttribute("role", "menu");

    supportedLanguages.forEach((lang) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "language-menu-item";
      button.setAttribute("role", "menuitemradio");
      button.textContent = languageLabels[lang];
      button.setAttribute("aria-pressed", String(lang === currentLanguage));
      button.setAttribute("aria-checked", String(lang === currentLanguage));
      button.addEventListener("click", () => {
        localStorage.setItem("aoi-lang", lang);
        const url = new URL(window.location.href);
        url.searchParams.set("lang", lang);
        window.location.href = url.toString();
      });
      menu.appendChild(button);
    });

    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = wrapper.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(isOpen));
    });

    wrapper.append(trigger, menu);
    return wrapper;
  }

  function buildLanguageSwitcher() {
    if (languageSwitcherBuilt) return;
    languageSwitcherBuilt = true;

    const headerRight = document.querySelector(".header-right");
    if (headerRight) {
      headerRight.prepend(createLanguageSwitcher());
      document.getElementById("mobile-menu")?.appendChild(createLanguageSwitcher());
      return;
    }

    const standalone = createLanguageSwitcher();
    standalone.classList.add("language-switcher-standalone");
    document.body.prepend(standalone);
  }

  function closeLanguageMenus() {
    document.querySelectorAll(".language-menu.is-open").forEach((menu) => {
      menu.classList.remove("is-open");
      menu
        .querySelector(".language-menu-trigger")
        ?.setAttribute("aria-expanded", "false");
    });
  }

  function showTranslationNotice() {
    if (currentLanguage === "zh-Hant") return;
    const notice = document.createElement("div");
    notice.className = "translation-notice";
    notice.textContent = t("translation.notice");
    document.body.appendChild(notice);
  }

  function appendInfoSourceLink() {
    const copy = document.querySelector(".info-copy p");
    if (!copy) return;

    copy.append(document.createElement("br"), document.createElement("br"));

    const link = document.createElement("a");
    link.className = "source-link";
    link.href = "https://twitter.com/AoiHinamori/status/2058909320495128866";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", "Read source post from Aoi Hinamori on Twitter/X");

    const text = document.createElement("span");
    text.textContent = t("source.aoi");

    const icon = document.createElement("span");
    icon.className = "material-symbols-outlined text-[18px]";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "open_in_new";

    link.append(text, icon);
    copy.appendChild(link);
  }

  function localizeIndexPage() {
    document.title = t("page.title");
    setText(".desktop-nav-link[href='#info'], .mobile-nav-link[href='#info']", "nav.info");
    setText(".desktop-nav-link[href='#goods'], .mobile-nav-link[href='#goods']", "nav.goods");
    setText(".desktop-nav-link[href='#faq'], .mobile-nav-link[href='#faq']", "nav.faq");
    setText(".hero-details-col.left-col .text-outline", "hero.dateLabel");
    setText(".hero-details-col.right-col .text-outline", "hero.placeLabel");
    setText(".hero-details-col.right-col a", "hero.place");
    setText("#pv-open", "hero.watchPv");
    setText(".event-hashtag-label", "hero.hashtag");
    setText(".absolute.bottom-10 .text-label-sm", "hero.scroll");
    setText("#info h2", "info.title");
    setHtml(".info-copy p", "info.copy");
    appendInfoSourceLink();
    setText(".profile-stats-grid dt:nth-of-type(1)", "profile.birthday");
    setText(".profile-stats-grid dt:nth-of-type(2)", "profile.race");
    setText(".profile-stats-grid dd:nth-of-type(2)", "profile.raceValue");
    setText(".profile-stats-grid dt:nth-of-type(3)", "profile.job");
    setText(".profile-stats-grid dd:nth-of-type(3)", "profile.jobValue");
    setText(".profile-bio p", "profile.bio");
    setText(".profile-label-row p", "profile.heading");
    setText(".profile-links > .flex > p", "profile.links");
    document.querySelectorAll(".profile-links a").forEach((link) => {
      if (link.href.includes("discord.gg")) link.lastChild.textContent = t("profile.discord");
    });
    setText(".event-date-line", "event.date");
    setText(".event-hours-line", "event.hours");
    setText("#info .order-3 > .grid > div:nth-child(1) .font-label-sm", "hero.dateLabel");
    setText("#info .order-3 > .grid > div:nth-child(2) .font-label-sm", "hero.placeLabel");
    setText("#info .order-3 > .grid > div:nth-child(2) .font-title-md a", "hero.place");
    setText("#info .order-3 > .grid > div:nth-child(2) a.mt-2", "event.maps");
    setText("#info .order-3 > .grid > div:nth-child(3) .font-label-sm", "event.priceLabel");
    setText("#info .order-3 > .grid > div:nth-child(3) .font-title-md", "event.price");
    setText("#info .order-3 #transport-open .font-label-sm", "event.transportLabel");
    setText("#info .order-3 #transport-open .font-title-md", "event.transport");
    setText("#transport-modal .border-l-4 > p", "transport.heading");
    setText("#transport-modal h2", "transport.title");
    setText("#transport-modal .space-y-6 > p", "transport.source");
    setText("#transport-modal section:nth-of-type(1) h3", "transport.metroTitle");
    setText("#transport-modal section:nth-of-type(1) p", "transport.metro");
    setText("#transport-modal section:nth-of-type(2) h3", "transport.scooterTitle");
    setText("#transport-modal section:nth-of-type(2) p", "transport.scooter");
    setText("#transport-modal section:nth-of-type(3) h3", "transport.busTitle");
    setText("#transport-modal section:nth-of-type(3) p", "transport.bus");
    setText("#transport-modal section:nth-of-type(4) h3", "transport.driveTitle");
    setText("#transport-modal section:nth-of-type(4) p", "transport.drive");
    setText("#goods h2", "goods.title");
    setText(".calculator-trigger .text-label-sm", "goods.ctaKicker");
    setText(".calculator-trigger .inline-flex span:first-child", "goods.ctaText");
    setAttr("img[src='images/goods1.jfif']", "data-title", "goods.modal.onsite");
    setAttr("img[src='images/goods2.jfif']", "data-title", "goods.modal.preorder");
    setAttr("img[src='images/LAHEE.jfif']", "data-title", "goods.modal.lahee");
    setAttr("img[src='images/LAHEE.jfif']", "data-description", "goods.modal.laheeDescription");
    setAttr("img[src='images/50cards.jpg']", "data-title", "goods.modal.cards");
    setAttr("img[src='images/50cards.jpg']", "data-description", "goods.modal.cardsDescription");
    setText("#faq h2", "faq.title");
    setText("#faq p", "faq.intro");
    setText(".faq-open .tracking-widest", "faq.open");
    setAttr("#faq-search", "placeholder", "faq.search");
    setHtml(".footer-disclaimer p", "footer.disclaimer");
  }

  function localizeCalculatorPage() {
    document.title = t("calculator.title");
    setText("main section > div:first-child h1", "calculator.title");
    setText("main section > div:first-child p:last-child", "calculator.description");
    setText("aside h2", "calculator.summary");
    setText("aside h2 + p", "calculator.estimate");
    setText(".calculator-export", "calculator.export");
    setText(".calculator-reset", "calculator.reset");
    setText("aside .font-label-sm.text-on-tertiary-fixed-variant, section.lg\\:hidden > div:first-child .font-label-sm", "calculator.total");
    setText("#breakdown p", "calculator.empty");
  }

  function localizePage() {
    document.documentElement.lang = currentLanguage;
    document.body.dataset.lang = currentLanguage;
    document.addEventListener("click", closeLanguageMenus);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeLanguageMenus();
    });
    if (currentLanguage === "zh-Hant") return;

    showTranslationNotice();
    if (document.getElementById("goods-list")) localizeCalculatorPage();
    if (document.getElementById("info")) localizeIndexPage();
  }

  window.AoiI18n = {
    currentLanguage,
    supportedLanguages,
    ready,
    t,
    isTranslated: currentLanguage !== "zh-Hant",
  };

  document.addEventListener("DOMContentLoaded", () => {
    buildLanguageSwitcher();
    ready.then(localizePage);
  });
})();
