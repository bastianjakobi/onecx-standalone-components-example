const { ModifyEntryPlugin } = require('@angular-architects/module-federation/src/utils/modify-entry-plugin')
const { share, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack')
const { DefinePlugin } = require('webpack')

const isProduction = process.env.NODE_ENV === 'production';

const config = withModuleFederationPlugin({
  name: 'onecx-standalone-components-example',
  filename: 'remoteEntry.js',
  exposes: {
    './RemoteModule': 'src/remote-main.ts',
  },
  shared: share({
    '@angular/core': { requiredVersion: 'auto', includeSecondaries: true },
    '@angular/common': { requiredVersion: 'auto', includeSecondaries: { skip: ['@angular/common/http/testing'] } },
    '@angular/common/http': { requiredVersion: 'auto', includeSecondaries: true },
    '@angular/forms': { requiredVersion: 'auto', includeSecondaries: true },
    '@angular/platform-browser': { requiredVersion: 'auto', includeSecondaries: true },
    '@angular/router': { requiredVersion: 'auto', includeSecondaries: true },
    rxjs: { requiredVersion: 'auto', includeSecondaries: true },
    '@ngx-translate/core': { requiredVersion: 'auto' },
    '@onecx/angular-integration-interface': { requiredVersion: 'auto', includeSecondaries: true },
    '@onecx/angular-utils': { requiredVersion: 'auto', includeSecondaries: true },
    '@onecx/angular-webcomponents': { requiredVersion: 'auto', includeSecondaries: true },
    '@onecx/angular-auth': { requiredVersion: 'auto', includeSecondaries: true },
    primeng: { requiredVersion: 'auto', includeSecondaries: true }, 
  }),
})
config.devServer = { allowedHosts: 'all' }
const plugins = config.plugins.filter((plugin) => !(plugin instanceof ModifyEntryPlugin))
module.exports = {
  ...config,
  plugins: [
    ...plugins,
    new DefinePlugin({
      ngDevMode: isProduction,
    }),
  ],
  output: { uniqueName: 'onecx-standalone-components-example', publicPath: 'auto' },
  experiments: { ...config.experiments, topLevelAwait: true },
  optimization: { runtimeChunk: false, splitChunks: false }
}