<script lang="ts">
  import { articleImage } from '$lib/blog/images'
  import { formatDate, type Post } from '$lib/blog/post'
  import type { Locale } from '$lib/site'

  /** The newest articles, as evidence that the project is active. Each keeps its own language. */
  let { posts, locale, label }: { posts: readonly Post[]; locale: Locale; label: string } = $props()
</script>

<section class="recent" aria-labelledby="recent-title">
  <h3 id="recent-title">{label}</h3>
  <ul>
    {#each posts as post (post.slug)}
      <li lang={post.lang}>
        {#if post.image}
          <enhanced:img
            src={articleImage(post.slug, post.image)}
            alt=""
            sizes="(max-width: 650px) 6rem, 8rem"
            loading="lazy"
          />
        {/if}
        <div>
          <time datetime={post.published}>{formatDate(post.published)}</time>
          <a href={`/${locale}/blog/${post.slug}`}>{post.title}</a>
        </div>
      </li>
    {/each}
  </ul>
</section>

<style>
  h3 {
    margin: 0 0 var(--ui-space-3);
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--site-muted);
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
  }
  li {
    position: relative;
    display: grid;
    grid-template-columns: 8rem minmax(0, 1fr);
    gap: var(--ui-space-4);
    align-items: center;
    padding-block: var(--ui-space-4);
    border-top: 1px solid var(--site-line);
  }
  li:last-child {
    border-bottom: 1px solid var(--site-line);
  }
  /* <enhanced:img> compiles to <picture><img>, which svelte-check cannot see. */
  li :global(img) {
    display: block;
    width: 100%;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    border-radius: 6px;
  }
  time {
    display: block;
    font-size: 0.8125rem;
    color: var(--site-muted);
  }
  a {
    color: var(--site-fg);
    font-weight: 500;
    line-height: 1.6;
    text-decoration: none;
  }
  /* The title link covers the whole row. */
  a::after {
    content: "";
    position: absolute;
    inset: 0;
  }
  li:hover a,
  a:focus-visible {
    text-decoration: underline;
    text-underline-offset: 0.25em;
  }
  @media (max-width: 650px) {
    li {
      grid-template-columns: 6rem minmax(0, 1fr);
    }
  }
</style>
