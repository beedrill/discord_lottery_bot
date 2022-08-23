const { buildLotteryCommand } = require('../utils')
const  config = require('../configs/初级奖池设置.json')
module.exports = buildLotteryCommand(config);
