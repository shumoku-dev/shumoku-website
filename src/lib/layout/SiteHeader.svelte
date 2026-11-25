<script lang="ts">
  import { Languages, Menu, Moon, Sun, X } from '@lucide/svelte'
  import { onMount } from 'svelte'
  import wordmark from '#lib/assets/brand/logo-wordmark.svg?url'
  import { repositoryUrl, socialLinks } from '#lib/content/footer.ts'
  import { rememberLanguage } from '#lib/i18n/index.ts'
  import { type Locale, navigationCurrent, siteNavigation } from '#lib/site.ts'
  import {
    darkSchemeQuery,
    isDarkTheme,
    preferenceAfterToggle,
    readThemePreference,
    themeStorageKey,
  } from '#lib/theme.ts'
  import { controlClass } from '#lib/ui/control.ts'
  import IconButton from '#lib/ui/IconButton.svelte'
  import LinkButton from '#lib/ui/LinkButton.svelte'
  import NavLink from '#lib/ui/NavLink.svelte'
  import SocialIcon from './SocialIcon.svelte'
  import '#lib/assets/brand/header-logo.css'

  let { locale, path }: { locale: Locale; path: string } = $props()
  const links = $derived(siteNavigation(locale))
  const alternate = $derived(locale === 'ja' ? 'en' : 'ja')
  const t = $derived(
    locale === 'ja'
      ? {
          nav: 'メインナビゲーション',
          menu: 'メニュー',
          close: 'メニューを閉じる',
          github: 'Shumoku の GitHub リポジトリ',
          switchTo: 'Switch to English',
          language: 'English',
          theme: 'ダークモード',
        }
      : {
          nav: 'Main navigation',
          menu: 'Menu',
          close: 'Close menu',
          github: 'Shumoku on GitHub',
          switchTo: '日本語に切り替え',
          language: '日本語',
          theme: 'Dark mode',
        },
  )
  let menu: HTMLElement | undefined = $state()
  /* Client-side navigation keeps the popover open, so close it once a link is followed. */
  function closeOnLink(event: MouseEvent) {
    if (event.target instanceof Element && event.target.closest('a')) menu?.hidePopover()
  }
  let dark = $state(false)
  function applyTheme(value: boolean) {
    dark = value
    document.documentElement.classList.toggle('dark', value)
    document
      .querySelector('meta[name="color-scheme"]')
      ?.setAttribute('content', value ? 'dark' : 'light')
  }
  onMount(() => {
    const media = matchMedia(darkSchemeQuery)
    const sync = () => applyTheme(isDarkTheme(readThemePreference(), media.matches))
    const onStorage = (event: StorageEvent) => {
      if (event.key === themeStorageKey || event.key === null) sync()
    }
    sync()
    media.addEventListener('change', sync)
    window.addEventListener('storage', onStorage)
    return () => {
      media.removeEventListener('change', sync)
      window.removeEventListener('storage', onStorage)
    }
  })
  function toggleTheme() {
    const preference = preferenceAfterToggle(dark, matchMedia(darkSchemeQuery).matches)
    try {
      if (preference) localStorage.setItem(themeStorageKey, preference)
      else localStorage.removeItem(themeStorageKey)
    } catch {
      /* Optional preference: still switch for this page view. */
    }
    applyTheme(!dark)
  }
</script>

