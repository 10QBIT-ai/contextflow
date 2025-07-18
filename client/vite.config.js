// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ['.trycloudflare.com'],
    middlewareMode: false,
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const auth = req.headers['authorization'];
        const expected = 'Basic ' + Buffer.from('10qbit:itss3cr3t').toString('base64');

        if (auth === expected) {
          return next();
        }

        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
        res.end('Access denied');
      });
    }
  }
});