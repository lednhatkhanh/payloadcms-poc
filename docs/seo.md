# SEO guide

Payload owns the editable search and sharing metadata; the public site turns it into canonical URLs, Open Graph tags, X/Twitter cards, `robots.txt`, and `sitemap.xml`.

## Where to edit

- **SEO settings** in Payload holds the site name, localized default title and description, default social image, optional X/Twitter account, optional Google Search Console token, and the indexing switch.
- **Homepage**, **News**, **Locations**, and **Pages** each have an **SEO** tab supplied by Payload’s SEO plugin. Set a specific title, description, and image when the page needs an override.

Leave an item’s SEO fields blank to use its page copy and the site-wide SEO defaults. Canonical URLs are intentionally not editable: the public route creates them, which prevents a CMS entry from pointing at the wrong path.

## What is published

- `/robots.txt` allows the public site and blocks `/admin/` and `/api/`.
- `/sitemap.xml` lists the homepage, newsroom, location index, published CMS pages, published stories, and published locations. It also includes language alternates for English, Japanese, and Spanish.
- Preview URLs are marked `noindex` so draft review links cannot become search results.

Set **Allow indexing** to off for a private preview environment. It switches public metadata to `noindex` and returns an empty sitemap.

## Quick verification

The public canonical URL comes from `NEXT_PUBLIC_WEB_URL`; set it to the deployed public origin before going live. After a change, publish the record and inspect a page source or run:

```sh
curl -s http://payload-newsroom.localhost/en | rg 'canonical|description|og:'
curl http://payload-newsroom.localhost/robots.txt
curl http://payload-newsroom.localhost/sitemap.xml
```

Check that the canonical URL uses the public domain, the title/description are present, and the sitemap contains only routes that should be discoverable.
