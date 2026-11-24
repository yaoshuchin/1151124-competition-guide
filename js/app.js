// 科技教育創意實作競賽【資訊科技組】 核心互動邏輯與演算法測試引擎

// 密碼安全設定 (nato)
const SITE_PASS = 'nato';
const AUTH_KEY = 'competition_auth_nato';

// 演算法解題庫 (100% 邏輯覆蓋，支援所有官方範例測資)
const SOLVERS = {
  'sum-sequence': function(input) {
    const tokens = input.trim().split(/\s+/).map(Number);
    if (tokens.length === 0 || isNaN(tokens[0])) return '0';
    const n = tokens[0];
    let sum = 0;
    for (let i = 1; i <= n && i < tokens.length; i++) {
      sum += tokens[i];
    }
    return sum.toString();
  },

  'convenience-store': function(input) {
    const tokens = input.trim().split(/\s+/).map(Number);
    if (tokens.length < 2) return '輸入格式不正確';
    const n = tokens[0];
    let total = 0;
    for (let i = 1; i <= n; i++) {
      total += tokens[i];
    }
    const payment = tokens[n + 1];
    if (payment >= total) {
      return (payment - total).toString();
    } else {
      return '付款金額不足';
    }
  },

  'even-sum': function(input) {
    const tokens = input.trim().split(/\s+/).map(Number);
    if (tokens.length < 2) return '0';
    const a = Math.min(tokens[0], tokens[1]);
    const b = Math.max(tokens[0], tokens[1]);
    let sum = 0;
    for (let i = a; i <= b; i++) {
      if (i % 2 === 0) sum += i;
    }
    return sum.toString();
  },

  'triangle': function(input) {
    const tokens = input.trim().split(/\s+/).map(Number).filter(n => !isNaN(n));
    if (tokens.length < 3) return 'no';
    const edges = tokens.slice(0, 3).sort((a, b) => a - b);
    if (edges[0] + edges[1] > edges[2]) {
      return 'yes';
    } else {
      return 'no';
    }
  },

  'scratch-card': function(input) {
    const digits = (input.match(/\d/g) || []).map(Number).slice(0, 3);
    const count6 = digits.filter(d => d === 6).length;
    if (count6 === 3) return '1000';
    if (count6 === 2) return '300';
    if (count6 === 1) return '100';
    return '0';
  },

  'amusement-park': function(input) {
    const tokens = input.trim().split(/\s+/).map(Number);
    if (tokens.length < 2) return '0';
    const c = tokens[0]; // 兒童
    const a = tokens[1]; // 成人
    const pairs = Math.min(c, a);
    const totalCost = (pairs * 800) + ((c - pairs) * 400) + ((a - pairs) * 500);
    return totalCost.toString();
  },

  'singing-contest': function(input) {
    const tokens = input.trim().split(/\s+/).map(Number);
    let scores = [];
    if (tokens.length >= 6 && tokens[0] === 5) {
      scores = tokens.slice(1, 6);
    } else {
      scores = tokens.slice(0, 5);
    }
    if (scores.length < 5) return '0';
    scores.sort((a, b) => a - b);
    const trimmed = scores.slice(1, 4);
    const avg = Math.floor((trimmed[0] + trimmed[1] + trimmed[2]) / 3);
    return avg.toString();
  },

  'prime-sum': function(input) {
    const tokens = input.trim().split(/\s+/).map(Number);
    if (tokens.length < 2) return '0';
    const a = Math.min(tokens[0], tokens[1]);
    const b = Math.max(tokens[0], tokens[1]);

    function isPrime(num) {
      if (num < 2) return false;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
      }
      return true;
    }

    let sum = 0;
    for (let x = a; x <= b; x++) {
      if (isPrime(x)) sum += x;
    }
    return sum.toString();
  },

  'disaster-drill': function(input) {
    const tokens = input.trim().split(/\s+/).map(Number);
    if (tokens.length < 3) return '0';
    const p = tokens[0]; // 運輸人數
    const m = tokens[1]; // 臨時屋數量
    const caps = tokens.slice(2, 2 + m);

    // 關鍵邊界：0人時直接開放 0 間
    if (p === 0) return '0';

    let current = 0;
    let opened = 0;
    for (let i = 0; i < caps.length; i++) {
      current += caps[i];
      opened++;
      if (current >= p) break;
    }
    return opened.toString();
  },

  'cinema-seats': function(input) {
    const tokens = input.trim().split(/\s+/).map(Number);
    if (tokens.length < 3) return '0';
    const k = tokens[0]; // 連續座位需求人數
    const s = tokens[1]; // 空位段數
    const lengths = tokens.slice(2, 2 + s);

    let totalWays = 0;
    for (let i = 0; i < lengths.length; i++) {
      const len = lengths[i];
      if (len >= k) {
        totalWays += (len - k + 1);
      }
    }
    return totalWays.toString();
  },

  'monopoly': function(input) {
    const tokens = input.trim().split(/\s+/).map(Number);
    if (tokens.length < 4) return '0';
    const n = tokens[0]; // 棋盤格數
    const board = tokens.slice(1, 1 + n);
    const m = tokens[1 + n]; // 骰子次數
    const steps = tokens.slice(2 + n, 2 + n + m);

    let pos = 1; // 1-based 起始格
    let money = 0;

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      pos = ((pos - 1 + step) % n) + 1;
      money += board[pos - 1];
      if (money < 0) {
        money = 0;
      }
    }
    return money.toString();
  }
};

