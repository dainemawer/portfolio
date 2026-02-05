import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { searchPlugin } from "@payloadcms/plugin-search";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Articles } from "./collections/Articles";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Users } from "./collections/Users";
import { Work } from "./collections/Work";
import { Navigation } from "./globals/Navigation";
import { SiteSettings } from "./globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages, Articles, Work],
  globals: [SiteSettings, Navigation],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: ["pages", "articles", "work"],
      uploadsCollection: "media",
      generateTitle: ({ doc }) => `dainemawer.com — ${doc.title}`,
      generateDescription: ({ doc }) => doc.excerpt,
    }),
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      token: process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: true,
      collections: {
        media: true,
      },
    }),
    formBuilderPlugin({
      redirectRelationships: ["pages"],
      formOverrides: {
        access: {
          read: ({ req }) => Boolean(req.user),
          create: ({ req }) => Boolean(req.user),
          update: ({ req }) => Boolean(req.user),
          delete: ({ req }) => Boolean(req.user),
        },
      },
      formSubmissionOverrides: {
        access: {
          read: ({ req }) => Boolean(req.user),
          create: () => true,
          update: () => false,
          delete: ({ req }) => Boolean(req.user),
        },
      },
    }),
    searchPlugin({
      collections: ["pages", "articles", "work"],
      beforeSync: ({ originalDoc, searchDoc }) => {
        const doc = originalDoc as Record<string, unknown> | undefined;

        return {
          ...searchDoc,
          title:
            (typeof doc?.title === "string" ? doc.title : undefined) ??
            searchDoc.title,
        };
      },
    }),
  ],
});
