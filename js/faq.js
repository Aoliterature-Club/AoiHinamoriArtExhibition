const faqModal = document.getElementById("faq-modal");
const faqCloseButton = document.getElementById("faq-modal-close");
const faqResults = document.getElementById("faq-results");
const faqSearch = document.getElementById("faq-search");
const faqCategoryTabs = document.getElementById("faq-category-tabs");
const faqCount = document.getElementById("faq-count");
const faqOpenTargets = document.querySelectorAll(".faq-open");
function getFaqLanguage() {
  return window.AoiI18n?.currentLanguage || "zh-Hant";
}

function getFaqText(key) {
  const messages = {
    "zh-Hant": {
      all: "全部",
      empty: "找不到符合條件的問題。",
      fallbackCategory: "其他",
      loadFailedCategory: "讀取失敗",
      loadFailedQuestion: "FAQ 資料暫時無法載入",
      loadFailedAnswer:
        "請確認網站是透過本機伺服器或 GitHub Pages 開啟，而不是直接用 file:// 開啟。",
    },
    ja: {
      all: "すべて",
      empty: "条件に一致する質問が見つかりません。",
      fallbackCategory: "その他",
      loadFailedCategory: "読み込み失敗",
      loadFailedQuestion: "FAQ データを一時的に読み込めません",
      loadFailedAnswer:
        "ローカルサーバーまたは GitHub Pages 経由で開いているか確認してください。file:// で直接開くと読み込めない場合があります。",
    },
    en: {
      all: "All",
      empty: "No matching questions found.",
      fallbackCategory: "Other",
      loadFailedCategory: "Load Failed",
      loadFailedQuestion: "FAQ data is temporarily unavailable",
      loadFailedAnswer:
        "Please make sure the site is opened through a local server or GitHub Pages, not directly through file://.",
    },
    "zh-Hans": {
      all: "全部",
      empty: "找不到符合条件的问题。",
      fallbackCategory: "其他",
      loadFailedCategory: "加载失败",
      loadFailedQuestion: "FAQ 资料暂时无法使用",
      loadFailedAnswer:
        "请确认网站是通过本机服务器或 GitHub Pages 开启，而不是直接使用 file:// 开启。",
    },
  };
  return messages[getFaqLanguage()]?.[key] || messages["zh-Hant"][key];
}

let allCategory = getFaqText("all");

let faqItems = [];
let activeCategory = allCategory;

function normalizeFaqText(value) {
  return String(value || "").trim();
}

function getPlainFaqText(value) {
  const container = document.createElement("div");
  container.innerHTML = normalizeFaqText(value).replace(/\\n/g, "\n");
  return container.textContent || "";
}

function setFaqAnswerContent(element, value) {
  const template = document.createElement("template");
  template.innerHTML = normalizeFaqText(value).replace(/\\n/g, "<br>");
  const fragment = document.createDocumentFragment();

  function appendSafeNode(node, parent) {
    if (node.nodeType === Node.TEXT_NODE) {
      parent.appendChild(document.createTextNode(node.textContent || ""));
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const tagName = node.tagName.toLowerCase();
    if (tagName === "br") {
      parent.appendChild(document.createElement("br"));
      return;
    }

    if (tagName === "a") {
      const link = document.createElement("a");
      const href = node.getAttribute("href") || "";
      if (/^https?:\/\//i.test(href)) {
        link.href = href;
        link.target = node.getAttribute("target") || "_blank";
        link.rel = "noopener noreferrer";
      }
      Array.from(node.childNodes).forEach((child) => appendSafeNode(child, link));
      parent.appendChild(link);
      return;
    }

    if (tagName === "img") {
      const src = node.getAttribute("src") || "";
      if (/^\.?\/?images\/[\w./-]+\.(png|jpe?g|webp|gif)$/i.test(src)) {
        const image = document.createElement("img");
        image.src = src;
        image.alt = node.getAttribute("alt") || "";
        image.className = node.getAttribute("class") || "";
        parent.appendChild(image);
      }
      return;
    }

    Array.from(node.childNodes).forEach((child) => appendSafeNode(child, parent));
  }

  Array.from(template.content.childNodes).forEach((node) =>
    appendSafeNode(node, fragment),
  );
  element.replaceChildren(fragment);
}

function getFaqCategories(items) {
  return [
    allCategory,
    ...Array.from(new Set(items.map((item) => item.category))),
  ];
}

function getFilteredFaqItems() {
  const query = faqSearch?.value.trim().toLowerCase() || "";

  return faqItems.filter((item) => {
    const matchesCategory =
      activeCategory === allCategory || item.category === activeCategory;
    const aliases = Array.isArray(item.aliases) ? item.aliases.join(" ") : "";
    const haystack =
      `${item.category} ${item.question} ${getPlainFaqText(item.answer)} ${aliases}`.toLowerCase();
    return matchesCategory && (!query || haystack.includes(query));
  });
}

function renderFaqCategories() {
  if (!faqCategoryTabs) return;

  faqCategoryTabs.innerHTML = "";

  getFaqCategories(faqItems).forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "faq-category-tab";
    button.textContent = category;
    button.dataset.category = category;
    button.setAttribute(
      "aria-pressed",
      category === activeCategory ? "true" : "false",
    );
    button.addEventListener("click", () => {
      activeCategory = category;
      renderFaqCategories();
      renderFaqResults();
    });
    faqCategoryTabs.appendChild(button);
  });
}

