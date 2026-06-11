// Simple parallax effect for hero
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroImg = document.querySelector(".hero-backdrop-image");
  if (heroImg) {
    heroImg.style.transform = `translateY(${scrolled * 0.3}px) scale(1.1)`;
  }
});

// Intersection Observer for scroll reveal animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll("section > div").forEach((div) => {
  div.style.opacity = "0";
  observer.observe(div);
});

const pvModal = document.getElementById("pv-modal");
const pvPlayer = document.getElementById("pv-player");
const pvMemePlayer = document.getElementById("pv-meme-player");
const pvFrameWrap = document.getElementById("pv-frame-wrap");
const pvYoutubeLink = document.getElementById("pv-youtube-link");
const pvLocalWarning = document.getElementById("pv-local-warning");
const pvOpenButton = document.getElementById("pv-open");
const pvNavOpenButton = document.getElementById("pv-nav-open");
const pvCloseButton = document.getElementById("pv-modal-close");
const pvSoundToggle = document.getElementById("pv-sound-toggle");
const bgmPlayer = document.getElementById("bgm-player");
const bgmToggleButtons = document.querySelectorAll(".bgm-toggle");
const transportModal = document.getElementById("transport-modal");
const transportCloseButton = document.getElementById("transport-modal-close");
const transportOpenButton = document.getElementById("transport-open");
const announcementTicker = document.getElementById("announcement-ticker");
const announcementTickerTrack = document.getElementById(
  "announcement-ticker-track",
);
const calculatorModal = document.getElementById("calculator-modal");
const calculatorFrame = document.getElementById("calculator-frame");
const calculatorTriggers = document.querySelectorAll(".calculator-trigger");
const calculatorCloseButton = document.getElementById("calculator-modal-close");
const imageModal = document.getElementById("image-modal");
const imageModalMedia = document.querySelector(".image-modal-media");
const imageModalContent = document.getElementById("image-modal-content");
const imageModalImageStage = document.querySelector(".image-modal-image-stage");
const imageModalTitle = document.getElementById("image-modal-title");
const imageModalText = document.getElementById("image-modal-text");
const imageModalLink = document.getElementById("image-modal-link");
const imageModalCloseButton = document.getElementById("image-modal-close");
const imageModalZoomInButton = document.getElementById("image-modal-zoom-in");
const imageModalZoomOutButton = document.getElementById("image-modal-zoom-out");
const imageModalZoomResetButton = document.getElementById(
  "image-modal-zoom-reset",
);
const imageCarouselPrevButton = document.getElementById("image-carousel-prev");
const imageCarouselNextButton = document.getElementById("image-carousel-next");
const imageCarouselCount = document.getElementById("image-carousel-count");
const imageCarouselCategory = document.getElementById(
  "image-carousel-category",
);
const venuePhotoTabs = document.getElementById("venue-photo-tabs");
const badgeDetailModal = document.getElementById("badge-detail-modal");
const badgeDetailImage = document.getElementById("badge-detail-image");
const badgeDetailCloseButton = document.getElementById("badge-detail-close");
const lightboxTriggers = document.querySelectorAll(".lightbox-trigger");
const venuePhotoOpenButton = document.getElementById("venue-photo-open");
const speedDialButton = document.getElementById("speed-dial");
const speedDialProductQuantity = document.getElementById(
  "speed-dial-product-quantity",
);
const speedDialProductPhoto = document.getElementById(
  "speed-dial-product-photo",
);
const speedDialContainer = document.getElementById("speed-dial-container");
const goodsQuantityModal = document.getElementById("goods-quantity-modal");
const goodsQuantityCloseButton = document.getElementById(
  "goods-quantity-close",
);
const goodsEditButton = document.getElementById("goods-quantity-edit");
const goodsPwRow = document.getElementById("goods-quantity-pw-row");
const goodsPwInput = document.getElementById("goods-quantity-pw-input");
const goodsPwSubmit = document.getElementById("goods-quantity-pw-submit");
const goodsPwCancel = document.getElementById("goods-quantity-pw-cancel");
const goodsPwError = document.getElementById("goods-quantity-pw-error");
/** 商品數量編輯密碼 */
const GOODS_EDIT_PASSWORD = "aoi22";
/** 商品數量 API */
const GOODS_API_URL =
  "https://67651da352b2a7619f5e6fe7.mockapi.io/aoi/aoi-exhibition-product-quantity";
let isGoodsEditMode = false;
let isGoodsLoading = false;
let isGoodsAuthenticated = false;
const randomPhotoStrip = document.getElementById("random-photo-strip");
const randomPhotoProgress = document.getElementById("random-photo-progress");
const featuredPostOpenButton = document.getElementById("featured-post-open");
const eventHashtagCopyButton = document.getElementById("event-hashtag-copy");
const eventHashtagCopyStatus = document.getElementById(
  "event-hashtag-copy-status",
);
let GOODS_QUANTITY = [];

let imageModalZoom = 1;
let activeVenuePhotoIndex = -1;
let activeVenuePhotoCategory = "all";
let imageModalBadgeOverlay = null;
let badgeHoverPreview = null;
let isImageModalPanning = false;
let imageModalPanStartX = 0;
let imageModalPanStartY = 0;
let imageModalPanScrollLeft = 0;
let imageModalPanScrollTop = 0;
let isImageModalPinching = false;
let imageModalPinchStartDistance = 0;
let imageModalPinchStartZoom = 1;
const imageModalTouchPointers = new Map();
let bgmUserControlled = false;
let shouldResumeBgmAfterPv = false;
let hasShownInitialNotice = false;
let didPlayMemeLastTime = false;
const memePvChance = 0.3;
let randomPhotoTimer = null;
let lastRandomPhotoIndex = -1;
const optimizedPhotoRoot = "images/PhotosOptimized";
const venuePhotoPreloadCache = new Map();
const venuePhotoCategories = [
  {
    id: "Venue",
    labelKey: "venuePhotos.category.venue",
    path: "images/Photos/Venue",
    files: [
      "1.個展正門照.jpg",
      "2.門口超漂亮老大.jpg",
      "3.門口蝕光.jpg",
      "4.門口個展日期標示.jpg",
      "5.患者小雞懶骨頭.jpg",
    ],
  },
  {
    id: "Paints",
    labelKey: "venuePhotos.category.paints",
    path: "images/Photos/Paints",
    files: [
      "1.蝕光.jpg",
      "2.初配信.jpg",
      "3.鏡。碎.jpg",
      "4.深淵帶.jpg",
      "5.殤之鎖.jpg",
      "6.流光返.jpg",
      "7.Me to we.jpg",
      "8.比翼雙飛.jpg",
      "9.沁涼熱浪.jpg",
      "10.莓飛色舞.jpg",
      "11.魔幻氣泡.jpg",
      "12.初戀晨曦.jpg",
      "13.視線.jpg",
      "14.向陽花.jpg",
      "15.患燃依心.jpg",
      "16.All of I.jpg",
      "17.煙花爛漫.jpg",
    ],
  },
  {
    id: "Merchs",
    labelKey: "venuePhotos.category.merchs",
    path: "images/Photos/Merchs",
    files: [
      "Lahee.jpg",
      "Re.向日葵曲繪.jpg",
      "手作包細節.jpg",
      "卡冊.jpg",
      "卡包SSR.jpg",
      "卡包UR.jpg",
      "卡包普卡.jpg",
      "卡套區側面拍.jpg",
      "明信片套組.jpg",
      "秋葵.jpg",
      "遊戲王尺寸卡套.jpg",
      "漫畫.jpg",
    ],
  },
  {
    id: "DDroll",
    labelKey: "venuePhotos.category.ddroll",
    path: "images/Photos/DDroll",
    files: ["1.DD娃-全身.jpg", "2.DD娃-半身.jpg", "3.DD娃-底座.jpg"],
  },
];
const venuePhotos = venuePhotoCategories.flatMap((category) =>
  category.files.map((file, index) => {
    const filenameWithoutExtension = file.replace(/\.[^.]+$/, "");
    const title = filenameWithoutExtension.replace(/^\d+\./, "");
    const photoKey = `venuePhotos.photo.${category.id}.${index + 1}`;
    const originalSrc = `${category.path}/${file}`;

    return {
      originalSrc,
      src: originalSrc,
      thumbSrc: getOptimizedPhotoSrc(originalSrc, "thumb"),
      title,
      titleKey: `${photoKey}.title`,
      descriptionKey: `${photoKey}.description`,
      category: category.id,
      categoryLabelKey: category.labelKey,
    };
  }),
);

