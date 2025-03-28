declare namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    AUTH_GITHUB_ID: string;
    AUTH_GITHUB_SECRET: string;
    AUTH_GITHUB_CALLBACK_URL: string;
    AUTH_GOOGLE_ID: string;
    AUTH_GOOGLE_SECRET: string;
    AUTH_GOOGLE_CALLBACK_URL: string;
    DATABASE_URL: string;
    // Add other environment variables here
    NEXT_PUBLIC_BACKEND_URL: string;
    DOMAIN: string;
    NEXT_PUBLIC_DOMAIN: string;
    NEXT_PUBLIC_APP_URL: string;
    UPSTASH_REDIS_REST_URL: string;
    UPSTASH_REDIS_REST_TOKEN: string;
    NEXTAUTH_SECRET: string;
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_GOOGLE_ANALYTICS: string;
  }
}
