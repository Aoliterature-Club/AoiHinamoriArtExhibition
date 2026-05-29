const inventory = {
  auroraStand: {
    name: "極光色立牌",
    price: 500,
    detail: "",
    image: "images/Goods/極光色立牌.png",
    qty: 0,
  },
  acrylicArtBoard: {
    name: "雙層壓克力畫版",
    price: 800,
    detail: "",
    image: "images/Goods/雙層壓克力畫版.png",
    qty: 0,
  },
  signedBoardSet: {
    name: "豪華套裝親簽名板",
    price: 1700,
    detail: "每人限購一個",
    image: "images/Goods/豪華套裝親簽名板.png",
    qty: 0,
  },
  supportFan: {
    name: "透明應援扇子",
    price: 100,
    detail: "",
    image: "images/Goods/透明應援扇子.png",
    qty: 0,
  },
  acrylicKeychain: {
    name: "雙層壓克力鑰匙圈",
    price: 200,
    detail: "",
    image: "images/Goods/雙層壓克力鑰匙圈.png",
    qty: 0,
  },
  postcardSet: {
    name: "蝕光明信片套組 + PVC包裝",
    price: 300,
    detail: "",
    image: "images/Goods/明信片套組＋PVC包裝.png",
    qty: 0,
  },
  okraBlock: {
    name: "塊狀秋葵",
    price: 1500,
    detail: "",
    image: "images/Goods/塊狀秋葵.png",
    qty: 0,
  },
  diaryComic: {
    name: "Aoi's Diary 原創漫畫",
    price: 550,
    detail: "贈 A3 海報一張",
    image: "images/Goods/原創漫畫.png",
    qty: 0,
  },
  tcgSleeves: {
    name: "夏日風 TCG卡套（雙尺寸）",
    price: 600,
    detail: "每款 600 元，每組 64 張",
    image: "images/Goods/夏日風TCG卡套.png",
    qty: 0,
  },
  b5Binder: {
    name: "沁涼一夏 B5卡冊",
    price: 700,
    detail: "",
    image: "images/Goods/B5卡冊.png",
    qty: 0,
  },
  eyeMaskSet: {
    name: "AOI緞面眼罩套組",
    price: 700,
    detail: "",
    image: "images/Goods/眼罩套組.png",
    qty: 0,
  },
  deskMat: {
    name: "熱情夏日 萬用墊",
    price: 1000,
    detail: "尺寸：60 x 30cm",
    image: "images/Goods/萬用墊.png",
    qty: 0,
  },
  randomBadge: {
    name: "隨機徽章（共6款圖案）",
    price: 150,
    detail: "每款 150 元，尺寸：5.7cm",
    image: "images/Goods/隨機徽章.png",
    qty: 0,
  },
  plushLedBadge: {
    name: "患者絨毛徽章套 + LED發光徽章組",
    price: 600,
    detail: "內附電池",
    image: "images/Goods/徽章套＋發光徽章組.png",
    qty: 0,
  },
  aluminumPrint: {
    name: "（現場/預購）蝕光 鋁板畫",
    price: 3500,
    detail: "尺寸：A3 / 附精美包裝 / 現場只有 30 個",
    image: "images/Goods/鋁板畫.png",
    qty: 0,
  },
  laheeNecklace: {
    name: "（預購）LAHEE項鍊",
    price: 4000,
    detail: "項鍊附收納小袋、盒",
    image: "images/Goods/Pre-Order/LAHEE.png",
    qty: 0,
  },
  leatherTravelBag: {
    name: "（預購）手工皮革旅行袋",
    price: 35000,
    detail: "總量限量 5 個，每人限購一個",
    image: "images/Goods/Pre-Order/手工皮革旅行袋.png",
    qty: 0,
  },
  randomCardPack: {
    name: "（預購）AOI隨機卡片包",
    price: 150,
    detail: "每包 150 元，每包 4 張，共 50 款圖案",
    image: "images/Goods/Pre-Order/隨機卡片包.png",
    qty: 0,
  },
};

