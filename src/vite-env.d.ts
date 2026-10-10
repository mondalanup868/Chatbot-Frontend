/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Public backend base URL (NOT a secret — safe to expose to the browser).
   * Must keep the VITE_ prefix: Vite only exposes VITE_-prefixed vars to
   * client code via import.meta.env. Removing the prefix would make it
   * undefined in the browser and break all API calls.
   * Set per-environment: local .env file, or Vercel → Settings → Environment Variables.
   */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}