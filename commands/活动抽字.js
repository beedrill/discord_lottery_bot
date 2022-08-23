const { buildLotteryCommand } = require('../utils')
const  config = require('../configs/活动抽字设置.json')
module.exports = buildLotteryCommand(config);