function createFaqItem(item) {
  const article = document.createElement("article");
  article.className = "faq-item glass-card";

  const button = document.createElement("button");
  button.className = "faq-question";
  button.type = "button";
  button.setAttribute("aria-expanded", "false");

  const textWrap = document.createElement("span");
  textWrap.className = "faq-question-text";

  const category = document.createElement("span");
  category.className = "faq-item-category font-label-sm text-label-sm";
  category.textContent = item.category;

  const question = document.createElement("span");
  question.className = "faq-question-title";
  question.textContent = item.question;

  const icon = document.createElement("span");
  icon.className = "material-symbols-outlined faq-question-icon";
  icon.textContent = "expand_more";

  const answer = document.createElement("div");
  answer.className = "faq-answer hidden";
  setFaqAnswerContent(answer, item.answer);

  textWrap.append(category, question);
  button.append(textWrap, icon);
  article.append(button, answer);

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    icon.classList.toggle("is-open", !isOpen);
    answer.classList.toggle("hidden", isOpen);
  });

  return article;
}

function renderFaqResults() {
  if (!faqResults) return;

  const filtered = getFilteredFaqItems();
  faqResults.innerHTML = "";

  if (faqCount) {
    faqCount.textContent = `${filtered.length} / ${faqItems.length} `;
  }

  if (!filtered.length) {
    const empty = document.createElement("p");
    empty.className =
      "faq-empty font-body-md text-body-md text-on-surface-variant";
    empty.textContent = getFaqText("empty");
    faqResults.appendChild(empty);
    return;
  }

  filtered.forEach((item) => {
    faqResults.appendChild(createFaqItem(item));
  });
}

async function loadFaqItems() {
  if (faqItems.length) return;

  try {
    const faqLanguage = getFaqLanguage();
    const suffix = faqLanguage === "zh-Hant" ? "" : `.${faqLanguage}`;
    const response = await fetch(`data/faq${suffix}.json`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`FAQ data request failed: ${response.status}`);
    }
    const payload = await response.json();
    faqItems = (payload.items || [])
      .map((item) => ({
        ...item,
        category: normalizeFaqText(item.category) || getFaqText("fallbackCategory"),
        question: normalizeFaqText(item.question),
        answer: normalizeFaqText(item.answer),
      }))
      .filter((item) => item.question && item.answer)
      .sort((a, b) => {
        if (a.priority !== b.priority) return a.priority - b.priority;
        return a.category.localeCompare(b.category, "zh-Hant");
      });
  } catch (error) {
    faqItems = [
      {
        category: getFaqText("loadFailedCategory"),
        question: getFaqText("loadFailedQuestion"),
        answer: getFaqText("loadFailedAnswer"),
        priority: 1,
      },
    ];
  }

  renderFaqCategories();
  renderFaqResults();
}

async function openFaqModal(event) {
  event?.preventDefault();
  if (!faqModal) return;

  faqModal.classList.add("is-open");
  faqModal.setAttribute("aria-hidden", "false");
  await loadFaqItems();
}

function closeFaqModal() {
  if (!faqModal) return;

  faqModal.classList.remove("is-open");
  faqModal.setAttribute("aria-hidden", "true");
}

faqOpenTargets.forEach((target) => {
  target.addEventListener("click", openFaqModal);
});

faqCloseButton?.addEventListener("click", closeFaqModal);
faqModal?.addEventListener("click", (event) => {
  if (event.target === faqModal) {
    closeFaqModal();
  }
});
faqSearch?.addEventListener("input", renderFaqResults);
window.addEventListener("aoi-language-change", async () => {
  allCategory = getFaqText("all");
  activeCategory = allCategory;
  faqItems = [];
  if (faqSearch) {
    faqSearch.value = "";
  }
  if (faqModal?.classList.contains("is-open")) {
    await loadFaqItems();
  } else {
    renderFaqCategories();
    renderFaqResults();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeFaqModal();
  }
});
