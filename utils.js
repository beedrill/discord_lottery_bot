const { SlashCommandBuilder } = require("discord.js");


function randomSample(samples) {
  // [0..1) * sum of weight
  let sample =
    Math.random() * samples.reduce((sum, { weight }) => sum + weight, 0);

  // first sample n where sum of weight for [0..n] > sample
  const { value } = samples.find(({ weight }) => (sample -= weight) < 0);

  return value;
}

function reduceResults(results) {
  const parsedResults = {};
  results.forEach((element) => {
    if (parsedResults[element.name]) {
      parsedResults[element.name].num++;
    } else {
      parsedResults[element.name] = {
        num: 1,
        el: element,
      };
    }
  });
  return parsedResults;
}

function getResultsString(results, format, times) {
  const reducedResults = reduceResults(results);
  var returnStr = format.prefix;
  returnStr += `总共抽奖**${times}次**\n`
  var total = 0
  var totalValue = 0
  for (obj in reducedResults) {
    returnStr += `“**${obj}**”x${reducedResults[obj].num},`;
    total += reducedResults[obj].num
    totalValue += reducedResults[obj].num * reducedResults[obj].el.price
    // console.log(reducedResults[obj])
  }
  
  returnStr += `\n总共掉落了**${total}件**物品。`
  // returnStr += `\n总价值**$${totalValue}**。`
  returnStr += format.suffix;
  return returnStr;
}

function buildLotteryCommand(config) {
  var { dist: probabilityDist, resultsFormat, name, desc, dropProb } = config;
  return {
    data: new SlashCommandBuilder()
      .setName(name)
      .setDescription(desc)
      .addIntegerOption((option) =>
        option.setName("x").setDescription("抽取次数")
      ),
    async execute(interaction) {
      var times = interaction.options.get("x")?.value;
      if (!times) times = 1;
      const results = [];
      for (let i = 0; i < times; i++) {
        let r = randomSample(probabilityDist);
        results.push(r);
        if(dropProb) {
            if(Math.random()<dropProb) {
                let r = randomSample(probabilityDist);
                results.push(r);
            }
        }
      }
      await interaction.reply(getResultsString(results, resultsFormat, times));
    },
  };
}

module.exports = {
  randomSample,
  getResultsString,
  buildLotteryCommand,
};
