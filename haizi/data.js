/** 神结局孩子养育数据 — 来源：寒冰 5010 图文攻略截图 */

const ATTR_KEYS = [
  "qizhi",
  "neili",
  "zhili",
  "naili",
  "mingqi",
  "panni",
  "daode",
  "wanxing",
  "yangyuJin",
  "pilao",
];

const ATTR_LABELS = {
  qizhi: "气质",
  neili: "内力",
  zhili: "智力",
  naili: "耐力",
  mingqi: "名气",
  panni: "叛逆",
  daode: "道德",
  wanxing: "玩性",
  yangyuJin: "养育金",
  pilao: "疲劳",
};

const ACTION_TYPES = {
  guide: "引导",
  life: "生活",
  work: "实践",
  study: "学习",
};

/**
 * 属性变化：固定值用 number，浮动用 [min, max]
 * floating: true 表示游戏内每次收益有波动
 */
const ACTION_EFFECTS = {
  fudan: {
    floating: false,
    changes: { naili: 3, neili: 2 },
    note: "每次引导+6月",
  },
  jiawu: {
    floating: true,
    changes: { yangyuJin: 10, panni: [19, 25], qizhi: [-3, -1], pilao: [15, 19] },
  },
  huanggong: {
    floating: true,
    changes: { yangyuJin: -120, mingqi: [23, 29] },
    note: "不减疲劳，疲劳满也可去",
  },
  haibian: {
    floating: true,
    changes: { pilao: [-26, -23] },
    note: "比6岁减疲劳地点多约4点",
  },
  yewai: {
    floating: true,
    changes: { pilao: [-30, -28] },
    note: "遇乞丐不给",
  },
  yizhan: {
    floating: true,
    changes: { yangyuJin: 80, pilao: [15, 19] },
    note: "叛逆≥1150解锁",
  },
  taiyiyuan: {
    floating: true,
    changes: { pilao: [-35, -29] },
    note: "需道德≥50装备",
  },
  jianyao: {
    floating: true,
    changes: { yangyuJin: 100, pilao: [15, 18] },
  },
  yinlv: {
    floating: true,
    changes: { qizhi: [21, 26], yangyuJin: -120, pilao: [15, 17] },
  },
  difu: {
    floating: true,
    changes: { pilao: [-39, -34], wanxing: [1, 2], mingqi: -1 },
    note: "名气-1，得玩性",
  },
  yinhun: {
    floating: true,
    changes: { yangyuJin: 120, pilao: [15, 19] },
  },
  xingshang: {
    floating: true,
    changes: { pilao: [-41, -35], wanxing: 2, zhili: [-3, 3] },
    note: "勿选行商小贩（多扣属性）",
  },
  wushu: {
    floating: true,
    changes: { neili: [20, 27], yangyuJin: -120, pilao: [15, 17] },
  },
  meishu: {
    floating: true,
    changes: { naili: [20, 27], yangyuJin: -120, pilao: [15, 17] },
  },
  shiwen: {
    floating: true,
    changes: { zhili: [20, 27], yangyuJin: -120, pilao: [15, 17] },
  },
  wudao: {
    floating: true,
    changes: { qizhi: [18, 24], yangyuJin: -120, pilao: [15, 17] },
  },
  zongjiao: {
    floating: true,
    changes: { neili: [18, 24], yangyuJin: -120, pilao: [15, 17] },
  },
  jianzhu: {
    floating: true,
    changes: { zhili: [18, 24], yangyuJin: -120, pilao: [15, 17] },
  },
  qishu: {
    floating: true,
    changes: { naili: [18, 24], yangyuJin: -120, pilao: [15, 17] },
  },
  lvyou: {
    floating: false,
    changes: { pilao: -280 },
    cost: "800W大话币或1000W师贡",
    note: "疲劳>300时用；寒冰示例11次，对话给钱多时可略少",
  },
  maimeng: {
    floating: false,
    changes: { yangyuJin: 900 },
    cost: "1000W师贡",
    note: "养育金<120时用",
  },
};

