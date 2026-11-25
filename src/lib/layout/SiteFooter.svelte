<script lang="ts">
  import AnalyticsSettings from '#lib/analytics/AnalyticsSettings.svelte'
  import lockup from '#lib/assets/brand/logo-horizontal.svg?url'
  import { footerContent, socialLinks } from '#lib/content/footer.ts'
  import type { Locale } from '#lib/site.ts'
  import SocialIcon from './SocialIcon.svelte'

  let { locale }: { locale: Locale } = $props()
  const content = $derived(footerContent(locale))
</script>

<footer class="site-footer">
  <div class="site-container footer-main">
    <div class="footer-brand">
      <a href={`/${locale}`} class="footer-logo"><img src={lockup} alt="Shumoku"></a>
      <p class="footer-summary">{content.summary}</p>
      <ul class="footer-social">
        {#each socialLinks as link}
          <li>
            <a href={link.href} aria-label={link.label} title={link.label}
              ><SocialIcon icon={link.icon} /></a
            >
          </li>
        {/each}
      </ul>
    </div>
    {#each content.groups as group}
      <nav class="footer-group" aria-label={group.title}>
        <h2>{group.title}</h2>
        <ul>
          {#each group.links as link}
            <li><a href={link.href}>{link.label}</a></li>
          {/each}
        </ul>
      </nav>
    {/each}
  </div>
  <div class="site-container footer-meta">
    <p>{content.license}</p>
    <div class="footer-legal">
      <a href={content.privacy.href}>{content.privacy.label}</a>
      <AnalyticsSettings {locale} />
    </div>
  </div>
</footer>

<style>
  .site-footer {
    container-type: inline-size;
    margin-top: auto;
    border-top: 1px solid var(--site-line);
    font-size: 0.875rem;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  a:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  .footer-main {
    display: grid;
    grid-template-columns: minmax(0, 4fr) repeat(3, minmax(0, 2fr));
    gap: var(--layout-block) var(--layout-gutter);
    padding-block: var(--layout-section) var(--layout-block);
  }
  .footer-brand {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: var(--layout-flow);
  }
  .footer-logo {
    display: block;
  }
  /* The lockup keeps its intrinsic ratio; only the height is set. */
  .footer-logo img {
    display: block;
    block-size: 2.25rem;
    inline-size: auto;
  }
  .footer-summary {
    max-inline-size: 22rem;
    margin: 0;
    color: var(--site-muted);
    line-height: 1.7;
  }
  .footer-social {
    display: flex;
    gap: var(--ui-space-1);
    /* Pull the first icon's hit area back to the text edge. */
    margin-inline-start: calc(-1 * var(--ui-space-3));
  }
  .footer-social a {
    display: grid;
    place-items: center;
    inline-size: var(--ui-control-height);
    block-size: var(--ui-control-height);
    border-radius: var(--ui-radius);
    color: var(--site-muted);
  }
  .footer-social a:hover {
    color: var(--site-fg);
    background: var(--ui-control-active);
  }
  .footer-group h2 {
    margin: 0 0 var(--ui-space-3);
    font-size: 0.875rem;
    font-weight: 600;
  }
  .footer-group li a {
    display: inline-block;
    padding-block: var(--ui-space-2);
    color: var(--site-muted);
    line-height: 1.5;
  }
  .footer-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--ui-space-2) var(--ui-space-6);
    padding-block: var(--ui-space-6) var(--layout-block);
    border-top: 1px solid var(--site-line);
    color: var(--site-muted);
    font-size: 0.8125rem;
  }
  .footer-meta p {
    margin: 0;
  }
  .footer-legal {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--ui-space-1) var(--ui-space-6);
  }
  a:focus-visible {
    outline: 2px solid var(--ui-focus);
    outline-offset: 2px;
  }
  @container (max-width: 56rem) {
    .footer-main {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .footer-brand {
      grid-column: 1 / -1;
    }
  }
  @container (max-width: 34rem) {
    .footer-main {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      column-gap: var(--layout-block);
    }
    .footer-meta {
      flex-direction: column;
      align-items: start;
    }
  }
</style>
