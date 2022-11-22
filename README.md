# Hexo-Generator-Search-Lite

[Hexo-Generator-Search-Lite](https://github.com/argvchs/hexo-generator-search-lite) 插件，用于生成 `json` 格式的搜索数据

## 安装

把 `main.js` 的内容复制到 `/scripts/hexo-generator-search-lite.js` 即可

```js
// main.js
const config = hexo.config;
const path = config.search?.path || "search.json";
hexo.extend.generator.register("json", locals => {
    let posts = locals.posts.sort("-date"),
        data = [];
    posts?.each(post => {
        if (post.nosearch) return;
        data.push({
            path: config.root + post.path,
            title: post.title,
            date: post.date.format("YYYY/M/D"),
            tags: post.tags?.map(tag => ({ name: tag.name, path: config.root + tag.path })),
            categories: post.categories?.map(category => ({
                name: category.name,
                path: config.root + category.path,
            })),
        });
    });
    let json = JSON.stringify(data);
    return { path: path, data: json };
});
```

## 配置

```yaml
search:
    path: # Default: search.json
    optimize: false # Optimize
```

## 数据

格式如下（不含文章内容）

**Front-Matter 中设置了 `nosearch` 的不会添加到搜索数据**

-   `optimize: false`

    ```json
    [
        {
            "path": "/post",
            "title": "post",
            "date": "YYYY/M/D",
            "categories": [
                {
                    "name": "category",
                    "path": "/categories/category"
                }
            ],
            "tags": [
                {
                    "name": "tag",
                    "path": "/tags/tag"
                }
            ]
        }
    ]
    ```

-   `optimize: true`

    `sdate` 的内容为 Title Categories Tags 去除空字符并转小写后，再用空格链接

    ```json
    [
        {
            "path": "/post",
            "sdata": "title category tag"
        }
    ]
    ```
