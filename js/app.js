// Fighting Achievement Platform - App Logic
(function(){
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  // State
  let currentPage = 'home';
  let matchFilter = 'all';
  let matchTypeFilter = 'all';

  // Init
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    renderStats();
    renderHomeMatches();
    renderHomeFighters();
    renderAllMatches();
    renderAllFighters();
    renderTournaments();
    renderHonors();
    renderVideos();
    setupNav();
    setupModals();
    showPage('home');
  }

  // Navigation
  function setupNav() {
    $$('.nav-links a').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const page = a.dataset.page;
        showPage(page);
        $$('.nav-links').forEach(ul => ul.classList.remove('open'));
      });
    });
    const burger = $('.nav-burger');
    if (burger) {
      burger.addEventListener('click', () => {
        $$('.nav-links').forEach(ul => ul.classList.toggle('open'));
      });
    }
    // hash
    if (location.hash) {
      const p = location.hash.slice(1);
      if (['home','matches','fighters','tournaments','honors','videos','about'].includes(p)) showPage(p);
    }
  }

  function showPage(page) {
    currentPage = page;
    $$('.page').forEach(p => p.classList.remove('active'));
    const el = $(`#page-${page}`);
    if (el) el.classList.add('active');
    $$('.nav-links a').forEach(a => {
      a.classList.toggle('active', a.dataset.page === page);
    });
    location.hash = page;
    window.scrollTo(0, 0);
  }

  // Stats
  function renderStats() {
    const el = $('#stats-bar');
    if (!el) return;
    const items = [
      {num: STATS.totalMatches, label: '总比赛场次'},
      {num: STATS.totalWins, label: '总胜场'},
      {num: STATS.totalKOs, label: 'KO/TKO'},
      {num: STATS.medals, label: '奖牌数'},
      {num: STATS.intlMatches, label: '国际赛事'},
      {num: STATS.recentForm, label: '近期战绩'},
    ];
    el.innerHTML = items.map(i => `
      <div class="stat">
        <div class="stat-num">${i.num}</div>
        <div class="stat-label">${i.label}</div>
      </div>
    `).join('');
  }

  // Home matches (latest 6)
  function renderHomeMatches() {
    const el = $('#home-matches');
    if (!el) return;
    const sorted = [...MATCHES].sort((a,b) => b.date.localeCompare(a.date));
    el.innerHTML = sorted.slice(0, 6).map(m => renderMatchCard(m)).join('');
    setupMatchClicks(el);
  }

  // Home fighters
  function renderHomeFighters() {
    const el = $('#home-fighters');
    if (!el) return;
    el.innerHTML = FIGHTERS.slice(0, 4).map(f => renderFighterCard(f, true)).join('');
    setupFighterClicks(el);
  }

  // All matches
  function renderAllMatches() {
    const el = $('#all-matches');
    if (!el) return;

    // Filters
    const filterBar = $('#match-filters');
    if (filterBar) {
      filterBar.innerHTML = `
        <button class="filter-btn active" data-level="all">全部</button>
        <button class="filter-btn" data-level="国际">国际</button>
        <button class="filter-btn" data-level="全国">全国</button>
        <button class="filter-btn" data-level="区域">区域</button>
        <button class="filter-btn" data-level="城市">城市</button>
      `;
      filterBar.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          matchFilter = btn.dataset.level;
          doRenderAllMatches();
        });
      });
    }

    const typeBar = $('#match-type-filters');
    if (typeBar) {
      typeBar.innerHTML = `
        <button class="filter-btn active" data-type="all">全部项目</button>
        <button class="filter-btn" data-type="泰拳">泰拳</button>
        <button class="filter-btn" data-type="自由搏击">自由搏击</button>
        <button class="filter-btn" data-type="拳击">拳击</button>
      `;
      typeBar.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          typeBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          matchTypeFilter = btn.dataset.type;
          doRenderAllMatches();
        });
      });
    }

    doRenderAllMatches();
  }

  function doRenderAllMatches() {
    const el = $('#all-matches');
    let filtered = [...MATCHES];
    if (matchFilter !== 'all') filtered = filtered.filter(m => m.level === matchFilter);
    if (matchTypeFilter !== 'all') filtered = filtered.filter(m => m.type === matchTypeFilter);
    filtered.sort((a,b) => b.date.localeCompare(a.date));
    el.innerHTML = filtered.length ? filtered.map(m => renderMatchCard(m)).join('') : '<div class="empty">暂无符合条件的比赛记录</div>';
    setupMatchClicks(el);
  }

  // All fighters
  function renderAllFighters() {
    const el = $('#all-fighters');
    if (!el) return;
    el.innerHTML = FIGHTERS.map(f => renderFighterCard(f)).join('');
    setupFighterClicks(el);
  }

  // Tournaments
  function renderTournaments() {
    const el = $('#all-tournaments');
    if (!el) return;
    const sorted = [...TOURNAMENTS].sort((a,b) => b.year - a.year);
    el.innerHTML = sorted.map(t => `
      <div class="card tournament-card" data-id="${t.id}">
        <div class="tc-body">
          <div class="tc-year">${t.year}</div>
          <div class="tc-name">${t.name}</div>
          <div class="tc-meta">
            <span class="tc-tag">${t.level}</span>
            <span class="tc-tag">${t.type}</span>
            <span class="tc-tag">${t.location}</span>
          </div>
          <div class="tc-stats">
            参赛：<b>${t.fighters.map(fid => FIGHTERS.find(f=>f.id===fid)?.name || '').filter(Boolean).join('、')}</b>
            &nbsp;|&nbsp; 成绩：<b>${t.record}</b>
          </div>
          <div class="tc-highlight">${t.highlight}</div>
        </div>
      </div>
    `).join('');
  }

  // Honors
  function renderHonors() {
    const el = $('#all-honors');
    if (!el) return;
    const sorted = [...HONORS].sort((a,b) => b.year - a.year);
    el.innerHTML = sorted.map(h => `
      <div class="honor">
        <div class="honor-icon">${h.icon}</div>
        <div>
          <div class="honor-year">${h.year}</div>
          <div class="honor-title">${h.title}</div>
          <div class="honor-desc">${h.desc}</div>
        </div>
      </div>
    `).join('');
  }

  // Videos
  function renderVideos() {
    const el = $('#all-videos');
    if (!el) return;
    el.innerHTML = VIDEOS.map(v => `
      <div class="card video-card">
        <div class="video-thumb"></div>
        <div class="video-info">
          <div class="video-title">${v.title}</div>
          <div class="video-meta">${v.fighter} | ${v.event} | ${v.result}</div>
        </div>
      </div>
    `).join('');
  }

  // Render helpers
  function renderMatchCard(m) {
    const fighter = FIGHTERS.find(f => f.id === m.fighterId);
    const isWin = m.result === '胜';
    let tags = '';
    if (m.isKey) tags += '<span class="card-tag tag-key">★ 重点</span> ';
    tags += `<span class="card-tag ${isWin ? 'tag-win' : 'tag-loss'}">${m.result}</span> `;
    if (m.level === '国际') tags += '<span class="card-tag tag-intl">国际</span> ';
    if (m.level === '全国') tags += '<span class="card-tag tag-champ">全国</span>';

    const keyClass = m.isKey ? ' match-key' : '';

    return `
      <div class="card match-card${keyClass}" data-match-id="${m.id}">
        <div class="card-body">
          <div class="card-meta">
            <span>${m.date}</span>
            <div>${tags}</div>
          </div>
          <h3>${m.event}</h3>
          <div class="mc-vs">
            <span class="mc-fighter">${fighter ? fighter.name : ''}</span>
            <span class="mc-result ${isWin ? 'win' : 'loss'}">${m.method}${m.round ? ' R' + m.round : ''}</span>
            <span class="mc-opponent">vs ${m.opponent} (${m.opponentCountry})</span>
          </div>
          <div class="mc-detail">${m.type} | ${m.level}</div>
        </div>
      </div>
    `;
  }

  function renderFighterCard(f, isAce) {
    const aceClass = isAce ? ' fighter-ace' : '';
    return `
      <div class="card fighter-card${aceClass}" data-fighter-id="${f.id}">
        <div class="fighter">
          <div class="fighter-avatar">${f.name.charAt(0)}</div>
          <div class="fighter-name">${f.name}</div>
          <div class="fighter-info">${f.discipline} · ${f.level}</div>
          <div class="fighter-stats">
            <div class="fs"><div class="fs-num green">${f.wins}</div><div class="fs-label">胜</div></div>
            <div class="fs"><div class="fs-num red">${f.losses}</div><div class="fs-label">负</div></div>
            <div class="fs"><div class="fs-num">${f.kos}</div><div class="fs-label">KO/TKO</div></div>
          </div>
        </div>
      </div>
    `;
  }

  // Modals
  function setupModals() {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });
    const overlay = $('#modal-overlay');
    if (overlay) {
      overlay.addEventListener('click', e => {
        if (e.target === overlay) closeModal();
      });
    }
  }

  function setupMatchClicks(container) {
    container.querySelectorAll('.match-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = parseInt(card.dataset.matchId);
        const m = MATCHES.find(x => x.id === id);
        if (!m) return;
        const fighter = FIGHTERS.find(f => f.id === m.fighterId);
        const isWin = m.result === '胜';
        showModal(`
          <button class="close-btn" onclick="closeModal()">✕</button>
          <h2>${m.event}</h2>
          <div class="card-meta" style="margin:12px 0">
            <span>${m.date} | ${m.level} | ${m.type}</span>
          </div>
          <div class="mc-vs" style="font-size:1.15rem">
            <span class="mc-fighter">${fighter ? fighter.name : ''}</span>
            <span class="mc-result ${isWin ? 'win' : 'loss'}">${m.result} (${m.method})</span>
          </div>
          <p style="margin-top:8px">对手：${m.opponent}（${m.opponentCountry}）</p>
          ${m.round ? `<p>回合：第 ${m.round} 回合</p>` : ''}
          ${m.isKey ? '<p style="color:var(--accent);margin-top:8px">★ 重点赛事</p>' : ''}
        `);
      });
    });
  }

  function setupFighterClicks(container) {
    container.querySelectorAll('.fighter-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = parseInt(card.dataset.fighterId);
        const f = FIGHTERS.find(x => x.id === id);
        if (!f) return;
        const fighterMatches = MATCHES.filter(m => m.fighterId === f.id).sort((a,b) => b.date.localeCompare(a.date));
        showModal(`
          <button class="close-btn" onclick="closeModal()">✕</button>
          <div style="text-align:center;margin-bottom:16px">
            <div class="fighter-avatar" style="margin:0 auto 12px;width:72px;height:72px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.5rem;font-weight:800;background:var(--bg3);border:2px solid var(--accent)">${f.name.charAt(0)}</div>
            <h2>${f.name}</h2>
            <p style="color:var(--accent)">${f.discipline} | ${f.level}</p>
          </div>
          <div class="fighter-stats" style="justify-content:center;gap:24px;margin:16px 0">
            <div class="fs"><div class="fs-num green">${f.wins}</div><div class="fs-label">胜</div></div>
            <div class="fs"><div class="fs-num red">${f.losses}</div><div class="fs-label">负</div></div>
            <div class="fs"><div class="fs-num">${f.kos}</div><div class="fs-label">KO/TKO</div></div>
            <div class="fs"><div class="fs-num">${f.medals}</div><div class="fs-label">奖牌</div></div>
          </div>
          <p style="margin:12px 0">${f.bio}</p>
          ${f.highlight ? '<h4 style="margin:16px 0 8px;font-weight:700">🏆 重要荣誉</h4><p style="color:var(--accent);font-weight:600;font-size:.9rem">' + f.highlight + '</p>' : ''}
          <h4 style="margin:16px 0 8px">📋 近期比赛</h4>
          <div style="max-height:200px;overflow-y:auto">
            ${fighterMatches.slice(0, 5).map(m => {
              const w = m.result === '胜';
              return `<div style="padding:8px 0;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;font-size:.85rem">
                <span>${m.date} ${m.event}</span>
                <span style="color:${w ? 'var(--green)' : 'var(--red)'}">${m.result} ${m.method}</span>
              </div>`;
            }).join('')}
          </div>
        `);
      });
    });
  }

  // Modal API (exposed globally for onclick)
  window.showModal = function(html) {
    const overlay = $('#modal-overlay');
    const content = $('#modal-content');
    if (overlay && content) {
      content.innerHTML = html;
      overlay.classList.add('open');
    }
  };
  window.closeModal = function() {
    const overlay = $('#modal-overlay');
    if (overlay) overlay.classList.remove('open');
  };

})();