<header class="site-header">
  <div class="site-container header-row">
    <a href={`/${locale}`} class="site-brand"
      ><span class="shumoku-header-logo"><img src={wordmark} alt="Shumoku"></span></a
    >
    <nav class="desktop-nav" aria-label={t.nav}>
      {#each links as link}
        <NavLink href={link.href} aria-current={navigationCurrent(path, link.path)}
          >{link.label}</NavLink
        >
      {/each}
    </nav>
    <div class="header-controls">
      <LinkButton
        variant="ghost"
        size="icon"
        class="github-link"
        href={repositoryUrl}
        aria-label={t.github}
        title={t.github}
        ><SocialIcon icon="github" /></LinkButton
      >
      <LinkButton
        variant="ghost"
        class="locale-link"
        href={`/${alternate}${path}`}
        onclick={() => rememberLanguage(alternate)}
        hreflang={alternate}
        lang={alternate}
        aria-label={t.switchTo}
        ><Languages size={20} />
        <span class="locale-name">{alternate === 'ja' ? '日本語' : 'EN'}</span></LinkButton
      >
      <IconButton
        type="button"
        class="theme-toggle"
        onclick={toggleTheme}
        label={t.theme}
        aria-pressed={dark}
      >
        {#if dark}
          <Sun size={20} />
        {:else}
          <Moon size={20} />
        {/if}
      </IconButton>
      <button
        type="button"
        class={controlClass('ghost', 'icon', 'menu-button')}
        popovertarget="site-menu"
        aria-label={t.menu}
        title={t.menu}
      >
        <Menu size={20} />
      </button>
    </div>
  </div>
  <!-- Full-screen sheet: the popover gives Esc, focus return and the top layer without script. -->
  <div
    id="site-menu"
    class="site-menu"
    popover="auto"
    bind:this={menu}
    onclick={closeOnLink}
    role="presentation"
  >
    <div class="site-container menu-head">
      <a href={`/${locale}`} class="site-brand"
        ><span class="shumoku-header-logo"><img src={wordmark} alt="Shumoku"></span></a
      >
      <button
        type="button"
        class={controlClass('ghost', 'icon')}
        popovertarget="site-menu"
        popovertargetaction="hide"
        aria-label={t.close}
        title={t.close}
      >
        <X size={22} />
      </button>
    </div>
    <nav class="site-container menu-nav" aria-label={t.nav}>
      {#each links as link}
        <a href={link.href} aria-current={navigationCurrent(path, link.path)}>{link.label}</a>
      {/each}
    </nav>
    <div class="site-container menu-extra">
      <div class="menu-settings">
        <a
          class="menu-setting"
          href={`/${alternate}${path}`}
          onclick={() => rememberLanguage(alternate)}
          hreflang={alternate}
          lang={alternate}
          ><Languages size={20} aria-hidden="true" />{t.language}</a
        >
        <button type="button" class="menu-setting" onclick={toggleTheme} aria-pressed={dark}>
          {#if dark}
            <Sun size={20} aria-hidden="true" />
          {:else}
            <Moon size={20} aria-hidden="true" />
          {/if}
          {t.theme}
        </button>
      </div>
      <ul class="menu-social">
        {#each socialLinks as link}
          <li>
            <a href={link.href} aria-label={link.label} title={link.label}
              ><SocialIcon icon={link.icon} /></a
            >
          </li>
        {/each}
      </ul>
    </div>
  </div>
</header>

<style>
  .site-header {
    border-bottom: 1px solid var(--site-line);
    background: var(--site-bg);
    position: relative;
    z-index: 40;
  }
  .header-row,
  .menu-head {
    display: flex;
    align-items: center;
    gap: var(--ui-space-6);
    min-height: calc(var(--site-header-height) - 1px);
  }
  .site-brand {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    min-height: var(--ui-control-height);
    font-size: 1rem;
  }
  .desktop-nav {
    display: flex;
    gap: var(--ui-space-2);
    margin-left: auto;
    align-items: center;
    white-space: nowrap;
  }
  .header-controls {
    display: flex;
    align-items: center;
    gap: var(--ui-space-2);
    border-left: 1px solid var(--site-line);
    padding-left: var(--ui-space-4);
  }
  .menu-button {
    display: none;
  }

  /* Hidden until opened: the user-agent rule hides a closed popover, so only the open state sets display. */
  .site-menu {
    position: fixed;
    inset: 0;
    inline-size: 100%;
    block-size: 100dvh;
    max-inline-size: none;
    max-block-size: none;
    margin: 0;
    padding: 0 0 var(--layout-block);
    border: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
    background: var(--site-bg);
    color: var(--site-fg);
  }
  .site-menu:popover-open {
    display: flex;
    flex-direction: column;
  }
  .menu-head {
    justify-content: space-between;
    border-bottom: 1px solid var(--site-line);
    margin-inline: 0;
    padding-inline: max(var(--layout-inset), (100% - var(--site-width)) / 2);
    width: auto;
  }
  :global(html:has(#site-menu:popover-open)) {
    overflow: hidden;
  }
  .menu-nav {
    display: flex;
    flex-direction: column;
    padding-block: var(--ui-space-4);
  }
  .menu-nav a {
    display: flex;
    align-items: center;
    min-block-size: 3.25rem;
    border-bottom: 1px solid color-mix(in srgb, var(--site-line) 45%, transparent);
    font-size: 1.25rem;
    font-weight: 500;
    text-decoration: none;
  }
  .menu-nav a[aria-current] {
    color: var(--site-accent);
    font-weight: 700;
  }
  .menu-nav a[aria-current]::before {
    content: "";
    inline-size: 0.25rem;
    block-size: 1.25rem;
    margin-inline-end: var(--ui-space-3);
    border-radius: 999px;
    background: currentColor;
  }
  .menu-extra {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--ui-space-4);
    margin-top: var(--ui-space-4);
  }
  .menu-settings {
    display: flex;
    flex-wrap: wrap;
    gap: var(--ui-space-2);
  }
  .menu-setting {
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    gap: var(--ui-space-2);
    min-block-size: var(--ui-control-height);
    padding-inline: var(--ui-space-4);
    border: 1px solid var(--site-control-line);
    border-radius: var(--ui-radius);
    background: transparent;
    color: inherit;
    font: inherit;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
  }
  .menu-setting[aria-pressed="true"] {
    background: var(--ui-control-active);
  }
  .menu-social {
    display: flex;
    gap: var(--ui-space-1);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .menu-social a {
    display: grid;
    place-items: center;
    inline-size: var(--ui-control-height);
    block-size: var(--ui-control-height);
    border-radius: var(--ui-radius);
    color: var(--site-muted);
  }
  .site-menu a:focus-visible {
    outline: 2px solid var(--ui-focus);
    outline-offset: 2px;
  }
  @media (hover: hover) {
    .menu-nav a:hover {
      color: var(--site-accent);
    }
    .menu-social a:hover,
    .menu-setting:hover {
      background: var(--ui-control-active);
      color: var(--site-fg);
    }
  }

  /*
   * The header keeps two viewport queries. The menu breakpoint is its own: it follows from the width
   * of seven destinations, not from the page grid. The 850px one is the page breakpoint, where the
   * controls compact and GitHub and the theme toggle move into the menu.
   */
  @media (max-width: 1100px) {
    .desktop-nav {
      display: none;
    }
    .header-controls {
      margin-left: auto;
      border: 0;
      padding-left: 0;
    }
    .menu-button {
      display: inline-flex;
    }
  }
  @media (width > 1100px) {
    .site-menu:popover-open {
      display: none;
    }
  }
  @media (max-width: 850px) {
    .header-controls :global(:is(.github-link, .theme-toggle)) {
      display: none;
    }
    .header-controls :global(.locale-link) {
      width: var(--ui-control-height);
      padding: 0;
    }
    .locale-name {
      display: none;
    }
    .header-controls {
      gap: var(--ui-space-2);
    }
    .header-row {
      gap: var(--ui-space-4);
    }
    .shumoku-header-logo {
      --logo-height: 1.5em;
    }
  }
</style>
