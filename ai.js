/* Ayaz — Winterdeveloper yapay zeka asistanı
   Mesajlar Vercel'deki sunucuya gider; Groq anahtarı orada gizli durur.  */
(function () {
  "use strict";
  var API = "https://winterdeveloper-ai.vercel.app/api/chat";
  var KEY = "wd-ayaz-sohbet";
  var MAX_LEN = 1200;
  var FLAKE = '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 4v40M6.7 14l34.6 20M6.7 34l34.6-20"/><path d="M18 7l6 4 6-4M18 41l6-4 6 4M7 21l5.3-2.4-.5-6M41 27l-5.3 2.4.5 6M7 27l5.3 2.4-.5 6M41 21l-5.3-2.4.5-6"/></svg>';
  var CHIPS = ["Bana bir oyun öner", "Hangi Android uygulamaların var?", "Windows araçlarını göster", "Sen kimsin?"];

  var history = load();
  var busy = false;

  function load() {
    try { var h = JSON.parse(sessionStorage.getItem(KEY)); return Array.isArray(h) ? h : []; } catch (e) { return []; }
  }
  function save() {
    try { sessionStorage.setItem(KEY, JSON.stringify(history.slice(-30))); } catch (e) {}
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }
  // Güvenli, küçük markdown: **kalın**, `kod`, [metin](url) ve çıplak bağlantılar
  function render(text) {
    var out = esc(text);
    out = out.replace(/`([^`\n]+)`/g, "<code>$1</code>");
    out = out.replace(/\*\*([^*\n]+)\*\*/g, "<b>$1</b>");
    out = out.replace(/\[([^\]\n]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)/g, function (_, t, u) {
      return '<a href="' + u + '" target="_blank" rel="noopener noreferrer">' + t + "</a>";
    });
    out = out.replace(/(^|[\s(])(https?:\/\/[^\s<)]+[^\s<).,!?;:])/g, function (_, pre, u) {
      return pre + '<a href="' + u + '" target="_blank" rel="noopener noreferrer">' + u + "</a>";
    });
    return out;
  }

  // ---------- arayüz ----------
  var fab = document.createElement("button");
  fab.type = "button";
  fab.className = "ai-fab";
  fab.setAttribute("aria-haspopup", "dialog");
  fab.innerHTML = FLAKE + "<span>Ayaz'a sor</span>";

  var panel = document.createElement("section");
  panel.className = "ai-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Ayaz, yapay zeka asistanı");
  panel.innerHTML =
    '<div class="ai-head">' +
      '<div class="ai-ava">' + FLAKE + "</div>" +
      '<div class="ai-head-t"><b>Ayaz</b><span><i></i>Yapay zeka asistanı</span></div>' +
      '<button type="button" class="ai-icon-btn" data-ai="clear" title="Sohbeti temizle" aria-label="Sohbeti temizle"><svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg></button>' +
      '<button type="button" class="ai-icon-btn" data-ai="close" title="Kapat" aria-label="Kapat"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' +
    "</div>" +
    '<div class="ai-log" aria-live="polite"></div>' +
    '<form class="ai-form">' +
      '<label class="sr" for="ai-in">Ayaz\'a mesaj yaz</label>' +
      '<textarea id="ai-in" rows="1" maxlength="' + MAX_LEN + '" placeholder="Bir şey sor…" enterkeyhint="send"></textarea>' +
      '<button type="submit" class="ai-send" aria-label="Gönder"><svg viewBox="0 0 24 24"><path d="M5 12h14m0 0-6-6m6 6-6 6"/></svg></button>' +
    "</form>" +
    '<p class="ai-note">Yapay zeka hata yapabilir. Kişisel bilgilerini paylaşma.</p>';

  document.body.appendChild(fab);
  document.body.appendChild(panel);

  var log = panel.querySelector(".ai-log");
  var form = panel.querySelector(".ai-form");
  var input = panel.querySelector("textarea");
  var send = panel.querySelector(".ai-send");

  function bubble(cls, html) {
    var d = document.createElement("div");
    d.className = "ai-msg " + cls;
    d.innerHTML = html;
    log.appendChild(d);
    log.scrollTop = log.scrollHeight;
    return d;
  }

  function drawAll() {
    log.innerHTML = "";
    if (!history.length) {
      var h = document.createElement("div");
      h.className = "ai-hello";
      h.innerHTML = "<b>Selam, ben Ayaz ❄️</b><p>Sitedeki oyunları, uygulamaları ve araçları bulmana yardım ederim. Başka sorular da sorabilirsin.</p>";
      var chips = document.createElement("div");
      chips.className = "ai-chips";
      CHIPS.forEach(function (c) {
        var b = document.createElement("button");
        b.type = "button"; b.className = "ai-chip"; b.textContent = c;
        b.onclick = function () { ask(c); };
        chips.appendChild(b);
      });
      h.appendChild(chips);
      log.appendChild(h);
      return;
    }
    history.forEach(function (m) {
      bubble(m.role === "user" ? "me" : "bot", m.role === "user" ? esc(m.content) : render(m.content));
    });
  }

  function open() {
    panel.classList.add("open");
    fab.classList.add("hide");
    fab.setAttribute("aria-expanded", "true");
    drawAll();
    setTimeout(function () { input.focus(); }, 250);
  }
  function close() {
    panel.classList.remove("open");
    fab.classList.remove("hide");
    fab.setAttribute("aria-expanded", "false");
    fab.focus();
  }

  fab.addEventListener("click", open);
  panel.querySelector('[data-ai="close"]').addEventListener("click", close);
  panel.querySelector('[data-ai="clear"]').addEventListener("click", function () {
    if (busy) return;
    history = []; save(); drawAll(); input.focus();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && panel.classList.contains("open")) close();
  });

  input.addEventListener("input", function () {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 130) + "px";
  });
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); form.requestSubmit(); }
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    ask(input.value);
  });

  async function ask(text) {
    text = String(text || "").trim().slice(0, MAX_LEN);
    if (!text || busy) return;
    busy = true; send.disabled = true;
    input.value = ""; input.style.height = "";

    if (!history.length) log.innerHTML = "";
    history.push({ role: "user", content: text });
    bubble("me", esc(text));
    var bot = bubble("bot", '<span class="ai-typing" aria-label="Yazıyor"><i></i><i></i><i></i></span>');
    var answer = "";

    try {
      var res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-12) })
      });
      if (!res.ok) {
        var data = await res.json().catch(function () { return {}; });
        throw new Error(data.error || "Bağlantı hatası (" + res.status + ")");
      }
      var reader = res.body.getReader();
      var dec = new TextDecoder();
      while (true) {
        var r = await reader.read();
        if (r.done) break;
        answer += dec.decode(r.value, { stream: true });
        bot.innerHTML = render(answer);
        log.scrollTop = log.scrollHeight;
      }
      if (!answer.trim()) throw new Error("Boş cevap geldi, tekrar dener misin?");
      history.push({ role: "assistant", content: answer });
      save();
    } catch (err) {
      bot.remove();
      history.pop();
      bubble("err", esc(err && err.message ? err.message : "Bir şeyler ters gitti."));
    } finally {
      busy = false; send.disabled = false;
      input.focus();
    }
  }
})();
