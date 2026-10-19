<script lang="ts">
  import PageMeta from '$lib/PageMeta.svelte'
  import type { Locale } from '$lib/site'
  import { authors } from './authors'
  import { type Category, categories } from './categories'
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
        <article lang={post.lang}>
          <div class="text">
            <p class="meta" {lang}>
              <time datetime={post.published}>{formatDate(post.published)}</time>
              <a href={categoryHref(post.category)}>{categories[post.category][lang]}</a>
              {#if post.lang !== lang}
                <span>{lang === 'en' ? 'Japanese only' : '英語のみ'}</span>
              {/if}
            </p>
            <h2><a {href}>{post.title}</a></h2>
            <p class="description">{post.description}</p>
            <p class="meta">{post.authors.map((id) => authors[id].name).join(', ')}</p>
          </div>
          {#if post.image}
            <div class="thumbnail">
              <enhanced:img
                src={articleImage(post.slug, post.image)}
                alt=""
                sizes="(max-width: 650px) 6rem, 12rem"
                loading="lazy"
              />
            </div>
          {/if}
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
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: var(--ui-space-6);
    padding-block: var(--ui-space-8);
  }
  .text {
    display: grid;
    align-content: start;
    gap: var(--ui-space-2);
  }
  .meta {
    display: flex;
    flex-wrap: wrap;
    gap: var(--ui-space-1) var(--ui-space-3);
    color: var(--site-muted);
    font-size: 0.8125rem;
  }
  .meta a:hover {
    color: var(--site-fg);
    text-decoration: underline;
  }
  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.5;
    text-wrap: pretty;
  }
  .text h2 a:hover {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }
  .description {
    color: var(--site-muted);
    line-height: 1.8;
  }
  .thumbnail {
    width: 12rem;
  }
  .thumbnail :global(img) {
    display: block;
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    border-radius: var(--ui-panel-radius);
  }
  .empty {
    padding-block: var(--ui-space-8);
    color: var(--site-muted);
  }
  @media (max-width: 650px) {
    article {
      gap: var(--ui-space-4);
    }
    .thumbnail {
      width: 6rem;
    }
  }
</style>
