// 科技教育創意實作競賽【資訊科技組】 題庫與解題資料庫
const COMPETITION_DATA = {
  platformGuide: {
    title: "競賽規範與解題環境核心指南",
    subtitle: "師大官方評測平台特性分析 vs 本系統多測資批次全自動驗證",
    externalLinks: [
      { name: "師大競賽實作平台 (Blockly/Scratch)", url: "https://bdesigner.star-kids.info/blockly2/index.php", icon: "fa-laptop-code" },
      { name: "法蘭斯解題積木平台", url: "https://fustyles.github.io/competition/", icon: "fa-cubes" }
    ],
    rules: [
      {
        id: "rule-green-flag",
        title: "規範一：執行事件綁定 (Green Flag)",
        scratchText: "Scratch 評測環境中，所有程式積木必須掛在『當 綠旗 被點擊』事件或自訂函式下方，否則系統測試時無法啟動！",
        blocklyText: "Blockly 環境中只要積木放入工作區即可依序直接執行，但需注意順序與全域變數初始化。",
        images: [
          { src: "images/image42.png", caption: "Scratch 必須掛在綠旗積木或函式下才能啟動執行" },
          { src: "images/image3.png", caption: "Blockly 工作區直接放置積木即可執行" }
        ]
      },
      {
        id: "rule-io",
        title: "規範二：標準輸入與輸出規範 (I/O Standards)",
        scratchText: "【輸入】：使用『詢問...並等待』積木讀取輸入內容（答案變數即為輸入字串）。\n【輸出】：必須使用『說出...』積木輸出結果（評測系統以此抓取答案）；『輸出至訊息視窗』僅供除錯，切勿混淆或只輸出除錯訊息造成零分！",
        blocklyText: "【輸入】：使用『讀取輸入』積木。\n【輸出】：『說出』為送出正確答案；『輸出至訊息視窗』為除錯視窗，切勿送錯積木造成 0 分！",
        images: [
          { src: "images/image40.png", caption: "Scratch 標準輸入：詢問並等待積木" },
          { src: "images/image2.png", caption: "Scratch 標準輸出：說出積木（系統給分用）" },
          { src: "images/image1.png", caption: "Scratch 除錯輸出：輸出至訊息視窗（僅供除錯）" },
          { src: "images/image25.png", caption: "Blockly 標準輸入：讀取輸入積木" },
          { src: "images/image24.png", caption: "Blockly 標準輸出：說出積木（正確答案用）" },
          { src: "images/image33.png", caption: "Blockly 除錯輸出：輸出至訊息視窗（請勿搞混）" }
        ]
      },
      {
        id: "rule-batch-testing",
        title: "規範三：自訂輸入輸出與多測資批次驗證",
        text: "在評測平台上可點選右上角『允許設定輸入輸出』。點擊新增輸入與輸出按鈕即可新增自訂測試資料。師大平台預設需一筆一筆手動點測，而本系統支援『一鍵多筆全自動批次驗證』，所有測試綠勾瞬間完成比對！",
        images: [
          { src: "images/image44.png", caption: "競賽實作平台功能首頁" },
          { src: "images/image47.png", caption: "步驟 1：開啟上方設定選單" },
          { src: "images/image46.png", caption: "步驟 2：勾選允許設定輸入輸出" },
          { src: "images/image37.png", caption: "步驟 3：成功開啟自訂輸入輸出功能" },
          { src: "images/image35.png", caption: "題目列表：點選左側題目，右側顯示題目規格" },
          { src: "images/image32.png", caption: "自訂輸入輸出：點選新增輸入輸出按鈕" },
          { src: "images/image31.png", caption: "彈出自訂輸入與輸出設定面板" },
          { src: "images/image30.png", caption: "填入欲測試之輸入資料與預期標準輸出" },
          { src: "images/image29.png", caption: "在工作區組出對應邏輯積木" },
          { src: "images/image28.png", caption: "點擊執行測試：一鍵全測全數通過（綠色打勾標記）" }
        ]
      }
    ]
  },
  problems: [
    {
      id: "sum-sequence",
      category: "basic",
      badge: "入門基礎 01",
      title: "數列加總 (Sum of Sequence)",
      subtitle: "清單儲存 vs 變數累加法之雙軌實踐",
      difficulty: 1,
      tags: ["迴圈計次", "清單/陣列", "變數累加", "基礎I/O"],
      desc: "請設計一個程式，首先輸入數列有幾個數字 (N)，接著輸入這 N 個數字，請計算並輸出該數列所有數字的總和。",
      spec: {
        input: "第一行一個整數 N，第二行輸入 N 個整數（以空格分隔）。",
        output: "輸出一個整數，代表該數列的總和。"
      },
      samples: [
        {
          input: "3\n50 30 20",
          output: "100",
          explain: "50 + 30 + 20 = 100"
        },
        {
          input: "2\n40 35",
          output: "75",
          explain: "40 + 35 = 75"
        }
      ],
      pitfalls: [
        "Blockly 使用清單前必須先『建立空清單』並初始化變數，否則讀入時會發生 undefined 錯誤。",
        "若已確定所有數字只需相加，可直接使用單一變數累加，無需使用清單儲存，可大幅降低記憶體與程式碼行數！"
      ],
      images: [
        { src: "images/image27.png", caption: "Scratch 數列加總實作（清單法與計次迴圈）" },
        { src: "images/image17.png", caption: "Blockly 數列加總實作（建立空清單後逐筆讀入累加）" }
      ],
      defaultTestInput: "3\n50 30 20"
    },
    {
      id: "convenience-store",
      category: "basic",
      badge: "入門基礎 02",
      title: "超商收銀結帳 (Convenience Store Cashier)",
      subtitle: "商品清單總額累加與找零條件判斷",
      difficulty: 2,
      tags: ["迴圈判斷", "條件分支", "找零運算", "防呆處理"],
      desc: "顧客到超商購物，收銀機會依序讀取購買的每樣商品價格。最後顧客拿出一筆錢付款。請設計程式計算所有商品的總金額。若付款金額大於或等於總金額，輸出應找金額；若付款金額不足，輸出『付款金額不足』。",
      spec: {
        input: "第一行一個整數 N（商品數量）；第二行輸入 N 個整數（每樣商品的價格）；第三行一個整數（付款金額）。",
        output: "若付款足夠，輸出一個整數（應找金額）；若不足，輸出『付款金額不足』。"
      },
      samples: [
        {
          input: "3\n50 30 20\n120",
          output: "20",
          explain: "總額 50+30+20=100，付款 120 -> 找零 120-100=20"
        },
        {
          input: "2\n40 35\n60",
          output: "付款金額不足",
          explain: "總額 40+35=75，付款 60 小於 75 -> 輸出『付款金額不足』"
        },
        {
          input: "4\n10 20 30 40\n100",
          output: "0",
          explain: "總額 100，付款 100 -> 剛好付清，找 0 元"
        },
        {
          input: "5\n5 5 5 5 5\n50",
          output: "25",
          explain: "總額 25，付款 50 -> 找 25 元"
        }
      ],
      pitfalls: [
        "輸出的提示文字必須與題目完全相符（『付款金額不足』），全半形與空格不可多也不可少。",
        "若剛好付清（付款 = 總額），應找金額為 0，不可誤判為金額不足。"
      ],
      images: [
        { src: "images/image8.png", caption: "Scratch 超商收銀（使用清單儲存各商品價格）" },
        { src: "images/image16.png", caption: "Scratch 結算條件判斷（付款 >= 總金額 判斷）" },
        { src: "images/image43.png", caption: "Scratch 記憶體優化：邊讀邊累加，免用清單更簡潔！" },
        { src: "images/image23.png", caption: "Blockly 超商收銀清單實作" },
        { src: "images/image34.png", caption: "Blockly 超商收銀直接累加版" }
      ],
      defaultTestInput: "3\n50 30 20\n120"
    },
    {
      id: "even-sum",
      category: "classic",
      badge: "核心題庫 01",
      title: "偶數和 (Even Sum)",
      subtitle: "區間搜尋、餘數運算與步進優化",
      difficulty: 2,
      tags: ["餘數運算(mod)", "區間巡訪", "條件累加"],
      desc: "請設計一個程式，輸入兩個正整數（由小到大），計算出這兩個正整數之間（包含端點），所有偶數的和。",
      spec: {
        input: "輸入兩個正整數 A 與 B（A <= B，以空格或分行隔開）。",
        output: "輸出一個整數，代表區間內所有偶數的加總。"
      },
      samples: [
        {
          input: "10\n20",
          output: "90",
          explain: "10 到 20 間的偶數為 10、12、14、16、18、20，和為 90"
        },
        {
          input: "31\n39",
          output: "140",
          explain: "31 到 39 間的偶數為 32、34、36、38，和為 140"
        }
      ],
      pitfalls: [
        "判斷偶數的核心積木：『數字 除以 2 的餘數 = 0』。",
        "端點包含性：若起始數本身為偶數，必須納入累加；結束數為偶數亦同。"
      ],
      images: [
        { src: "images/image22.png", caption: "Scratch 偶數和實作：起始數與結束數迴圈設定" },
        { src: "images/image21.png", caption: "Scratch 偶數判定積木：[數字 除以 2 的餘數 = 0]" },
        { src: "images/image20.png", caption: "Blockly 偶數和實作積木架構" }
      ],
      defaultTestInput: "10\n20"
    },
    {
      id: "triangle",
      category: "classic",
      badge: "核心題庫 02",
      title: "三角形判斷 (Triangle)",
      subtitle: "三邊關係幾何定理與最長邊優化算法",
      difficulty: 2,
      tags: ["幾何定理", "邏輯判斷", "排序/最大值"],
      desc: "請寫一個程式，一次輸入三個正整數，判斷能否組成一個三角形。若可以組成三角形輸出『yes』，否則輸出『no』。",
      spec: {
        input: "一次輸入三個正整數（以空格分隔）。",
        output: "若符合三角形條件輸出 yes，否則輸出 no。"
      },
      samples: [
        {
          input: "9 6 8",
          output: "yes",
          explain: "三邊為 6, 8, 9，兩短邊之和 6+8=14 > 9，可構成三角形"
        },
        {
          input: "1 2 3",
          output: "no",
          explain: "三邊為 1, 2, 3，兩短邊之和 1+2=3 並不大於 3，無法構成三角形"
        }
      ],
      pitfalls: [
        "傳統定理是『任意兩邊和大於第三邊』（需驗證三次）。",
        "極致優化技巧：先找出『最大邊』，只要檢驗『兩短邊之和 > 最大邊』即可，只需比較一次！"
      ],
      images: [
        { src: "images/image19.png", caption: "三角形思維：1.排序過 2.搜尋最大 3.最大邊與其餘兩邊比較" },
        { src: "images/image18.png", caption: "Scratch 三角形判斷積木：兩短邊和 > 最長邊" },
        { src: "images/image7.png", caption: "直接拿最大的邊跟其他兩邊和做比較，程式碼更精煉" }
      ],
      defaultTestInput: "9 6 8"
    },
    {
      id: "scratch-card",
      category: "classic",
      badge: "核心題庫 03",
      title: "刮刮樂 (Scratch Card)",
      subtitle: "六六大順得獎金額判斷與數值拆解避坑指南",
      difficulty: 3,
      tags: ["數值拆解", "商與餘數", "字串長度", "競賽防扣分"],
      desc: "彩券公司推出『六六大順』刮刮樂。每張彩券上有三個 0-9 的數字。規則：出現一個 6 得 100 元；出現兩個 6 得 300 元；出現三個 6 得 1000 元；若無 6 則得 0 元。請輸入三個數字，計算最高可得獎金。",
      spec: {
        input: "輸入三個 0-9 的數字（可為空格分隔或連續字串）。",
        output: "輸出一個整數，代表可獲得的獎金金額。"
      },
      samples: [
        {
          input: "6 6 6",
          output: "1000",
          explain: "出現 3 個 6 -> 1000 元"
        },
        {
          input: "6 0 6",
          output: "300",
          explain: "出現 2 個 6 -> 300 元"
        },
        {
          input: "1 6 3",
          output: "100",
          explain: "出現 1 個 6 -> 100 元"
        },
        {
          input: "1 2 3",
          output: "0",
          explain: "無任何 6 -> 0 元"
        }
      ],
      pitfalls: [
        "【重要比賽防扣分避坑】若使用字串取得第 1、2、3 字元的方式，遇到輸入帶有空格或格式變化時容易誤判而被扣分！",
        "【推薦標準解法】：使用正規數值拆解：百位 = 數字/100 無條件捨去；十位 = (數字%100)/10 無條件捨去；個位 = 數字%10，再計數 6 的個數，最為穩固！"
      ],
      images: [
        { src: "images/image6.png", caption: "刮刮樂解題伏筆提醒：字串取字元 vs 數值運算防扣分" },
        { src: "images/image5.png", caption: "Scratch 數值拆解：百位、十位、個位拆解邏輯" },
        { src: "images/image4.png", caption: "Scratch 獎金判斷條件分支（1000, 300, 100, 0）" },
        { src: "images/image14.png", caption: "Scratch 刮刮樂完整組裝積木" },
        { src: "images/image13.png", caption: "第二種方法：字串長度巡訪字元（需先轉文字）" },
        { src: "images/image12.png", caption: "字串法積木組裝" }
      ],
      defaultTestInput: "6 0 6"
    },
    {
      id: "amusement-park",
      category: "classic",
      badge: "核心題庫 04",
      title: "遊樂場門票 (Amusement Park Tickets)",
      subtitle: "兒童、成人與親子套票最佳省錢組合",
      difficulty: 2,
      tags: ["貪婪策略", "數值比較", "最佳化數學"],
      desc: "三六九主題遊樂園門票：兒童票 400 元、成人票 500 元。親子套票組每組 800 元（含 1 張兒童票及 1 張成人票）。輸入兒童人數與成人人數，請計算出最優惠（最便宜）的購票總花費。",
      spec: {
        input: "一次輸入兩個整數，分別為兒童人數與成人人數（空格分隔）。",
        output: "輸出一個整數，代表最優惠的總票價。"
      },
      samples: [
        {
          input: "5 5",
          output: "4000",
          explain: "5 兒童 + 5 成人 -> 購買 5 組親子套票：5 * 800 = 4000 元"
        },
        {
          input: "6 3",
          output: "3600",
          explain: "6 兒童 + 3 成人 -> 3 組親子套票(2400) + 3 張兒童票(1200) = 3600 元"
        }
      ],
      pitfalls: [
        "買親子套票（800 元）比單買 1 成人 + 1 兒童（500 + 400 = 900 元）省 100 元，因此套票越多越划算！",
        "親子套票組數上限為 min(兒童人數, 成人數)，剩餘的人數再分別依單獨票價購買。"
      ],
      images: [
        { src: "images/image11.png", caption: "先思考：把相同數量的兒童與成人湊成親子套票最省錢" },
        { src: "images/image10.png", caption: "Scratch 比較兒童與成人誰多誰少積木實作" },
        { src: "images/image9.png", caption: "遊樂場門票計算公式完整積木組裝" }
      ],
      defaultTestInput: "6 3"
    },
    {
      id: "singing-contest",
      category: "classic",
      badge: "核心題庫 05",
      title: "歌唱比賽成績 (Singing Contest)",
      subtitle: "去除首尾極端值求平均與字串轉型關鍵防坑",
      difficulty: 3,
      tags: ["排序演算法", "去極端值", "平均值", "型別轉型-0"],
      desc: "金嗓歌唱比賽邀請 5 位評審評分（0 到 10 分）。成績計算方式：從排序後的分數中，去除一個最高成績和一個最低成績，再計算剩餘分數的平均值。輸入評審分數，計算參賽者最終成績。",
      spec: {
        input: "輸入 5 位評審的分數（若有開頭輸入個數 5 亦可相容處理）。",
        output: "輸出一個整數，代表剩餘分數的平均成績（無條件捨去或整數）。"
      },
      samples: [
        {
          input: "5 10 8 9 9 9",
          output: "9",
          explain: "排序後 [8, 9, 9, 9, 10]，去除 8 與 10，剩餘 9, 9, 9，平均 27/3 = 9"
        },
        {
          input: "5 10 9 9 6 6",
          output: "8",
          explain: "排序後 [6, 6, 9, 9, 10]，去除 6 與 10，剩餘 6, 9, 9，平均 24/3 = 8"
        },
        {
          input: "5 7 7 7 7 7",
          output: "7",
          explain: "去除一個最高 7 與一個最低 7，剩餘 7, 7, 7，平均 21/3 = 7"
        }
      ],
      pitfalls: [
        "【極端重要避坑】：在 Scratch / Blockly 清單中取出的元素可能被判定為文字字串，使用加法時會發生誤判，相加時記得使用『元素 - 0』強制轉為數值型別！",
        "排序後直接取索引 2、3、4 的三個元素累加後除以 3。"
      ],
      images: [
        { src: "images/image45.png", caption: "歌唱比賽思考：去掉最大與最小的最快做法" },
        { src: "images/image41.png", caption: "Scratch 實作：排序後計次取第 2 到 (長度-1) 個" },
        { src: "images/image39.png", caption: "Blockly 清單取值與計算平均實作" },
        { src: "images/image38.png", caption: "【致命關鍵】清單相加時記得 -0 轉型，再算平均值！" }
      ],
      defaultTestInput: "5 10 8 9 9 9"
    },
    {
      id: "prime-sum",
      category: "classic",
      badge: "核心題庫 06",
      title: "質數和 (Prime Sum)",
      subtitle: "區間質數篩選、因數檢驗與無解輸出 0 特殊處理",
      difficulty: 3,
      tags: ["質數判定", "區間篩選", "因數檢驗", "邊界條件"],
      desc: "請輸入兩個正整數（100 以內，由小到大），找出兩正整數之間（含端點）的所有質數，並計算這些質數的和。若該區間內沒有任何質數，請輸出 0。",
      spec: {
        input: "輸入兩個正整數 A 與 B（A <= B，以空格或分行隔開）。",
        output: "輸出一個整數，代表區間內所有質數的和；若無質數則輸出 0。"
      },
      samples: [
        {
          input: "21 30",
          output: "52",
          explain: "21 至 30 間的質數有 23、29，質數和為 23+29 = 52"
        },
        {
          input: "13 19",
          output: "49",
          explain: "13 至 19 間的質數有 13、17、19，質數和為 13+17+19 = 49"
        },
        {
          input: "54 58",
          output: "0",
          explain: "54 至 58 間沒有任何質數，依題目要求輸出 0"
        }
      ],
      pitfalls: [
        "質數定義：大於 1 且除 1 與本身外無其他因數。注意 1 不是質數！",
        "若區間內找不到質數，必須輸出 0，初始化總和變數為 0 剛好吻合此需求。"
      ],
      images: [
        { src: "images/image36.png", caption: "質數和處理：先處理輸入範圍與清單初始化" },
        { src: "images/image52.png", caption: "Scratch 質數判定迴圈（除法餘數判定因數個數）" },
        { src: "images/image51.png", caption: "Blockly 質數判定積木與條件判斷" },
        { src: "images/image50.png", caption: "質數總和累積與無質數輸出 0 整合積木" }
      ],
      defaultTestInput: "21 30"
    },
    {
      id: "disaster-drill",
      category: "advanced",
      badge: "競賽實戰 02",
      title: "防災演習 (Disaster Drill Shelters)",
      subtitle: "收容所臨時屋容納計算與 0 人邊界特殊防呆",
      difficulty: 4,
      tags: ["貪婪填裝", "邊界處理", "條件跳出", "競賽評測"],
      desc: "防災中心舉行防災演習，將災民以運輸車送往收容所。收容所有多個臨時屋，依序各可容納不同人數。依序將災民安排進臨時屋，若第一間滿了再開放第二間，直到所有人都有安置。若所有臨時屋都不夠，則所有臨時屋都要開放。請統計共開放了幾間臨時屋。",
      spec: {
        input: "第一行整數 P（運輸人數）；第二行整數 M（臨時屋數量）；第三行輸入 M 個整數（各臨時屋可容納人數）。",
        output: "輸出一個整數，代表開放的臨時屋總數量。"
      },
      samples: [
        {
          input: "9\n3\n10 5 15",
          output: "1",
          explain: "運輸 9 人。第一間可容納 10 人即可滿足，因此只開放 1 間。"
        },
        {
          input: "50\n4\n30 20 15 55",
          output: "2",
          explain: "運輸 50 人。第 1 間(30)+第 2 間(20)=50 人，剛好容納，共開放 2 間。"
        },
        {
          input: "0\n2\n30 20",
          output: "0",
          explain: "【重要邊界】此次演習沒有任何人被運送 (0人)，因此總共開放 0 間臨時屋。"
        },
        {
          input: "37\n2\n10 20",
          output: "2",
          explain: "運輸 37 人，兩間總共只能容納 30 人，雖然仍不夠，但已全部開放，共開放 2 間。"
        }
      ],
      pitfalls: [
        "【陷阱關鍵】：一開始必須先判斷『運輸人數是否為 0』！若為 0 必須直接輸出 0，不可執行迴圈開放第一間！",
        "若人數大於所有臨時屋總和，輸出為全開（M 間），迴圈走完自動結算。"
      ],
      images: [
        { src: "images/image49.png", caption: "防災演習 Scratch 實作：0 人優先判斷、依序容納累加與跳出條件" }
      ],
      defaultTestInput: "9\n3\n10 5 15"
    },
    {
      id: "cinema-seats",
      category: "advanced",
      badge: "競賽實戰 03",
      title: "電影院找座位 (Cinema K-consecutive Seats)",
      subtitle: "連續空位排列組合公式 (座位-人數+1) 數學推導",
      difficulty: 4,
      tags: ["數學公式推導", "連續空位", "區段巡訪", "組合計算"],
      desc: "小華一家人去看電影，希望能找到連續 K 個空座位。整排座位中剩下的空位會形成幾段『連續空位』。輸入每一段連續空位的座位數，請計算小華一家人共有幾種方式可以在這一排中連坐下。",
      spec: {
        input: "第一行整數 K（連續座位需求人數）；第二行整數 S（連續空位區段數）；第三行輸入 S 個整數（各段連續空位長度）。",
        output: "輸出一個整數，代表所有可行的連坐方式總數。"
      },
      samples: [
        {
          input: "3\n2\n6 2",
          output: "4",
          explain: "長度 6 那段可坐 (6-3+1)=4 種；長度 2 不夠坐 (0 種) -> 合計 4 種。"
        },
        {
          input: "2\n3\n3 5 4",
          output: "9",
          explain: "長度 3: (3-2+1)=2；長度 5: (5-2+1)=4；長度 4: (4-2+1)=3 -> 2+4+3 = 9 種。"
        },
        {
          input: "4\n1\n4",
          output: "1",
          explain: "長度 4: (4-4+1) = 1 種。"
        },
        {
          input: "5\n3\n1 3 4",
          output: "0",
          explain: "所有空位段都小於 5，無任何連坐可能 -> 0 種。"
        }
      ],
      pitfalls: [
        "【數學推導核心】：連續 K 人在長度 L 的座位排法公式為：L >= K 時為『L - K + 1』種；若 L < K 則為 0 種。",
        "只需遍歷各段空位長度，將所有『L - K + 1』大於 0 的值加總即為正解！"
      ],
      images: [
        { src: "images/image15.png", caption: "電影院找座位連續排法圖解推導：座位數 - 人數 + 1" },
        { src: "images/image48.png", caption: "電影院找座位 Scratch 實作：長度判定與公式累加" }
      ],
      defaultTestInput: "3\n2\n6 2"
    },
    {
      id: "monopoly",
      category: "advanced",
      badge: "競賽實戰 04",
      title: "大富翁環形棋盤 (Monopoly Circular Board)",
      subtitle: "餘數定理座標循環轉換與金額非負保底機制",
      difficulty: 5,
      tags: ["餘數定理(mod)", "環形陣列", "非負保底", "高階模擬"],
      desc: "環形棋盤共有 N 格，每一格標示金錢變化（正、負或 0）。玩家起始在第 1 格，初始金額為 0。依序輸入骰子點數往前移動。每次移動後落在新格子立即結算金錢；若金額扣到不足則只會扣到 0 元，不會變負數。超過第 N 格時回到第 1 格繼續走。起點第 1 格不結算，只有移動後才結算。請計算最終金額。",
      spec: {
        input: "第一行整數 N（棋盤格數）；第二行 N 個整數（各格金錢變化）；第三行整數 M（骰子次數）；第四行 M 個整數（每次骰子點數）。",
        output: "輸出一個整數，代表玩家擲完所有骰子後的最終金額。"
      },
      samples: [
        {
          input: "5\n10 -5 0 20 -10\n3\n1 2 3",
          output: "15",
          explain: "起始在格 1(0元)。走 1 到格 2(-5)->0；走 2 到格 4(+20)->20；走 3 從格 4 走 3 步到格 2(-5)->15。"
        },
        {
          input: "4\n50 -20 10 -5\n4\n4 1 1 1",
          output: "35",
          explain: "走 4 到格 1(+50)->50；走 1 到格 2(-20)->30；走 1 到格 3(+10)->40；走 1 到格 4(-5)->35。"
        },
        {
          input: "3\n-10 5 -5\n2\n1 2",
          output: "0",
          explain: "走 1 到格 2(+5)->5；走 2 到格 1(-10)->扣到 0 -> 最終 0 元。"
        },
        {
          input: "2\n50 -30\n2\n6 6",
          output: "100",
          explain: "兩格棋盤。骰 6 走 3 圈回到格 1(+50)->50；再骰 6 又走 3 圈回到格 1(+50)->100。"
        }
      ],
      pitfalls: [
        "【環形座標餘數公式】：從 1-based 位置 pos 移動 step 步的新位置公式為：((pos - 1 + step) % N) + 1。",
        "【非負保底】：若結算後金額 < 0，必須立即設為 0，不可保留負數繼續累加！",
        "【起始規則】：一開始站在第 1 格時不結算金額，只有每次移動落點才結算。"
      ],
      images: [
        { src: "images/image26.png", caption: "大富翁餘數定理環形棋盤循環位置對應與 Scratch 完整實作" }
      ],
      defaultTestInput: "5\n10 -5 0 20 -10\n3\n1 2 3"
    }
  ]
};
