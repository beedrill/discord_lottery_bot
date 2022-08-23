const { SlashCommandBuilder } = require('discord.js');

function randomSample (samples) {
    // [0..1) * sum of weight
    let sample =
        Math.random() *
        samples.reduce((sum, { weight }) => sum + weight, 0);

    // first sample n where sum of weight for [0..n] > sample
    const { value } = samples.find(
        ({ weight }) => (sample -= weight) < 0
    );

    return value;
}

function reduceResults(results) {
    const parsedResults = {}
    results.forEach(element => {
        parsedResults[element] = parsedResults[element] ? parsedResults[element] + 1 : 1
    });
    return parsedResults
}

function getResultsString(results, format) {
    const reducedResults = reduceResults(results)
    var returnStr = format.prefix
    for (obj in reducedResults) {
        returnStr += `“**${obj}**”x${reducedResults[obj]},`
    }
    returnStr += format.suffix
	return returnStr
}

function buildLotteryCommand(config) {
    var {dist: probabilityDist, resultsFormat, name, desc } = config
    return {
        data: new SlashCommandBuilder()
            .setName(name)
            .setDescription(desc)
            .addIntegerOption(option =>
                option.setName('x')
                    .setDescription('抽取次数')),
        async execute(interaction) {
            var times = interaction.options.get("x")?.value
            if(!times) times = 1
            const results = []
            for(let i=0; i<times; i++) {
                let r = randomSample(probabilityDist)
                results.push(r)
            } 
            await interaction.reply(getResultsString(results, resultsFormat));
        },
    }
}

module.exports = {
    randomSample,
    getResultsString,
    buildLotteryCommand
}