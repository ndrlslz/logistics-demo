module.exports = (api) => {
  api.cache(true);

  return {
    plugins: [
      'lodash',
      '@babel/plugin-syntax-dynamic-import',
      [
        'component',
        {
          'libraryName': 'element-ui',
          'styleLibraryName': 'theme-chalk',
        }
      ]
    ],
    env: {
      test: {
        presets: [['env', { 'targets': { 'node': 'current' } }]],
      },
      dev: {
        presets: [['env', { 'targets': { 'node': 'current' } }]],
      }
    },
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          useBuiltIns: 'entry',
          corejs: '3',
          targets: {
            node: 'current'
          }
        }
      ]
    ]
  }
}
