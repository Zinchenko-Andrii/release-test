const path = require('path');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const json = require('@rollup/plugin-json');
const _ = require('lodash');

const cwd = process.cwd();
const packageJsonPath = path.join(cwd, 'package.json');
const packageJson = require(packageJsonPath);

const createConfig = ({ output, external = [], ci = false }) => ({
  output,
  input: 'src/index.js',
  external: (() => {
    // Exclude all specified externals, peerDependencies and Babel runtime imports.
    const peerIds = external.concat(Object.keys(packageJson.peerDependencies || {}));

    return (
        (id) => peerIds.findIndex(
            (peerId) => peerId === id || id.startsWith(`${peerId}/`) || id.startsWith('__'),
        ) > -1
    );
  })(),
  plugins: [
    resolve({ preferBuiltins: ci }),
    ci ? _.noop : babel(require('../../babel.config.json')),
    commonjs(),
    replace({
      'PLATFORM.VERSION': JSON.stringify(packageJson.version),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    json(),
  ],
});

module.exports = ({
                    external = [], umd = false, ci = true,
                  } = {}) => {
  const esmOutput = !ci && {
    dir: 'dist/esm',
    format: 'esm',
    sourcemap: true,
  };

  const umdOutput = umd && {
    format: 'umd',
    name: umd,
    file: `../../build/${umd}.js`,
    sourcemap: true,
  };

  const commonjsOutput = ci && {
    dir: 'dist/commonjs',
    format: 'commonjs',
    sourcemap: false,
  };

  return [esmOutput, umdOutput, commonjsOutput]
      .filter(Boolean)
      .map((output) => createConfig({ external, output, ci }));
};
