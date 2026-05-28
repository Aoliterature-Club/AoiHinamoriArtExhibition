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
    detail: "600 元 / 款，64 張 / 組",
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
    detail: "150 元 / 款，尺寸：5.7cm",
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
    detail: "限量 5 個，每人限購一個",
    image: "images/Goods/Pre-Order/手工皮革旅行袋.png",
    qty: 0,
  },
  randomCardPack: {
    name: "（預購）AOI隨機卡片包",
    price: 150,
    detail: "150 元 / 包，4 張 / 包，共 50 款圖案",
    image: "images/Goods/Pre-Order/隨機卡片包.png",
    qty: 0,
  },
};

function formatPrice(value) {
  return value.toLocaleString("zh-TW");
}

function renderGoodsList() {
  const goodsList = document.getElementById("goods-list");
  if (!goodsList) return;

  goodsList.innerHTML = Object.entries(inventory)
    .map(
      ([id, item]) => `
        <article class="goods-card glass-panel p-4 flex items-center justify-between gap-4 group transition-all duration-300 gothic-glow" data-id="${id}">
            <div class="flex items-center gap-4 md:gap-6 min-w-0">
                <div class="relative w-20 h-20 md:w-24 md:h-32 overflow-hidden rounded bg-surface-container flex-shrink-0">
                    <img class="w-full h-full object-contain transition-all duration-700" alt="${item.name}" src="${item.image}" />
                </div>
                <div class="min-w-0">
                    <h2 class="font-title-md text-title-md text-secondary leading-snug">${item.name}</h2>
                    ${item.detail ? `<p class="hidden sm:block text-label-sm font-label-sm text-on-surface-variant mt-2 mb-2 leading-relaxed opacity-90">${item.detail}</p>` : ""}
                    <span class="text-on-surface-variant font-label-sm">NT$ ${formatPrice(item.price)}</span>
                </div>
            </div>
            <div class="qty-control flex items-center gap-2 md:gap-4 bg-surface-container-high rounded-full md:rounded-lg p-1 md:p-2 border border-outline-variant/30 flex-shrink-0">
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
      '<p class="text-on-surface-variant font-body-md text-center py-4 opacity-50 italic">選擇任一商品開始計算...</p>';
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

document.addEventListener("DOMContentLoaded", () => {
  renderGoodsList();
  document.querySelectorAll(".calculator-reset").forEach((button) => {
    button.addEventListener("click", resetCalculator);
  });
  calculateTotal();
});
