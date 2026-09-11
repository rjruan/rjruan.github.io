const zhNavigation = [
  { label: "研究", path: "/zh/research/", title: "研究問題、方法與證據" },
  { label: "專案", path: "/zh/expeditions/", title: "設計專案與案例研究" },
  { label: "關於 Ruby", path: "/zh/about/", title: "關於 Ruby" },
  { label: "履歷", path: "/zh/resume/", title: "履歷" }
];

const zhHome = {
  eyebrow: "Ruby Ruan · UX 設計師與新進 HCI／Human Factors 研究者",
  title: "每一個案例，都從一個我無法放下的問題開始。",
  lede: "我沿著問題整理證據、設計決策、不確定性，以及我們所建立的系統會如何影響人。",
  paths: [
    {
      label: "研究路徑",
      title: "研究問題與方法",
      body: "閱讀我的研究方向、目前能以作品支持的方法，以及正在學習的能力。",
      path: "/zh/research/"
    },
    {
      label: "設計路徑",
      title: "案例研究與系統",
      body: "查看我如何從問題走向資訊架構、互動設計、原型與反思。",
      path: "/zh/expeditions/"
    }
  ],
  projects: [
    {
      number: "01",
      title: "FamilyPulse",
      meta: "個人 UX Design 課堂專案",
      question: "為什麼照護即使出於保護，仍可能讓人感覺被監視？",
      status: "中文案例摘要",
      path: "/zh/expeditions/health-monitoring/",
      style: "family-pulse"
    },
    {
      number: "02",
      title: "SSIM",
      meta: "獨立 passion project",
      question: "為什麼越重要的記憶，反而越容易消失？",
      status: "完整英文案例",
      path: "/expeditions/ssim/",
      style: "ssim"
    },
    {
      number: "03",
      title: "We Are Flood 50",
      meta: "Madison County Library 委託的課堂專案",
      question: "一個快速變動的大學城，如何透過共同記憶建立歸屬感？",
      status: "完整英文案例",
      path: "/expeditions/flood-50/",
      style: "flood"
    }
  ]
};

const zhResearch = {
  hero: {
    eyebrow: "研究方向",
    title: "我正在建立一套研究實踐，理解人如何在複雜系統中看懂資訊、形成信任，並保有行動自主權。",
    lede: "我目前的證據來自探索性 UX 研究、無障礙評估、研究統整與原型製作；下一步則是接受更正式的 HCI 與 Human Factors 研究訓練。"
  },
  themes: [
    {
      number: "01",
      title: "尊嚴、自主與可及的照護",
      question: "健康科技如何在支持安全的同時，不削弱一個人的自主、尊嚴與自我認同？",
      status: "目前有專案證據",
      body: "FamilyPulse 是我的起點，讓我看見顯眼的依賴、持續監測、無障礙需求與家庭照護之間可能互相衝突。",
      evidence: "FamilyPulse · 探索性 UX 課堂專案",
      path: "/zh/expeditions/health-monitoring/",
      boundary: "本專案沒有邀請高齡者直接參與，也沒有臨床驗證或完整定義隱私與資訊分享模型。"
    },
    {
      number: "02",
      title: "行動自主、信任與系統透明度",
      question: "什麼資訊能讓人充分理解系統，進而做選擇、採取行動並保有控制權？",
      status: "正在發展的方向",
      body: "我的無障礙工作與 Field Notes 正在幫助我釐清系統狀態、限制、不確定性，以及有用的簡化和隱藏複雜度之間的差異。",
      evidence: "Field Notes · 無障礙實務",
      path: "/field-notes/",
      boundary: "這仍是逐步形成的研究方向；我尚未完成正式研究，也沒有可公開的安全關鍵系統案例來支持研究發現。"
    },
    {
      number: "03",
      title: "情境感知與認知負荷",
      question: "自動化、XR 與安全關鍵介面應如何傳達系統狀態，同時避免讓人資訊過載？",
      status: "未來研究方向",
      body: "我希望研究人在注意力、工作負荷、不確定性與人為錯誤都很重要的情境中，如何監督複雜科技或與它合作。",
      evidence: "研究問題 · 目前尚無直接專案證據",
      path: null,
      boundary: "這個方向描述的是我正在尋找的訓練與研究機會，不代表我已具備成熟專業。"
    }
  ],
  questions: [
    "自動化系統應如何溝通不確定性與系統狀態，同時避免讓人資訊過載？",
    "當控制權由人與智慧系統共同持有時，什麼能幫助人維持情境感知？",
    "健康科技如何在支持安全的同時，不降低自主與尊嚴？",
    "XR 與其他複雜介面應如何考量認知負荷、無障礙與人為錯誤？"
  ],
  experience: [
    {
      title: "探索性訪談與問卷",
      evidence: "在課堂與獨立 UX 專案中，用來了解經驗、顧慮與使用者語言，再收斂設計方向。",
      boundary: "這些是非正式的專案方法；我沒有保留完整訪談程序、樣本紀錄或正式質性編碼。"
    },
    {
      title: "競品與次級資料研究",
      evidence: "用來比較產品模式、整理機會點，並為 FamilyPulse 與 Echo PenPal 建立後續問題。",
      boundary: "原始專案沒有採用正式評分架構或系統性文獻回顧程序。"
    },
    {
      title: "研究統整與問題定義",
      evidence: "在案例中區分觀察、詮釋、設計原則、假設與尚未解決的問題。",
      boundary: "這裡的統整是設計推理，不應被解讀為同儕審查或具統計代表性的研究。"
    },
    {
      title: "形成性可用性評估",
      evidence: "以紙本原型、任務情境、課堂講評與非正式回饋調整互動。",
      boundary: "這些課堂專案沒有保留正式測試紀錄，也沒有量化成果指標。"
    },
    {
      title: "無障礙評估",
      evidence: "運用於專業 UX 實務，以及此 coded portfolio 的語意、鍵盤、對比、響應式與使用者偏好檢查。",
      boundary: "需取得許可的專業證據未公開；也不能只靠視覺檢查推定無障礙符合度。"
    },
    {
      title: "原型與資訊架構",
      evidence: "以 Figma 和 coded prototype 檢視層級、可發現性、跨裝置角色與可及的互動結構。",
      boundary: "原型用來溝通與檢驗假設，並不等於已上線或已驗證的產品。"
    }
  ],
  developing: [
    "正式實驗設計",
    "進階質性編碼與主題分析",
    "統計與 R、JASP 或 SPSS",
    "眼動研究設計與分析",
    "學術論文寫作",
    "IRB 或研究倫理審查下的正式人類研究"
  ]
};