// 狀態管理
const STATE = {
  currentTab: 'guide', // 'guide' | 'basic' | 'classic' | 'advanced' | 'batch'
  theme: localStorage.getItem('competition_theme') || 'dark', // 'light' | 'dark' | 'green' | 'blue'
  fontSize: localStorage.getItem('competition_font') || 'medium', // 'medium' | 'large' | 'xlarge'
  searchQuery: '',
  progress: JSON.parse(localStorage.getItem('competition_progress') || '{}'),
  lightboxIndex: 0,
  allGalleryImages: []
};

// 頁面初始化
document.addEventListener('DOMContentLoaded', () => {
  checkAuthGate();
  applyTheme(STATE.theme);
  applyFontSize(STATE.fontSize);
  renderAllTabs();
  updateProgressUI();
  initEventListeners();
  collectGalleryImages();

  // 讀取 URL Hash 切換分頁
  const hash = window.location.hash.replace('#', '');
  if (['guide', 'basic', 'classic', 'advanced', 'batch'].includes(hash)) {
    switchTab(hash);
  } else {
    switchTab('guide');
  }
});

// ===== 1. 密碼驗證控制 (Password Gate nato) =====
function checkAuthGate() {
  const isAuth = localStorage.getItem(AUTH_KEY) === 'true';
  const gateEl = document.getElementById('passwordGate');
  if (gateEl) {
    if (isAuth) {
      gateEl.style.display = 'none';
    } else {
      gateEl.style.display = 'flex';
      const input = document.getElementById('gatePasswordInput');
      if (input) setTimeout(() => input.focus(), 150);
    }
  }
}

function handleUnlock(event) {
  event.preventDefault();
  const input = document.getElementById('gatePasswordInput');
  const errorMsg = document.getElementById('gateErrorMsg');
  if (!input) return;

  const val = input.value.trim().toLowerCase();
  if (val === SITE_PASS.toLowerCase()) {
    localStorage.setItem(AUTH_KEY, 'true');
    const gateEl = document.getElementById('passwordGate');
    if (gateEl) {
      gateEl.style.transition = 'opacity 0.3s ease';
      gateEl.style.opacity = '0';
      setTimeout(() => {
        gateEl.style.display = 'none';
        gateEl.style.opacity = '1';
      }, 300);
    }
    showToast('🎉 通行密碼驗證成功，歡迎進入競賽平台！');
  } else {
    if (errorMsg) errorMsg.classList.remove('hidden');
    input.classList.add('border-rose-500', 'animate-shake');
    setTimeout(() => input.classList.remove('animate-shake'), 400);
    input.value = '';
    input.focus();
  }
}

function lockSite() {
  localStorage.removeItem(AUTH_KEY);
  const gateEl = document.getElementById('passwordGate');
  const errorMsg = document.getElementById('gateErrorMsg');
  const input = document.getElementById('gatePasswordInput');
  if (errorMsg) errorMsg.classList.add('hidden');
  if (input) input.value = '';
  if (gateEl) {
    gateEl.style.display = 'flex';
    gateEl.style.opacity = '1';
  }
  showToast('🔒 平台已鎖定');
}

// ===== 2. 四色布景切換 (淺、深、綠、藍) =====
function setTheme(theme) {
  STATE.theme = theme;
  localStorage.setItem('competition_theme', theme);
  applyTheme(theme);
  showToast(`已切換至「${getThemeName(theme)}」布景`);
}

function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  // 更新按鈕高亮
  document.querySelectorAll('.theme-btn').forEach(btn => {
    if (btn.dataset.theme === theme) {
      btn.classList.add('ring-2', 'ring-white', 'scale-105', 'font-bold');
    } else {
      btn.classList.remove('ring-2', 'ring-white', 'scale-105', 'font-bold');
    }
  });
}

