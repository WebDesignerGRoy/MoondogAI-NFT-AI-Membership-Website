/* MoondogAI — Vanilla JS
   Handles waitlist email validation + UX feedback. */

(function () {
  'use strict';

  // RFC-pragmatic email regex (good enough for client-side UX)
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function $(id) { return document.getElementById(id); }

  function setMessage(el, text, type) {
    el.textContent = text;
    el.classList.remove('success', 'error');
    if (type) el.classList.add(type);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var form = $('waitlist-form');
    var input = $('waitlist-email');
    var btn = $('waitlist-submit');
    var msg = $('waitlist-msg');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var value = (input.value || '').trim();

      if (!value) {
        setMessage(msg, 'Please enter your email.', 'error');
        input.focus();
        return;
      }
      if (value.length > 255) {
        setMessage(msg, 'Email is too long.', 'error');
        return;
      }
      if (!EMAIL_RE.test(value)) {
        setMessage(msg, 'Enter a valid email address.', 'error');
        input.focus();
        return;
      }

      btn.disabled = true;
      var originalText = btn.textContent;
      btn.textContent = 'Joining...';
      setMessage(msg, '', null);

      // Simulate async submission. Replace with fetch() to your backend.
      setTimeout(function () {
        btn.disabled = false;
        btn.textContent = originalText;
        input.value = '';
        setMessage(msg, "You're on the list. The pack will howl when it's time. \uD83C\uDF19", 'success');
      }, 600);
    });

    // Smooth scroll for in-page anchors (graceful degradation if CSS already does it)
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var href = a.getAttribute('href');
        if (!href || href === '#') return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  });
})();
