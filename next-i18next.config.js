module.exports = {
  i18n: {
    defaultLocale: 'nl',
    locales: ['nl', 'en', 'de', 'pl', 'ro', 'bg'],
  },
  localePath: '/public/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  serializeConfig: false,
  use: []
};
