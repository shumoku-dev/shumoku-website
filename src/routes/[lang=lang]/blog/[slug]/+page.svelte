<script lang="ts">
  import ArticleBody from '$lib/blog/ArticleBody.svelte'
  import { authors } from '$lib/blog/authors'
  import { categories } from '$lib/blog/categories'
  import { articleImage } from '$lib/blog/images'
  import { formatDate } from '$lib/blog/post'
  import PageMeta from '$lib/PageMeta.svelte'
  import { websiteOrigin } from '$lib/site'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
  const post = $derived(data.post)
  const cover = $derived(post.image ? articleImage(post.slug, post.image) : undefined)

  const credits = $derived(post.authors.map((id) => authors[id]))
  const url = $derived(`${websiteOrigin}/${post.lang}/blog/${post.slug}`)
  // The description and cover are not repeated above the body; they feed listings, OGP and JSON-LD.
  // https://developers.google.com/search/docs/appearance/structured-data/article
  const jsonLd = $derived(
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      inLanguage: post.lang,
      url,
      datePublished: post.published,
      dateModified: post.updated ?? post.published,
      author: credits.map((author) => ({ '@type': 'Person', ...author })),
      ...(cover && { image: `${websiteOrigin}${cover.img.src}` }),
    }).replaceAll('<', '\\u003c'),
  )
</script>

<svelte:head>
  <meta property="article:published_time" content={post.published}>
  {#if post.updated}
    <meta property="article:modified_time" content={post.updated}>
  {/if}
  {@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<PageMeta
  title={post.title}
  description={post.description}
  image={cover?.img.src}
  type="article"
  alternateLocales={[post.lang]}
  canonicalPath={`/${post.lang}/blog/${post.slug}`}
/>
<main id="main" class="site-container post">
  {#if post.lang !== data.lang}
    <p class="language-note" lang={data.lang}>
      {data.lang === 'en'
        ? 'This article is currently available in Japanese only. The original text is shown below.'
        : 'この記事の日本語版はまだありません。英語の原文を表示しています。'}
    </p>
  {/if}
  <article lang={post.lang}>
    <header>
      <a class="category" href={`/${data.lang}/blog/category/${post.category}`} lang={data.lang}
        >{categories[post.category][data.lang]}</a
      >
      <h1>{post.title}</h1>
      <p class="meta">
        <span>
          {#each credits as author, index}
            {#if index > 0}
              ,
            {/if}
            {#if author.url}
              <a href={author.url} rel="author">{author.name}</a>
            {:else}
              {author.name}
            {/if}
          {/each}
        </span>
        <time datetime={post.published} lang={data.lang}>{formatDate(post.published)}</time>
        {#if post.updated}
          <span lang={data.lang}>
            {data.lang === 'ja' ? '更新' : 'Updated'}
            <time datetime={post.updated}>{formatDate(post.updated)}</time>
          </span>
        {/if}
      </p>
    </header>
    <ArticleBody nodes={data.body} slug={post.slug} lang={data.lang} />
  </article>
  <footer lang={data.lang}>
    <a href={`/${data.lang}/blog`}>← {data.lang === 'ja' ? 'ブログ一覧へ' : 'All articles'}</a>
  </footer>
</main>

<style>
  .post {
    max-width: 44rem;
    padding-block: var(--ui-space-12);
  }
  .language-note {
    margin-block-end: var(--ui-space-8);
    padding: var(--ui-space-4);
    background: var(--ui-surface);
    font-size: 0.875rem;
    line-height: 1.8;
  }
  article {
    display: grid;
    gap: var(--ui-space-8);
  }
  header {
    display: grid;
    gap: var(--ui-space-3);
  }
  .category {
    justify-self: start;
    color: var(--site-accent);
    font-size: 0.875rem;
    font-weight: 600;
  }
  .category:hover {
    text-decoration: underline;
  }
  h1 {
    font-size: clamp(1.75rem, 4vw, 2.25rem);
    line-height: 1.4;
    font-weight: 600;
    letter-spacing: -0.01em;
    text-wrap: balance;
  }
  .meta {
    display: flex;
    flex-wrap: wrap;
    gap: var(--ui-space-1) var(--ui-space-4);
    color: var(--site-muted);
    font-size: 0.875rem;
  }
  .meta a {
    color: var(--site-fg);
    font-weight: 500;
  }
  .meta a:hover {
    text-decoration: underline;
  }
  footer {
    margin-block-start: var(--ui-space-12);
    padding-block-start: var(--ui-space-6);
    border-block-start: 1px solid var(--site-line);
    font-size: 0.875rem;
  }
  .post > footer a:hover {
    text-decoration: underline;
  }
</style>
