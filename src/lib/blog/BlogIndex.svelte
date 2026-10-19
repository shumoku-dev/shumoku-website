<script lang="ts">
  import PageMeta from '$lib/PageMeta.svelte'
  import type { Locale } from '$lib/site'
  import { authors } from './authors'
  import { type Category, categories } from './categories'
  import DraftBadge from './DraftBadge.svelte'
  import { articleImage } from './images'
  import { formatDate, type Post } from './post'

  // Shared by the blog index and the category pages.
  let {
    lang,
    title,
    description,
    posts,
    usedCategories,
    current,
  }: {
    lang: Locale
    title: string
    description: string
    posts: Post[]
    usedCategories: Category[]
    current?: Category
  } = $props()
  const ja = $derived(lang === 'ja')
  const categoryHref = (category: Category) => `/${lang}/blog/category/${category}`
</script>

<PageMeta {title} {description} />
<main id="main" class="site-container blog">
  <header>
    <h1>{title}</h1>
    <p>{description}</p>
  </header>

  <nav class="categories" aria-label={ja ? 'カテゴリ' : 'Categories'}>
    <a href={`/${lang}/blog`} aria-current={current ? undefined : 'page'}
      >{ja ? 'すべて' : 'All'}</a
    >
    {#each usedCategories as category}
      <a href={categoryHref(category)} aria-current={category === current ? 'page' : undefined}
        >{categories[category][lang]}</a
      >
    {/each}
  </nav>

  <ol class="posts">
    {#each posts as post}
      {@const href = `/${lang}/blog/${post.slug}`}
      <li>
        <!-- Media object on wide screens, stacked card on phones. The title link covers the row. -->
        <article lang={post.lang} class:has-image={post.image}>
          {#if post.image}
            <div class="thumbnail">
              <enhanced:img
                src={articleImage(post.slug, post.image)}
                alt=""
                sizes="(max-width: 640px) 100vw, 16rem"
                loading="lazy"
              />
            </div>
          {/if}
          <div class="text">
            <p class="meta" {lang}>
              {#if post.draft}
                <DraftBadge {lang} />
              {/if}
              <time datetime={post.published}>{formatDate(post.published)}</time>
              <a class="category" href={categoryHref(post.category)}
                >{categories[post.category][lang]}</a
              >
              {#if post.lang !== lang}
                <span>{lang === 'en' ? 'Japanese only' : '英語のみ'}</span>
              {/if}
            </p>
            <h2><a {href}>{post.title}</a></h2>
            <p class="description">{post.description}</p>
            <p class="byline">{post.authors.map((id) => authors[id].name).join(', ')}</p>
          </div>
        </article>
      </li>
    {:else}
      <li class="empty">{ja ? '記事を準備しています。' : 'Articles are on the way.'}</li>
    {/each}
  </ol>
</main>

<style>
  .blog {
    max-width: 48rem;
    padding-block: var(--ui-space-12);
  }
  header {
    display: grid;
    gap: var(--ui-space-3);
  }
  h1 {
    font-size: clamp(2rem, 4vw, 2.5rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }
  header p {
    color: var(--site-muted);
    line-height: 1.8;
  }
  .categories {
    display: flex;
    flex-wrap: wrap;
    gap: var(--ui-space-1) var(--ui-space-6);
    margin-block-start: var(--ui-space-8);
    border-block-end: 1px solid var(--site-line);
    font-size: 0.875rem;
  }
  .categories a {
    padding-block: var(--ui-space-2);
    margin-block-end: -1px;
    border-block-end: 2px solid transparent;
    color: var(--site-muted);
  }
  .categories a:hover {
    color: var(--site-fg);
  }
  .categories [aria-current="page"] {
    border-color: var(--site-fg);
    color: var(--site-fg);
    font-weight: 600;
  }
  .posts > li + li {
    border-block-start: 1px solid var(--site-line);
  }
  article {
    position: relative;
    display: grid;
    gap: var(--ui-space-6);
    padding-block: var(--ui-space-6);
  }
  /* Thumbnail : text = 1 : 2. Covers are mostly photos, so 3:2 keeps more of them than 16:9. */
  article.has-image {
    grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
  }
  .thumbnail :global(picture) {
    display: contents;
  }
  .thumbnail :global(img) {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    border-radius: var(--ui-panel-radius);
  }
  .text {
    display: grid;
    align-content: start;
    gap: var(--ui-space-2);
    min-width: 0;
  }
  .meta,
  .byline {
    color: var(--site-muted);
    font-size: 0.8125rem;
  }
  .meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--ui-space-1) var(--ui-space-3);
  }
  /* The category stays its own link above the row-wide title link. */
  .category {
    position: relative;
    z-index: 1;
  }
  .category:hover {
    color: var(--site-fg);
    text-decoration: underline;
  }
  h2 {
    font-size: 1.1875rem;
    font-weight: 600;
    line-height: 1.5;
    /* Break Japanese titles between phrases rather than inside words where supported. */
    word-break: auto-phrase;
  }
  h2,
  .description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  h2 {
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }
  .description {
    -webkit-line-clamp: 3;
    line-clamp: 3;
    color: var(--site-muted);
    font-size: 0.9375rem;
    line-height: 1.7;
  }
  /* Stretched link: the whole article row opens the post. */
  h2 a::after {
    content: "";
    position: absolute;
    inset: 0;
  }
  article:hover h2 a,
  h2 a:focus-visible {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }
  h2 a:focus-visible {
    outline: none;
  }
  h2 a:focus-visible::after {
    outline: 2px solid var(--ui-focus);
    outline-offset: var(--ui-space-1);
    border-radius: var(--ui-panel-radius);
  }
  .empty {
    padding-block: var(--ui-space-8);
    color: var(--site-muted);
  }
  /* Phones: a side-by-side row leaves too little room for either, so stack a card with the
     event photo full width on top. */
  @media (max-width: 640px) {
    article {
      gap: var(--ui-space-3);
      padding-block: var(--ui-space-6);
    }
    article.has-image {
      grid-template-columns: minmax(0, 1fr);
    }
    .thumbnail {
      margin-block-end: var(--ui-space-1);
    }
    h2 {
      font-size: 1.125rem;
    }
    .description {
      font-size: 0.875rem;
    }
  }
</style>
