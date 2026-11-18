# 个人主页维护与回退

这次改版继续使用 Jekyll / GitHub Pages。新设计使用独立的 `_layouts/academic.html`、`assets/css/academic.css` 和 `assets/js/academic.js`，原模板文件保留。无需数据库、npm 构建或额外托管。

## 预览与上线

- 改版分支：`redesign/academic-homepage`。合并 PR 前，`master` 上的旧主页保持原样。
- 本地：安装 Ruby 和 Bundler，运行 `bundle install`，再运行 `bundle exec jekyll serve`，打开终端提供的地址。
- 构建：`bundle exec jekyll build --strict_front_matter`。
- 静态预览：构建后运行 `npm run dev`（仅需 Node.js，无需 npm install），再打开终端提供的地址。
- 构建后可运行 `python scripts/check_site.py` 检查页面、论文和站内资源链接。
- PR 合并到 `master` 后，现有 GitHub Pages 发布流程负责上线。可在仓库 Settings → Pages 查看发布状态。

## 回到旧版（保留历史）

改版前的完整版本：`f4e43ea1d218e0ace56de2e73435745ce576c845`。

GitHub 上已创建永久参照分支：[`backup/before-redesign-2026-11-18`](https://github.com/clearlove43967/clearlove43967.github.io/tree/backup/before-redesign-2026-11-18)。请保留此分支。

1. **PR 尚未合并**：关闭 PR 即可；线上仍然是旧版。
2. **PR 已合并**：打开合并后的 PR → 点击 **Revert** → 创建并合并回退 PR。GitHub Pages 会重新发布旧版。建议在没有其他修改混入时操作。
3. 如 GitHub 无法自动 Revert，可以在本地创建回退分支，并针对实际合并提交操作：merge commit 用 `git revert -m 1 <merge-commit-sha>`，squash commit 用 `git revert <squash-commit-sha>`。推送并通过 PR 合并即可。
4. 如之后已有其他更新，先检查 Revert 的差异，避免一起撤掉你想保留的新内容；备份分支始终可以作为比较依据。

不需要 force push，也不需要删除 Git 历史。回退后的访问统计由 ClustrMaps 账号保存，不会因网站代码回退而自动删除。

## 开通全球访客地图（ClustrMaps）

主页目前显示真实的静态世界地图，并标注统计尚未启用；没有假数字或假访客点。

1. 打开 [ClustrMaps](https://clustrmaps.com/)，注册并添加网站 `https://clearlove43967.github.io`。
2. 在服务提供的 widget / embed 页面中，选择 **2D map**，找到类似以下的站点专属代码：

   ```html
   <script id="clustrmaps" src="https://clustrmaps.com/map_v2.js?d=YOUR_SITE_ID&cl=ffffff&w=a"></script>
   ```

3. 复制 `d=` 后面、下一个 `&` 之前的 ID。编辑 `_config.yml` 底部：

   ```yaml
   visitor_map:
     enabled: true
     clustrmaps_id: "你的站点ID"
   ```

4. 提交后等待 GitHub Pages 发布，再访问正式主页。访客记录从接入后开始积累，无法补回历史访问量。地图位置是基于 IP 的大致位置，不是 GPS。
5. 如要暂停，设 `enabled: false`。默认不会加载第三方统计脚本；开启后浏览器会访问 ClustrMaps，并由其处理 IP 和访问统计。页面会显示服务来源。

无需把账号密码、API 密钥写入仓库。这里的 widget ID 是服务提供的公开嵌入标识。如果 ClustrMaps 提供的新版代码格式不同，请按其代码更新 `_includes/visitor-map.html`。

## 上传自己的照片

照片通过 GitHub 的文件上传保存，访客无法上传或修改你的照片。

1. 在仓库打开 [`images/photography/`](https://github.com/clearlove43967/clearlove43967.github.io/tree/master/images/photography)，点击 **Add file → Upload files**。建议使用小写英文文件名、JPG/WebP、长边约 2000px，并控制文件大小。
2. 编辑 `_data/photography.yml`，删除最底部的 `[]`，添加条目：

   ```yaml
   - image: /images/photography/hong-kong.jpg
     title: "An afternoon in Hong Kong"
     alt: "Sunlight falling across buildings beside Victoria Harbour"
     location: "Hong Kong"
     date: "2026-11"
     category: "City"

   - image: /images/photography/another-photo.webp
     title: "A quiet moment"
     alt: "请用文字描述照片中的实际内容"
     location: "Bristol"
     date: "2025-03"
     category: "Travel"
   ```

3. 提交并等待 Pages 发布。条目顺序就是展示顺序，分类按钮自动生成。照片支持点开大图、左右箭头切换、Esc 关闭和键盘操作。禁用 JavaScript 时仍然可以点击原图。
4. 删除照片时，同时删除对应 YAML 条目。恢复空相册时，将文件内容改回 `[]`。

尚未提供照片，因此摄影页先展示空相册说明，没有使用模板图片冒充你的作品。

## 更新论文 / 简介 / CV

- 简介与消息：`_pages/about.md`。
- 顶部导航：`_data/navigation.yml`。
- CV 下载：替换 `assets/CV.pdf`。
- 论文：`_publications/` 内每篇一个 Markdown 文件。可复制现有文件，修改标题、作者、会议、年份、日期、`kind`（`conference` 或 `preprint`）、链接、简介和 BibTeX。`permalink` 必须唯一。主页和论文列表共用这份数据。
- 作者中用 `**Jiantong Qin**` 加粗，`*` / `†` 标明贡献。论文按日期倒序排列。
- Publications 页的分类数量和年份范围自动生成。

论文按用户提供的 CV 更新，KDD 使用会议年份 2026，预印本使用 arXiv 年份 2026。ComUICoder 的 CV 未提供论文链接，因此没有臆造链接；拿到正式链接后，在对应文件加入 `paperurl: https://...` 即可。