function getOptimizedPhotoSrc(src, variant) {
  return src.replace("images/Photos/", `${optimizedPhotoRoot}/${variant}/`);
}

function getOriginalPhotoSrc(src) {
  return src
    .replace(`${optimizedPhotoRoot}/display/`, "images/Photos/")
    .replace(`${optimizedPhotoRoot}/thumb/`, "images/Photos/");
}

function warmImage(src) {
  if (!src || venuePhotoPreloadCache.has(src)) return;

  const image = new Image();
  image.decoding = "async";
  image.src = src;
  venuePhotoPreloadCache.set(src, image);
  image.decode?.().catch(() => {});
}

function scheduleVenuePhotoPreload(activePhotos, activeIndex) {
  if (!activePhotos.length) return;

  const run = () => {
    [-1, 1, 2].forEach((offset) => {
      const photo =
        activePhotos[
          (activeIndex + offset + activePhotos.length) % activePhotos.length
        ];
      warmImage(photo?.src);
      warmImage(photo?.thumbSrc);
    });
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(run, { timeout: 900 });
  } else {
    window.setTimeout(run, 80);
  }
}

function scheduleOriginalPhotoPreload() {
  if (!venuePhotos.length) return;

  let index = 0;
  const preloadNext = () => {
    const photo = venuePhotos[index];
    if (!photo) return;

    warmImage(photo.originalSrc);
    index += 1;

    if (index < venuePhotos.length) {
      window.setTimeout(preloadNext, 450);
    }
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(preloadNext, { timeout: 1500 });
  } else {
    window.setTimeout(preloadNext, 1200);
  }
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);
  const copied = document.execCommand("copy");
  textarea.remove();

  if (!copied) {
    throw new Error("Copy command failed");
  }
}

eventHashtagCopyButton?.addEventListener("click", async () => {
  const copyTextValue = eventHashtagCopyButton.dataset.copyText || "";
  const copyLabel = eventHashtagCopyButton.querySelector(
    ".event-hashtag-copy-label",
  );
  const copyIcon = eventHashtagCopyButton.querySelector(
    ".material-symbols-outlined",
  );
  const translate = (key) => window.AoiI18n?.t(key) || key;

  try {
    await copyText(copyTextValue);
    eventHashtagCopyButton.classList.add("is-copied");
    if (copyLabel)
      copyLabel.textContent = translate("hero.copyHashtagsSuccess");
    if (copyIcon) copyIcon.textContent = "check";
    if (eventHashtagCopyStatus)
      eventHashtagCopyStatus.textContent = copyTextValue;

    window.setTimeout(() => {
      eventHashtagCopyButton.classList.remove("is-copied");
      if (copyLabel) copyLabel.textContent = translate("hero.copyHashtags");
      if (copyIcon) copyIcon.textContent = "content_copy";
      if (eventHashtagCopyStatus) eventHashtagCopyStatus.textContent = "";
    }, 2500);
  } catch (error) {
    if (eventHashtagCopyStatus) {
      eventHashtagCopyStatus.textContent = translate("hero.copyHashtagsError");
    }
  }
});

const badgeHotspots = [
  {
    label: "Badge design 1",
    src: "images/Badges/design1.jfif",
    x: 0.255,
    y: 0.36,
    width: 0.175,
    height: 0.247,
  },
  {
    label: "Badge design 2",
    src: "images/Badges/design2.jfif",
    x: 0.502,
    y: 0.355,
    width: 0.175,
    height: 0.247,
  },
  {
    label: "Badge design 3",
    src: "images/Badges/design3.jfif",
    x: 0.762,
    y: 0.352,
    width: 0.175,
    height: 0.247,
  },
  {
    label: "Badge design 4",
    src: "images/Badges/design4.jfif",
    x: 0.765,
    y: 0.696,
    width: 0.175,
    height: 0.247,
  },
  {
    label: "Badge design 5",
    src: "images/Badges/design5.jfif",
    x: 0.515,
    y: 0.696,
    width: 0.175,
    height: 0.247,
  },
  {
    label: "Badge design 6",
    src: "images/Badges/design6.jfif",
    x: 0.28,
    y: 0.695,
    width: 0.175,
    height: 0.247,
  },
];

const imageModalPresets = {
  featuredPost: {
    src: "images/DDroll.jfif",
    titleKey: "spotlight.modalTitle",
    descriptionKey: "spotlight.modalDescription",
    link: "https://x.com/AoiHinamori/status/2063828112899780856",
  },
};

const lightboxModalFallbacks = [
  {
    matchSrc: "images/comics.jfif",
    titleKey: "goods.modal.comics",
    descriptionKey: "goods.modal.comicsDescription",
  },
];

function openModalElement(modal) {
  if (!modal) return;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModalElement(modal) {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

function closeModalOnBackdrop(modal, closeCallback) {
  modal?.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeCallback();
    }
  });
}

function getTranslatedValue(key, fallback = "") {
  if (!key) return fallback;
  const translated = window.AoiI18n?.t?.(key);
  return translated && translated !== key ? translated : fallback;
}

function resolveImageModalSpec(spec) {
  return {
    src: spec.src,
    title: spec.title ?? getTranslatedValue(spec.titleKey, spec.titleFallback),
    description:
      spec.description ??
      getTranslatedValue(spec.descriptionKey, spec.descriptionFallback),
    link: spec.link,
    options: spec.options || {},
  };
}

function getLightboxModalSpec(trigger) {
  const src = trigger.dataset.modalSrc || trigger.getAttribute("src") || "";
  const fallback = lightboxModalFallbacks.find((item) =>
    src.includes(item.matchSrc),
  );

  return resolveImageModalSpec({
    src,
    title: trigger.dataset.title,
    titleKey: trigger.dataset.titleKey || fallback?.titleKey,
    description: trigger.dataset.description,
    descriptionKey: trigger.dataset.descriptionKey || fallback?.descriptionKey,
    link: trigger.dataset.link,
  });
}

function withOrigin(src) {
  const videoUrl = new URL(src);
  if (window.location.origin.startsWith("http")) {
    videoUrl.searchParams.set("origin", window.location.origin);
  }
  return videoUrl.toString();
}

