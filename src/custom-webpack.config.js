const { mergeWithCustomize, unique } = require('webpack-merge')
const webpack = require('webpack')

const output = mergeWithCustomize({
    customizeArray: unique(
        'plugins', ['HotModuleReplacementPlugin'],
        plugin => plugin.constructor && plugin.constructor.name
    )
})({
    plugins: [new webpack.HotModuleReplacementPlugin()]
}, {
    plugins: [new webpack.HotModuleReplacementPlugin()]
})

module.exports = {
    plugins: [
        new webpack.DefinePlugin(output)
    ]
}