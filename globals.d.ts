declare namespace NodeJS {
  // 環境変数名の定義
  interface ProcessEnv {
    readonly NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN: string;
    readonly NEXT_PUBLIC_MICROCMS_API_KEY: string;
  }
}
