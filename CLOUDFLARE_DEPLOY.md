
# Deploying to Cloudflare Pages

1. **Commit & Push**: Ensure all changes (including `package.json` and `next.config.js`) are pushed to your git repository.

2. **Cloudflare Dashboard**:
   - Go to Cloudflare Pages.
   - "Connect to Git" and select this repository.

3. **Build Settings**:
   - **Framework Preset**: `Next.js`
   - **Build Command**: `npx @cloudflare/next-on-pages` (or `npm run pages:build`)
   - **Output Directory**: `.vercel/output/static` (Important: next-on-pages outputs here)
   - **Node Version**: Set an Environment Variable `NODE_VERSION` to `20` (or compatible).

4. **Environment Variables**:
   - Add all your `.env` variables (e.g., `NEXT_PUBLIC_GRAPHQL_URL`, `NEXT_PUBLIC_REST_API_URL`, etc.) to the Cloudflare Pages settings.

5. **Deploy**: Click "Save and Deploy".

## Important Notes
- **Images**: We have disabled Next.js Image Optimization (`unoptimized: true`) in `next.config.js`. Images will work but won't be auto-optimized by the server. To optimize, use Cloudflare's Image Resizing service or a third-party loader (Cloudinary, Imgix).
- **Edge Runtime**: The API routes and `getServerSideProps` will run on Cloudflare Workers (Edge). Ensure no Node.js-only modules are used in these paths.

