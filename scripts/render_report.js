#!/usr/bin/env node
'use strict';

// 将日报数据（tmp_news.json）渲染为 reports/YYYY-MM-DD.md，并刷新 README 的日报索引。
// 用法: node scripts/render_report.js <tmp_news.json> <YYYY-MM-DD>

const fs = require('fs');
const path = require('path');

const COLUMNS = ['AI模型', '产品与功能更新', 'agent 落地', '语音/外呼 agent', 'github 热门项目', '技术博客', '博主社区', 'agent 设计论文', '社区热议'];
const ROOT = path.resolve(__dirname, '..');
const REPORTS_DIR = path.join(ROOT, 'reports');
const README_PATH = path.join(ROOT, 'README.md');
const INDEX_START = '<!-- REPORTS:START -->';
const INDEX_END = '<!-- REPORTS:END -->';

function usage() {
  console.error('用法: node scripts/render_report.js <tmp_news.json> <YYYY-MM-DD>');
  process.exit(2);
}

function render(data, date) {
  const lines = [`# AI 每日日报 · ${date}`, ''];

  for (const column of COLUMNS) {
    const items = Array.isArray(data[column]) ? data[column] : [];
    if (items.length === 0) continue; // 无资讯的栏目直接跳过
    lines.push(`## ${column}`, '');
    for (const item of items) {
      const title = (item && item.title) || '(无标题)';
      const link = (item && item.link) || '';
      lines.push(link ? `- **[${title}](${link})**` : `- **${title}**`, '');
      if (item && item.content) lines.push(`  ${item.content}`, '');
    }
  }
  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

function refreshIndex() {
  if (!fs.existsSync(README_PATH)) return;
  const files = fs
    .readdirSync(REPORTS_DIR)
    .filter((f) => /^\d{4}-\d{2}-\d{2}\.md$/.test(f))
    .sort()
    .reverse();
  const list = files.length
    ? files.map((f) => `- [${f.slice(0, 10)}](reports/${f})`).join('\n')
    : '_暂无日报_';

  const readme = fs.readFileSync(README_PATH, 'utf8');
  const start = readme.indexOf(INDEX_START);
  const end = readme.indexOf(INDEX_END);
  if (start === -1 || end === -1 || end < start) return;
  const updated =
    readme.slice(0, start + INDEX_START.length) +
    '\n' + list + '\n' +
    readme.slice(end);
  fs.writeFileSync(README_PATH, updated, 'utf8');
}

function main() {
  const [, , jsonPath, date] = process.argv;
  if (!jsonPath || !date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) usage();

  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const markdown = render(data, date);

  fs.mkdirSync(REPORTS_DIR, { recursive: true });
  const outFile = path.join(REPORTS_DIR, `${date}.md`);
  fs.writeFileSync(outFile, markdown, 'utf8');
  refreshIndex();

  console.log(`已生成 ${path.relative(process.cwd(), outFile) || outFile}`);
}

main();
