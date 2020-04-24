#!/usr/bin/env node
const program = require("commander");
const chalk = require("chalk");
// console.log(process.argv)
program.action(() => {
    console.log("refresh .... ");
});
program.parse(process.argv);
const fs = require("fs");
const handlebars = require("handlebars");
const temp = fs.readdirSync("./src/views");
console.warn(" temp::::", temp);
const list = fs
    .readdirSync("./src/views")
    .filter((v) => v !== "Home.vue")
    .map((v) => ({
        name: v.replace(".vue", "").toLowerCase(),
        file: v,
    }));
compile(
    {
        list,
    },
    "./src/router.js",
    "./template/router.js.hbs"
);
compile(
    {
        list,
    },
    "./src/App.vue",
    "./template/App.vue.hbs"
);
function compile(meta, filePath, templatePath) {
    console.warn(' meta ******:',meta,' filePath:',filePath,' templatePath:',templatePath)
    if (fs.existsSync(templatePath)) {
        const content = fs.readFileSync(templatePath).toString();
        const result = handlebars.compile(content)(meta);
        console.warn(' content >>>>:',content,'\n result >>>>:',result)
        fs.writeFileSync(filePath, result);
    }
    console.log(chalk.green(`🚀${filePath} 创建成功`));
}
