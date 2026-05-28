<div align="center">

# 垂耳兔 CLUB

**5.20 心动活动网页合集**

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-online-2ea44f?style=for-the-badge)](https://akihowaito.github.io/chuiertu/)
[![HTML](https://img.shields.io/badge/HTML-single%20page-ff69b4?style=for-the-badge)](./chuiertu_520_blindbox.html)
[![Status](https://img.shields.io/badge/Event-2026.05.20--05.31-f7b733?style=for-the-badge)](#活动信息)

一个为垂耳兔电竞 5.20 活动制作的轻量网页项目，包含心动盲盒、幸运转盘与活动入口页面。

[在线访问](https://akihowaito.github.io/chuiertu/) · [心动盲盒](https://akihowaito.github.io/chuiertu/chuiertu_520_blindbox.html) · [幸运转盘](https://akihowaito.github.io/chuiertu/chuiertu_520_luckywheel.html)

</div>

---

## 活动信息

| 项目 | 内容 |
| --- | --- |
| 活动名称 | 垂耳兔CLUB · 心动盲盒 |
| 活动时间 | 2026.05.20 00:00:00 - 2026.05.31 23:59:59 |
| 单盒价格 | ¥188 / 盒 |
| 入口方式 | 专属入场码 / 游客试玩模式 |
| 部署方式 | GitHub Pages |

## 页面入口

| 文件 | 说明 |
| --- | --- |
| [`index.html`](./index.html) | 活动首页 / 跳转入口 |
| [`chuiertu_520_blindbox.html`](./chuiertu_520_blindbox.html) | 心动盲盒主页面 |
| [`chuiertu_520_luckywheel.html`](./chuiertu_520_luckywheel.html) | 幸运转盘页面 |

## 功能亮点

- 专属入场码验证，支持已验证设备自动进入。
- 游客试玩模式，可预览开盒效果，不生成正式兑奖口令。
- 开盒动画、音效、震动反馈、彩带与稀有奖项特效。
- 本地保存开盒记录、战绩统计和兑奖口令。
- 活动时间窗口控制，过期后自动显示活动结束提示。

## 快速维护

修改活动截止时间时，在 `chuiertu_520_blindbox.html` 中搜索：

```js
const ACTIVITY_END = new Date(2026, 4, 31, 23, 59, 59);
```

注意：JavaScript 的月份从 `0` 开始计算，所以 `4` 代表 5 月。

修改结束弹窗文案时，搜索：

```html
活动时间：5.20 ~ 5.31
```

## 说明

本项目为静态网页活动页，适合 GitHub Pages 直接部署。前端入场码与本地记录适合轻量活动使用；如果需要更严格的兑奖、防刷或支付校验，建议接入后端服务。

---

<div align="center">

Made for 垂耳兔电竞 · akihowaito

</div>
