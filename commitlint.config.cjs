module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "init", // 初始化工程
        "feat", // 新增功能
        "fix", // 修复bug
        "docs", // 文档注释
        "style", // 样式改动
        "ref", // refactor重构、优化
        "perf", // 性能优化
        "test", // 测试
        "chore", // 构建过程或辅助工具变动
        "build", // 打包
        "wip", // 开发中 
        "rfr", // 开发完毕可以合并 
        "merge", // 合并分支 
      ],
    ],
    "type-case": [0],
    "type-empty": [0],
    "scope-empty": [0],
    "scope-case": [0],
    "subject-full-stop": [0, "never"],
    "subject-case": [0, "never"],
    "header-max-length": [0, "always", 72],
  },
}
