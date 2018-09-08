#!/usr/bin/env node


const meow = require('meow');
const osmosis = require('osmosis');
const updateNotifier = require('update-notifier');

const cli = meow(`
    Usage
      $ hexlet-stats <login>
      
    Options
      --json -j     Output the result as JSON
 
    Examples
      $ hexlet-stats slavkluev
          
      Courses finished 24
          Independence 100.0%
                Points 1445
      Challenges count 10
                Rating #356
`, {
  flags: {
    json: {
      type: 'boolean',
      alias: 'j',
    },
  },
});

updateNotifier({ pkg: cli.pkg }).notify();

const login = cli.input[0];

osmosis
  .get(`https://ru.hexlet.io/u/${login}`)
  .find('div.flex-column > div.card.mb-4 > div.card-body > div > div:nth-child(1) > div')
  .set('coursesFinished')
  .find('div.flex-column > div.card.mb-4 > div.card-body > div > div:nth-child(2) > div')
  .set('independence')
  .find('div.flex-column > div.card.mb-4 > div.card-body > div > div:nth-child(3) > div')
  .set('points')
  .find('div.flex-column > div.card.mb-4 > div.card-body > div > div:nth-child(4) > div')
  .set('challengesCount')
  .find('body > div.container-fluid.p-0 > div > div > div.col-12.col-md-3.my-4 > div.h6 > span > a')
  .set('rating')
  .data((stats) => {
    if (cli.flags.json) {
      console.log(JSON.stringify(stats));
      return;
    }

    const output = `
  Courses finished ${stats.coursesFinished}
      Independence ${stats.independence}
            Points ${stats.points}
  Challenges count ${stats.challengesCount}
            Rating ${stats.rating}
            `;
    console.log(output);
  });
