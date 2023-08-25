/// <reference types="vitest" />
/// <reference types="vite/client" />

// All of these should be undefined in production
type ImportMetaDevEnv = {
  readonly VITE_DEV_USERNAME?: string;
  readonly VITE_DEV_PASSWORD?: string;
  readonly VITE_DEV_BYPASS_AUTH?: string;
  readonly VITE_DEV_GIT_BRANCH?: string;
  readonly VITE_DEV_GIT_COMMIT?: string;
  readonly VITE_DEV_GIT_COMMIT_DATE?: string;
}

type ImportMetaEnv = {
  readonly VITE_LICENSE_URL: string;
  readonly VITE_GITHUB_REPO_URL: string;
  readonly VITE_CONTACT_EMAIL: string;
} & ImportMetaDevEnv

type ImportMeta = {
  readonly env: ImportMetaEnv;
}
