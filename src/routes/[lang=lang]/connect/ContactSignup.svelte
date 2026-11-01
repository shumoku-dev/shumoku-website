<script lang="ts">
  import { onMount } from 'svelte'
  import { type ContactSignupResult, contactSignupCopy } from '$lib/content/contact'
  import type { Locale } from '$lib/i18n'
  import Button from '$lib/ui/Button.svelte'
  import Notice from '$lib/ui/Notice.svelte'
  import TextField from '$lib/ui/TextField.svelte'

  let { lang }: { lang: Locale } = $props()
  const copy = $derived(contactSignupCopy[lang])
  const results = ['ok', 'invalid', 'limited', 'error'] as const

  let email = $state('')
  let sending = $state(false)
  let result = $state<ContactSignupResult | null>(null)

  // Without JavaScript the endpoint redirects back with ?contact=<result>. The page is
  // prerendered, so read it in the browser and remove it from the address bar.
  onMount(() => {
    const url = new URL(window.location.href)
    const value = url.searchParams.get('contact')
    if (!value) return
    result = results.find((item) => item === value) ?? null
    url.searchParams.delete('contact')
    history.replaceState(history.state, '', url)
  })

  async function submit(event: SubmitEvent) {
    event.preventDefault()
    const form = event.currentTarget as HTMLFormElement
    sending = true
    result = null
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { accept: 'application/json' },
      })
      const body = (await response.json()) as { result?: ContactSignupResult }
      result = body.result ?? 'error'
      if (result === 'ok') email = ''
    } catch {
      result = 'error'
    } finally {
      sending = false
    }
  }
</script>

<section id="contact" class="signup" aria-labelledby="contact-title">
  <h2 id="contact-title">{copy.title}</h2>
  <p class="lead">{copy.description}</p>
  <form method="post" action="/api/contact" onsubmit={submit}>
    <input type="hidden" name="lang" value={lang}>
    <div class="trap" aria-hidden="true">
      <label>Website <input type="text" name="website" tabindex="-1" autocomplete="off"></label>
    </div>
    <TextField
      id="contact-email"
      name="email"
      type="email"
      autocomplete="email"
      label={copy.label}
      required
      maxlength={254}
      bind:value={email}
    />
    <Button type="submit" variant="primary" disabled={sending}>
      {sending ? copy.sending : copy.submit}
    </Button>
  </form>
  {#if result}
    <Notice title={copy.results[result].title} tone={result === 'ok' ? 'success' : 'danger'} live>
      {copy.results[result].body}
    </Notice>
  {/if}
  <p class="note">{copy.note} <a href={`/${lang}/privacy#email`}>{copy.privacy}</a></p>
</section>

<style>
  .signup {
    display: grid;
    gap: 1rem;
    margin-top: 2.5rem;
    padding-top: 2rem;
    border-top: 1px solid var(--site-line);
  }
  h2 {
    font-size: 1.125rem;
    font-weight: 600;
    text-align: center;
  }
  .lead {
    color: var(--site-muted);
    font-size: 0.875rem;
    line-height: 1.8;
  }
  form {
    display: grid;
    gap: 0.75rem;
  }
  .trap {
    position: absolute;
    left: -10000px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
  .note {
    color: var(--site-muted);
    font-size: 0.8125rem;
    line-height: 1.7;
  }
  .note a {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
</style>
