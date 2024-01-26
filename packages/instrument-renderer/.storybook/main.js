import path from 'path';

import runtime from '@open-data-capture/vite-plugin-runtime';
import tailwind from '@open-data-capture/vite-plugin-tailwind';
import { mergeConfig } from 'vite';

/** @type {import('@storybook/react-vite').StorybookConfig} */
const config = {
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
    'storybook-react-i18next'
  ],
  docs: {
    autodocs: 'tag'
  },
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  viteFinal(config) {
    return mergeConfig(config, {
      plugins: [
        runtime(),
        tailwind({
          content: ['./src/**/*.{js,ts,jsx,tsx}'],
          include: ['@open-data-capture/react-core'],
          // eslint-disable-next-line no-undef
          root: path.resolve(__dirname, '..')
        })
      ]
    });
  }
};

export default config;
