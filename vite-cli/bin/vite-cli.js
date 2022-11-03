#! node

const { program } = require("commander");

program
  .version(`版本号：${require("../package.json").version}`)
  .usage("<Commands> [Options]");

program
  .command("download <name>")
  .description("下载项目")
  .action((name) => require("../lib/download")(name));
program
  .command("clone <name>")
  .description("克隆项目(支持gitee)")
  .action((name) => require("../lib/clone")(name));

program
  .command("push <message>")
  .description("代码上传")
  .action((msg) => require("../lib/push")(msg));

program.parse(process.argv);
