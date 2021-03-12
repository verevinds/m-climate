/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const axios = require('axios');
const globby = require('globby');
const prettier = require('prettier');

(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');

  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = await globby([
    'pages/**/*{.tsx,.mdx}',
    '!pages/_*.tsx',
    '!pages/api',
  ]);
  const { data: products } = await axios.get('http://api:8081/api/product/zip');
  const idProducts = products.map(product => product._id);
  console.log({ idProducts });

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map(page => {
                const path = page
                  .replace('pages', '')
                  .replace('.tsx', '')
                  .replace('.mdx', '');
                const route = path === '/index' ? '' : path;
                let url = `
                <url>
                    <loc>${`http://${process.env.URL}${route}`}</loc>
                </url>
            `;
                const pathSplit = path.split('/');
                const simplePage = pathSplit[1];
                const slug = pathSplit[2];

                if (simplePage === 'product' && slug === '[id]') {
                  console.log(simplePage, slug);
                  const newRoute = `/${simplePage}/`;
                  let newUrl = ``;
                  idProducts.forEach(id => {
                    newUrl = `${newUrl}
                        <url>
                        <loc>${`http://${process.env.URL}${newRoute}${id}`}</loc>
                        </url>
                      `;
                  });
                  url = newUrl;
                }
                if (simplePage === 'service' && slug === '[page]') {
                  let newUrl = ``;
                  const newRoute = `/${simplePage}/`;
                  ['installation', 'dismantling', 'maintenance'].forEach(id => {
                    newUrl = `${newUrl}
                        <url>
                        <loc>${`http://${process.env.URL}${newRoute}${id}`}</loc>
                        </url>
                      `;
                  });
                  url = newUrl;
                }
                return url;
              })
              .join('')}
        </urlset>
    `;

  // If you're not using Prettier, you can remove this.
  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  fs.writeFileSync('public/sitemap.xml', formatted);
})();
