const { exec, spawn } = require("child_process");
const ora = require("ora");
const chalk = require("chalk");
const { resolve } = require("path");

module.exports = async (msg) => {
  const proc1 = exec(`git add .`, {
    cwd: `./`,
    shell: true,
  });
  proc1.on("exit", () => {
    console.log(chalk.blueBright("\nadd(暂存)"));
    const proc2 = exec(
      `git commit -m "${msg}"`,
      { cwd: `./`, shell: true },
      (error) => {
        if (error) console.log(error.stack);
      }
    );
    proc2.on("exit", (code) => {
      if (code === 0) {
        console.log(chalk.yellowBright("\ncommit(提交成功)\n"));
        const proc = spawn("git", ["push"], { cwd: `./`, shell: true });
        const spinner = ora(`${chalk.whiteBright("代码推送中...\n")}`).start();
        proc.stderr.on("data", (data) => {
          console.log(chalk.redBright(data.toString()));
        });
        proc.stdout.on("data", (data2) => {
          console.log("stdout：", data2.toString());
        });
        proc.on("close", () => {
          spinner.text = `${chalk.greenBright("\n推送完毕!!!")}`;
          spinner.succeed();
        });
      } else console.log(chalk.redBright("\ncommit(提交失败)\n"));
    });
  });
};