/** 18 岁成年判定神结局的门槛（寒冰 5010 路线） */
const SHENJIJU_REQUIREMENTS = [
  { label: "气质", min: 999, recommend: "建议 1100+" },
  { label: "内力", min: 999, recommend: "建议 1100+" },
  { label: "智力", min: 999, recommend: "建议 1100+" },
  { label: "耐力", min: 999, recommend: "建议 1100+" },
  { label: "名气", min: 999, recommend: "建议 1100+" },
  { label: "叛逆", min: 1199, recommend: "成年即判定结局类型" },
];

/** 各岁始末属性 — 摘自攻略截图/原文（带≈表约数） */
const AGE_SNAPSHOTS = {
  "0-6": {
    start: {
      qizhi: 0, neili: 0, zhili: 0, naili: 0, mingqi: 0, panni: 0,
      daode: 0, wanxing: 0, yangyuJin: 0, pilao: 0,
    },
    end: {
      qizhi: 0, neili: 24, zhili: 0, naili: 36, mingqi: 0, panni: 0,
      daode: 0, wanxing: 0, yangyuJin: 2160, pilao: 0,
    },
    careerEval: 1568,
    source: "12本百年茯苓后 6岁0个月截图",
  },
  6: {
    start: {
      qizhi: 0, neili: 24, zhili: 0, naili: 36, mingqi: 0, panni: 0,
      daode: 0, wanxing: 0, yangyuJin: 2160, pilao: 0,
    },
    end: {
      qizhi: 0, neili: 24, zhili: 0, naili: 36, mingqi: 450, panni: 400,
      daode: 0, wanxing: 0, yangyuJin: 180, pilao: 302,
    },
    approxEnd: ["mingqi", "panni", "pilao"],
    careerEval: { start: 1568, end: 3169 },
    source: "6岁攻略原文：名气≈450 叛逆≈400 疲劳>300",
  },
  7: {
    start: {
      qizhi: 0, neili: 24, zhili: 0, naili: 36, mingqi: 454, panni: 398,
      daode: 0, wanxing: 0, yangyuJin: 180, pilao: 302,
    },
    end: {
      qizhi: 0, neili: 24, zhili: 0, naili: 36, mingqi: 530, panni: 820,
      daode: 0, wanxing: 0, yangyuJin: 10, pilao: 280,
    },
    approxEnd: ["mingqi", "panni", "pilao"],
    careerEval: { start: 3169, end: 3462 },
    source: "7岁0个月截图 / 7岁攻略原文",
  },
  8: {
    start: {
      qizhi: 0, neili: 24, zhili: 0, naili: 36, mingqi: 536, panni: 821,
      daode: 0, wanxing: 0, yangyuJin: 10, pilao: 287,
    },
    end: {
      qizhi: 0, neili: 24, zhili: 0, naili: 36, mingqi: 639, panni: 1145,
      daode: 0, wanxing: 0, yangyuJin: 80, pilao: 286,
    },
    approxEnd: ["mingqi", "panni", "pilao"],
    careerEval: { start: 3473, end: 3643 },
    source: "8岁0个月截图 / 8岁攻略原文",
  },
  9: {
    start: {
      qizhi: 0, neili: 24, zhili: 0, naili: 36, mingqi: 639, panni: 1145,
      daode: 0, wanxing: 0, yangyuJin: 80, pilao: 286,
    },
    end: {
      qizhi: 96, neili: 24, zhili: 0, naili: 36, mingqi: 839, panni: 1145,
      daode: 0, wanxing: 0, yangyuJin: 40, pilao: 280,
    },
    approxEnd: ["pilao"],
    careerEval: { start: 3643, end: 3935 },
    source: "9岁0个月截图 / 9岁攻略原文",
  },
  10: {
    start: {
      qizhi: 96, neili: 24, zhili: 0, naili: 36, mingqi: 839, panni: 1145,
      daode: 0, wanxing: 0, yangyuJin: 40, pilao: 280,
    },
    end: {
      qizhi: 146, neili: 24, zhili: 0, naili: 36, mingqi: 1141, panni: 1145,
      daode: 0, wanxing: 5, yangyuJin: 40, pilao: 274,
    },
    approxEnd: ["mingqi", "pilao"],
    careerEval: { start: 3935, end: 3912 },
    source: "10岁0个月截图 / 10岁攻略原文",
  },
  11: {
    start: {
      qizhi: 146, neili: 24, zhili: 0, naili: 36, mingqi: 1141, panni: 1145,
      daode: 0, wanxing: 5, yangyuJin: 40, pilao: 274,
    },
    end: {
      qizhi: 409, neili: 24, zhili: 0, naili: 36, mingqi: 1155, panni: 1145,
      daode: 0, wanxing: 17, yangyuJin: 160, pilao: 288,
    },
    approxEnd: ["mingqi", "panni", "pilao"],
    careerEval: { start: 3912, end: 3769 },
    source: "11岁0个月截图 / 11岁攻略原文",
  },
  12: {
    start: {
      qizhi: 409, neili: 24, zhili: 0, naili: 36, mingqi: 1155, panni: 1145,
      daode: 0, wanxing: 17, yangyuJin: 160, pilao: 288,
    },
    end: {
      qizhi: 725, neili: 24, zhili: 0, naili: 36, mingqi: 1155, panni: 1145,
      daode: 0, wanxing: 41, yangyuJin: 40, pilao: 292,
    },
    approxEnd: ["panni", "mingqi", "pilao"],
    careerEval: { start: 3769, end: 3350 },
    source: "12岁0个月截图 / 12岁攻略原文",
  },
  "13-17": {
    start: {
      qizhi: 725, neili: 24, zhili: 0, naili: 36, mingqi: 1155, panni: 1145,
      daode: 0, wanxing: 41, yangyuJin: 40, pilao: 292,
    },
    end: {
      qizhi: 1100, neili: 1100, zhili: 1100, naili: 1100, mingqi: 1180, panni: 1200,
      daode: 100, wanxing: 0, yangyuJin: 290, pilao: 96,
    },
    approxEnd: ["qizhi", "neili", "zhili", "naili", "mingqi", "daode", "yangyuJin", "pilao"],
    careerEval: { start: 3350 },
    source: "进入：13岁0个月截图；结束：寒冰17岁10月补属性后约数（无新场景，五年一贯）",
  },
};

