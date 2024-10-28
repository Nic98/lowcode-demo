const args = process.argv.slice(2);
const dynamicValue = args[0] || 'default-value'; // 获取第一个参数，若无则使用默认值

console.log(`Server is starting at http://localhost:5556/lowcode-${dynamicValue}`);

// 这里可以加入启动服务器的逻辑