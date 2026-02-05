import { unstable_cache } from "next/cache";

import { getPayloadClient } from "@/lib/payload";
import { tags } from "./tags";

export const getSiteSettings = unstable_cache(
  async () => {
    const payload = await getPayloadClient();
    return payload.findGlobal({
      slug: "site-settings",
      depth: 2,
    });
  },
  ["global:site-settings"],
  {
    tags: [tags.globals.siteSettings],
  },
);

export const getNavigation = unstable_cache(
  async () => {
    const payload = await getPayloadClient();
    return payload.findGlobal({
      slug: "navigation",
      depth: 3,
    });
  },
  ["global:navigation"],
  {
    tags: [tags.globals.navigation],
  },
);
