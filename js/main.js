/* ============================================================
   LP PAULA ZAGOTTA — interações (FAQ + reveal no scroll)
   Vanilla JS, sem dependências. Progressivo: se o JS falhar,
   o conteúdo continua legível.
   ============================================================ */
(function () {
  'use strict';

  // --- Marca que o JS está ativo. Só a partir daqui o CSS esconde os
  //     elementos .reveal (progressive enhancement: sem JS, tudo visível). ---
  var raiz = document.documentElement;
  raiz.classList.add('js');

  // --- Respeita quem prefere menos movimento ---
  var reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --------------------------------------------------------
     1. FAQ (acordeão) — abre um, fecha os outros
     -------------------------------------------------------- */
  var perguntas = document.querySelectorAll('.faq-q');

  perguntas.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var estaAberto = item.classList.contains('open');

      // Fecha todos antes de abrir o clicado (comportamento de acordeão)
      document.querySelectorAll('.faq-item').forEach(function (i) {
        i.classList.remove('open');
        var q = i.querySelector('.faq-q');
        var a = i.querySelector('.faq-a');
        q.setAttribute('aria-expanded', 'false');
        a.style.maxHeight = null;
      });

      // Abre o clicado (se já não estava aberto)
      if (!estaAberto) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        var resposta = item.querySelector('.faq-a');
        // Altura real do conteúdo garante transição suave em qualquer tamanho
        resposta.style.maxHeight = resposta.scrollHeight + 'px';
      }
    });
  });

  /* --------------------------------------------------------
     2. Reveal no scroll — anima só quando entra na viewport.
     Usa IntersectionObserver (performático). Sem movimento,
     tudo já aparece visível de cara.
     -------------------------------------------------------- */
  var elementos = document.querySelectorAll('.reveal');

  function revelarTudo() {
    elementos.forEach(function (el) { el.classList.add('reveal-in'); });
  }

  if (reduzMovimento || !('IntersectionObserver' in window)) {
    // Fallback: mostra tudo, sem animação
    revelarTudo();
    return;
  }

  var observador = new IntersectionObserver(function (entradas, obs) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('reveal-in');
        obs.unobserve(entrada.target); // anima uma vez só
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elementos.forEach(function (el) { observador.observe(el); });

  // Failsafe: se por qualquer motivo o observer não disparar (bug de browser,
  // aba em background no load, etc.), revelamos tudo depois de um tempo pra
  // garantir que NADA fique invisível numa página de venda.
  window.setTimeout(revelarTudo, 2500);
})();
