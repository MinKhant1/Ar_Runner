import { defineConfig, type Plugin } from 'vite';

// Use the model MIME type rather than the generic download MIME type.
function modelHeaders(): Plugin {
  const configure = (server: { middlewares: { use: (handler: (req: any, res: any, next: () => void) => void) => void } }) => {
    server.middlewares.use((req, res, next) => {
      if (req.url?.split('?')[0].endsWith('.glb')) {
        res.setHeader('Content-Type', 'model/gltf-binary');
        res.setHeader('Content-Disposition', 'inline');
      }
      next();
    });
  };
  return { name: 'inline-models', configureServer: configure, configurePreviewServer: configure };
}

export default defineConfig({ plugins: [modelHeaders()] });
