### 自定义vite手脚架

#### 0.流程
vite脚手架主要做一下这些工作：
- 首先需要搭建好的一个vite项目vite-demo
- 使用node下载vite-demo
- 再通过node命令安装所需依赖
- 给出vite-demo相关命令以及必要的提示补充

#### 1.起步
采用pnpm包管理工具，如果不指定全局仓库存储目录，会默认在项目当前硬盘上创建。
```
pnpm config set store-dir "D:\.pnpm-store" # pnpm全局仓库路径(类似 .git 仓库)
pnpm config set global-dir "D:\nodejs\pnpm\pnpm-global" # pnpm全局安装路径
pnpm config set global-bin-dir "D:\nodejs" # pnpm全局bin路径
pnpm config set state-dir "D:\nodejs\pnpm" # pnpm创建pnpm-state.json文件的目录
pnpm config set cache-dir "D:\nodejs\pnpm\cache" # pnpm全局缓存路径
```
- 初始化
> pnpm init
> pnpm config set global-bin-dir "D:\pnpm-dir"
配置pnpm全局bin运行目录时，要在电脑系统高级配置用户变量以及系统变量中加入"D:\pnpm-dir"

- 下载vite-demo
我们需要用到node下载git代码的库：download-git-repo
> pnpm i -D download-git-repo

```download-git-repo用法
download(项目URL, 项目名称, { clone: true }, err=>{
    if(err) console.log(err) // 报错原因显示
    else run() // 成功继续运行
})
// URL:direct:https://gitee.com/qipao8/vite
```

#### 2.依赖
下载完成demo工程后，要进入项目目录，为其安装依赖并运行，需要开启node新进程使用child_process库。

spawn接收3个参数：命令，命令参数(数组)，运行配置

通过stdout.on获取Buffer数据，再再close关闭时转换运行即可。
```
const { spawn } = require("child_process");
  new Promise((resolve) => {
    const proc = spawn("node", ["test"], { cwd: "./" });
    const ret = [];
    proc.stdout.on("data", (data) => ret.push(data));
    proc.on("close", () => {
      resolve(Buffer.concat(ret).toString());
      console.log("子进程结束", Buffer.concat(ret).toString());
    });
  });
```

#### 3.优化
node采用异步编程的思想以及生产者消费的设计模式，因此我们需要进行一些优化。

- 脚手架操作提示(commander库)
- 艺术字体(figlet)
- 清空命令行(clear)
- 彩色命令行(chalk@4)
- 加载中图案(ora@5)
- 打开页面(open)


#### 4.结尾-发布
package.json中加入bin运行配置  "bin":"./lib/download.js"
```
pnpm link --global
```