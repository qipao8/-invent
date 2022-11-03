// 异步编程思想
const { promisify } = require("util");
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

// git clone下载
async function clone(url, name) {
  // 下载git代码
  const download = promisify(require("download-git-repo"));
  const spinner = ora("下载中...").start();
  spinner.color = "redBright";
  await download(url, name, { clone: true }, (err) => {
    if (err) console.log(chalk.red(err));
    else {
      spinner.text = "下载完毕!!!";
      spinner.succeed();
      install(name);
    }
  });
}

// 运行命令的子进程
const { spawn } = require("child_process");
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
  console.log("即将安装依赖");
  const spinner = ora("依赖安装中...").start();
  spinner.color = "redBright";
  await syncSpawn("pnpm", ["i"], { cwd: `./${name}`, shell: true });
  spinner.text = "依赖安装完毕!!!";
  spinner.succeed();
  const spinner2 = ora("项目启动中...").start();
  spinner2.color = "redBright";
  await syncSpawn("npm", ["run","dev"], { cwd: `./${name}`, shell: true });
  const open = require('open')
  open('http://localhost:5001')
  spinner2.text = "项目启动完毕!!!";
  spinner2.succeed();
}

module.exports = async (name) => {
  clear();
  const data = await figlet("Download");
  log(data);
  log("🚀准备创建项目" + name);
  await clone("direct:https://gitee.com/qipao8/vite.git#cli", name);
};
