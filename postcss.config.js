const { sep } = require('path')

module.exports = ({ file }) => {
  // console.log('\n' + data.file + '\n')
  let rootValue = file.dirname.indexOf(`node_modules${sep}vant`) !== -1
    ? 37.5
    : 75

  return {
    plugins: {
      autoprefixer: {},
      'postcss-pxtorem': {
        rootValue,
        propList: ['*']
      }
    }
  }
}

// module.exports = {
//   plugins: {
//     autoprefixer: {},
//     'postcss-pxtorem': {
//       rootValue: 37.5,
//       propList: ['*']
//     }
//   }
// }
