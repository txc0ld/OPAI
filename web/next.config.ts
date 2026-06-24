import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // remark-frontmatter strips the YAML --- block so it isn't rendered as body text.
    remarkPlugins: ["remark-frontmatter", "remark-gfm"],
    rehypePlugins: [
      "rehype-slug",
      ["rehype-autolink-headings", { behavior: "wrap" }],
    ],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  trailingSlash: true,
  // Pin both roots to this app dir. Vercel builds from the repo root (see
  // vercel.json), where a stray root package.json would otherwise make Next
  // infer outputFileTracingRoot as the repo root — mismatching turbopack.root
  // and triggering the "both set, must match" warning.
  outputFileTracingRoot: __dirname,
  turbopack: {
    root: __dirname,
  },
};

export default withMDX(nextConfig);