function getThemeName(theme) {
  switch (theme) {
    case 'light': return '淺色明亮';
    case 'dark': return '深色極客';
    case 'green': return '清新茶綠';
    case 'blue': return '深邃海洋';
    default: return theme;
  }
}

// ===== 3. 字型中、大、特大切換 =====
function setFontSize(size) {
  STATE.fontSize = size;
  localStorage.setItem('competition_font', size);
  applyFontSize(size);
  showToast(`字型已調整為「${size === 'medium' ? '中' : size === 'large' ? '大' : '特大'}」`);
}

function applyFontSize(size) {
  document.documentElement.setAttribute('data-font', size);
  // 更新字型按鈕狀態
  document.querySelectorAll('.font-btn').forEach(btn => {
    if (btn.dataset.font === size) {
      btn.classList.add('bg-indigo-600', 'text-white', 'font-bold');
      btn.classList.remove('text-slate-300', 'hover:bg-slate-750');
    } else {
      btn.classList.remove('bg-indigo-600', 'text-white', 'font-bold');
      btn.classList.add('text-slate-300', 'hover:bg-slate-750');
    }
  });
}

// ===== 4. 分頁標籤切換 (Tabs) =====
function switchTab(tabId) {
  STATE.currentTab = tabId;
  window.location.hash = tabId;

  // 更新所有分頁內容的顯隱
  const tabPanels = ['tab-panel-guide', 'tab-panel-basic', 'tab-panel-classic', 'tab-panel-advanced', 'tab-panel-batch'];
  tabPanels.forEach(pId => {
    const el = document.getElementById(pId);
    if (el) {
      if (pId === `tab-panel-${tabId}`) {
        el.classList.remove('hidden');
        el.classList.add('animate-fadeIn');
      } else {
        el.classList.add('hidden');
      }
    }
  });

  // 更新分頁按鈕樣式
  document.querySelectorAll('.tab-btn').forEach(btn => {
    if (btn.dataset.tab === tabId) {
      btn.classList.add('active', 'bg-indigo-600', 'text-white', 'shadow-lg');
      btn.classList.remove('text-slate-300', 'hover:bg-slate-800');
    } else {
      btn.classList.remove('active', 'bg-indigo-600', 'text-white', 'shadow-lg');
      btn.classList.add('text-slate-300', 'hover:bg-slate-800');
    }
  });

  // 若切換到批次測試頁面，自動執行一次批次全測
  if (tabId === 'batch') {
    runBatchSuiteInline();
  }

  // 平滑滾動至主體內容區
  const mainTabContent = document.getElementById('main-tab-content');
  if (mainTabContent && window.scrollY > 280) {
    mainTabContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// 渲染全部題目卡片至各自的分頁容器
function renderAllTabs() {
  renderPlatformGuide();
  renderProblemListForCategory('basic', 'container-basic');
  renderProblemListForCategory('classic', 'container-classic');
  renderProblemListForCategory('advanced', 'container-advanced');
}

// 渲染單元 0：平台規範
function renderPlatformGuide() {
  const guideEl = document.getElementById('platform-guide-content');
  if (!guideEl) return;

  const guide = COMPETITION_DATA.platformGuide;
  let html = `
    <!-- 競賽大綱分析卡片 -->
    <div class="p-6 rounded-3xl theme-card border shadow-xl mb-8 space-y-4">
      <div class="flex items-center gap-3 text-cyan-400 font-bold text-lg">
        <i class="fa-solid fa-chalkboard-user text-xl"></i>
        <h3>競賽實作教材與平台架構深度分析</h3>
      </div>
      <p class="text-sm theme-text-sub leading-relaxed">
        本研習教材專為<strong>教育部科技教育創意實作競賽【資訊科技組】</strong>選手設計。核心重點在於掌握評測系統之「輸入」與「輸出」通訊標準，
        並在 Scratch 與 Blockly 中熟練運用迴圈累加、條件判斷、清單（陣列）、數學餘數定理與字串轉型技巧。
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div class="p-4 rounded-2xl theme-card-sub border">
          <div class="font-bold text-amber-400 text-sm mb-1"><i class="fa-solid fa-flag-checkered mr-1"></i> 1. 事件驅動規範</div>
          <p class="text-xs theme-text-sub leading-normal">Scratch 必須掛在綠旗或函式下；Blockly 則在工作區直接執行，變數需妥善初始化。</p>
        </div>
        <div class="p-4 rounded-2xl theme-card-sub border">
          <div class="font-bold text-cyan-400 text-sm mb-1"><i class="fa-solid fa-right-left mr-1"></i> 2. 標準 I/O 機制</div>
          <p class="text-xs theme-text-sub leading-normal">輸入使用詢問/讀取積木；輸出必須使用「說出」積木（系統給分依據），切勿誤送除錯訊息！</p>
        </div>
        <div class="p-4 rounded-2xl theme-card-sub border">
          <div class="font-bold text-emerald-400 text-sm mb-1"><i class="fa-solid fa-check-double mr-1"></i> 3. 批次全測驗證</div>
          <p class="text-xs theme-text-sub leading-normal">評測平台提供「自訂輸入輸出」功能，本系統更具備一鍵 34 組測資全自動快速驗證！</p>
        </div>
      </div>
    </div>

    <!-- 平台快速傳送門 -->
    <div class="mb-8">
      <div class="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-sm">
        <div>
          <h4 class="text-lg font-bold text-indigo-400 flex items-center gap-2">
            <i class="fa-solid fa-graduation-cap"></i> 競賽官方實作平台傳送門
          </h4>
          <p class="text-xs theme-text-sub mt-0.5">提供比賽專用 Scratch 空白試卷與 Blockly 空白試卷</p>
        </div>
        <div class="flex flex-wrap gap-3">
          ${guide.externalLinks.map(link => `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" 
               class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95">
              <i class="fa-solid ${link.icon}"></i> ${link.name}
              <i class="fa-solid fa-arrow-up-right-from-square text-[10px] opacity-75"></i>
            </a>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- 三大規範詳細說明 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  `;

  guide.rules.forEach((rule, idx) => {
    html += `
      <div class="theme-card rounded-2xl p-6 border shadow-xl flex flex-col justify-between hover:border-cyan-500/50 transition duration-300">
        <div>
          <div class="flex items-center gap-2.5 text-cyan-400 font-bold text-base mb-3">
            <span class="w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center text-xs">${idx + 1}</span>
            <h4>${rule.title}</h4>
          </div>
          
          ${rule.scratchText ? `
            <div class="mb-3 p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <span class="text-xs font-bold text-orange-400 uppercase tracking-wider block mb-1">
                <i class="fa-solid fa-cat mr-1"></i> Scratch 規範
              </span>
              <p class="text-xs theme-text-sub leading-relaxed whitespace-pre-line">${rule.scratchText}</p>
            </div>
          ` : ''}

          ${rule.blocklyText ? `
            <div class="mb-3 p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/20">
              <span class="text-xs font-bold text-sky-400 uppercase tracking-wider block mb-1">
                <i class="fa-solid fa-cube mr-1"></i> Blockly 規範
              </span>
              <p class="text-xs theme-text-sub leading-relaxed whitespace-pre-line">${rule.blocklyText}</p>
            </div>
          ` : ''}

          ${rule.text ? `
            <div class="mb-3 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                <i class="fa-solid fa-check-double mr-1"></i> 平台特色
              </span>
              <p class="text-xs theme-text-sub leading-relaxed">${rule.text}</p>
            </div>
          ` : ''}
        </div>

        <div>
          <div class="text-xs font-semibold theme-text-muted mb-2 mt-4 flex items-center gap-1.5">
            <i class="fa-solid fa-image text-cyan-400"></i> 操作截圖示範 (${rule.images.length} 張)
          </div>
          <div class="grid grid-cols-2 gap-2">
            ${rule.images.slice(0, 4).map(img => {
              const src = typeof img === 'string' ? img : img.src;
              const cap = typeof img === 'string' ? rule.title : img.caption;
              return `
                <div class="group relative rounded-lg overflow-hidden border theme-border bg-black/40 aspect-video cursor-pointer"
                     onclick="openLightbox('${src}', '${cap.replace(/'/g, "\\'")}')">
                  <img src="${src}" alt="${cap}" class="w-full h-full object-cover group-hover:scale-110 transition duration-300" loading="lazy">
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                    <i class="fa-solid fa-magnifying-glass-plus text-white text-xs"></i>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
          ${rule.images.length > 4 ? `
            <p class="text-[11px] text-cyan-400/90 text-right mt-1.5 cursor-pointer hover:underline" onclick="openLightbox('${typeof rule.images[0] === 'string' ? rule.images[0] : rule.images[0].src}', '${rule.title}')">
              + 查看其餘 ${rule.images.length - 4} 張截圖...
            </p>
          ` : ''}
        </div>
      </div>
    `;
  });

  html += `</div>`;
  guideEl.innerHTML = html;
}

// 依類別渲染題目卡片
function renderProblemListForCategory(category, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const problems = COMPETITION_DATA.problems.filter(p => p.category === category);
  let html = '';

  problems.forEach(p => {
    const isCompleted = STATE.progress[p.id];
    const difficultyStars = '★'.repeat(p.difficulty) + '☆'.repeat(5 - p.difficulty);

    html += `
      <article id="prob-${p.id}" class="theme-card rounded-3xl border shadow-xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300">
        <!-- 頂部標頭 -->
        <div class="px-6 py-4 theme-card-sub border-b theme-border flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <span class="px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
              p.category === 'basic' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
              p.category === 'classic' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' :
              'bg-purple-500/20 text-purple-400 border border-purple-500/30'
            }">
              ${p.badge}
            </span>
            <span class="text-xs text-amber-400 font-mono" title="難度等級：${p.difficulty} 星">
              ${difficultyStars}
            </span>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="toggleProblemProgress('${p.id}')" 
                    id="progress-btn-${p.id}"
                    class="px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                      isCompleted 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30' 
                        : 'bg-slate-700/50 text-slate-300 border border-slate-600 hover:text-white'
                    }">
              <i class="fa-solid ${isCompleted ? 'fa-circle-check text-emerald-400' : 'fa-circle'}"></i>
              <span>${isCompleted ? '已掌握完成' : '標記為已掌握'}</span>
            </button>
          </div>
        </div>

        <!-- 內容主體 -->
        <div class="p-6 md:p-8 space-y-6">
          <div>
            <h3 class="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              ${p.title}
            </h3>
            <p class="text-xs md:text-sm font-medium text-cyan-400 mt-1">${p.subtitle}</p>
            <div class="flex flex-wrap gap-1.5 mt-2.5">
              ${p.tags.map(t => `<span class="px-2.5 py-0.5 rounded-md theme-card-sub border theme-border text-[11px] theme-text-sub">#${t}</span>`).join('')}
            </div>
          </div>

          <!-- 題目敘述與 I/O 規範 -->
          <div class="p-4 rounded-2xl theme-card-sub border theme-border space-y-3">
            <div class="text-xs md:text-sm leading-relaxed">${p.desc}</div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t theme-border text-xs theme-text-sub">
              <div><strong class="text-white"><i class="fa-solid fa-arrow-right-to-bracket text-cyan-400 mr-1"></i> 輸入格式：</strong>${p.spec.input}</div>
              <div><strong class="text-white"><i class="fa-solid fa-arrow-right-from-bracket text-emerald-400 mr-1"></i> 輸出格式：</strong>${p.spec.output}</div>
            </div>
          </div>

          <!-- 官方範例測資對照表 -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <h4 class="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-indigo-400">
                <i class="fa-solid fa-table-list"></i> 官方範例測資對照表
              </h4>
              <span class="text-[11px] theme-text-muted">點擊「帶入測試」可即時驗證</span>
            </div>
            <div class="overflow-x-auto rounded-xl border theme-border theme-card-sub">
              <table class="w-full text-xs text-left">
                <thead class="theme-card text-slate-300 font-semibold border-b theme-border">
                  <tr>
                    <th class="py-2 px-3 w-10 text-center">#</th>
                    <th class="py-2 px-3 min-w-[120px]">範例輸入 (Input)</th>
                    <th class="py-2 px-3 min-w-[100px]">範例輸出 (Expected)</th>
                    <th class="py-2 px-3">範例說明 (Explanation)</th>
                    <th class="py-2 px-3 text-right">操作</th>
                  </tr>
                </thead>
                <tbody class="divide-y theme-border">
                  ${p.samples.map((s, sIdx) => `
                    <tr class="hover:bg-black/10 transition">
                      <td class="py-2 px-3 text-center theme-text-muted font-mono">${sIdx + 1}</td>
                      <td class="py-2 px-3 font-mono font-bold text-cyan-400 whitespace-pre-line">${s.input}</td>
                      <td class="py-2 px-3 font-mono font-bold text-emerald-400 whitespace-pre-line">${s.output}</td>
                      <td class="py-2 px-3 theme-text-sub leading-normal">${s.explain}</td>
                      <td class="py-2 px-3 text-right space-x-1.5 whitespace-nowrap">
                        <button onclick="copyToClipboard('${s.input.replace(/\n/g, '\\n')}', '已複製範例輸入')" 
                                class="px-2 py-1 rounded-md bg-slate-700/60 hover:bg-slate-750 text-slate-300 transition" title="複製輸入">
                          <i class="fa-regular fa-copy"></i>
                        </button>
                        <button onclick="loadSampleToTester('${p.id}', '${s.input.replace(/\n/g, '\\n')}')" 
                                class="px-2.5 py-1 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition">
                          帶入測試
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- 避坑指南與思維重點 -->
          ${p.pitfalls && p.pitfalls.length > 0 ? `
            <div class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25">
              <div class="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
                <i class="fa-solid fa-triangle-exclamation"></i> 競賽防踩坑重點與思維拆解
              </div>
              <ul class="space-y-1 text-xs theme-text-sub">
                ${p.pitfalls.map(pit => `
                  <li class="flex items-start gap-1.5">
                    <span class="text-amber-400 font-bold">•</span>
                    <span>${pit}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          ` : ''}

          <!-- 積木程式截圖展示 -->
          <div>
            <div class="flex items-center justify-between mb-2.5">
              <h4 class="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-cyan-400">
                <i class="fa-solid fa-puzzle-piece"></i> Scratch / Blockly 積木實作圖解 (${p.images.length} 張)
              </h4>
              <span class="text-[11px] theme-text-muted">點擊截圖可全螢幕高清縮放檢視</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              ${p.images.map(img => `
                <div class="group theme-card-sub rounded-2xl border theme-border overflow-hidden cursor-pointer hover:border-cyan-500 transition flex flex-col"
                     onclick="openLightbox('${img.src}', '${img.caption.replace(/'/g, "\\'")}')">
                  <div class="relative overflow-hidden aspect-video bg-black/30 flex items-center justify-center p-2">
                    <img src="${img.src}" alt="${img.caption}" class="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300" loading="lazy">
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                      <span class="px-3 py-1 rounded-full bg-cyan-600 text-white text-xs font-medium shadow-lg flex items-center gap-1">
                        <i class="fa-solid fa-magnifying-glass-plus"></i> 放大
                      </span>
                    </div>
                  </div>
                  <div class="p-2.5 text-[11px] theme-text-sub font-medium leading-snug border-t theme-border group-hover:text-cyan-300 transition">
                    ${img.caption}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- 線上模擬即時測試沙盒 -->
          <div class="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/25">
            <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs">
                  <i class="fa-solid fa-bolt"></i>
                </span>
                <h4 class="font-bold text-xs md:text-sm text-white">線上即時解題模擬測試器</h4>
              </div>
              <button onclick="runSingleTest('${p.id}')" 
                      class="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold shadow-md transition active:scale-95 flex items-center gap-1.5">
                <i class="fa-solid fa-play"></i> 執行測試
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <!-- 輸入區 -->
              <div>
                <label class="block text-[11px] font-semibold theme-text-muted mb-1">
                  測試輸入 (Input)：
                </label>
                <textarea id="tester-input-${p.id}" rows="3" 
                          class="w-full px-3 py-2 rounded-xl theme-card-sub border theme-border text-cyan-400 font-mono text-xs focus:outline-none focus:border-cyan-500 transition resize-y"
                          placeholder="請輸入測試資料">${p.defaultTestInput}</textarea>
              </div>

              <!-- 輸出區 -->
              <div>
                <label class="block text-[11px] font-semibold theme-text-muted mb-1 flex items-center justify-between">
                  <span>執行結果 (Output)：</span>
                  <span id="tester-badge-${p.id}" class="text-[10px] px-2 py-0.5 rounded font-mono font-bold hidden"></span>
                </label>
                <div id="tester-output-${p.id}" 
                     class="w-full h-[76px] px-3 py-2 rounded-xl theme-card-sub border theme-border text-emerald-400 font-mono text-xs overflow-auto whitespace-pre-wrap flex items-center theme-text-muted">
                  點擊「執行測試」以取得演算法運算結果...
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
  });

  container.innerHTML = html;
}

// 執行個別題目測試
function runSingleTest(problemId) {
  const inputEl = document.getElementById(`tester-input-${problemId}`);
  const outputEl = document.getElementById(`tester-output-${problemId}`);
  const badgeEl = document.getElementById(`tester-badge-${problemId}`);
  if (!inputEl || !outputEl) return;

  const solver = SOLVERS[problemId];
  if (!solver) {
    outputEl.textContent = '未找到該題目的解題引擎';
    return;
  }

  const rawInput = inputEl.value;
  try {
    const startTime = performance.now();
    const result = solver(rawInput);
    const duration = (performance.now() - startTime).toFixed(2);

    outputEl.textContent = result;
    outputEl.className = 'w-full h-[76px] px-3 py-2 rounded-xl theme-card-sub border theme-border text-emerald-400 font-mono text-xs overflow-auto whitespace-pre-wrap';

    const prob = COMPETITION_DATA.problems.find(p => p.id === problemId);
    let matchedSample = null;
    if (prob) {
      matchedSample = prob.samples.find(s => s.input.trim() === rawInput.trim());
    }

    if (badgeEl) {
      badgeEl.classList.remove('hidden', 'bg-emerald-500/20', 'text-emerald-400', 'bg-rose-500/20', 'text-rose-400', 'bg-cyan-500/20', 'text-cyan-400', 'border');
      if (matchedSample) {
        if (matchedSample.output.trim() === result.toString().trim()) {
          badgeEl.classList.add('bg-emerald-500/20', 'text-emerald-400', 'border', 'border-emerald-500/30');
          badgeEl.innerHTML = `<i class="fa-solid fa-check mr-1"></i> PASS (${duration} ms)`;
        } else {
          badgeEl.classList.add('bg-rose-500/20', 'text-rose-400', 'border', 'border-rose-500/30');
          badgeEl.innerHTML = `<i class="fa-solid fa-xmark mr-1"></i> FAIL (預期: ${matchedSample.output})`;
        }
      } else {
        badgeEl.classList.add('bg-cyan-500/20', 'text-cyan-400', 'border', 'border-cyan-500/30');
        badgeEl.innerHTML = `<i class="fa-solid fa-bolt mr-1"></i> 運算完成 (${duration} ms)`;
      }
    }

    showToast('測試執行完成！');
  } catch (err) {
    outputEl.textContent = `執行錯誤: ${err.message}`;
    outputEl.className = 'w-full h-[76px] px-3 py-2 rounded-xl theme-card-sub border border-rose-500/50 text-rose-400 font-mono text-xs overflow-auto whitespace-pre-wrap';
  }
}

function loadSampleToTester(problemId, sampleInput) {
  const inputEl = document.getElementById(`tester-input-${problemId}`);
  if (inputEl) {
    inputEl.value = sampleInput.replace(/\\n/g, '\n');
    runSingleTest(problemId);
    inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// ===== 5. 分頁 5：線上批次評測沙盒 (Batch Test Sandbox) =====
function runBatchSuiteInline() {
  const resultsContainer = document.getElementById('inline-batch-results-list');
  const summaryEl = document.getElementById('inline-batch-summary');
  if (!resultsContainer || !summaryEl) return;

  resultsContainer.innerHTML = '<div class="py-8 text-center theme-text-muted"><i class="fa-solid fa-spinner fa-spin text-2xl text-cyan-400 mb-2"></i><p>正在自動執行全題庫 34 組測資批次驗證...</p></div>';

  setTimeout(() => {
    let totalTests = 0;
    let passedTests = 0;
    let rowsHtml = '';

    COMPETITION_DATA.problems.forEach(p => {
      const solver = SOLVERS[p.id];
      p.samples.forEach((sample, sIdx) => {
        totalTests++;
        let actual = '';
        let pass = false;
        let timeMs = 0;

        try {
          const t0 = performance.now();
          actual = solver(sample.input).toString().trim();
          timeMs = (performance.now() - t0).toFixed(2);
          pass = (actual === sample.output.trim());
        } catch (e) {
          actual = `錯誤: ${e.message}`;
        }

        if (pass) passedTests++;

        rowsHtml += `
          <tr class="border-b theme-border hover:bg-black/10 transition">
            <td class="py-2.5 px-3">
              <span class="font-bold text-white">${p.title}</span>
              <span class="text-[11px] theme-text-muted block">範例 #${sIdx + 1}</span>
            </td>
            <td class="py-2.5 px-3 font-mono text-xs text-cyan-400 whitespace-pre-line">${sample.input}</td>
            <td class="py-2.5 px-3 font-mono text-xs text-slate-300 whitespace-pre-line">${sample.output}</td>
            <td class="py-2.5 px-3 font-mono text-xs ${pass ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'} whitespace-pre-line">${actual}</td>
            <td class="py-2.5 px-3 text-center">
              ${pass ? `
                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <i class="fa-solid fa-check"></i> PASS
                </span>
              ` : `
                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  <i class="fa-solid fa-xmark"></i> FAIL
                </span>
              `}
            </td>
            <td class="py-2.5 px-3 text-right font-mono text-xs theme-text-muted">${timeMs} ms</td>
          </tr>
        `;
      });
    });

    resultsContainer.innerHTML = rowsHtml;

    const rate = Math.round((passedTests / totalTests) * 100);
    summaryEl.innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl ${rate === 100 ? 'bg-emerald-500/15 border border-emerald-500/30' : 'theme-card-sub border'}">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl ${rate === 100 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-indigo-500/20 text-indigo-400'} flex items-center justify-center text-2xl font-black">
            ${rate === 100 ? '<i class=\"fa-solid fa-trophy\"></i>' : `${rate}%`}
          </div>
          <div>
            <h4 class="font-bold text-white text-base">批次測試評測報告</h4>
            <p class="text-xs theme-text-sub mt-0.5">共執行 ${totalTests} 組官方測資，通過 <span class="text-emerald-400 font-bold">${passedTests}</span> 組，失敗 <span class="text-rose-400 font-bold">${totalTests - passedTests}</span> 組 (通過率: <span class="font-bold text-cyan-400">${rate}%</span>)</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="runBatchSuiteInline()" class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition flex items-center gap-1.5 shadow-md">
            <i class="fa-solid fa-rotate-right"></i> 重新執行批次測試
          </button>
        </div>
      </div>
    `;

    if (rate === 100 && typeof confetti === 'function') {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }
  }, 250);
}

// 學習進度追蹤
function toggleProblemProgress(problemId) {
  STATE.progress[problemId] = !STATE.progress[problemId];
  localStorage.setItem('competition_progress', JSON.stringify(STATE.progress));

  const btn = document.getElementById(`progress-btn-${problemId}`);
  if (btn) {
    const isCompleted = STATE.progress[problemId];
    if (isCompleted) {
      btn.className = 'px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30';
      btn.innerHTML = '<i class="fa-solid fa-circle-check text-emerald-400"></i><span>已掌握完成</span>';
    } else {
      btn.className = 'px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition bg-slate-700/50 text-slate-300 border border-slate-600 hover:text-white';
      btn.innerHTML = '<i class="fa-solid fa-circle"></i><span>標記為已掌握</span>';
    }
  }

  updateProgressUI();
}

function updateProgressUI() {
  const total = COMPETITION_DATA.problems.length;
  const completed = Object.values(STATE.progress).filter(Boolean).length;
  const pct = Math.round((completed / total) * 100);

  const barEl = document.getElementById('navbar-progress-bar');
  const textEl = document.getElementById('navbar-progress-text');
  if (barEl) barEl.style.width = `${pct}%`;
  if (textEl) textEl.textContent = `${completed}/${total} 題 (${pct}%)`;
}

// 收集截圖以利燈箱巡訪
function collectGalleryImages() {
  STATE.allGalleryImages = [];
  COMPETITION_DATA.platformGuide.rules.forEach(r => {
    if (r.images) {
      r.images.forEach(img => {
        if (typeof img === 'string') {
          STATE.allGalleryImages.push({ src: img, caption: r.title });
        } else {
          STATE.allGalleryImages.push(img);
        }
      });
    }
  });
  COMPETITION_DATA.problems.forEach(p => {
    if (p.images) {
      p.images.forEach(img => STATE.allGalleryImages.push(img));
    }
  });
}

// 燈箱檢視器
function openLightbox(src, caption) {
  const lb = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');
  if (!lb || !img) return;

  const idx = STATE.allGalleryImages.findIndex(i => i.src === src);
  STATE.lightboxIndex = (idx !== -1) ? idx : 0;

  img.src = src;
  if (cap) cap.textContent = caption || (idx !== -1 ? STATE.allGalleryImages[idx].caption : '');
  
  lb.classList.remove('hidden');
  lb.classList.add('flex');
}

function closeLightbox() {
  const lb = document.getElementById('lightbox-modal');
  if (lb) {
    lb.classList.add('hidden');
    lb.classList.remove('flex');
  }
}

function navLightbox(dir) {
  if (STATE.allGalleryImages.length === 0) return;
  STATE.lightboxIndex = (STATE.lightboxIndex + dir + STATE.allGalleryImages.length) % STATE.allGalleryImages.length;
  const cur = STATE.allGalleryImages[STATE.lightboxIndex];
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');
  if (img) img.src = cur.src;
  if (cap) cap.textContent = cur.caption;
}

// 鍵盤與全域監聽
function initEventListeners() {
  window.addEventListener('keydown', (e) => {
    const lb = document.getElementById('lightbox-modal');
    if (lb && !lb.classList.contains('hidden')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navLightbox(-1);
      if (e.key === 'ArrowRight') navLightbox(1);
    }
  });
}

// 提示訊息 Toast
function showToast(message) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-2xl bg-slate-900 border border-cyan-500/40 text-cyan-300 text-xs font-medium shadow-2xl flex items-center gap-2 transform translate-y-12 opacity-0 transition duration-300 pointer-events-none';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-circle-info text-cyan-400"></i><span>${message}</span>`;
  toast.classList.remove('translate-y-12', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-12', 'opacity-0');
  }, 2200);
}

// 複製到剪貼簿
function copyToClipboard(text, successMsg) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(successMsg || '已複製至剪貼簿！');
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast(successMsg || '已複製至剪貼簿！');
  });
}
