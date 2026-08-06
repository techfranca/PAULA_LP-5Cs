(function() {
  'use strict';

  // ---- helpers ----
  function getCookie(name) {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length === 2) return parts.pop().split(';').shift();
    return '';
  }

  function trackEvent(eventName) {
    var eventId = eventName + '_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);

    // 1. Pixel client-side
    if (typeof fbq === 'function') {
      fbq('trackCustom', eventName, {}, { eventID: eventId });
    }

    // 2. CAPI server-side (deduplicação pelo mesmo event_id)
    fetch('/api/pixel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: eventName,
        event_id: eventId,
        event_source_url: window.location.href,
        fbp: getCookie('_fbp'),
        fbc: getCookie('_fbc')
      })
    }).catch(function() {});
  }

  // ---- PageView ----
  trackEvent('PageView');

  // ---- Scroll depth ----
  var scrollFired = {};
  window.addEventListener('scroll', function() {
    var scrolled = window.scrollY + window.innerHeight;
    var total = document.documentElement.scrollHeight;
    var pct = (scrolled / total) * 100;

    if (pct >= 25 && !scrollFired['Scroll25']) { scrollFired['Scroll25'] = true; trackEvent('Scroll25'); }
    if (pct >= 50 && !scrollFired['Scroll50']) { scrollFired['Scroll50'] = true; trackEvent('Scroll50'); }
    if (pct >= 75 && !scrollFired['Scroll75']) { scrollFired['Scroll75'] = true; trackEvent('Scroll75'); }
    if (pct >= 100 && !scrollFired['Scroll100']) { scrollFired['Scroll100'] = true; trackEvent('Scroll100'); }
  }, { passive: true });

  // ---- Botões de checkout ----
  var BUTTON_MAP = {
    'QUERO MAIS CLIENTES →': 'Botao1',
    'QUERO TER ESTRATÉGIA →': 'Botao2',
    'QUERO FAZER O CLIENTE COMPRAR →': 'Botao3',
    'QUERO TER RESULTADO →': 'Botao4',
    'QUERO MAIS CLIENTES AGORA →': 'Botao5',
    'QUERO MEU CONTEUDO ORGANIZADO →': 'Botao6',
    'GARANTIR MINHA VAGA POR R$\u00a047 →': 'Botao7',
    'GARANTIR OFERTA ESPECIAL →': 'Botao8'
  };

  document.addEventListener('click', function(e) {
    var el = e.target.closest ? e.target.closest('a, button') : null;
    if (!el) return;

    // Checa pelo atributo data-checkout
    if (el.hasAttribute('data-checkout')) {
      var text = el.textContent.trim();
      var eventName = BUTTON_MAP[text] || 'BotaoCheckout';
      trackEvent(eventName);
    }
  });
})();
