# AI 每日日报

在 GitHub 上公开归档的 AI 行业每日日报。

- **在线阅读**（GitHub Pages）：https://blog.chenkeyan.com/ai-daily-news/
- **日报归档**：按日期存放在 [`reports/`](reports/)，文件名为 `YYYY-MM-DD.md`。
- **如何获取**：读取 `reports/` 下最新日期的文件，或看下方索引；raw 地址形如
  `https://raw.githubusercontent.com/Geekiter/ai-daily-news/main/reports/<YYYY-MM-DD>.md`。

## 日报索引

<!-- REPORTS:START -->
- [2026-11-27](reports/2026-11-27.md)
- [2026-11-26](reports/2026-11-26.md)
<!-- REPORTS:END -->

## 目录结构

```
.
├── README.md          # 仓库说明与日报索引
├── reports/           # 每日日报归档（YYYY-MM-DD.md）
└── scripts/
    ├── render_report.js  # 将数据渲染为 Markdown 并更新本索引
    └── publish.sh        # 渲染 + 提交 + 推送到本仓库
```

日报内容由自动化流程生成，仅供参考。
