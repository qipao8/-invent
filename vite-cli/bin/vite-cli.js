#! node

const { program } = require("commander");

program
  .version(`版本号：${require("../package.json").version}`)
  .usage("<Commands> [Options]")

program
  .command("init <name>")
  .description("初始化项目")
  .action((name) => require("../lib/init")(name));

program.parse(process.argv);
