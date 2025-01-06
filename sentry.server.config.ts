import * as Sentry from "@sentry/nuxt";

Sentry.init({
  dsn: "https://0d3aa32976638a53c513f2fc6a32a0bf@o4508373984870400.ingest.us.sentry.io/4508373986181120",
  // Tracing
  // We recommend adjusting this value in production, or using a tracesSampler for finer control.
  tracesSampleRate: 1.0, // Capture 100% of the transactions
});
