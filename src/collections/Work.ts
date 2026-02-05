import type { CollectionConfig } from "payload";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export const Work: CollectionConfig = {
  slug: "work",
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "client", "updatedAt"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (typeof value === "string" && value.trim().length > 0)
              return value;

            const title = (data as { title?: unknown } | undefined)?.title;
            if (typeof title === "string") return slugify(title);

            return value;
          },
        ],
      },
    },
    {
      name: "summary",
      type: "textarea",
    },
    {
      name: "content",
      type: "richText",
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "gallery",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "client",
      type: "text",
    },
    {
      name: "role",
      type: "text",
    },
    {
      name: "techStack",
      type: "array",
      fields: [
        {
          name: "tech",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "projectUrl",
      type: "text",
    },
    {
      name: "dateRange",
      type: "group",
      fields: [
        {
          name: "start",
          type: "date",
        },
        {
          name: "end",
          type: "date",
        },
      ],
    },
  ],
};
