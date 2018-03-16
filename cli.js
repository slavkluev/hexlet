#!/usr/bin/env node


const meow = require('meow');
const osmosis = require('osmosis');
const updateNotifier = require('update-notifier');

const cli = meow(`
    Usage
      $ hexlet <login>
      
    Options
      --json -j     Output the result as JSON
 
    Examples
      $ hexlet slavkluev
          
      Courses finished 24
          Independence 100.0%
                Points 1436
                Rating 253
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
  .find('div.col-12.col-md-6.col-lg-3.text-center.text-primary > div')
  .set('coursesFinished')
  .find('div.col-12.col-md-6.col-lg-3.text-center.text-warning > div')
  .set('independence')
  .find('div.col-12.col-md-6.col-lg-3.text-center.text-success > div')
  .set('points')
  .find('div.row.px-4.mt-5.justify-content-center > div:nth-child(4) > div')
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
            Rating ${stats.rating}
            `;
    console.log(output);
  });
