# Hexo-Generator-Search-Lite

[Hexo-Generator-Search-Lite](https://github.com/argvchs/hexo-generator-search-lite) 插件，用于生成 `json` 格式的搜索数据

## 安装

```bash
npm i hexo-generator-search-lite -S
```

## 配置

```yaml
search:
    path: # Default: search.json
    optimize: false # Optimize
```

## 数据

格式如下（不含文章内容）

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

    `sdata` 的内容为 Title Categories Tags 分别**去除空字符**并**转小写**后，再用空格连接

    ```json
    [
        {
            "path": "/post",
            "sdata": "title category tag"
        }
    ]
    ```