const AGE_STAGES = [
  {
    id: "requirements",
    label: "神结局要求",
    stageKind: "requirements",
    goal: "18 岁成年时判定神结局，只看五维 + 叛逆",
    hints: [
      "五维（气质/内力/智力/耐力/名气）至少 999，寒冰路线建议冲到 1100 左右",
      "叛逆 ≥1199 即获神结局（如倾国女神），成年时直接判定，无额外操作",
      "玩性、道德、职业评价不影响是否神结局；5010 等为成年后优化目标，见「成年后」",
    ],
    actions: [],
  },
  {
    id: "0-6",
    label: "0-6岁（襁褓期）",
    opsPerYear: null,
    goal: "茯苓打底：内力+2、耐力+3/次",
    hints: [
      "12次百年茯苓引导，到6岁养育金约2160",
      "智力、气质保持0，后面被扣属性时不亏",
    ],
    actions: [
      { id: "fudan", name: "百年茯苓", type: "guide", scene: "引导", count: 12, effectKey: "fudan" },
    ],
  },
  {
    id: "6",
    label: "6岁",
    opsPerYear: 36,
    goal: "刷叛逆+名气，不动气质智力",
    hints: [
      "循环：做家务→疲劳满300→皇宫（养育金≥120）→再家务",
      "家务+叛逆、-气质；皇宫+名气、-120养育金，不减疲劳",
    ],
    actions: [
      { id: "jiawu", name: "做家务", type: "work", scene: "实践", count: 18, effectKey: "jiawu" },
      { id: "huanggong", name: "皇宫", type: "life", scene: "生活", count: 18, effectKey: "huanggong" },
    ],
  },
  {
    id: "7",
    label: "7岁",
    opsPerYear: 36,
    goal: "继续刷叛逆名气，海边只在必要时减疲劳",
    hints: [
      "能家务+皇宫时别急着生活减疲劳",
      "海边比6岁多减约4点疲劳，实践干不动再用",
    ],
    actions: [
      { id: "haibian", name: "海边", type: "life", scene: "生活", count: 14, effectKey: "haibian" },
      { id: "jiawu", name: "做家务", type: "work", scene: "实践", count: 19, effectKey: "jiawu" },
      { id: "huanggong", name: "皇宫", type: "life", scene: "生活", count: 3, effectKey: "huanggong" },
    ],
  },
  {
    id: "8",
    label: "8岁",
    opsPerYear: 36,
    goal: "叛逆冲1150，解锁驿站收银",
    hints: [
      "叛逆≥1150后实践改驿站收银，赚养育金更多",
      "野外减疲劳，遇乞丐不要给（扣道德）",
    ],
    actions: [
      { id: "jiawu", name: "做家务", type: "work", scene: "实践", count: 15, effectKey: "jiawu", note: "叛逆<1150" },
      { id: "yewai", name: "野外", type: "life", scene: "生活", count: 12, effectKey: "yewai" },
      { id: "huanggong", name: "皇宫", type: "life", scene: "生活", count: 4, effectKey: "huanggong" },
      { id: "yizhan", name: "驿站收银", type: "work", scene: "实践", count: 5, effectKey: "yizhan" },
    ],
  },
  {
    id: "9",
    label: "9岁",
    opsPerYear: 36,
    goal: "开始加气质，继续补名气",
    hints: [
      "去太医院前孩子穿道德≥50装备",
      "9岁10月查气质（含装备）>70，不够多学音律",
    ],
    actions: [
      { id: "taiyiyuan", name: "太医院", type: "life", scene: "生活", count: 10, effectKey: "taiyiyuan" },
      { id: "jianyao", name: "太医院煎药", type: "work", scene: "实践", count: 14, effectKey: "jianyao" },
      { id: "yinlv", name: "音律", type: "study", scene: "学习", count: 4, effectKey: "yinlv" },
      { id: "huanggong", name: "皇宫", type: "life", scene: "生活", count: 8, effectKey: "huanggong" },
    ],
  },
  {
    id: "10",
    label: "10岁",
    opsPerYear: 36,
    goal: "解锁阴魂引路，名气冲1150+",
    hints: [
      "名气、气质（装备后）均>70，先去地府生活1次解锁阴魂引路",
      "循环：地府减疲劳→阴魂赚金→皇宫补名气/音律加气质（地府名气-1、得玩性）",
    ],
    actions: [
      { id: "difu", name: "地府", type: "life", scene: "生活", count: 8, effectKey: "difu" },
      { id: "yinhun", name: "阴魂引路", type: "work", scene: "实践", count: 14, effectKey: "yinhun" },
      { id: "yinlv", name: "音律", type: "study", scene: "学习", count: 2, effectKey: "yinlv" },
      { id: "huanggong", name: "皇宫", type: "life", scene: "生活", count: 12, effectKey: "huanggong" },
    ],
  },
  {
    id: "11",
    label: "11岁",
    opsPerYear: 36,
    goal: "三点一线刷气质，补名气",
    hints: [
      "继续地府→阴魂→皇宫/音律，无新地图",
      "11岁11月视面板补1次皇宫名气",
    ],
    actions: [
      { id: "difu", name: "地府", type: "life", scene: "生活", count: 11, effectKey: "difu" },
      { id: "yinhun", name: "阴魂引路", type: "work", scene: "实践", count: 13, effectKey: "yinhun" },
      { id: "yinlv", name: "音律", type: "study", scene: "学习", count: 11, effectKey: "yinlv" },
      { id: "huanggong", name: "皇宫", type: "life", scene: "生活", count: 1, effectKey: "huanggong", note: "11岁11月补名气" },
    ],
  },
  {
    id: "12",
    label: "12岁",
    opsPerYear: 36,
    goal: "音律满30，为13岁花钱期做准备",
    hints: [
      "行商勿选小贩（多扣属性）；音律满30后改学武术",
      "岁末养育金花光、疲劳拉满，方便13岁卖萌/旅游",
    ],
    actions: [
      { id: "xingshang", name: "行商", type: "life", scene: "生活", count: 11, effectKey: "xingshang" },
      { id: "yinhun", name: "阴魂引路", type: "work", scene: "实践", count: 12, effectKey: "yinhun" },
      { id: "yinlv", name: "音律", type: "study", scene: "学习", count: 13, effectKey: "yinlv" },
    ],
  },
  {
    id: "13-17",
    label: "13-17岁",
    opsPerYear: null,
    opsTotal: 180,
    yearSpan: "5年（13岁0月–17岁12月）",
    goal: "五维冲1100+：四门拉主属性，大学课补缺口",
    hints: [
      "疲劳>300旅游，养育金<120卖萌（寒冰示例旅游11、卖萌20）",
      "音律→气质，武术→内力，美术→耐力，诗文→智力；再补舞蹈/宗教/建筑/骑术",
      "17岁10月按面板补低属性；零花钱多时可少旅游",
    ],
    actions: [
      {
        id: "lvyou",
        name: "旅游",
        type: "life",
        scene: "生活",
        count: 11,
        effectKey: "lvyou",
        note: "寒冰示例11次；对话给10万换50养育金多则旅游可略少",
      },
      {
        id: "maimeng",
        name: "卖萌要钱",
        type: "work",
        scene: "实践",
        count: 20,
        effectKey: "maimeng",
        note: "寒冰示例20次",
      },
      { id: "yinlv", name: "音律", type: "study", scene: "学习", count: 30, effectKey: "yinlv" },
      { id: "wushu", name: "武术", type: "study", scene: "学习", count: 30, effectKey: "wushu" },
      { id: "meishu", name: "美术", type: "study", scene: "学习", count: 30, effectKey: "meishu" },
      { id: "shiwen", name: "诗文", type: "study", scene: "学习", count: 30, effectKey: "shiwen" },
      { id: "wudao", name: "舞蹈", type: "study", scene: "学习", count: 15, effectKey: "wudao", note: "寒冰神结局示例" },
      { id: "jianzhu", name: "建筑", type: "study", scene: "学习", count: 14, effectKey: "jianzhu", note: "寒冰神结局示例" },
      { id: "zongjiao", name: "宗教", type: "study", scene: "学习", count: 16, effectKey: "zongjiao", note: "寒冰神结局示例" },
      { id: "qishu", name: "骑术", type: "study", scene: "学习", count: 13, effectKey: "qishu", note: "寒冰神结局示例" },
    ],
  },
  {
    id: "adulthood",
    label: "成年后",
    stageKind: "adulthood",
    goal: "成年后的玩性与装备调整",
    infoSections: [
      {
        title: "玩性处理",
        items: [
          "玩性不挡神结局，但会拉低职业评价（参战天资发动看评价）",
          "养育期地府、行商顺带加玩性，不必在 18 岁前刻意压到 0",
          "成年后无字天书洗到 0，把玩性点数转进主属性，冲 5010 等更高评价",
          "若继续追评价：柜坊 +3 玩性，再配合天书转属性；乞丐补道德仅成年后可用",
        ],
      },
      {
        title: "装备影响",
        items: [
          "道德装备：孩子穿道德 ≥50 才能进太医院（9 岁起），养育期靠装备凑门槛，不必刷道德值",
          "气质等装备：9 岁 10 月查气质、10 岁解锁阴魂引路，看的是装备加成后的面板",
          "18 岁神结局截图多为穿装备后的属性；道德主要靠成年换装备补",
          "追 5078 等更高评价时，可继续通过装备微调五维与道德",
        ],
      },
      {
        title: "其他",
        items: [
          "亲密、孝心成年后再追；技能修行用打工孩子赚养育金慢慢修到 10 级",
        ],
      },
    ],
    actions: [],
  },
];
