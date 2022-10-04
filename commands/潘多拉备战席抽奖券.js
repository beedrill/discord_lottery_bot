const { buildLotteryCommand } = require('../utils')
const  config = require('../configs/潘多拉备战席设置.json')
module.exports = buildLotteryCommand(config);
