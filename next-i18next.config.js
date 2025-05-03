const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'nl',
    locales: ['nl', 'en', 'de', 'pl', 'ro', 'bg'],
  },
  localePath: path.resolve('./public/locales'),
};