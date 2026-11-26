#!/usr/bin/env bash
# 渲染、提交并推送一期日报到本仓库。
# 用法: ./scripts/publish.sh <tmp_news.json> <YYYY-MM-DD>
set -euo pipefail

if [ "$#" -ne 2 ]; then
  echo "用法: $0 <tmp_news.json> <YYYY-MM-DD>" >&2
  exit 2
fi

JSON_PATH="$1"
DATE="$2"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [ ! -f "$JSON_PATH" ]; then
  echo "找不到数据文件: $JSON_PATH" >&2
  exit 2
fi

node "$ROOT/scripts/render_report.js" "$JSON_PATH" "$DATE"

git -C "$ROOT" add "reports/$DATE.md" README.md
if git -C "$ROOT" diff --cached --quiet; then
  echo "无变更，跳过提交"
else
  git -C "$ROOT" commit -m "docs(reports): add AI daily report $DATE"
fi

git -C "$ROOT" push
echo "已同步 reports/$DATE.md 到远端"
