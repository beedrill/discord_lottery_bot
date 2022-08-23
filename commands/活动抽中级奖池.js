const { buildLotteryCommand } = require('../utils')
const  config = require('../configs/中级奖池设置.json')
module.exports = buildLotteryCommand(config);
