import type { GlobalConfig } from "payload";

import { tags } from "@/lib/cms/tags";
import { getServerURL } from "@/lib/server-url";

export const Navigation: GlobalConfig = {
  slug: "navigation",
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
            tags: [tags.globals.navigation],
          }),
        });
      },
    ],
  },
  fields: [
    {
      name: "items",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "linkType",
          type: "radio",
          required: true,
          defaultValue: "page",
          options: [
            { label: "Page", value: "page" },
            { label: "Custom URL", value: "custom" },
          ],
        },
        {
          name: "page",
          type: "relationship",
          relationTo: "pages",
          admin: {
            condition: (_, siblingData) => siblingData?.linkType === "page",
          },
        },
        {
          name: "url",
          type: "text",
          admin: {
            condition: (_, siblingData) => siblingData?.linkType === "custom",
          },
        },
        {
          name: "newTab",
          type: "checkbox",
          defaultValue: false,
        },
      ],
    },
  ],
};
