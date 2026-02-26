/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV: "production" | "qa";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
