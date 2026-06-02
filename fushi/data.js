const STONES = [
  {
    id: "qinglong",
    name: "青龙",
    color: "#e74c3c",
    levels: {
      1: { activity: 393, speed: 97, support: 2.3, damage: 1.3, recovery: 1.3, drop: 2.3, dropResist: 1.6, negativeAgility: -20 },
      2: { activity: 791, speed: 195, support: 4.7, damage: 2.7, recovery: 2.7, drop: 4.6, dropResist: 3.3, negativeAgility: -40 },
      3: { activity: 1187, speed: 292, support: 7.2, damage: 4.1, recovery: 4.1, drop: 7.0, dropResist: 5.0, negativeAgility: -60 },
      4: { activity: 1583, speed: 389, support: 9.5, damage: 5.5, recovery: 5.5, drop: 9.3, dropResist: 6.7, negativeAgility: -79 },
      5: { activity: 1968, speed: 486, support: 12.0, damage: 6.9, recovery: 6.9, drop: 11.6, dropResist: 8.3, negativeAgility: -99 },
    },
  },
  {
    id: "zhuque",
    name: "朱雀",
    color: "#f39c12",
    levels: {
      1: { activity: 309, speed: 48, support: 0.8, damage: 6.6, recovery: 4.0, drop: 1.8, dropResist: 2.4, negativeAgility: -6 },
      2: { activity: 623, speed: 97, support: 1.6, damage: 13.1, recovery: 7.9, drop: 3.5, dropResist: 4.7, negativeAgility: -13 },
      3: { activity: 935, speed: 146, support: 2.5, damage: 19.6, recovery: 11.8, drop: 5.3, dropResist: 7.2, negativeAgility: -20 },
      4: { activity: 1247, speed: 194, support: 3.3, damage: 26.2, recovery: 15.8, drop: 7.2, dropResist: 9.5, negativeAgility: -27 },
      5: { activity: 1550, speed: 244, support: 4.1, damage: 32.7, recovery: 19.8, drop: 8.9, dropResist: 12.0, negativeAgility: -34 },
    },
  },
  {
    id: "baihu",
    name: "白虎",
    color: "#ecf0f1",
    levels: {
      1: { activity: 238, speed: 139, support: 3.9, damage: 2.7, recovery: 6.6, drop: 0.6, dropResist: 0.8, negativeAgility: -26 },
      2: { activity: 479, speed: 278, support: 7.9, damage: 5.5, recovery: 13.1, drop: 1.2, dropResist: 1.6, negativeAgility: -52 },
      3: { activity: 719, speed: 417, support: 11.9, damage: 8.3, recovery: 19.6, drop: 1.8, dropResist: 2.5, negativeAgility: -78 },
      4: { activity: 959, speed: 557, support: 15.8, damage: 11.1, recovery: 26.2, drop: 2.5, dropResist: 3.3, negativeAgility: -103 },
      5: { activity: 1192, speed: 695, support: 19.8, damage: 13.8, recovery: 32.7, drop: 3.1, dropResist: 4.1, negativeAgility: -129 },
    },
  },
  {
    id: "xuanwu",
    name: "玄武",
    color: "#3498db",
    levels: {
      1: { activity: 166, speed: 181, support: 1.6, damage: 4.0, recovery: 5.2, drop: 1.2, dropResist: 4.0, negativeAgility: -33 },
      2: { activity: 335, speed: 362, support: 3.3, damage: 7.9, recovery: 10.3, drop: 2.5, dropResist: 7.9, negativeAgility: -66 },
      3: { activity: 503, speed: 542, support: 5.0, damage: 11.8, recovery: 15.4, drop: 3.7, dropResist: 11.9, negativeAgility: -99 },
      4: { activity: 671, speed: 724, support: 6.7, damage: 15.8, recovery: 20.6, drop: 5.0, dropResist: 15.8, negativeAgility: -131 },
      5: { activity: 834, speed: 904, support: 8.3, damage: 19.8, recovery: 25.7, drop: 6.2, dropResist: 19.8, negativeAgility: -164 },
    },
  },
  {
    id: "qilin",
    name: "麒麟",
    color: "#9b59b6",
    levels: {
      1: { activity: 83, speed: 230, support: 3.0, damage: 5.2, recovery: 2.7, drop: 3.0, dropResist: 3.1, negativeAgility: -13 },
      2: { activity: 167, speed: 460, support: 6.2, damage: 10.3, recovery: 5.5, drop: 5.9, dropResist: 6.2, negativeAgility: -27 },
      3: { activity: 251, speed: 689, support: 9.3, damage: 15.4, recovery: 8.3, drop: 8.9, dropResist: 9.3, negativeAgility: -41 },
      4: { activity: 335, speed: 919, support: 12.4, damage: 20.6, recovery: 11.1, drop: 11.9, dropResist: 12.4, negativeAgility: -55 },
      5: { activity: 417, speed: 1148, support: 15.6, damage: 25.7, recovery: 13.8, drop: 14.8, dropResist: 15.6, negativeAgility: -69 },
    },
  },
];

const COLUMN_LABELS = {
  name: "符石",
  activity: "活跃",
  speed: "速度",
  support: "支援",
  damage: "伤害",
  recovery: "回复",
  drop: "落宝",
  dropResist: "抗落宝",
  negativeAgility: "负敏",
};

const PERCENT_KEYS = new Set(["support", "damage", "recovery", "drop", "dropResist"]);

const STAT_KEYS = [
  "activity",
  "speed",
  "support",
  "damage",
  "recovery",
  "drop",
  "dropResist",
  "negativeAgility",
];
