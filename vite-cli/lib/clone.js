// 异步编程思想
const { promisify } = require("util");
// 运行命令的子进程
const { spawn, exec } = require("child_process");
// 艺术字体
const figlet = promisify(require("figlet"));
// 清空命令行
const clear = require("clear");
// 彩色命令行输出
const chalk = require("chalk");
// 彩色加载图案
const ora = require("ora");
// 绿色提示
const log = (content) => console.log(chalk.green(content));

const syncSpawn = async (...args) =>
  new Promise((resolve) => {
    const proc = spawn(...args);
    const ret = [];
    proc.stdout.on("data", (data) => ret.push(data));
    proc.on("close", () => {
      resolve(Buffer.concat(ret).toString());
    });
  });

// 进入项目目录安装依赖
async function install(name) {
  const spinner = ora("依赖安装中...").start();
  spinner.color = "redBright";
  await syncSpawn("pnpm", ["i"], { cwd: `./${name}`, shell: true });
  spinner.text = "依赖安装完毕!!!";
  spinner.succeed();
  const spinner2 = ora("项目启动中...").start();
  spinner2.color = "redBright";
  await syncSpawn("npm", ["run", "dev"], { cwd: `./${name}`, shell: true });
  const open = require("open");
  open("http://localhost:5001");
  spinner2.text = "项目启动完毕!!!";
  spinner2.succeed();
}

// git clone下载
async function clone(name) {
  const spinner = ora("项目clone中...").start();
  spinner.color = "redBright";
  await syncSpawn(
    "git",
    ["clone", "-b", "cli", "https://gitee.com/qipao8/vite.git"],
    { cwd: `./`, shell: true }
  );
  spinner.text = "clone完毕!!!";
  spinner.succeed();
  const proc = exec(`git config user.name "qipao8"`, {
    cwd: `./${name}`,
    shell: true,
  });
  proc.on("exit", () => log("name配置完毕"));
  const proc2 = exec(`git config user.email "1937638846@qq.com"`, {
    cwd: `./${name}`,
    shell: true,
  });
  proc2.on("exit", () => log("email配置完毕"));
  install(name);
}

module.exports = async (name) => {
  clear();
  const data = await figlet("Download");
  log(data);
  log("🚀正在创建项目" + name);
  await clone(name);
};
