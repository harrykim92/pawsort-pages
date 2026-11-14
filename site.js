// No analytics, cookies or persistent browser storage. Both languages remain
// available without JavaScript; an explicit query parameter is shareable.
(() => {
  const buttons = document.querySelectorAll('[data-set-lang]');
  const select = (language) => {
    const lang = language === 'ko' ? 'ko' : 'en';
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang]').forEach(section => {
      section.hidden = section.dataset.lang !== lang;
    });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.setLang === lang)));
    document.querySelectorAll('a[data-local]').forEach(link => {
      const target = new URL(link.getAttribute('href'), location.href);
      target.searchParams.set('lang', lang);
      link.href = target.href;
    });
    const current = new URL(location.href);
    current.searchParams.set('lang', lang);
    history.replaceState(null, '', current);
  };
  buttons.forEach(button => button.addEventListener('click', () => select(button.dataset.setLang)));
  const requested = new URLSearchParams(location.search).get('lang');
  select(requested === 'ko' || requested === 'en' ? requested : navigator.language.startsWith('ko') ? 'ko' : 'en');
})();