const inventoryTranslations = {
  en: {
    auroraStand: { name: "Aurora Color Acrylic Stand" },
    acrylicArtBoard: { name: "Double-layer Acrylic Art Board" },
    signedBoardSet: {
      name: "Deluxe Set with Signed Board",
      detail: "Limit one per person",
    },
    supportFan: { name: "Transparent Support Fan" },
    acrylicKeychain: { name: "Double-layer Acrylic Keychain" },
    postcardSet: { name: "Eclipse / Light Postcard Set + PVC Package" },
    okraBlock: { name: "Chunky Okra" },
    diaryComic: {
      name: "Aoi's Diary Original Comic",
      detail: "Includes one A3 poster",
    },
    tcgSleeves: {
      name: "Summer-style TCG Sleeves (Two Sizes)",
      detail: "NT$600 each style, 64 sleeves per set",
    },
    b5Binder: { name: "Cool Summer B5 Card Binder" },
    eyeMaskSet: { name: "AOI Satin Eye Mask Set" },
    deskMat: { name: "Passionate Summer Desk Mat", detail: "Size: 60 x 30cm" },
    randomBadge: {
      name: "Random Badge (6 Designs)",
      detail: "NT$150 each, size: 5.7cm",
    },
    plushLedBadge: {
      name: "Patient Plush Badge Cover + LED Light-up Badge Set",
      detail: "Battery included",
    },
    aluminumPrint: {
      name: "(On-site / Pre-order) Eclipse / Light Aluminum Print",
      detail: "Size: A3 / Premium packaging included / Only 30 available on-site",
    },
    laheeNecklace: {
      name: "(Pre-order) LAHEE Necklace",
      detail: "Includes storage pouch and box",
    },
    leatherTravelBag: {
      name: "(Pre-order) Handmade Leather Travel Bag",
      detail: "Limited to 5 total, limit one per person",
    },
    randomCardPack: {
      name: "(Pre-order) AOI Random Card Pack",
      detail: "NT$150 per pack, 4 cards per pack, 50 designs total",
    },
  },
  ja: {
    auroraStand: { name: "オーロラカラー アクリルスタンド" },
    acrylicArtBoard: { name: "二層アクリルアートボード" },
    signedBoardSet: {
      name: "豪華セット 直筆サインボード付き",
      detail: "お一人様1点まで",
    },
    supportFan: { name: "透明応援うちわ" },
    acrylicKeychain: { name: "二層アクリルキーホルダー" },
    postcardSet: { name: "蝕 / 光 ポストカードセット + PVC包装" },
    okraBlock: { name: "ブロック状オクラ" },
    diaryComic: {
      name: "Aoi's Diary オリジナル漫画",
      detail: "A3ポスター1枚付き",
    },
    tcgSleeves: {
      name: "夏風 TCGカードスリーブ（二サイズ）",
      detail: "各種 NT$600、1セット64枚",
    },
    b5Binder: { name: "涼しい夏 B5カードバインダー" },
    eyeMaskSet: { name: "AOI サテンアイマスクセット" },
    deskMat: { name: "情熱の夏 マルチマット", detail: "サイズ：60 x 30cm" },
    randomBadge: {
      name: "ランダム缶バッジ（全6種）",
      detail: "各 NT$150、サイズ：5.7cm",
    },
    plushLedBadge: {
      name: "患者ぬいぐるみ缶バッジカバー + LED発光缶バッジセット",
      detail: "電池付き",
    },
    aluminumPrint: {
      name: "（会場 / 予約）蝕 / 光 アルミプレート",
      detail: "サイズ：A3 / 豪華包装付き / 会場販売は30点のみ",
    },
    laheeNecklace: {
      name: "（予約）LAHEE ネックレス",
      detail: "収納ポーチとボックス付き",
    },
    leatherTravelBag: {
      name: "（予約）手作りレザー旅行バッグ",
      detail: "総数5点限定、お一人様1点まで",
    },
    randomCardPack: {
      name: "（予約）AOI ランダムカードパック",
      detail: "1パック NT$150、1パック4枚入り、全50種",
    },
  },
};

function getCurrentLanguage() {
  return window.AoiI18n?.currentLanguage || "zh-Hant";
}

function t(key) {
  return window.AoiI18n?.t(key) || key;
}

function applyInventoryTranslations() {
  const translations = inventoryTranslations[getCurrentLanguage()];
  if (!translations) return;

  Object.entries(translations).forEach(([id, values]) => {
    if (!inventory[id]) return;
    inventory[id].name = values.name || inventory[id].name;
    inventory[id].detail = values.detail ?? inventory[id].detail;
  });
}

function formatPrice(value) {
  return value.toLocaleString("zh-TW");
}

