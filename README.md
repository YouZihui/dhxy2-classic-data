# 大话西游2经典版 · 数据查阅

方便查看《大话西游2经典版》各类游戏数据的静态网页仓库。首页汇总各模块入口，后续会持续补充更多数据页面。

## 免责声明

本仓库及页面由玩家自发整理，**非网易官方**产品，与网易公司及《大话西游2经典版》运营方无关。

- 数据来源于游戏内实测整理，仅供查阅参考，不保证与游戏内实时数值完全一致。
- 《大话西游2经典版》及其名称、美术等内容的知识产权归网易公司等权利人所有。
- 如有侵权或需更正，请通过 [GitHub Issues](https://github.com/YouZihui/dhxy2-classic-data/issues) 联系处理。

## 已收录数据

| 模块 | 路径 | 说明 |
| --- | --- | --- |
| 符石属性 | [`fushi/`](https://github.com/YouZihui/dhxy2-classic-data/tree/main/fushi) | 青龙、朱雀、白虎、玄武、麒麟各等级属性，支持按等级查看与属性排序 |

## 目录结构

```
.
├── index.html          # 首页，跳转至各数据模块
├── assets/             # 公共样式与图片
│   ├── common.css
│   ├── home.css
│   ├── side-decor.css
│   └── images/
│       ├── decor-left.png   # 青龙侧栏装饰
│       └── decor-right.png  # 朱雀侧栏装饰
└── fushi/              # 符石属性
    ├── index.html
    ├── data.js
    ├── app.js
    └── styles.css
```

新增数据模块时，在根目录下新建子目录（如 `xxx/`），并在首页 `index.html` 的目录区添加入口卡片即可。

## 本地预览

在项目目录运行：

```bash
npx serve .
```

然后访问：

- 首页：http://localhost:3000
- 符石属性：http://localhost:3000/fushi/

## 在线访问

仓库：[YouZihui/dhxy2-classic-data](https://github.com/YouZihui/dhxy2-classic-data)

启用 [GitHub Pages](https://github.com/YouZihui/dhxy2-classic-data/settings/pages)（`main` 分支、根目录 `/`）后，可通过以下地址访问：

- 首页：https://youzihui.github.io/dhxy2-classic-data/
- 符石属性：https://youzihui.github.io/dhxy2-classic-data/fushi/
