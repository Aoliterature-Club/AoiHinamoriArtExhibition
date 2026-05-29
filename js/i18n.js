(function () {
  const supportedLanguages = ["zh-Hant", "ja", "en"];

  const languageLabels = {
    "zh-Hant": "繁體中文",
    ja: "日本語 (AI)",
    en: "English (AI)",
  };

  function getCurrentLanguage() {
    const savedLanguage = localStorage.getItem("aoi-lang");
    if (supportedLanguages.includes(savedLanguage)) return savedLanguage;

    const browserLanguages = navigator.languages?.length
      ? navigator.languages
      : [navigator.language || ""];
    const normalizedLanguages = browserLanguages.map((lang) =>
      lang.toLowerCase(),
    );

    if (normalizedLanguages.some((lang) => lang.startsWith("ja"))) return "ja";
    if (
      normalizedLanguages.some(
        (lang) =>
          lang === "zh" ||
          lang.startsWith("zh-hant") ||
          lang.startsWith("zh-tw") ||
          lang.startsWith("zh-hk") ||
          lang.startsWith("zh-mo"),
      )
    ) {
      return "zh-Hant";
    }
    if (normalizedLanguages.some((lang) => lang.startsWith("zh")))
      return "zh-Hant";

    return "en";
  }

  let currentLanguage = getCurrentLanguage();
  let currentDictionary = {};
  let fallbackDictionary = {};
  let languageSwitcherBuilt = false;
  let readyResolve;
  const ready = new Promise((resolve) => {
    readyResolve = resolve;
  });

  async function loadDictionary(lang) {
    const response = await fetch(`locales/${lang}.json`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Locale request failed: ${response.status}`);
    }
    return response.json();
  }

  async function setCurrentDictionary(lang) {
    if (!Object.keys(fallbackDictionary).length) {
      fallbackDictionary = await loadDictionary("zh-Hant");
    }
    currentDictionary =
      lang === "zh-Hant" ? fallbackDictionary : await loadDictionary(lang);
  }

  function t(key) {
    return currentDictionary[key] || fallbackDictionary[key] || key;
  }

  function setText(selector, key) {
    document.querySelectorAll(selector).forEach((element) => {
      if (!element.dataset.i18nOriginalText) {
        element.dataset.i18nOriginalText = element.textContent;
      }
      element.textContent = t(key);
    });
  }

  function setHtml(selector, key) {
    document.querySelectorAll(selector).forEach((element) => {
      if (!element.dataset.i18nOriginalHtml) {
        element.dataset.i18nOriginalHtml = element.innerHTML;
      }
      element.innerHTML = t(key);
    });
  }

  function setAttr(selector, attr, key) {
    document.querySelectorAll(selector).forEach((element) => {
      const originalKey = `i18nOriginal${attr.replace(
        /(^|-)([a-z])/g,
        (_, __, char) => char.toUpperCase(),
      )}`;
      if (!element.dataset[originalKey]) {
        element.dataset[originalKey] = element.getAttribute(attr) || "";
      }
      element.setAttribute(attr, t(key));
    });
  }

  function restoreOriginals() {
    document
      .querySelectorAll("[data-i18n-original-html]")
      .forEach((element) => {
        element.innerHTML = element.dataset.i18nOriginalHtml;
      });
    document
      .querySelectorAll("[data-i18n-original-text]")
      .forEach((element) => {
        element.textContent = element.dataset.i18nOriginalText;
      });

    document.querySelectorAll("*").forEach((element) => {
      Object.entries(element.dataset).forEach(([key, value]) => {
        if (
          !key.startsWith("i18nOriginal") ||
          key === "i18nOriginalHtml" ||
          key === "i18nOriginalText" ||
          key === "i18nOriginalDiscordText"
        ) {
          return;
        }
        const attr = key
          .replace(/^i18nOriginal/, "")
          .replace(
            /[A-Z]/g,
            (char, index) => `${index ? "-" : ""}${char.toLowerCase()}`,
          );
        element.setAttribute(attr, value);
      });
    });

    document
      .querySelectorAll("[data-i18n-original-discord-text]")
      .forEach((element) => {
        if (element.lastChild) {
          element.lastChild.textContent =
            element.dataset.i18nOriginalDiscordText;
        }
      });

    document.querySelector(".translation-notice")?.remove();
    document.title =
      document.documentElement.dataset.i18nOriginalTitle || document.title;
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
    trigger.innerHTML =
      '<span class="material-symbols-outlined">language</span>';

    const menu = document.createElement("div");
    menu.className = "language-menu-list";
    menu.setAttribute("role", "menu");
    menu.hidden = true;

    supportedLanguages.forEach((lang) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "language-menu-item";
      button.setAttribute("role", "menuitemradio");
      button.textContent = languageLabels[lang];
      button.dataset.lang = lang;
      button.addEventListener("click", async () => {
        await changeLanguage(lang);
      });
      menu.appendChild(button);
    });

    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = wrapper.classList.toggle("is-open");
      menu.hidden = !isOpen;
      trigger.setAttribute("aria-expanded", String(isOpen));
    });

    wrapper.addEventListener("click", (event) => {
      event.stopPropagation();
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
      document
        .getElementById("mobile-menu")
        ?.appendChild(createLanguageSwitcher());
      return;
    }

    const standalone = createLanguageSwitcher();
    standalone.classList.add("language-switcher-standalone");
    document.body.prepend(standalone);
  }

  function closeLanguageMenus() {
    document.querySelectorAll(".language-menu.is-open").forEach((menu) => {
      menu.classList.remove("is-open");
      menu.querySelector(".language-menu-list")?.setAttribute("hidden", "");
      menu
        .querySelector(".language-menu-trigger")
        ?.setAttribute("aria-expanded", "false");
    });
  }

  function updateLanguageButtons() {
    document.querySelectorAll(".language-menu-item").forEach((button) => {
      const isActive = button.dataset.lang === currentLanguage;
      button.setAttribute("aria-pressed", String(isActive));
      button.setAttribute("aria-checked", String(isActive));
    });
  }

  function showTranslationNotice() {
    document.querySelector(".translation-notice")?.remove();
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
    link.setAttribute(
      "aria-label",
      "Read source post from Aoi Hinamori on Twitter/X",
    );

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
    if (!document.documentElement.dataset.i18nOriginalTitle) {
      document.documentElement.dataset.i18nOriginalTitle = document.title;
    }
    document.title = t("page.title");
    setText(
      ".desktop-nav-link[href='#info'], .mobile-nav-link[href='#info']",
      "nav.info",
    );
    setText(
      ".desktop-nav-link[href='#goods'], .mobile-nav-link[href='#goods']",
      "nav.goods",
    );
    setText(
      ".desktop-nav-link[href='#faq'], .mobile-nav-link[href='#faq']",
      "nav.faq",
    );
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
      if (link.href.includes("discord.gg")) {
        if (!link.dataset.i18nOriginalDiscordText && link.lastChild) {
          link.dataset.i18nOriginalDiscordText = link.lastChild.textContent;
        }
        link.lastChild.textContent = t("profile.discord");
      }
    });
    setText(".event-date-line", "event.date");
    setText(".event-hours-line", "event.hours");
    setText(
      "#info .order-3 > .grid > div:nth-child(1) .font-label-sm",
      "hero.dateLabel",
    );
    setText(
      "#info .order-3 > .grid > div:nth-child(2) .font-label-sm",
      "hero.placeLabel",
    );
    setText(
      "#info .order-3 > .grid > div:nth-child(2) .font-title-md a",
      "hero.place",
    );
    setText("#info .order-3 > .grid > div:nth-child(2) a.mt-2", "event.maps");
    setText(
      "#info .order-3 > .grid > div:nth-child(3) .font-label-sm",
      "event.priceLabel",
    );
    setText(
      "#info .order-3 > .grid > div:nth-child(3) .font-title-md",
      "event.price",
    );
    setText(
      "#info .order-3 #transport-open .font-label-sm",
      "event.transportLabel",
    );
    setText("#info .order-3 #transport-open .font-title-md", "event.transport");
    setText("#transport-modal .border-l-4 > p", "transport.heading");
    setText("#transport-modal h2", "transport.title");
    setText("#transport-modal .space-y-6 > p", "transport.source");
    setText(
      "#transport-modal section:nth-of-type(1) h3",
      "transport.metroTitle",
    );
    setText("#transport-modal section:nth-of-type(1) p", "transport.metro");
    setText(
      "#transport-modal section:nth-of-type(2) h3",
      "transport.scooterTitle",
    );
    setText("#transport-modal section:nth-of-type(2) p", "transport.scooter");
    setText("#transport-modal section:nth-of-type(3) h3", "transport.busTitle");
    setText("#transport-modal section:nth-of-type(3) p", "transport.bus");
    setText(
      "#transport-modal section:nth-of-type(4) h3",
      "transport.driveTitle",
    );
    setText("#transport-modal section:nth-of-type(4) p", "transport.drive");
    setText("#goods h2", "goods.title");
    setText(".calculator-trigger .text-label-sm", "goods.ctaKicker");
    setText(
      ".calculator-trigger .inline-flex span:first-child",
      "goods.ctaText",
    );
    setAttr(
      "img[src='images/goods1.jfif']",
      "data-title",
      "goods.modal.onsite",
    );
    setAttr(
      "img[src='images/goods2.jfif']",
      "data-title",
      "goods.modal.preorder",
    );
    setAttr("img[src='images/LAHEE.jfif']", "data-title", "goods.modal.lahee");
    setAttr(
      "img[src='images/LAHEE.jfif']",
      "data-description",
      "goods.modal.laheeDescription",
    );
    setAttr("img[src='images/50cards.jpg']", "data-title", "goods.modal.cards");
    setAttr(
      "img[src='images/50cards.jpg']",
      "data-description",
      "goods.modal.cardsDescription",
    );
    setText("#faq h2", "faq.title");
    setText("#faq p", "faq.intro");
    setText(".faq-open .tracking-widest", "faq.open");
    setAttr("#faq-search", "placeholder", "faq.search");
    setHtml(".footer-disclaimer p", "footer.disclaimer");
  }

  function localizeCalculatorPage() {
    if (!document.documentElement.dataset.i18nOriginalTitle) {
      document.documentElement.dataset.i18nOriginalTitle = document.title;
    }
    document.title = t("calculator.title");
    setText("main section > div:first-child h1", "calculator.title");
    setText(
      "main section > div:first-child p:last-child",
      "calculator.description",
    );
    setText("aside h2", "calculator.summary");
    setText("aside h2 + p", "calculator.estimate");
    setText(".calculator-export", "calculator.export");
    setText(".calculator-reset", "calculator.reset");
    setText(
      "aside .font-label-sm.text-on-tertiary-fixed-variant, section.lg\\:hidden > div:first-child .font-label-sm",
      "calculator.total",
    );
    setText("#breakdown p", "calculator.empty");
  }

  function localizePage() {
    document.documentElement.lang = currentLanguage;
    document.body.dataset.lang = currentLanguage;
    updateLanguageButtons();
    restoreOriginals();
    if (currentLanguage === "zh-Hant") {
      window.dispatchEvent(
        new CustomEvent("aoi-language-change", {
          detail: { lang: currentLanguage },
        }),
      );
      return;
    }

    showTranslationNotice();
    if (document.getElementById("goods-list")) localizeCalculatorPage();
    if (document.getElementById("info")) localizeIndexPage();
    window.dispatchEvent(
      new CustomEvent("aoi-language-change", {
        detail: { lang: currentLanguage },
      }),
    );
  }

  async function changeLanguage(lang) {
    if (!supportedLanguages.includes(lang)) return;
    currentLanguage = lang;
    localStorage.setItem("aoi-lang", lang);
    await setCurrentDictionary(lang);
    window.AoiI18n.currentLanguage = currentLanguage;
    window.AoiI18n.isTranslated = currentLanguage !== "zh-Hant";
    localizePage();
    closeLanguageMenus();
  }

  window.AoiI18n = {
    currentLanguage,
    supportedLanguages,
    ready,
    t,
    changeLanguage,
    isTranslated: currentLanguage !== "zh-Hant",
  };

  document.addEventListener("DOMContentLoaded", () => {
    buildLanguageSwitcher();
    document.addEventListener("click", closeLanguageMenus);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeLanguageMenus();
    });
    setCurrentDictionary(currentLanguage)
      .catch((error) => {
        console.warn(error);
        fallbackDictionary = {};
        currentDictionary = {};
      })
      .finally(() => {
        readyResolve();
        localizePage();
      });
  });
})();
