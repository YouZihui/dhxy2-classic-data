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
| 孩子养育 | [`haizi/`](https://github.com/YouZihui/dhxy2-classic-data/tree/main/haizi) | 神结局 5010 路线，按年龄查看属性变化、行为次数与每次收益 |

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
- 孩子养育：https://youzihui.github.io/dhxy2-classic-data/haizi/

## 自动部署

本站为纯静态 HTML（`index.html`、`assets/`、`fushi/`、`haizi/` 等），**无需 npm 构建**。

`git push` 到 `main` 后，GitHub Actions 会通过 SSH 触发服务器上的部署脚本（见 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)）。

### GitHub Secrets（Settings → Secrets and variables → Actions）

部署凭据由运维在仓库 Secrets 中配置，**勿写入代码**：

| Secret | 说明 |
| --- | --- |
| `SSH_HOST` | 服务器 IP |
| `SSH_USER` | SSH 登录用户名 |
| `SSH_PRIVATE_KEY` | 部署专用 SSH 私钥全文 |

服务器初始化与 `deploy.sh` 脚本由运维在服务器侧维护；Actions 失败时可 SSH 登录手动执行部署脚本排错。

### 日常更新

1. 修改 HTML / JS / CSS
2. `git push origin main`
3. 在仓库 **Actions** 页确认 workflow 成功
4. 访问线上站点验证
