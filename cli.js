#!/usr/bin/env node
'use strict';
const meow = require('meow');
const osmosis = require('osmosis');

const cli = meow(`
    Usage
      $ hexlet <login>
 
    Examples
      $ hexlet slavkluev
`);

let login = cli.input[0];

osmosis
    .get('https://en.hexlet.io/u/' + login)
    .find('div.col-12.col-md-6.col-lg-3.text-center.text-primary > div')
    .set('coursesFinished')
    .find('div.col-12.col-md-6.col-lg-3.text-center.text-warning > div')
    .set('independence')
    .find('div.col-12.col-md-6.col-lg-3.text-center.text-success > div')
    .set('points')
    .find('div.row.px-4.mt-5.justify-content-center > div:nth-child(4) > div')
    .set('rating')
    .data(function(data) {
        let output = `
  Courses finished ${data.coursesFinished}
      Independence ${data.independence}
            Points ${data.points}
            Rating ${data.rating}`;
        console.log(output);
    });