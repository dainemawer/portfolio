import type { GlobalConfig } from "payload";

import { tags } from "@/lib/cms/tags";
import { getServerURL } from "@/lib/server-url";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  access: {
    read: () => true,
  },
  admin: {
    group: "Site",
  },
  versions: {
    drafts: {
      autosave: true,
    },
  },
  hooks: {
    afterChange: [
      async () => {
        const secret = process.env.REVALIDATE_SECRET;
        if (!secret) return;

        await fetch(`${getServerURL()}/api/revalidate`, {
          method: "POST",
          headers: {
            authorization: `Bearer ${secret}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            tags: [tags.globals.siteSettings],
          }),
        });
      },
    ],
  },
  fields: [
    {
      name: "siteName",
      type: "text",
      required: true,
      defaultValue: "dainemawer.com",
    },
    {
      name: "siteURL",
      type: "text",
      admin: {
        description: "Used for canonical URLs and integrations.",
      },
    },
    {
      name: "socialLinks",
      type: "array",
      fields: [
        { name: "platform", type: "text", required: true },
        { name: "url", type: "text", required: true },
      ],
    },
    {
      name: "defaultSEOImage",
      type: "upload",
      relationTo: "media",
    },
  ],
};
