import { defineConfig } from 'astro/config';

// Deployed to GitHub Pages as a project site:
// https://paginasexternas.github.io/maniaticos-drink/
export default defineConfig({
  site: 'https://paginasexternas.github.io',
  base: '/maniaticos-drink/',
  trailingSlash: 'ignore',
  output: 'static'
});