function openPvModal(isUserClick = false) {
  if (!pvModal || !pvPlayer) return;
  shouldResumeBgmAfterPv = Boolean(bgmPlayer && !bgmPlayer.paused);
  pauseBgm();

  const shouldPlayMeme =
    isUserClick && !didPlayMemeLastTime && Math.random() < memePvChance;
  if (isUserClick) {
    didPlayMemeLastTime = shouldPlayMeme;
  }
  pvPlayer.classList.toggle("hidden", shouldPlayMeme);
  pvMemePlayer?.classList.toggle("hidden", !shouldPlayMeme);
  pvYoutubeLink?.classList.toggle("hidden", shouldPlayMeme);
  pvPlayer.src = "";
  if (pvMemePlayer) {
    pvMemePlayer.pause();
    pvMemePlayer.currentTime = 0;
  }

  if (shouldPlayMeme) {
    pvFrameWrap?.classList.remove("hidden");
    pvLocalWarning?.classList.add("hidden");
    pvSoundToggle?.classList.add("hidden");
    openModalElement(pvModal);
    const memePlayPromise = pvMemePlayer?.play();
    if (memePlayPromise) {
      memePlayPromise.catch(() => {});
    }
    return;
  }

  if (window.location.protocol === "file:") {
    pvFrameWrap?.classList.add("hidden");
    pvLocalWarning?.classList.remove("hidden");
    openModalElement(pvModal);
    return;
  }

  pvFrameWrap?.classList.remove("hidden");
  pvLocalWarning?.classList.add("hidden");

  let videoUrl = withOrigin(pvPlayer.dataset.src);
  if (isUserClick) {
    videoUrl = videoUrl.replace("mute=1", "mute=0");
    pvSoundToggle?.classList.add("hidden");
  } else {
    pvSoundToggle?.classList.remove("hidden");
  }

  pvPlayer.src = videoUrl;
  openModalElement(pvModal);
}

function closePvModal() {
  if (!pvModal || !pvPlayer) return;

  const wasOpen = pvModal.classList.contains("is-open");
  closeModalElement(pvModal);
  pvPlayer.src = "";
  pvPlayer.classList.remove("hidden");
  pvYoutubeLink?.classList.remove("hidden");
  if (pvMemePlayer) {
    pvMemePlayer.pause();
    pvMemePlayer.currentTime = 0;
    pvMemePlayer.classList.add("hidden");
  }
  pvSoundToggle?.classList.remove("hidden");

  if (wasOpen && !bgmUserControlled) {
    playBgm();
  } else if (wasOpen && shouldResumeBgmAfterPv) {
    playBgm();
  }
  shouldResumeBgmAfterPv = false;

  if (
    wasOpen &&
    !hasShownInitialNotice &&
    window.AoiI18n?.showTranslationNotice
  ) {
    hasShownInitialNotice = true;
    setTimeout(() => {
      window.AoiI18n.showTranslationNotice();
    }, 300); // Wait for PV modal to finish closing transition
  }
}

function updateBgmButtons(isPlaying) {
  bgmToggleButtons.forEach((button) => {
    const icon = button.querySelector(".bgm-toggle-icon");
    const state = button.querySelector(".bgm-toggle-state");

    button.classList.toggle("is-playing", isPlaying);
    button.setAttribute("aria-pressed", String(isPlaying));
    if (icon) {
      icon.textContent = isPlaying ? "music_note" : "music_off";
    }
    if (state) {
      state.textContent = isPlaying ? "ON" : "OFF";
    }
  });
}

function playBgm() {
  if (!bgmPlayer) return;

  bgmPlayer.volume = 0.5;
  const playPromise = bgmPlayer.play();
  if (playPromise) {
    playPromise
      .then(() => updateBgmButtons(true))
      .catch(() => updateBgmButtons(false));
  } else {
    updateBgmButtons(true);
  }
}

function pauseBgm() {
  if (!bgmPlayer) return;

  bgmPlayer.pause();
  updateBgmButtons(false);
}

function toggleBgm() {
  if (!bgmPlayer) return;

  bgmUserControlled = true;
  if (bgmPlayer.paused) {
    playBgm();
  } else {
    pauseBgm();
  }
}

function enablePvSound() {
  if (!pvPlayer?.contentWindow) return;

  pvPlayer.contentWindow.postMessage(
    JSON.stringify({
      event: "command",
      func: "unMute",
      args: [],
    }),
    "*",
  );
  pvPlayer.contentWindow.postMessage(
    JSON.stringify({
      event: "command",
      func: "setVolume",
      args: [100],
    }),
    "*",
  );
  pvPlayer.contentWindow.postMessage(
    JSON.stringify({
      event: "command",
      func: "playVideo",
      args: [],
    }),
    "*",
  );
  pvSoundToggle?.classList.add("hidden");
}

function openTransportModal(event) {
  event?.preventDefault();
  if (!transportModal) return;

  openModalElement(transportModal);
}

function closeTransportModal(event) {
  event?.preventDefault();
  if (!transportModal) return;

  closeModalElement(transportModal);
}

const ANNOUNCEMENT_DEFAULT =
  "感謝各位患者參與✦ 畫作已全數賣出✦（2026/06/10）周邊目前可能還剩：Aoi's Diary原創漫畫、夏日 TCG 卡套、沁涼一下 B5 卡冊、隨機徽章，以現場剩餘商品為主✦ 狂人大空掃了一堆商品，目前現場可索取透明應援扇子（現場消費送）✦ #所有周邊賣完，我帶三個月的紅鼻子，這是我的豪賭了 — by Aoi Hinamori";
const TICKER_SPEED = 80; // px per second

let tickerOffset = 0;
let tickerItemWidth = 0;
let tickerLastTime = null;
let tickerAnimId = null;
let tickerPaused = false;

function tickerTick(timestamp) {
  if (!tickerPaused && tickerLastTime !== null) {
    const delta = (timestamp - tickerLastTime) / 1000;
    tickerOffset += TICKER_SPEED * delta;
    if (tickerItemWidth > 0 && tickerOffset >= tickerItemWidth) {
      tickerOffset -= tickerItemWidth;
    }
    if (announcementTickerTrack) {
      announcementTickerTrack.style.transform = `translateX(${-tickerOffset}px)`;
    }
  }
  tickerLastTime = timestamp;
  tickerAnimId = requestAnimationFrame(tickerTick);
}

function initAnnouncementTicker() {
  if (!announcementTicker || !announcementTickerTrack) return;

  const text = ANNOUNCEMENT_DEFAULT;
  announcementTickerTrack.innerHTML = "";

  // Measure a single item width
  const probe = document.createElement("span");
  probe.className = "announcement-ticker-item";
  probe.textContent = text;
  probe.style.cssText =
    "position:absolute;visibility:hidden;white-space:nowrap;pointer-events:none";
  document.body.appendChild(probe);
  tickerItemWidth = probe.offsetWidth;
  document.body.removeChild(probe);

  // Fill with enough copies to cover 3x viewport width (guarantees no gap)
  const copies = Math.max(
    4,
    Math.ceil((window.innerWidth * 3) / tickerItemWidth) + 1,
  );
  for (let i = 0; i < copies; i++) {
    const span = document.createElement("span");
    span.className = "announcement-ticker-item";
    span.textContent = text;
    if (i > 0) span.setAttribute("aria-hidden", "true");
    announcementTickerTrack.appendChild(span);
  }

  tickerOffset = 0;
  tickerLastTime = null;
  if (tickerAnimId) cancelAnimationFrame(tickerAnimId);
  tickerAnimId = requestAnimationFrame(tickerTick);

  announcementTickerTrack.addEventListener("mouseenter", () => {
    tickerPaused = true;
  });
  announcementTickerTrack.addEventListener("mouseleave", () => {
    tickerPaused = false;
  });
}

