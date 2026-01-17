module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-env': {
          useBuiltIns: 'entry',
          corejs: 3,
          targets: {
            chrome: "67",
            android: "9"
          }
        }
      }
    ]
  ]
};