function renderGoodsList() {
  const goodsList = document.getElementById("goods-list");
  if (!goodsList) return;

  goodsList.innerHTML = Object.entries(inventory)
    .map(
      ([id, item]) => `
        <article class="goods-card glass-panel p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6 group transition-all duration-300 gothic-glow" data-id="${id}">
            <div class="flex items-center gap-4 md:gap-6 min-w-0 w-full lg:flex-1">
                <div class="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-24 lg:h-32 overflow-hidden rounded bg-surface-container flex-shrink-0">
                    <img class="w-full h-full object-contain transition-all duration-700" alt="${item.name}" src="${item.image}" />
                </div>
                <div class="min-w-0 flex-1">
                    <h2 class="font-title-md text-title-md text-secondary leading-snug break-words">${item.name}</h2>
                    ${item.detail ? `<p class="block text-label-sm font-label-sm text-on-surface-variant mt-2 mb-2 leading-relaxed opacity-90">${item.detail}</p>` : ""}
                    <span class="text-on-surface-variant font-label-sm">NT$ ${formatPrice(item.price)}</span>
                </div>
            </div>
            <div class="qty-control flex items-center justify-between lg:justify-center gap-2 lg:gap-4 bg-surface-container-high rounded-full lg:rounded-lg p-1 lg:p-2 border border-outline-variant/30 flex-shrink-0 w-full lg:w-40">
                <button class="stepper-btn material-symbols-outlined text-on-surface-variant disabled:opacity-30 disabled:grayscale hover:text-primary w-11 h-11 flex items-center justify-center" type="button" data-id="${id}" data-delta="-1" disabled>remove</button>
                <span class="qty-display font-label-sm w-6 text-center" id="qty-${id}">0</span>
                <button class="stepper-btn material-symbols-outlined text-secondary hover:text-primary w-11 h-11 flex items-center justify-center" type="button" data-id="${id}" data-delta="1">add</button>
            </div>
        </article>
    `,
    )
    .join("");

  goodsList.querySelectorAll("[data-delta]").forEach((button) => {
    button.addEventListener("click", () => {
      updateQty(button.dataset.id, Number(button.dataset.delta));
    });
  });
}

function updateQty(id, delta) {
  const item = inventory[id];
  if (!item) return;

  item.qty = Math.max(0, item.qty + delta);

  const display = document.getElementById(`qty-${id}`);
  if (display) {
    display.innerText = item.qty;
  }

  const row = document.querySelector(`[data-id="${id}"]`);
  const minusButton = row?.querySelector('[data-delta="-1"]');
  if (minusButton) {
    minusButton.disabled = item.qty === 0;
  }

  calculateTotal();
}

function calculateTotal() {
  let total = 0;
  const breakdownEl = document.getElementById("breakdown");

  if (breakdownEl) {
    breakdownEl.innerHTML = "";
  }

  let hasItems = false;

  Object.values(inventory).forEach((item) => {
    if (item.qty <= 0) return;

    hasItems = true;
    total += item.price * item.qty;

    if (breakdownEl) {
      const row = document.createElement("div");
      row.className =
        "flex justify-between items-center gap-4 animate-in fade-in slide-in-from-left duration-300";
      row.innerHTML = `
                <span class="text-on-surface-variant font-body-md">${item.name} <span class="text-secondary font-label-sm ml-2">x${item.qty}</span></span>
                <span class="text-on-surface font-label-sm whitespace-nowrap">NT$ ${formatPrice(item.price * item.qty)}</span>
            `;
      breakdownEl.appendChild(row);
    }
  });

  if (breakdownEl && !hasItems) {
    breakdownEl.innerHTML =
      `<p class="text-on-surface-variant font-body-md text-center py-4 opacity-50 italic">${t("calculator.empty")}</p>`;
  }

  document.querySelectorAll(".total-amount").forEach((totalEl) => {
    const currentTotal = parseInt(totalEl.innerText.replace(/,/g, ""), 10) || 0;
    animateValue(totalEl, currentTotal, total, 400);
  });
}

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const val = Math.floor(progress * (end - start) + start);
    obj.innerText = formatPrice(val);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

function resetCalculator() {
  Object.keys(inventory).forEach((key) => {
    inventory[key].qty = 0;
    const display = document.getElementById(`qty-${key}`);
    if (display) {
      display.innerText = "0";
    }

    const row = document.querySelector(`[data-id="${key}"]`);
    const minusButton = row?.querySelector('[data-delta="-1"]');
    if (minusButton) {
      minusButton.disabled = true;
    }
  });

  calculateTotal();
}

