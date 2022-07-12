import { resolve } from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'
import typescript2 from 'rollup-plugin-typescript2'
import autoExternal from 'rollup-plugin-auto-external'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'

import { name, code, version } from './package.json'

const NAME = code
const ASSETS = [
  {
    format: 'es',
    distPath: 'es',
    exports: 'named'
  },
  {
    format: 'cjs',
    distPath: 'lib',
    exports: 'named',
    externals: []
  },
  {
    format: 'umd',
    distPath: 'dist',
    exports: 'named',
    externals: []
  }
]

const generateOutputs = asset => {
  const { format, distPath, exports } = asset
  return [
    {
      name: NAME,
      file: `./${distPath}/index.js`,
      format,
      sourcemap: true,
      // 导出模式默认为auto
      // default – 如果你使用 export default ... 仅仅导出一个东西，那适合用这个
      // named – 如果你导出多个东西，适合用这个
      // none – 如果你不导出任何内容 (例如，你正在构建应用程序，而不是库)，则适合用这个
      exports
    },
    {
      name: NAME,
      file: `./${distPath}/index.min.js`,
      format,
      sourcemap: true,
      exports,
      plugins: [terser()]
    }
  ]
}

const generatePlugins = asset => {
  const { format } = asset
  // Make sure autoExternal is the last plugin
  return [
    nodeResolve({
      browser: true
    }),
    commonjs(),
    json(),
    replace({
      preventAssignment: true,
      values: {
        __CLAZZ__: name,
        __VERSION__: version
      }
    }),
    postcss({
      modules: true,
      minimize: true,
      syntax: 'postcss-scss',
      extensions: ['less', '.css']
    }),
    typescript2({
      useTsconfigDeclarationDir: true,
      clean: true,
      tsconfig: './tsconfig.bundle.json'
    }),
    format === 'es' && autoExternal()
  ]
}

const generateExternal = asset => {
  const { externals = [] } = asset
  return externals
}

export default ASSETS.map(asset => {
  return {
    input: resolve(__dirname, './src/index.ts'),
    output: generateOutputs(asset),
    plugins: generatePlugins(asset),
    external: generateExternal(asset)
  }
})
