import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Uncomment to enable R2 caching when R2 bucket is configured
  // incrementalCache: r2IncrementalCache,
});

