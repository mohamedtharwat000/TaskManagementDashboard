import * as esbuild from 'esbuild';
import open from 'open';

const args = process.argv.slice(2);
const dev = args.includes('--dev');

const buildOptions = {
  entryPoints: ['src/index.tsx'],
  outfile: 'public/index.js',
  bundle: true,
  minify: !dev,
  sourcemap: dev,
};

if (dev) {
  let ctx = await esbuild.context(buildOptions);
  await ctx.watch();
  let { host, port } = await ctx.serve({
    servedir: 'public',
  });
  open(`http://${host}:${port}`);
} else {
  await esbuild.build(buildOptions);
  console.log('build completed successfully');
}