function getSelectedItems() {
  return Object.values(inventory)
    .filter((item) => item.qty > 0)
    .map((item) => ({
      name: item.name,
      qty: item.qty,
      price: item.price,
      subtotal: item.price * item.qty,
      image: item.image,
    }));
}

function getSelectedTotal(items) {
  return items.reduce((sum, item) => sum + item.subtotal, 0);
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
  const chars = Array.from(text);
  let line = "";
  let currentY = y;

  chars.forEach((char) => {
    const testLine = line + char;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, currentY);
      line = char;
      currentY += lineHeight;
      return;
    }
    line = testLine;
  });

  if (line) {
    ctx.fillText(line, x, currentY);
  }

  return currentY + lineHeight;
}

function getWrappedLineCount(ctx, text, maxWidth) {
  const chars = Array.from(text);
  let line = "";
  let lines = 1;

  chars.forEach((char) => {
    const testLine = line + char;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      lines += 1;
      line = char;
      return;
    }
    line = testLine;
  });

  return lines;
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => {
      console.warn(`無法載入圖片: ${src}`);
      resolve(null); // 載入失敗時回傳 null，避免整個輸出壞掉
    };
    img.src = src;
  });
}

async function exportSummaryImage() {
  const items = getSelectedItems();
  if (!items.length) {
    window.alert(
      getCurrentLanguage() === "ja"
        ? "画像を出力する前に、商品を少なくとも1点選択してください。"
        : getCurrentLanguage() === "en"
          ? "Please select at least one item before exporting an image."
          : "請先選擇至少一項商品，再輸出圖片。",
    );
    return;
  }

  const loadedImages = await Promise.all(
    items.map((item) => loadImage(item.image)),
  );

  const total = getSelectedTotal(items);
  const width = 1080;
  const rowHeight = 72;

  const imgSize = 56;
  const textOffset = imgSize + 20;
  const maxTextWidth = 520 - textOffset;

  const measureCanvas = document.createElement("canvas");
  const measureCtx = measureCanvas.getContext("2d");
  measureCtx.font = "700 25px 'Hanken Grotesk', 'Noto Sans TC', sans-serif";

  // 1. 預先計算每一列的文字行數，以便後續作垂直置中對齊
  const lineCounts = items.map((item) =>
    getWrappedLineCount(measureCtx, item.name, maxTextWidth),
  );
  const rowHeights = lineCounts.map((lineCount) =>
    Math.max(rowHeight, lineCount * 30 + 24),
  );

  const listHeight = rowHeights.reduce(
    (sum, heightValue) => sum + heightValue,
    0,
  );
  const height = Math.max(760, 292 + listHeight + 260);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const padding = 75;
  ctx.fillStyle = "#080808";
  ctx.fillRect(0, 0, width, height);

  const gradient = ctx.createRadialGradient(
    width * 0.55,
    0,
    80,
    width * 0.55,
    0,
    height,
  );
  gradient.addColorStop(0, "rgba(90, 18, 30, 0.55)");
  gradient.addColorStop(0.5, "rgba(18, 12, 14, 0.96)");
  gradient.addColorStop(1, "rgba(8, 8, 8, 1)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  drawRoundedRect(ctx, 36, 36, width - 72, height - 72, 18);
  ctx.fillStyle = "rgba(20, 20, 20, 0.82)";
  ctx.fill();
  ctx.strokeStyle = "rgba(233, 195, 73, 0.55)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#d9002a";
  ctx.fillRect(padding, 86, 4, 88);

  ctx.fillStyle = "#e9c349";
  ctx.font = "700 22px 'JetBrains Mono', monospace";
  ctx.letterSpacing = "4px";
  ctx.fillText("GOODS CALCULATOR", padding + 28, 110);

  ctx.fillStyle = "#f4eeee";
  ctx.font = "700 54px 'Bodoni Moda', 'Noto Serif TC', serif";
  ctx.fillText(t("calculator.title"), padding + 28, 166);

  ctx.fillStyle = "#e6bdb9";
  ctx.font = "600 24px 'Hanken Grotesk', 'Noto Sans TC', sans-serif";
  ctx.fillText("Aoi Hinamori Art Exhibition", padding + 28, 212);

  let y = 292;
  ctx.strokeStyle = "rgba(233, 195, 73, 0.28)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, y - 34);
  ctx.lineTo(width - padding, y - 34);
  ctx.stroke();

  items.forEach((item, index) => {
    const currentLineCount = lineCounts[index];
    const textHeight = currentLineCount * 30;
    const rowCenterY = y - 34 + rowHeights[index] / 2;

    const imgY = rowCenterY - imgSize / 2;
    const img = loadedImages[index];

    if (img) {
      ctx.save();
      drawRoundedRect(ctx, padding, imgY, imgSize, imgSize, 6);
      ctx.clip();

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(padding, imgY, imgSize, imgSize);

      const scale = Math.min(imgSize / img.width, imgSize / img.height);
      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;

      const drawX = padding + (imgSize - drawWidth) / 2;
      const drawImgY = imgY + (imgSize - drawHeight) / 2;

      ctx.drawImage(img, drawX, drawImgY, drawWidth, drawHeight);
      ctx.restore();
    } else {
      ctx.strokeStyle = "rgba(233, 195, 73, 0.3)";
      ctx.strokeRect(padding, imgY, imgSize, imgSize);
    }

    ctx.fillStyle = "#e6bdb9";
    ctx.font = "700 25px 'Hanken Grotesk', 'Noto Sans TC', sans-serif";

    const textStartY = rowCenterY - textHeight / 2 + 23;
    drawWrappedText(
      ctx,
      item.name,
      padding + textOffset,
      textStartY,
      maxTextWidth,
      30,
    );

    const singleLineY = rowCenterY + 8;

    ctx.fillStyle = "#e9c349";
    ctx.font = "700 22px 'JetBrains Mono', monospace";
    ctx.fillText(`x${item.qty}`, 660, singleLineY);

    ctx.fillStyle = "#f4eeee";
    ctx.textAlign = "left";
    ctx.fillText("NT$ ", width - padding - 160, singleLineY);
    ctx.textAlign = "right";
    ctx.fillText(formatPrice(item.subtotal), width - padding, singleLineY);
    ctx.textAlign = "left";

    y += rowHeights[index];
  });

  ctx.beginPath();
  ctx.moveTo(padding, y + 8);
  ctx.lineTo(width - padding, y + 8);
  ctx.strokeStyle = "rgba(233, 195, 73, 0.35)";
  ctx.stroke();

  y += 88;
  ctx.fillStyle = "#e6bdb9";
  ctx.font = "700 24px 'JetBrains Mono', monospace";
  ctx.fillText(t("calculator.total").toUpperCase(), padding, y);

  ctx.fillStyle = "#e9c349";
  ctx.font = "700 30px 'JetBrains Mono', monospace";
  ctx.fillText("NT$ ", width - padding - 400, y);

  ctx.fillStyle = "#d9002a";
  ctx.font = "800 68px 'Bodoni Moda', serif";
  ctx.textAlign = "right";
  ctx.fillText(formatPrice(total), width - padding, y + 8);
  ctx.textAlign = "left";

  ctx.fillStyle = "rgba(230, 189, 185, 0.72)";
  ctx.font = "500 18px 'Hanken Grotesk', 'Noto Sans TC', sans-serif";
  ctx.fillText(
    "From: https://aoliterature-club.github.io/AoiHinamoriArtExhibition/",
    padding,
    height - 100,
  );

  ctx.fillStyle = "rgba(230, 189, 185, 0.72)";
  ctx.font = "500 18px 'Hanken Grotesk', 'Noto Sans TC', sans-serif";
  ctx.fillText("Exporter made by KalinKonta", padding, height - 73);

  if (window.AoiI18n?.isTranslated) {
    ctx.fillText(t("translation.notice"), padding, height - 46);
  }

  const link = document.createElement("a");
  link.download = `aoi-hinamori-art-exhibition-goods-${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

document.addEventListener("DOMContentLoaded", async () => {
  await window.AoiI18n?.ready;
  applyInventoryTranslations();
  renderGoodsList();
  document.querySelectorAll(".calculator-reset").forEach((button) => {
    button.addEventListener("click", resetCalculator);
  });
  document.querySelectorAll(".calculator-export").forEach((button) => {
    button.addEventListener("click", exportSummaryImage);
  });
  calculateTotal();
});
