export const tags = {
  globals: {
    siteSettings: "global:siteSettings",
    navigation: "global:navigation",
  },
  pages: {
    all: "pages",
    bySlug: (slug: string) => `page:${slug}`,
  },
} as const;
