const { buildLotteryCommand } = require('../utils')
const  config = require('../configs/高级奖池设置.json')
module.exports = buildLotteryCommand(config);