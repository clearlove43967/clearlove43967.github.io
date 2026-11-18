# Jiantong Qin · Personal homepage

学术主页：[clearlove43967.github.io](https://clearlove43967.github.io)。使用 Jekyll / GitHub Pages，蓝白配色，包含个人介绍、论文、CV、摄影栏目，以及可选的全球访客地图。

## 维护入口

请阅读 **[维护与回退指南](docs/MAINTENANCE.md)**，其中包含：

- 上传照片、填写说明与分类；
- 开通 ClustrMaps 并接入真实访客统计；
- 更新论文、个人介绍和 CV；
- 使用备份分支或 Revert PR 回到改版前。

## 本地运行

```sh
bundle install
bundle exec jekyll serve
```

也可先 `bundle exec jekyll build --strict_front_matter`，再使用 Node.js 运行 `npm run dev` 预览生成的 `_site/`（不需要 npm install）。

```sh
python scripts/check_site.py
```

原站点基于 [Academic Pages](https://github.com/academicpages/academicpages.github.io) / Minimal Mistakes，原模板文件和 MIT 许可证保留。改版前参照：`backup/before-redesign-2026-11-18`。
