const path = require('path');

const sourcePath = path.resolve(__dirname, '..', 'src');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async config => {
    config.resolve.modules = [
      ...config.resolve.modules,
      sourcePath
    ];
    return config;
  },
}