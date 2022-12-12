const config = hexo.config;
function rstr(s) {
    if (!s) return "";
    return s.toLowerCase().replace(/\s+/gm, "");
}
hexo.extend.generator.register("json", locals => {
    let posts = locals.posts.sort("-date"),
        data = [];
    posts?.each(post => {
        if (config.search?.optimize) {
            let odata = rstr(post.title);
            if (post.categories?.length)
                odata += " " + post.categories.map(i => rstr(i.name)).join(" ");
            if (post.tags?.length) odata += " " + post.tags.map(i => rstr(i.name)).join(" ");
            data.push({ path: encodeURI(config.root + post.path), odata });
        } else
            data.push({
                path: encodeURI(config.root + post.path),
                title: post.title,
                date: post.date.format("YYYY/M/D"),
                tags: post.tags?.map(tag => ({
                    name: tag.name,
                    path: encodeURI(config.root + tag.path),
                })),
                categories: post.categories?.map(category => ({
                    name: category.name,
                    path: encodeURI(config.root + category.path),
                })),
            });
    });
    return {
        path: config.search?.path || "/search.json",
        data: JSON.stringify(data),
    };
});
