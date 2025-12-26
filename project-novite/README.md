# Invoice Generator (No Vite)

A duplicate of the Fabrax invoice app using React 18 + TypeScript, Parcel 2, and Tailwind CSS v4 (PostCSS plugin). Ready for Render static hosting.

## Scripts
- `npm run dev`: Start Parcel dev server
- `npm run build`: Build to `dist`
- `npm run preview`: Serve the built `dist` locally
- `npm run typecheck`: TypeScript check

## Node version
- Pinned to Node `20.17.1` via `.node-version` and `package.json` `engines` (`>=20.17.1 <22`).
- On Windows, avoid folders with `#` in the path; Tailwind’s parser can break due to URL encoding.

## Tailwind v4
- Configured via `postcss.config.mjs` with `tailwindcss` + `autoprefixer`.
- Source scanning is defined in `src/styles/tailwind.css` with `@source`.

## Render deploy
- See `render.yaml` for a static site (build: `npm install && npm run build`, publish: `./dist`).
- In Render Dashboard, set the service Root Directory to `project-novite` or place this folder in its own repo.

## Migrate app code
- App entry: [src/main.tsx](src/main.tsx)
- App root: [src/app/App.tsx](src/app/App.tsx)
- Components copied: Navigation, ControlPanel, InvoicePreview, and basic UI (`button`, `input`, `label`, `utils`).
- Copy any remaining components from the original project if needed.

## Quick start
```powershell
cd project-novite
# Switch to Node 20.17.1 (nvm-windows recommended)
# nvm install 20.17.1
# nvm use 20.17.1
npm install
npm run dev
```

## Build Troubleshooting
- **Node version mismatch:** If you see errors like missing native builds for `lmdb` or `lightningcss` during `parcel build`, you are likely running Node 23/24. This project requires **Node 20.17.1**.
	- On Windows (with nvm-windows):
		```powershell
		nvm install 20.17.1
		nvm use 20.17.1
		node -v  # should print v20.17.1
		npm ci
		npm run build
		```
	- Without nvm: install Node 20 LTS from the official site and ensure your terminal uses it.
- **Engine enforcement:** `.npmrc` has `engine-strict=true`. With the wrong Node version, `npm install` will error instead of partially installing incompatible binaries.
- **Path issues on Windows:** Avoid `#` in folder names (e.g., `e:\#0Dev\...`) as it can interfere with some tooling. Prefer a path like `e:\Dev\invoice\project-novite`.

## Notes on “Enable Claude Sonnet 4.5”
This repo is a static React app (no backend). There is no LLM provider configuration here. To enable a model “for all clients”, you’d typically configure a backend or an API gateway (e.g., server-side settings via Anthropic/Claude SDK) and expose it through your app’s API. If you want that, we can scaffold a minimal API service separately.