const zhProjects = [
  {
    slug: "health-monitoring",
    title: "FamilyPulse",
    type: "深入案例研究",
    question: "健康科技如何在支持安全的同時，保留高齡者的尊嚴與自主？",
    summary: "一個跨手錶與手機的課堂概念，探索高齡者與信任的人如何分享健康脈絡、聯繫與回應緊急時刻。",
    role: "獨立 UX 研究與設計",
    year: "2024 年 9–12 月",
    status: "中文案例摘要",
    path: "/zh/expeditions/health-monitoring/",
    themes: ["尊嚴", "高齡與自主", "跨裝置 UX", "健康科技"]
  },
  {
    slug: "ssim",
    title: "SSIM",
    type: "深入案例研究",
    question: "當實體物件消失時，科技可以如何協助保存家庭記憶？",
    summary: "一個獨立 passion project，探索家庭記憶、故事、文化保存、所有權與長期管理。",
    role: "獨立研究與設計",
    year: "2025",
    status: "閱讀完整英文案例",
    path: "/expeditions/ssim/",
    themes: ["記憶", "文化保存", "隱私", "互動設計"]
  },
  {
    slug: "pen-pal",
    title: "Echo PenPal",
    type: "UX 案例研究",
    question: "當科技讓聯繫變得更容易，為什麼關係仍可能缺少用心？",
    summary: "一個 UX Design 課堂專案，探索數位工具能否成為橋梁，幫助人建立更有意圖的國際交流並延伸到實體書信。",
    role: "獨立 UX 研究與設計",
    year: "2024 年 9–12 月",
    status: "閱讀完整英文案例",
    path: "/expeditions/pen-pal/",
    themes: ["人際連結", "社交互動", "互動設計", "概念發展"]
  },
  {
    slug: "flood-50",
    title: "We Are Flood 50",
    type: "真實客戶提案",
    question: "一個快速變動的大學城，如何透過共同記憶建立歸屬感？",
    summary: "為 Madison County Library 建立的課堂提案，以品牌、網站與活動設計連結 Teton Dam flood 的記憶、地方傳承與當代社群。",
    role: "平面設計、網站設計、專案管理與團隊協調",
    year: "2025 年 1–4 月",
    status: "閱讀完整英文案例",
    path: "/expeditions/flood-50/",
    themes: ["社群記憶", "地方傳承", "品牌系統", "數位體驗"]
  }
];

module.exports = { zhNavigation, zhHome, zhResearch, zhProjects };
