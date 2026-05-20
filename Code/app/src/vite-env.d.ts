/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COMEX_STAT_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}