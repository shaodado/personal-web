# 🚀 Hsinchu Tech Story | Li-Hsiang Shao 個人作品集與技術履歷

[![Responsive Design](https://img.shields.io/badge/Design-Tablet%20%26%20Mobile%20Optimized-brightgreen.svg)](#-平板與跨終端響應式設計-responsive-design)
[![Tech Stack](https://img.shields.io/badge/Stack-Vanilla%20JS%20%7C%20CSS3%20%7C%20HTML5-blue.svg)](#-技術架構與亮點-technical-highlights)
[![Scroll Engine](https://img.shields.io/badge/Engine-Custom%20Lerp%203D%20Scroll-purple.svg)](#-自研滾動與-3d-互動引擎)
[![License](https://img.shields.io/badge/License-MIT-orange.svg)](LICENSE)

> 一個以科技、競賽與實作為核心的自傳型個人作品集網站。秉持 **「科技為熱情，實作為證明」** 的工程精神，結合極致輕量化純原生架構、自研 Lerp 物理平滑滾動、3D 空間景深變換與全裝置響應式設計（特別針對**平板觸控操作**進行精準佈局與體驗優化）。

---

## 📱 核心特色：平板與跨終端展示優化 (Tablet Experience)

在面試或成果發表時，以**平板電腦（Tablet / iPad）**或行動裝置進行現場展示，具備更靈活的互動性。本專案特別針對觸控手勢、螢幕寬度與渲染效能進行深度調校：

1. **三階自適應斷點系統（Multi-Tier Breakpoint Architecture）**：
   - **平板/折疊屏模式 (`641px ~ 980px`)**：自動切換雙欄卡片佈局（`repeat(2, minmax(0, 1fr))`），拉寬互動區域，提升手指點擊精度與可視資訊密度。
   - **桌面端模式 (`> 981px`)**：啟用 4 欄滿版佈局與深度滾動視差背景。
   - **手機端模式 (`< 640px`)**：收攏為單欄流暢瀑布流，保持文字易讀性。
2. **觸控友善的 3D 翻轉卡片（Touch & Accessible Flip Interaction）**：
   - 針對平板與觸控設備取消純 Hover 依賴，採用雙向狀態機控制（點擊/輕觸切換 `is-flipped`）。
   - 支援 WAI-ARIA 無障礙標準（`role="button"`、`aria-pressed`、`tabindex="0"`），兼顧觸控操作與外接鍵盤快捷操作。
3. **平板 GPU 渲染加速與低功耗優化**：
   - 針對平板晶片調校 CSS `transform-style: preserve-3d` 與 `will-change`，確保 60fps / 120fps 高刷屏下的平順動畫表現，杜絕掉幀與發熱。

---

## 🛠️ 技術架構與亮點 (Technical Highlights)

本專案堅持**零外部重型依賴（Zero-dependency / Pure Native）**，採用原生 HTML5、現代 CSS3 與 ES6+ JavaScript 構建，體現最純粹的前端底層掌控力：

### 1. 自研 Lerp 物理平滑滾動演算法 (Linear Interpolation)
捨棄重型外掛函式庫，採用線性差值計算打造如絲般順滑的滾動體驗：
```javascript
// script.js
const ease = 0.04; // 精準調校的阻尼動量參數
const tick = () => {
  currentScroll += (targetScroll - currentScroll) * ease;
  // 同步驅動 3D 空間與卡片景深
  requestAnimationFrame(tick);
};
```

### 2. 視差滾動與 3D 空間景深疊代 (Spatial Depth Engine)
- **滾動驅動視差**：依據螢幕視窗中心點動態計算卡片相對距離 `dist = itemCenter - windowCenter`。
- **立體透視變換**：依滾動進度實時計算 `rotateY`（空間偏轉角度）、`translateZ`（Z 軸縱深）、`scale`（縮放比例）與 `blur`（景深模糊程度），呈現媲美 Apple 官網水準的空間卡片穿梭效果。

### 3. 避免 Layout Thrashing 的效能架構
- 實作 **佈局指標快取（Layout Metrics Cache）**：滾動過程中不頻繁觸發 `getBoundingClientRect()` 或 `offsetHeight` 等強制重排（Forced Synchronous Layout）操作，所有幾何數據統一於 `resize` 時快取至 `metrics` 物件，確保高頻滾動下頁面不卡頓。
- 整合 **IntersectionObserver API** 進行元件離屏卸載與非同步進場顯現（Scroll Reveal）。

---

## 📂 專案結構 (Directory Structure)

```text
personal-web/
├── images/               # 形象照片、展示素材與靜態資源
│   ├── 8eba1958...jpg    # 個人正面形象照（Front Face）
│   └── A8BCCE2F...jpg    # 翻轉展示生活/實作照（Back Face）
├── index.html            # 語意化 HTML5 核心結構與無障礙標記
├── styles.css            # 現代 CSS（變數管理、Glassmorphism 毛玻璃、響應式斷點）
├── script.js             # 自研 Lerp 動量物理引擎、3D 幾何變換與 DOM 事件控制
├── .gitignore            # Git 忽略配置
└── README.md             # 專案技術文件與說明
```

---

## 🏆 精選經歷與作品收錄 (Showcase Projects)

| 專案名稱 | 角色 / 成果 | 技術亮點 / 簡介 | 連結 |
| :--- | :--- | :--- | :--- |
| **智慧化校務時程整合與適性選課推薦助理系統** | **專題研究組長** | 聚焦記憶與需求推薦的智慧校務系統，鍛鍊端到端系統規劃與架構設計能力 | [GitHub 專案](https://github.com/shaodado/final) |
| **雲端電商購物平台** | 全端獨立建置 | 從需求訪談、資料庫規劃到介面建置，完成具體電商系統雛形並部署上雲 | [Render Live Demo](https://mcu-112-2-web-12130561.onrender.com) |
| **台南仁愛國小校務資訊系統** | 系統建置與技術支援 | 將軟體工程技術實際落地於偏鄉與國民教育現場，支援校務日常維運 | [學校官網](https://www.raes.tn.edu.tw/) |
| **旋風盃企業資源管理 (ERP) 全國競賽** | **全國第二名 (亞軍)** | 深入企業營運數據分析、ERP 流程梳理與決策模擬實戰 | - |
| **Google 數位人才探索計畫** | AI 職場通識學程結訓 | 掌握最新 AI 應用思維與數位工程協作流程 | - |

---

## 🚀 本機運行與預覽指南 (Local Setup)

本專案無需任何繁瑣的環境建置或 Node 套件安裝，開箱即用：

### 方式一：使用 Python 快速架設本地伺服器
```bash
# 進入專案根目錄
cd personal-web

# 啟動 HTTP 伺服器 (預設連接埠 8000)
python -m http.server 8000
```
瀏覽器或平板連線至：`http://localhost:8000`（若平板需在同一區網預覽，請輸入電腦之區域 IP，如 `http://192.168.x.x:8000`）。

### 方式二：使用 VS Code Live Server
1. 使用 VS Code 開啟 `personal-web` 資料夾。
2. 安裝延伸模組 **Live Server**。
3. 在 `index.html` 上按右鍵選擇 **「Open with Live Server」** 即可立即預覽。

---

## 👨‍💻 關於作者 (About Me)

- **姓名**：邵立翔 (Li-Hsiang Shao)
- **教育背景**：銘傳大學 資訊管理學系（輔修 資訊工程學系）
- **專業興趣**：全端工程架構、系統整合、資料工程與 AI 創新應用
- **Email**：[shaoshineshine@gmail.com](mailto:shaoshineshine@gmail.com)
- **GitHub**：[@shaodado](https://github.com/shaodado)

---

> *“科技為熱情，實作為證明。”*