function syncCalculatorLanguage() {
  const lang = window.AoiI18n?.currentLanguage;
  const calculatorI18n = calculatorFrame?.contentWindow?.AoiI18n;

  if (!lang || !calculatorI18n?.changeLanguage) return;
  calculatorI18n.changeLanguage(lang, { persist: false });
}

function openCalculatorModal(event) {
  event?.preventDefault();
  if (!calculatorModal || !calculatorFrame) return;

  const targetSrc = calculatorFrame.dataset.src || "goods-calculator.html";
  if (calculatorFrame.getAttribute("src") !== targetSrc) {
    calculatorFrame.setAttribute("src", targetSrc);
  } else {
    syncCalculatorLanguage();
  }
  openModalElement(calculatorModal);
}

function closeCalculatorModal() {
  if (!calculatorModal) return;

  closeModalElement(calculatorModal);
}

async function fetchGoodsQuantity() {
  isGoodsLoading = true;
  renderGoodsQuantity();
  try {
    const res = await fetch(GOODS_API_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    GOODS_QUANTITY = data.map((item) => ({
      id: item.id,
      img: item.img || "",
      name: item.name || "",
      desc: item.desc || "",
      qty: Math.max(0, parseInt(item.qty) || 0),
      oozora: Math.max(0, parseInt(item.oozora) || 0),
    }));
  } catch (err) {
    console.error("[GoodsQuantity] fetch failed:", err);
  } finally {
    isGoodsLoading = false;
    renderGoodsQuantity();
  }
}

function renderGoodsQuantity() {
  const list = document.getElementById("goods-quantity-list");
  if (!list) return;
  if (isGoodsLoading) {
    list.innerHTML = `<div class="goods-quantity-loading"><span class="material-symbols-outlined goods-quantity-loading-icon">sync</span>載入中…</div>`;
    return;
  }
  list.innerHTML = GOODS_QUANTITY.map((item, index) => {
    let infoBottomHtml;
    if (isGoodsEditMode) {
      infoBottomHtml = `
        <textarea class="goods-quantity-textarea" rows="2" placeholder="說明（選填）"
          data-index="${index}" data-field="desc">${item.desc || ""}</textarea>
        <div class="goods-quantity-edit-row">
          <label class="goods-quantity-field-label">商品數量
            <input class="goods-quantity-input" type="number" min="0"
              data-index="${index}" data-field="qty" value="${item.qty}" />
          </label>
          <label class="goods-quantity-field-label">大空數量
            <input class="goods-quantity-input" type="number" min="0"
              data-index="${index}" data-field="oozora" value="${item.oozora}" />
          </label>
        </div>`;
    } else {
      const descHtml = item.desc
        ? `<div class="goods-quantity-desc">${item.desc}</div>`
        : "";
      const soldOut = item.qty === 0 && item.oozora === 0;
      const tagsHtml = soldOut
        ? `<div class="goods-quantity-tags"><span class="goods-quantity-soldout">已售完</span></div>`
        : `<div class="goods-quantity-tags">
            <span class="goods-quantity-tag goods-quantity-tag-normal">
              <span class="goods-quantity-tag-label">商品數量</span>
              <span class="goods-quantity-tag-value">${item.qty}</span>
            </span>
            <span class="goods-quantity-tag goods-quantity-tag-oozora">
              <span class="goods-quantity-tag-label">大空數量</span>
              <span class="goods-quantity-tag-value">${item.oozora}</span>
            </span>
          </div>`;
      infoBottomHtml = descHtml + tagsHtml;
    }
    return `<div class="goods-quantity-item">
      <img class="goods-quantity-thumb" src="${item.img}" alt="${item.name}" loading="lazy" />
      <div class="goods-quantity-info">
        <div class="goods-quantity-name">${item.name}</div>
        ${infoBottomHtml}
      </div>
    </div>`;
  }).join("");
}

function saveGoodsQuantity() {
  document
    .querySelectorAll(".goods-quantity-input, .goods-quantity-textarea")
    .forEach((el) => {
      const idx = parseInt(el.dataset.index);
      const field = el.dataset.field;
      if (!GOODS_QUANTITY[idx]) return;
      if (field === "desc") {
        GOODS_QUANTITY[idx][field] = el.value.trim();
      } else {
        GOODS_QUANTITY[idx][field] = Math.max(0, parseInt(el.value) || 0);
      }
    });
  Promise.all(
    GOODS_QUANTITY.map((item) =>
      fetch(`${GOODS_API_URL}/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: item.id,
          img: item.img,
          name: item.name,
          desc: item.desc,
          qty: item.qty,
          oozora: item.oozora,
        }),
      }),
    ),
  ).catch((err) => console.error("[GoodsQuantity] save failed:", err));
}

function syncGoodsEditButton() {
  const icon = goodsEditButton?.querySelector(".goods-quantity-edit-icon");
  const label = document.getElementById("goods-quantity-edit-label");
  if (icon) icon.textContent = isGoodsEditMode ? "save" : "edit";
  if (label) label.textContent = isGoodsEditMode ? "儲存" : "小精靈編輯";
  goodsEditButton?.classList.toggle("is-saving", isGoodsEditMode);
}

function showGoodsPwRow() {
  goodsPwRow?.classList.remove("hidden");
  goodsPwError?.classList.add("hidden");
  if (goodsPwInput) {
    goodsPwInput.value = "";
    goodsPwInput.focus();
  }
}

function hideGoodsPwRow() {
  goodsPwRow?.classList.add("hidden");
  goodsPwError?.classList.add("hidden");
  if (goodsPwInput) goodsPwInput.value = "";
}

function submitGoodsPassword() {
  if (goodsPwInput?.value === GOODS_EDIT_PASSWORD) {
    isGoodsAuthenticated = true;
    hideGoodsPwRow();
    isGoodsEditMode = true;
    renderGoodsQuantity();
    syncGoodsEditButton();
  } else {
    goodsPwError?.classList.remove("hidden");
    if (goodsPwInput) {
      goodsPwInput.value = "";
      goodsPwInput.focus();
    }
  }
}

function toggleGoodsEditMode() {
  if (isGoodsEditMode) {
    saveGoodsQuantity();
    isGoodsEditMode = false;
    renderGoodsQuantity();
    syncGoodsEditButton();
  } else if (isGoodsAuthenticated) {
    isGoodsEditMode = true;
    renderGoodsQuantity();
    syncGoodsEditButton();
  } else {
    showGoodsPwRow();
  }
}

function openGoodsQuantityModal() {
  if (!goodsQuantityModal) return;
  isGoodsEditMode = false;
  syncGoodsEditButton();
  openModalElement(goodsQuantityModal);
  fetchGoodsQuantity();
}

function closeGoodsQuantityModal() {
  if (!goodsQuantityModal) return;
  if (isGoodsEditMode) {
    saveGoodsQuantity();
    isGoodsEditMode = false;
  }
  closeModalElement(goodsQuantityModal);
}

function setModalText(element, value, options = {}) {
  if (!element) return;

  if (value) {
    const normalizedText = value
      .replace(/\\n/g, "\n")
      .replace(/<br\s*\/?>/gi, "\n");

    element.textContent = "";
    if (options.allowLinks) {
      const template = document.createElement("template");
      template.innerHTML = normalizedText.replace(/\r?\n/g, "<br>");
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
          Array.from(node.childNodes).forEach((child) =>
            appendSafeNode(child, link),
          );
          parent.appendChild(link);
          return;
        }

        Array.from(node.childNodes).forEach((child) =>
          appendSafeNode(child, parent),
        );
      }

      Array.from(template.content.childNodes).forEach((node) =>
        appendSafeNode(node, fragment),
      );
      element.appendChild(fragment);
    } else {
      normalizedText.split(/\r?\n/).forEach((line, index) => {
        if (index > 0) {
          element.appendChild(document.createElement("br"));
        }
        element.appendChild(document.createTextNode(line));
      });
    }
    element.classList.remove("hidden");
  } else {
    element.textContent = "";
    element.classList.add("hidden");
  }
}

function setImageCarouselControls(isEnabled) {
  imageCarouselPrevButton?.classList.toggle("hidden", !isEnabled);
  imageCarouselNextButton?.classList.toggle("hidden", !isEnabled);
  imageCarouselCount?.classList.toggle("hidden", !isEnabled);
  imageCarouselCategory?.classList.toggle("hidden", !isEnabled);
  venuePhotoTabs?.classList.toggle("hidden", !isEnabled);
}

function getActiveVenuePhotos() {
  if (activeVenuePhotoCategory === "all") return venuePhotos;
  return venuePhotos.filter(
    (photo) => photo.category === activeVenuePhotoCategory,
  );
}

function getVenuePhotoText(key, fallback = key) {
  const translated = window.AoiI18n?.t?.(key);
  return translated && translated !== key ? translated : fallback;
}

function renderVenuePhotoTabs() {
  if (!venuePhotoTabs) return;
  venuePhotoTabs.innerHTML = "";

  const tabs = [
    {
      id: "all",
      labelKey: "venuePhotos.category.all",
      count: venuePhotos.length,
    },
    ...venuePhotoCategories.map((category) => ({
      id: category.id,
      labelKey: category.labelKey,
      count: category.files.length,
    })),
  ];

  tabs.forEach((tab) => {
    const button = document.createElement("button");
    button.className = "venue-photo-tab";
    button.type = "button";
    button.dataset.category = tab.id;
    button.setAttribute(
      "aria-pressed",
      String(tab.id === activeVenuePhotoCategory),
    );
    const label = document.createElement("span");
    label.className = "venue-photo-tab-label";
    label.textContent = getVenuePhotoText(tab.labelKey);
    const count = document.createElement("span");
    count.className = "venue-photo-tab-count";
    count.textContent = String(tab.count);
    button.append(label, count);
    button.addEventListener("click", () => {
      activeVenuePhotoCategory = tab.id;
      openVenuePhoto(0);
    });
    venuePhotoTabs.appendChild(button);
  });
}

function updateImageCarouselCount() {
  if (!imageCarouselCount || activeVenuePhotoIndex < 0) return;
  imageCarouselCount.innerHTML = "";
  const current = document.createElement("span");
  current.className = "image-carousel-count-current";
  current.textContent = String(activeVenuePhotoIndex + 1);
  const divider = document.createElement("span");
  divider.className = "image-carousel-count-divider";
  divider.textContent = "/";
  const total = document.createElement("span");
  total.className = "image-carousel-count-total";
  total.textContent = String(getActiveVenuePhotos().length);
  imageCarouselCount.append(current, divider, total);
}

function updateImageCarouselCategory(photo) {
  if (!imageCarouselCategory || !photo) return;
  imageCarouselCategory.textContent = getVenuePhotoText(photo.categoryLabelKey);
}

function openVenuePhoto(index = 0) {
  const activePhotos = getActiveVenuePhotos();
  if (!activePhotos.length) return;
  activeVenuePhotoIndex = (index + activePhotos.length) % activePhotos.length;
  const photo = activePhotos[activeVenuePhotoIndex];
  openImageModal({
    src: photo.src,
    title: getVenuePhotoText(photo.titleKey, photo.title),
    description: getVenuePhotoText(
      photo.descriptionKey,
      getVenuePhotoText(photo.categoryLabelKey),
    ),
    link: photo.link,
    options: { carousel: true },
  });
  renderVenuePhotoTabs();
  updateImageCarouselCategory(photo);
  updateImageCarouselCount();
  scheduleVenuePhotoPreload(activePhotos, activeVenuePhotoIndex);
}

function moveVenuePhoto(delta) {
  if (activeVenuePhotoIndex < 0) return;
  openVenuePhoto(activeVenuePhotoIndex + delta);
}

function pickRandomPhotoIndex() {
  if (!venuePhotos.length) return -1;
  if (venuePhotos.length === 1) return 0;

  const availableIndexes = venuePhotos
    .map((_, index) => index)
    .filter((index) => index !== lastRandomPhotoIndex);
  return availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
}

function renderRandomPhotoStrip() {
  if (!randomPhotoStrip) return;

  randomPhotoStrip.innerHTML = "";
  restartRandomPhotoProgress();
  const photoIndex = pickRandomPhotoIndex();
  if (photoIndex < 0) return;
  lastRandomPhotoIndex = photoIndex;

  [photoIndex].forEach((photoIndex) => {
    const photo = venuePhotos[photoIndex];
    const button = document.createElement("button");
    button.className = "spotlight-photo-button";
    button.type = "button";
    button.setAttribute(
      "aria-label",
      getVenuePhotoText(photo.titleKey, photo.title),
    );

    const image = document.createElement("img");
    image.src = photo.thumbSrc;
    image.alt = getVenuePhotoText(photo.titleKey, photo.title);
    image.loading = "lazy";
    image.decoding = "async";
    image.onerror = () => {
      image.onerror = null;
      image.src = photo.originalSrc;
    };

    const label = document.createElement("span");
    label.className = "spotlight-photo-label";
    label.textContent = getVenuePhotoText(photo.categoryLabelKey);

    button.append(image, label);
    button.addEventListener("click", async () => {
      await window.AoiI18n?.ready;
      activeVenuePhotoCategory = "all";
      openVenuePhoto(photoIndex);
    });

    randomPhotoStrip.appendChild(button);
  });
}

function restartRandomPhotoProgress() {
  if (!randomPhotoProgress) return;

  randomPhotoProgress.classList.remove("is-running");
  void randomPhotoProgress.offsetWidth;
  randomPhotoProgress.classList.add("is-running");
}

function startRandomPhotoStrip() {
  if (!randomPhotoStrip) return;

  renderRandomPhotoStrip();
  window.clearInterval(randomPhotoTimer);
  randomPhotoTimer = window.setInterval(renderRandomPhotoStrip, 5000);
}

async function openFeaturedPostModal() {
  await window.AoiI18n?.ready;
  activeVenuePhotoIndex = -1;
  openImageModal(imageModalPresets.featuredPost);
}

function openImageModal(src, title, description, link, options = {}) {
  if (!imageModal || !imageModalContent) return;
  const spec =
    typeof src === "object"
      ? resolveImageModalSpec(src)
      : { src, title, description, link, options };
  if (!spec.src) return;
  const displaySrc = spec.src;
  resetImageModalGestures();
  imageModalContent.style.width = "";
  imageModalContent.style.height = "";
  imageModalImageStage?.style.removeProperty("width");
  imageModalImageStage?.style.removeProperty("height");
  updateBadgeHotspots(false);
  imageModal.classList.toggle("is-carousel", Boolean(spec.options.carousel));
  setImageCarouselControls(Boolean(spec.options.carousel));

  setModalText(imageModalTitle, spec.title);

  setModalText(imageModalText, spec.description, { allowLinks: true });

  if (imageModalLink) {
    if (spec.link) {
      imageModalLink.href = spec.link;
      imageModalLink.classList.remove("hidden");
      imageModalLink.classList.add("flex");
    } else {
      imageModalLink.classList.add("hidden");
      imageModalLink.classList.remove("flex");
    }
  }

  openModalElement(imageModal);
  imageModalContent.decoding = "async";
  imageModalContent.onload = () =>
    requestAnimationFrame(() => {
      setImageModalZoom(1);
      updateBadgeHotspots(isBadgeOverviewImage(displaySrc));
    });
  imageModalContent.onerror = () => {
    const originalSrc = getOriginalPhotoSrc(displaySrc);
    if (originalSrc !== displaySrc) {
      imageModalContent.onerror = null;
      imageModalContent.src = originalSrc;
    }
  };
  imageModalContent.src = displaySrc;
  if (imageModalContent.complete) {
    requestAnimationFrame(() => {
      setImageModalZoom(1);
      updateBadgeHotspots(isBadgeOverviewImage(displaySrc));
    });
  }
}

function closeImageModal() {
  if (!imageModal) return;
  resetImageModalGestures();
  activeVenuePhotoIndex = -1;
  imageModal.classList.remove("is-carousel");
  setImageCarouselControls(false);
  closeModalElement(imageModal);
  updateBadgeHotspots(false);
  setTimeout(() => {
    imageModalContent.src = "";
  }, 300); // Clear after transition
}

function openBadgeDetailModal(src, label) {
  if (!badgeDetailModal || !badgeDetailImage) return;
  badgeDetailImage.src = src;
  badgeDetailImage.alt = label;
  openModalElement(badgeDetailModal);
}

function closeBadgeDetailModal() {
  if (!badgeDetailModal || !badgeDetailImage) return;
  closeModalElement(badgeDetailModal);
  setTimeout(() => {
    if (!badgeDetailModal.classList.contains("is-open")) {
      badgeDetailImage.src = "";
    }
  }, 200);
}

function ensureBadgeHoverPreview() {
  if (badgeHoverPreview) return badgeHoverPreview;

  badgeHoverPreview = document.createElement("div");
  badgeHoverPreview.className = "badge-hover-preview";
  const img = document.createElement("img");
  img.alt = "";
  badgeHoverPreview.appendChild(img);
  document.body.appendChild(badgeHoverPreview);

  return badgeHoverPreview;
}

function showBadgeHoverPreview(src, label, event) {
  if (window.matchMedia("(hover: none)").matches) return;

  const preview = ensureBadgeHoverPreview();
  const img = preview.querySelector("img");
  if (!img) return;

  img.src = src;
  img.alt = label;
  preview.classList.add("is-visible");
  moveBadgeHoverPreview(event);
}

function moveBadgeHoverPreview(event) {
  if (!badgeHoverPreview?.classList.contains("is-visible")) return;

  const padding = 14;
  const offset = 18;
  const previewRect = badgeHoverPreview.getBoundingClientRect();
  const sourceRect = event?.target?.getBoundingClientRect?.();
  const anchorX =
    event?.clientX ?? (sourceRect ? sourceRect.right : window.innerWidth / 2);
  const anchorY =
    event?.clientY ?? (sourceRect ? sourceRect.top : window.innerHeight / 2);

  let left = anchorX + offset;
  let top = anchorY + offset;

  if (left + previewRect.width > window.innerWidth - padding) {
    left = anchorX - previewRect.width - offset;
  }

  if (top + previewRect.height > window.innerHeight - padding) {
    top = window.innerHeight - previewRect.height - padding;
  }

  badgeHoverPreview.style.left = `${Math.max(padding, left)}px`;
  badgeHoverPreview.style.top = `${Math.max(padding, top)}px`;
}

function hideBadgeHoverPreview() {
  badgeHoverPreview?.classList.remove("is-visible");
}

function isBadgeOverviewImage(src) {
  try {
    return new URL(src, window.location.href).pathname.endsWith(
      "/images/Badges.jfif",
    );
  } catch {
    return String(src).includes("images/Badges.jfif");
  }
}

function ensureBadgeOverlay() {
  if (imageModalBadgeOverlay || !imageModalImageStage)
    return imageModalBadgeOverlay;

  imageModalBadgeOverlay = document.createElement("div");
  imageModalBadgeOverlay.className = "badge-hotspot-overlay hidden";
  imageModalImageStage.appendChild(imageModalBadgeOverlay);

  badgeHotspots.forEach((hotspot, index) => {
    const button = document.createElement("button");
    button.className = "badge-hotspot";
    button.type = "button";
    button.setAttribute("aria-label", hotspot.label);
    button.dataset.index = String(index + 1);
    button.addEventListener("mouseenter", (event) =>
      showBadgeHoverPreview(hotspot.src, hotspot.label, event),
    );
    button.addEventListener("mousemove", moveBadgeHoverPreview);
    button.addEventListener("mouseleave", hideBadgeHoverPreview);
    button.addEventListener("focus", (event) =>
      showBadgeHoverPreview(hotspot.src, hotspot.label, event),
    );
    button.addEventListener("blur", hideBadgeHoverPreview);
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      hideBadgeHoverPreview();
      openBadgeDetailModal(hotspot.src, hotspot.label);
    });
    imageModalBadgeOverlay.appendChild(button);
  });

  return imageModalBadgeOverlay;
}

function updateBadgeHotspots(shouldShow) {
  const overlay = ensureBadgeOverlay();
  if (!overlay || !imageModalContent || !imageModalImageStage) return;

  overlay.classList.toggle("hidden", !shouldShow);
  if (!shouldShow) return;

  const imageWidth = imageModalContent.offsetWidth;
  const imageHeight = imageModalContent.offsetHeight;
  const stageWidth = imageModalImageStage.clientWidth;
  const stageHeight = imageModalImageStage.clientHeight;
  const imageLeft = Math.max(0, (stageWidth - imageWidth) / 2);
  const imageTop = Math.max(0, (stageHeight - imageHeight) / 2);

  overlay.style.left = `${imageLeft}px`;
  overlay.style.top = `${imageTop}px`;
  overlay.style.width = `${imageWidth}px`;
  overlay.style.height = `${imageHeight}px`;

  overlay.querySelectorAll(".badge-hotspot").forEach((button, index) => {
    const hotspot = badgeHotspots[index];
    button.style.left = `${(hotspot.x - hotspot.width / 2) * 100}%`;
    button.style.top = `${(hotspot.y - hotspot.height / 2) * 100}%`;
    button.style.width = `${hotspot.width * 100}%`;
    button.style.height = `${hotspot.height * 100}%`;
  });
}

function getImageModalTouchDistance() {
  const points = Array.from(imageModalTouchPointers.values());
  if (points.length < 2) return 0;

  return Math.hypot(
    points[0].clientX - points[1].clientX,
    points[0].clientY - points[1].clientY,
  );
}

function getImageModalTouchCenter() {
  const points = Array.from(imageModalTouchPointers.values());
  if (points.length < 2) return null;

  return {
    clientX: (points[0].clientX + points[1].clientX) / 2,
    clientY: (points[0].clientY + points[1].clientY) / 2,
  };
}

function stopImageModalPan() {
  isImageModalPanning = false;
  imageModalMedia?.classList.remove("is-dragging");
}

function resetImageModalGestures() {
  stopImageModalPan();
  isImageModalPinching = false;
  imageModalPinchStartDistance = 0;
  imageModalPinchStartZoom = imageModalZoom;
  imageModalTouchPointers.clear();
}

function setImageModalZoom(nextZoom, options = {}) {
  if (!imageModalContent || !imageModalMedia) return;

  const shouldPreserveFocalPoint = Boolean(options.focalPoint);
  const mediaRect = imageModalMedia.getBoundingClientRect();
  const focalOffsetX = shouldPreserveFocalPoint
    ? options.focalPoint.clientX - mediaRect.left
    : 0;
  const focalOffsetY = shouldPreserveFocalPoint
    ? options.focalPoint.clientY - mediaRect.top
    : 0;
  const focalRatioX =
    shouldPreserveFocalPoint && imageModalMedia.scrollWidth
      ? (imageModalMedia.scrollLeft + focalOffsetX) /
        imageModalMedia.scrollWidth
      : 0.5;
  const focalRatioY =
    shouldPreserveFocalPoint && imageModalMedia.scrollHeight
      ? (imageModalMedia.scrollTop + focalOffsetY) /
        imageModalMedia.scrollHeight
      : 0.5;

  imageModalZoom = Math.min(2.5, Math.max(0.75, nextZoom));
  const naturalWidth = imageModalContent.naturalWidth;
  const naturalHeight = imageModalContent.naturalHeight;

  if (naturalWidth && naturalHeight) {
    const fitScale = Math.min(
      imageModalMedia.clientWidth / naturalWidth,
      imageModalMedia.clientHeight / naturalHeight,
    );
    const imageWidth = Math.round(naturalWidth * fitScale * imageModalZoom);
    const imageHeight = Math.round(naturalHeight * fitScale * imageModalZoom);

    imageModalContent.style.width = `${imageWidth}px`;
    imageModalContent.style.height = `${imageHeight}px`;
    imageModalImageStage?.style.setProperty(
      "width",
      `${Math.max(imageWidth, imageModalMedia.clientWidth)}px`,
    );
    imageModalImageStage?.style.setProperty(
      "height",
      `${Math.max(imageHeight, imageModalMedia.clientHeight)}px`,
    );
    updateBadgeHotspots(
      Boolean(
        imageModalBadgeOverlay &&
        !imageModalBadgeOverlay.classList.contains("hidden"),
      ),
    );
  }

  const isMinZoom = imageModalZoom <= 0.75;
  const isMaxZoom = imageModalZoom >= 2.5;
  imageModalZoomOutButton?.toggleAttribute("disabled", isMinZoom);
  imageModalZoomInButton?.toggleAttribute("disabled", isMaxZoom);

  requestAnimationFrame(() => {
    if (shouldPreserveFocalPoint) {
      imageModalMedia.scrollLeft =
        imageModalMedia.scrollWidth * focalRatioX - focalOffsetX;
      imageModalMedia.scrollTop =
        imageModalMedia.scrollHeight * focalRatioY - focalOffsetY;
      return;
    }

    imageModalMedia.scrollLeft =
      (imageModalMedia.scrollWidth - imageModalMedia.clientWidth) / 2;
    imageModalMedia.scrollTop =
      (imageModalMedia.scrollHeight - imageModalMedia.clientHeight) / 2;
  });
}

pvOpenButton?.addEventListener("click", () => openPvModal(true));
pvNavOpenButton?.addEventListener("click", (e) => {
  e.preventDefault();
  openPvModal(true);
});
pvCloseButton?.addEventListener("click", closePvModal);
pvSoundToggle?.addEventListener("click", enablePvSound);
bgmToggleButtons.forEach((button) =>
  button.addEventListener("click", toggleBgm),
);
transportCloseButton?.addEventListener("click", closeTransportModal);
transportOpenButton?.addEventListener("click", openTransportModal);
calculatorTriggers.forEach((btn) =>
  btn.addEventListener("click", openCalculatorModal),
);
calculatorCloseButton?.addEventListener("click", closeCalculatorModal);
calculatorFrame?.addEventListener("load", syncCalculatorLanguage);
const speedDialPanels = [speedDialProductQuantity, speedDialProductPhoto];
function closeSpeedDial() {
  speedDialPanels.forEach((p) => p?.classList.remove("is-open"));
  speedDialButton?.setAttribute("aria-expanded", "false");
}
speedDialButton?.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = !speedDialProductQuantity?.classList.contains("is-open");
  speedDialPanels.forEach((p) => p?.classList.toggle("is-open", isOpen));
  speedDialButton.setAttribute("aria-expanded", String(isOpen));
});
document.addEventListener("click", (e) => {
  if (!e.target.closest("#speed-dial-container")) closeSpeedDial();
});
venuePhotoOpenButton?.addEventListener("click", () => {
  closeSpeedDial();
  activeVenuePhotoCategory = "all";
  openVenuePhoto(0);
});
speedDialProductQuantity?.addEventListener("click", () => {
  closeSpeedDial();
  openGoodsQuantityModal();
});
speedDialProductPhoto?.addEventListener("click", () => {
  closeSpeedDial();
  activeVenuePhotoCategory = "Merchs";
  openVenuePhoto(0);
});
featuredPostOpenButton?.addEventListener("click", openFeaturedPostModal);
imageCarouselPrevButton?.addEventListener("click", () => moveVenuePhoto(-1));
imageCarouselNextButton?.addEventListener("click", () => moveVenuePhoto(1));
window.addEventListener("aoi-language-change", () => {
  if (calculatorModal?.classList.contains("is-open")) {
    syncCalculatorLanguage();
  }
  if (imageModal?.classList.contains("is-open") && activeVenuePhotoIndex >= 0) {
    openVenuePhoto(activeVenuePhotoIndex);
  }
  renderRandomPhotoStrip();
});
closeModalOnBackdrop(transportModal, closeTransportModal);
closeModalOnBackdrop(calculatorModal, closeCalculatorModal);
goodsQuantityCloseButton?.addEventListener("click", closeGoodsQuantityModal);
goodsEditButton?.addEventListener("click", toggleGoodsEditMode);
goodsPwSubmit?.addEventListener("click", submitGoodsPassword);
goodsPwCancel?.addEventListener("click", hideGoodsPwRow);
goodsPwInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") submitGoodsPassword();
  if (e.key === "Escape") hideGoodsPwRow();
});
closeModalOnBackdrop(goodsQuantityModal, closeGoodsQuantityModal);
lightboxTriggers.forEach((img) => {
  const openLightbox = async () => {
    await window.AoiI18n?.ready;
    activeVenuePhotoIndex = -1;
    openImageModal(getLightboxModalSpec(img));
  };

  img.addEventListener("click", openLightbox);
  img.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openLightbox();
  });
});
imageModalCloseButton?.addEventListener("click", closeImageModal);
badgeDetailCloseButton?.addEventListener("click", closeBadgeDetailModal);
imageModalZoomInButton?.addEventListener("click", () =>
  setImageModalZoom(imageModalZoom + 0.25),
);
imageModalZoomOutButton?.addEventListener("click", () =>
  setImageModalZoom(imageModalZoom - 0.25),
);
imageModalZoomResetButton?.addEventListener("click", () =>
  setImageModalZoom(1),
);
imageModalMedia?.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();
    const zoomDelta = event.deltaY > 0 ? -0.15 : 0.15;
    setImageModalZoom(imageModalZoom + zoomDelta, {
      focalPoint: {
        clientX: event.clientX,
        clientY: event.clientY,
      },
    });
  },
  { passive: false },
);
imageModalMedia?.addEventListener("pointerdown", (event) => {
  if (
    event.button !== 0 ||
    event.target.closest(".image-modal-zoom-button") ||
    event.target.closest(".badge-hotspot")
  )
    return;

  if (event.pointerType === "touch") {
    imageModalTouchPointers.set(event.pointerId, {
      clientX: event.clientX,
      clientY: event.clientY,
    });
    imageModalMedia.setPointerCapture(event.pointerId);

    if (imageModalTouchPointers.size >= 2) {
      stopImageModalPan();
      isImageModalPinching = true;
      imageModalPinchStartDistance = getImageModalTouchDistance();
      imageModalPinchStartZoom = imageModalZoom;
      event.preventDefault();
      return;
    }
  }

  isImageModalPanning = true;
  imageModalPanStartX = event.clientX;
  imageModalPanStartY = event.clientY;
  imageModalPanScrollLeft = imageModalMedia.scrollLeft;
  imageModalPanScrollTop = imageModalMedia.scrollTop;
  imageModalMedia.classList.add("is-dragging");
  imageModalMedia.setPointerCapture(event.pointerId);
  event.preventDefault();
});
imageModalMedia?.addEventListener("pointermove", (event) => {
  if (
    event.pointerType === "touch" &&
    imageModalTouchPointers.has(event.pointerId)
  ) {
    imageModalTouchPointers.set(event.pointerId, {
      clientX: event.clientX,
      clientY: event.clientY,
    });

    if (isImageModalPinching) {
      const pinchDistance = getImageModalTouchDistance();
      const pinchCenter = getImageModalTouchCenter();
      if (imageModalPinchStartDistance && pinchCenter) {
        setImageModalZoom(
          imageModalPinchStartZoom *
            (pinchDistance / imageModalPinchStartDistance),
          { focalPoint: pinchCenter },
        );
      }
      event.preventDefault();
      return;
    }
  }

  if (!isImageModalPanning) return;

  imageModalMedia.scrollLeft =
    imageModalPanScrollLeft - (event.clientX - imageModalPanStartX);
  imageModalMedia.scrollTop =
    imageModalPanScrollTop - (event.clientY - imageModalPanStartY);
});
imageModalMedia?.addEventListener("pointerup", (event) => {
  if (event.pointerType === "touch") {
    imageModalTouchPointers.delete(event.pointerId);
    isImageModalPinching = imageModalTouchPointers.size >= 2;
  }
  stopImageModalPan();
  if (imageModalMedia.hasPointerCapture(event.pointerId)) {
    imageModalMedia.releasePointerCapture(event.pointerId);
  }
});
imageModalMedia?.addEventListener("pointercancel", (event) => {
  if (event.pointerType === "touch") {
    imageModalTouchPointers.delete(event.pointerId);
    isImageModalPinching = imageModalTouchPointers.size >= 2;
  }
  stopImageModalPan();
});
window.addEventListener("resize", () => {
  updateBadgeHotspots(
    Boolean(
      imageModalBadgeOverlay &&
      !imageModalBadgeOverlay.classList.contains("hidden"),
    ),
  );
});
closeModalOnBackdrop(imageModal, closeImageModal);
closeModalOnBackdrop(badgeDetailModal, closeBadgeDetailModal);
closeModalOnBackdrop(pvModal, closePvModal);

document.addEventListener("keydown", (event) => {
  if (imageModal?.classList.contains("is-open") && activeVenuePhotoIndex >= 0) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveVenuePhoto(-1);
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveVenuePhoto(1);
      return;
    }
  }

  if (event.key === "Escape") {
    if (badgeDetailModal?.classList.contains("is-open")) {
      closeBadgeDetailModal();
      return;
    }
    closePvModal();
    closeTransportModal();
    closeCalculatorModal();
    closeGoodsQuantityModal();
    closeImageModal();
  }
});

// Mobile Menu
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuCloseBtn = document.getElementById("mobile-menu-close");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

function openMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.add("is-open");
  setTimeout(() => {
    mobileMenu.classList.add("is-visible");
  }, 10);
  document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.remove("is-visible");
  setTimeout(() => {
    mobileMenu.classList.remove("is-open");
  }, 300);
  document.body.style.overflow = "";
}

mobileMenuBtn?.addEventListener("click", openMobileMenu);
mobileMenuCloseBtn?.addEventListener("click", closeMobileMenu);
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

// Scroll Spy for Navigation Links
const navLinks = document.querySelectorAll(
  ".desktop-nav-link, .mobile-nav-link",
);
const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.remove(
              "text-on-surface-variant",
              "hover:text-secondary",
            );
            link.classList.add("text-secondary", "hover:text-primary");
          } else {
            link.classList.remove("text-secondary", "hover:text-primary");
            link.classList.add(
              "text-on-surface-variant",
              "hover:text-secondary",
            );
          }
        });
      }
    });
  },
  { rootMargin: "-30% 0px -30% 0px" },
);

document
  .querySelectorAll("section[id]")
  .forEach((sec) => spyObserver.observe(sec));

// Easter Egg
const easterEggTriggers = document.querySelectorAll(".easter-egg-trigger");
const easterEggText = document.getElementById("easter-egg-text");

if (easterEggTriggers.length > 0 && easterEggText) {
  easterEggTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      if (
        easterEggText.style.opacity === "0" ||
        easterEggText.style.opacity === ""
      ) {
        easterEggText.style.opacity = "1";
      } else {
        easterEggText.style.opacity = "0";
      }
    });
  });
}

// Hibao Easter Egg
const calculatorTriggerImages = document.querySelectorAll(
  ".calculator-trigger-image",
);
if (calculatorTriggerImages.length > 0) {
  const hachuAudio = new Audio("audios/hachu.mp3");
  calculatorTriggerImages.forEach((img) => {
    img.style.cursor = "pointer";
    let resetTimeout;
    img.addEventListener("click", () => {
      img.src = "images/Assets/hachumao.png";
      hachuAudio.currentTime = 0;
      hachuAudio.play().catch((e) => console.log("Audio play failed:", e));

      clearTimeout(resetTimeout);
      resetTimeout = setTimeout(() => {
        img.src = "images/Assets/hibao.png";
      }, 1500);
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[data-inline-pv="true"]').forEach((player) => {
    player.src = withOrigin(player.dataset.src);
  });
  startRandomPhotoStrip();
  scheduleOriginalPhotoPreload();
  initAnnouncementTicker();
  window.setTimeout(() => openPvModal(false), 500);
});
