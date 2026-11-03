# Deploy Soda Rush to Vercel

Push the project to GitHub, including `public/`, `src/`, `package.json`, `package-lock.json`, `tsconfig.json`, `index.html`, `vite.config.ts`, and `vercel.json`. Keep the original model assets and the generated GLBs. Do not upload `node_modules` or `dist`.

In Vercel, choose Add New → Project and import this repository.

| Field | Value |
| --- | --- |
| Project name | `soda-rush` (or an available name) |
| Framework preset | Vite |
| Root directory | Repository root (`./`) |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node.js version | `22.x` |
| Environment variables | None |

`vercel.json` sets build options and model/WASM response headers. No backend or database is required. This game uses only the root URL, so no SPA catch-all rewrite is needed; missing model files should remain real 404s.

Click Deploy, then open the HTTPS deployment URL directly. Allow camera access for webcam modes. The hand model and WASM are hosted with the game; the body model is fetched from Google Storage. Video is processed locally. Best score is stored separately per browser and deployment origin.

After deployment, test keyboard movement, pickup collection, collision/restart, and both webcam modes after calibration. Check the browser Network tab for successful GLB, WASM, and model requests. Physical webcam behavior still requires manual verification.

If assets fail after deploying from GitHub, confirm the actual binary files are committed rather than Git LFS pointer text, and match filename capitalization exactly (Vercel is case-sensitive).
