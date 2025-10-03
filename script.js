// script.js
// Minimal enhancements:
// - Accessible, progressive enhancement contact form submission (Formspree placeholder)
// - Live status updates; graceful fallback to normal POST when JS disabled

(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const status = document.getElementById('formMsg');
  const submitBtn = form.querySelector('button[type="submit"]');

  function setStatus(msg, ok) {
    if (!status) return;
    status.textContent = msg;
    form.classList.remove('form-success','form-error');
    form.classList.add(ok ? 'form-success' : 'form-error');
  }

  form.addEventListener('submit', async function (e) {
    // If action is "#" we don't hijack (keeps compatibility if backend unset)
    if (!form.action || form.action === '#') return;

    e.preventDefault();

    // Basic honeypot check
    const hp = form.querySelector('input[name="_gotcha"]');
    if (hp && hp.value) {
      setStatus('Viga: saatmine keelatud.', false);
      return;
    }

    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy','true');

    try {
      const data = new FormData(form);
      const res = await fetch(form.action, {
        method: form.method || 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.reset();
        setStatus('Aitäh! Sõnum on saadetud.', true);
      } else {
        setStatus('Vabandame, saatmine ebaõnnestus. Palun proovi uuesti.', false);
      }
    } catch (err) {
      setStatus('Võrguviga – proovi uuesti või kirjuta: info@vaiksedeesliinid.ee', false);
    } finally {
      submitBtn.disabled = false;
      submitBtn.removeAttribute('aria-busy');
    }
  });
})();