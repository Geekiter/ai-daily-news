---
title: AI 每日日报
---

在 GitHub Pages 上阅读归档的 AI 行业每日日报，最新在前。

{% assign reports = site.pages | where_exp: "p", "p.path contains 'reports/'" | sort: "name" | reverse %}
{% if reports.size > 0 %}
{% for r in reports %}
- [{{ r.name | remove: '.md' }}]({{ r.url | relative_url }})
{% endfor %}
{% else %}
_暂无日报_
{% endif %}
