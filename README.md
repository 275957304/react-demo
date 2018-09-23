webpack4 + react16 + babel7 + redux4 + react-router4
#
.babelrc
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": []
}

.postcssrc.js
module.exports = {
  "plugins": {
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {
      "browsers": [
        "ie >= 9",
        "ff >= 30",
        "chrome >= 34",
        "safari >= 7",
        "opera >= 23"
      ]
    }
  }
}