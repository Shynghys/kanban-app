const {
    defineConfig
} = require('@vue/cli-service');
const path = require(`path`);
module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        resolve: {
            symlinks: false,
            alias: {
                vue: path.resolve(`./node_modules/vue`)
            }
        }
    },
    publicPath: process.env.NODE_ENV === "production" ? "/kanban-app/" : "/",
})