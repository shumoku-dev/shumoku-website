<script lang="ts">
  import toast from '$lib/assets/photos/meetup-1-toast.webp?enhanced'
  import { categories } from '$lib/blog/categories'
  import { formatDate, type Post } from '$lib/blog/post'
  import Photo from '$lib/Photo.svelte'
  import type { Locale } from '$lib/site'

  let { locale, post }: { locale: Locale; post?: Post } = $props()
  const ja = $derived(locale === 'ja')
  const href = $derived(`/${locale}/blog/${post?.slug}`)
  const label = $derived(
    post ? `${categories[post.category][locale]} · ${formatDate(post.published)}` : '',
  )
</script>

{#if post}
  <section class="site-section" aria-labelledby="activity-title">
    <div class="site-container activity-grid">
      <h2 id="activity-title" class="site-section-title">
        {ja ? 'Shumokuを育てるコミュニティ' : 'The community growing Shumoku'}
      </h2>
      <div class="activity-photo">
        <Photo
          src={toast}
          alt={ja ? '会場のみなさんと乾杯。' : 'A toast together at the venue.'}
          {href}
        />
      </div>
      <div class="activity-story">
        <p class="event-label">{label}</p>
        <h3 lang={post.lang}><a {href}>{post.title}</a></h3>
        <p class="site-section-subtitle" lang={post.lang}>{post.description}</p>
        <h3>
          <a href={`/${locale}/community`}
            >{ja ? 'コミュニティに参加する' : 'Join the community'}</a
          >
        </h3>
        <p class="site-section-subtitle">
          {ja ? '質問、イベント、開発への貢献。使う人もつくる人も、ここから。' : 'Questions, events and contributions. Find your way in as a user or a contributor.'}
        </p>
      </div>
    </div>
  </section>
{/if}

<style>
  .activity-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--ui-space-8);
  }
  .activity-grid > h2 {
    grid-column: 1 / -1;
  }
  .activity-photo {
    grid-column: span 2;
  }
  .activity-story {
    display: grid;
    align-content: start;
    gap: var(--ui-space-4);
  }
  .event-label {
    color: var(--site-muted);
    font-size: 0.875rem;
  }
  h3 {
    font-size: 1.125rem;
    font-weight: 500;
  }
  a {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }
  @media (max-width: 650px) {
    .activity-grid {
      grid-template-columns: 1fr;
    }
    .activity-photo {
      grid-column: auto;
    }
  }
</style>
