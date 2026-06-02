const CREATURES = [
  {
    id: "qinglong",
    name: "青龙",
    color: "#e74c3c",
    levels: {
      1: { activity: 396, speed: 98, support: 2.4, damage: 1.4, recovery: 1.4, drop: 2.34, dropResist: 1.68, negativeAgility: -20 },
      2: { activity: 792, speed: 196, support: 4.8, damage: 2.8, recovery: 2.8, drop: 4.68, dropResist: 3.36, negativeAgility: -40 },
      3: { activity: 1188, speed: 294, support: 7.2, damage: 4.2, recovery: 4.2, drop: 7.02, dropResist: 5.04, negativeAgility: -60 },
      4: { activity: 1584, speed: 392, support: 9.6, damage: 5.6, recovery: 5.6, drop: 9.36, dropResist: 6.72, negativeAgility: -80 },
      5: { activity: 1980, speed: 490, support: 12.0, damage: 7.0, recovery: 7.0, drop: 11.7, dropResist: 8.4, negativeAgility: -100 },
    },
  },
  {
    id: "zhuque",
    name: "朱雀",
    color: "#f39c12",
    levels: {
      1: { activity: 312, speed: 49, support: 0.84, damage: 6.6, recovery: 4.0, drop: 1.8, dropResist: 2.4, negativeAgility: -7 },
      2: { activity: 624, speed: 98, support: 1.68, damage: 13.2, recovery: 8.0, drop: 3.6, dropResist: 4.8, negativeAgility: -14 },
      3: { activity: 936, speed: 147, support: 2.52, damage: 19.8, recovery: 12.0, drop: 5.4, dropResist: 7.2, negativeAgility: -21 },
      4: { activity: 1248, speed: 196, support: 3.36, damage: 26.4, recovery: 16.0, drop: 7.2, dropResist: 9.6, negativeAgility: -28 },
      5: { activity: 1560, speed: 245, support: 4.2, damage: 33.0, recovery: 20.0, drop: 9.0, dropResist: 12.0, negativeAgility: -35 },
    },
  },
  {
    id: "baihu",
    name: "白虎",
    color: "#ecf0f1",
    levels: {
      1: { activity: 240, speed: 140, support: 3.96, damage: 2.8, recovery: 6.6, drop: 0.63, dropResist: 0.84, negativeAgility: -26 },
      2: { activity: 480, speed: 280, support: 7.92, damage: 5.6, recovery: 13.2, drop: 1.26, dropResist: 1.68, negativeAgility: -52 },
      3: { activity: 720, speed: 420, support: 11.88, damage: 8.4, recovery: 19.8, drop: 1.89, dropResist: 2.52, negativeAgility: -78 },
      4: { activity: 960, speed: 560, support: 15.84, damage: 11.2, recovery: 26.4, drop: 2.52, dropResist: 3.36, negativeAgility: -104 },
      5: { activity: 1200, speed: 700, support: 19.8, damage: 14.0, recovery: 33.0, drop: 3.15, dropResist: 4.2, negativeAgility: -130 },
    },
  },
  {
    id: "xuanwu",
    name: "玄武",
    color: "#3498db",
    levels: {
      1: { activity: 168, speed: 182, support: 1.68, damage: 4.0, recovery: 5.2, drop: 1.26, dropResist: 3.96, negativeAgility: -33 },
      2: { activity: 336, speed: 364, support: 3.36, damage: 8.0, recovery: 10.4, drop: 2.52, dropResist: 7.92, negativeAgility: -66 },
      3: { activity: 504, speed: 546, support: 5.04, damage: 12.0, recovery: 15.6, drop: 3.78, dropResist: 11.88, negativeAgility: -99 },
      4: { activity: 672, speed: 728, support: 6.72, damage: 16.0, recovery: 20.8, drop: 5.04, dropResist: 15.84, negativeAgility: -132 },
      5: { activity: 840, speed: 910, support: 8.4, damage: 20.0, recovery: 26.0, drop: 6.3, dropResist: 19.8, negativeAgility: -165 },
    },
  },
  {
    id: "qilin",
    name: "麒麟",
    color: "#9b59b6",
    levels: {
      1: { activity: 84, speed: 231, support: 3.12, damage: 5.2, recovery: 2.8, drop: 2.97, dropResist: 3.12, negativeAgility: -14 },
      2: { activity: 168, speed: 462, support: 6.24, damage: 10.4, recovery: 5.6, drop: 5.94, dropResist: 6.24, negativeAgility: -28 },
      3: { activity: 252, speed: 693, support: 9.36, damage: 15.6, recovery: 8.4, drop: 8.91, dropResist: 9.36, negativeAgility: -42 },
      4: { activity: 336, speed: 924, support: 12.48, damage: 20.8, recovery: 11.2, drop: 11.88, dropResist: 12.48, negativeAgility: -56 },
      5: { activity: 420, speed: 1155, support: 15.6, damage: 26.0, recovery: 14.0, drop: 14.85, dropResist: 15.6, negativeAgility: -70 },
    },
  },
];

const COLUMN_LABELS = {
  name: "神兽",
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
