<script lang="ts">
  import itcuec from '$lib/assets/adopters/itcuec_logo_300.png?enhanced'
  import janog57 from '$lib/assets/adopters/janog57_logo.png?enhanced'
  import janog58 from '$lib/assets/adopters/janog58_logo.png?enhanced'

  let { label }: { label: string } = $props()
  const adopters = [
    { name: '電気通信大学 情報基盤センター', logo: itcuec, url: 'https://www.cc.uec.ac.jp/' },
    { name: 'JANOG57', logo: janog57, url: 'https://www.janog.gr.jp/meeting/janog57/' },
    { name: 'JANOG58', logo: janog58, url: 'https://www.janog.gr.jp/meeting/janog58/' },
  ]
</script>

<ul aria-label={label}>
  {#each adopters as adopter (adopter.name)}
    <li>
      <a href={adopter.url} title={adopter.name}>
        <enhanced:img src={adopter.logo} alt={adopter.name} sizes="120px" loading="lazy" />
      </a>
    </li>
  {/each}
</ul>

<style>
  ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--ui-space-6);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  a {
    display: block;
    border-radius: var(--ui-radius);
  }
  /* Logos share a height; width follows each logo's aspect ratio. */
  a :global(img) {
    display: block;
    width: auto;
    height: 2.75rem;
    border-radius: var(--ui-radius);
  }
</style>
