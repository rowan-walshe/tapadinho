.PHONY: dev build preview format lint optimize clean

# Development server
dev:
	pnpm dev

# Production build
build:
	pnpm build

# Preview production build locally
preview:
	pnpm preview

# Format code
format:
	pnpm exec prettier --write "src/**/*.{ts,tsx,css,json}"

# Lint code
lint:
	pnpm lint

# Optimize media assets (images and video)
optimize:
	./scripts/optimize-media.sh

# Clean build artifacts
clean:
	rm -rf dist node_modules/.vite
