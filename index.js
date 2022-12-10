const config = hexo.config;
function procstr(str) {
    if (typeof str === "undefined" || str == null) return "";
    return str.toLowerCase().replace(/\s+/g, "");
}
hexo.extend.generator.register("json", locals => {
    let posts = locals.posts.sort("-date"),
        data = [];
    posts?.each(post => {
        if (config.search?.optimize) {
            let odata = procstr(post.title);
            if (post.categories) odata += " " + post.categories.map(i => procstr(i.name)).join(" ");
            if (post.tags) odata += " " + post.tags.map(i => procstr(i.name)).join(" ");
            data.push({ path: config.root + post.path, odata });
        } else
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
    return {
        path: config.search?.path || "/search.json",
        data: JSON.stringify(data),
    };
});
