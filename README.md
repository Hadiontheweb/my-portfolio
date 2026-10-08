# Hadi Morph Portfolio

## Run locally

```sh
npm ci
npm run dev
```

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Keep the project root set to the repository root. Vercel detects Vite automatically.
4. Use `npm run build` as the build command and `dist` as the output directory.
5. Deploy. Future pushes to the connected branch will trigger new deployments.

To verify a production build locally, run:

```sh
npm ci
npm run build
npm run preview
```

Keep `public/frames` and `public/images` in the repository; they contain assets used by the live site. The root-level `frames` directory is a duplicate and is intentionally excluded from Git.
