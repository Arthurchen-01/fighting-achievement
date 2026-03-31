// Fighting Achievement Platform - App Logic
(function(){
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  // State
  let currentPage = 'home';
  let matchFilter = 'all';
  let matchTypeFilter = 'all';
  let matchYearFilter = 'all';
  let matchFighterFilter = 'all';

  // Init
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    renderStats();
    renderYearlyOverview();
    renderHomeMatches();
    renderHomeFighters();
    renderAllMatches();
    renderAllFighters();
    renderTournaments();
    renderHonors();
    renderVideos();
    setupNav();
    setupModals();
    setupFooterLinks();
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

  // Yearly overview
  function renderYearlyOverview() {
    const el = $('#yearly-overview');
    const chart = $('#trend-chart');
    if (!el) return;

    const yearData = [
      {year: 2026, wins: 7, losses: 1, total: 8, detail: '世运会选拔赛 · 全国拳击锦标赛', active: true},
      {year: 2025, wins: 19, losses: 3, total: 22, detail: '全国泰拳锦标赛双金 · 国际赛突破'},
      {year: 2024, wins: 129, losses: 31, total: 160, detail: '平台快速发展期 · 战绩突破200场'},
      {year: 2023, wins: 23, losses: 5, total: 28, detail: '平台初创 · 首批选手注册'},
    ];

    el.innerHTML = yearData.map(y => {
      const rate = ((y.wins / y.total) * 100).toFixed(1);
      return `
        <div class="yearly-card">
          <div class="yearly-year">${y.year}${y.active ? ' · 进行中' : ''}</div>
          <div class="yearly-record">${y.wins}胜${y.losses}负</div>
          <div class="yearly-winrate">${rate}% 胜率</div>
          <div class="yearly-detail">${y.total}场 · ${y.detail}</div>
        </div>
      `;
    }).join('');

    // SVG trend chart - yearly wins
    if (chart) {
      const points = yearData.map(y => y.wins).reverse(); // 2023-2026
      const maxVal = Math.max(...points);
      const w = 400, h = 80, padX = 30, padY = 15;
      const scaleX = (w - padX * 2) / (points.length - 1);
      const scaleY = (h - padY * 2) / maxVal;
      const coords = points.map((v, i) => `${padX + i * scaleX},${h - padY - v * scaleY}`);
      const years = ['2023', '2024', '2025', '2026'];

      chart.innerHTML = `
        <svg viewBox="0 0 ${w} ${h}" width="100%" style="max-width:500px" xmlns="http://www.w3.org/2000/svg">
          <line x1="${padX}" y1="${h-padY}" x2="${w-padX}" y2="${h-padY}" stroke="rgba(255,255,255,.08)" stroke-width="1"/>
          <line x1="${padX}" y1="${padY}" x2="${padX}" y2="${h-padY}" stroke="rgba(255,255,255,.08)" stroke-width="1"/>
          <polyline points="${coords.join(' ')}" fill="none" stroke="#e0b84e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          ${points.map((v, i) => `<circle cx="${padX + i * scaleX}" cy="${h - padY - v * scaleY}" r="4" fill="#e0b84e"/>`).join('')}
          ${years.map((yr, i) => `<text x="${padX + i * scaleX}" y="${h - 2}" text-anchor="middle" fill="#666" font-size="10" font-family="inherit">${yr}</text>`).join('')}
          ${points.map((v, i) => `<text x="${padX + i * scaleX}" y="${h - padY - v * scaleY - 10}" text-anchor="middle" fill="#e0b84e" font-size="11" font-weight="700" font-family="inherit">${v}</text>`).join('')}
        </svg>
      `;
    }
  }

  // Footer link navigation
  function setupFooterLinks() {
    $$('.footer-links a').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const page = a.dataset.page;
        showPage(page);
      });
    });
  }

  // Stats - tiered layout
  function renderStats() {
    const el = $('#stats-bar');
    if (!el) return;
    const winRate = ((STATS.totalWins / STATS.totalMatches) * 100).toFixed(1);
    el.innerHTML = `
      <div class="stats-row stats-row-primary">
        <div class="stat stat-primary">
          <div class="stat-num">${STATS.totalWins}</div>
          <div class="stat-label">总胜场</div>
        </div>
        <div class="stat stat-primary">
          <div class="stat-num">${winRate}%</div>
          <div class="stat-label">胜率</div>
        </div>
      </div>
      <div class="stats-row stats-row-secondary">
        <div class="stat stat-secondary">
          <div class="stat-num">${STATS.totalMatches}</div>
          <div class="stat-label">总场次</div>
        </div>
        <div class="stat stat-secondary">
          <div class="stat-num">${STATS.totalKOs}</div>
          <div class="stat-label">KO/TKO</div>
        </div>
        <div class="stat stat-secondary">
          <div class="stat-num">${STATS.medals}</div>
          <div class="stat-label">奖牌</div>
        </div>
        <div class="stat stat-secondary">
          <div class="stat-num">${STATS.intlMatches}</div>
          <div class="stat-label">国际赛</div>
        </div>
      </div>
    `;
  }

  // Home matches (latest 6)
  function renderHomeMatches() {
    const el = $('#home-matches');
    if (!el) return;
    const sorted = [...MATCHES].sort((a,b) => b.date.localeCompare(a.date));
    el.innerHTML = sorted.slice(0, 6).map(m => renderMatchCard(m)).join('');
    setupMatchClicks(el);
  }

  // Home fighters - all 6
  function renderHomeFighters() {
    const el = $('#home-fighters');
    if (!el) return;
    el.innerHTML = FIGHTERS.map(f => renderFighterCard(f, true)).join('');
    setupFighterClicks(el);
  }

  // All matches
  function renderAllMatches() {
    const el = $('#all-matches');
    if (!el) return;

    // Get unique years from matches
    const years = [...new Set(MATCHES.map(m => m.date.substring(0,4)))].sort((a,b) => b - a);

    // Level filters
    const filterBar = $('#match-filters');
    if (filterBar) {
      filterBar.innerHTML = `
        <button class="filter-btn active" data-level="all">全部级别</button>
        <button class="filter-btn" data-level="国际">🌍 国际</button>
        <button class="filter-btn" data-level="全国">🇨🇳 全国</button>
        <button class="filter-btn" data-level="区域">🌏 区域</button>
        <button class="filter-btn" data-level="城市">🏙️ 城市</button>
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

    // Type filters
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

    // Year filters
    const yearBar = $('#match-year-filters');
    if (yearBar) {
      yearBar.innerHTML = `<button class="filter-btn active" data-year="all">全部年份</button>` +
        years.map(y => `<button class="filter-btn" data-year="${y}">${y}</button>`).join('');
      yearBar.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          yearBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          matchYearFilter = btn.dataset.year;
          doRenderAllMatches();
        });
      });
    }

    // Fighter filters
    const fighterBar = $('#match-fighter-filters');
    if (fighterBar) {
      fighterBar.innerHTML = `<button class="filter-btn active" data-fighter="all">全部选手</button>` +
        FIGHTERS.map(f => `<button class="filter-btn" data-fighter="${f.id}">${f.name}</button>`).join('');
      fighterBar.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          fighterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          matchFighterFilter = btn.dataset.fighter === 'all' ? 'all' : parseInt(btn.dataset.fighter);
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
    if (matchYearFilter !== 'all') filtered = filtered.filter(m => m.date.startsWith(matchYearFilter));
    if (matchFighterFilter !== 'all') filtered = filtered.filter(m => m.fighterId === matchFighterFilter);
    filtered.sort((a,b) => b.date.localeCompare(a.date));
    el.innerHTML = filtered.length ? filtered.map(m => renderMatchCard(m)).join('') : '<div class="empty">暂无符合条件的比赛记录</div>';
    setupMatchClicks(el);
    renderMatchOverview(filtered);
  }

  // Match overview stats bar
  function renderMatchOverview(filtered) {
    const el = $('#match-overview');
    if (!el) return;
    const wins = filtered.filter(m => m.result === '胜').length;
    const losses = filtered.filter(m => m.result === '负').length;
    const total = filtered.length;
    const winRate = total > 0 ? ((wins / total) * 100).toFixed(1) : '0.0';
    const kos = filtered.filter(m => m.method === 'KO' || m.method === 'TKO').length;
    const koRate = total > 0 ? ((kos / total) * 100).toFixed(1) : '0.0';

    el.innerHTML = `
      <div class="mo-stat"><span class="mo-num mo-wins">${wins}</span><span class="mo-label">胜</span></div>
      <div class="mo-stat"><span class="mo-num mo-losses">${losses}</span><span class="mo-label">负</span></div>
      <div class="mo-stat"><span class="mo-num">${winRate}%</span><span class="mo-label">胜率</span></div>
      <div class="mo-stat"><span class="mo-num">${kos}</span><span class="mo-label">KO/TKO</span></div>
      <div class="mo-stat"><span class="mo-num">${koRate}%</span><span class="mo-label">KO率</span></div>
      <div class="mo-stat"><span class="mo-num">${total}</span><span class="mo-label">总场次</span></div>
      <div class="mo-bar"><div class="mo-bar-fill" style="width:${winRate}%"></div></div>
    `;
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
      <div class="honor-row">
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

  // Level badge class helper
  function getLevelBadgeClass(level) {
    switch(level) {
      case '国际': return 'level-gold';
      case '全国': return 'level-silver';
      case '区域': return 'level-bronze';
      default: return 'level-default';
    }
  }

  function getLevelBadgeIcon(level) {
    switch(level) {
      case '国际': return '🌍';
      case '全国': return '🇨🇳';
      case '区域': return '🌏';
      default: return '🏙️';
    }
  }

  // Calculate streak before a given match for a fighter
  function getStreakBeforeMatch(match) {
    const fighterMatches = MATCHES
      .filter(m => m.fighterId === match.fighterId)
      .sort((a,b) => a.date.localeCompare(b.date));
    const idx = fighterMatches.findIndex(m => m.id === match.id);
    if (idx <= 0) return null;

    let streak = 0;
    let streakType = null;
    for (let i = idx - 1; i >= 0; i--) {
      const r = fighterMatches[i].result;
      if (streakType === null) streakType = r;
      if (r === streakType) streak++;
      else break;
    }
    if (streak === 0) return null;
    return { count: streak, type: streakType };
  }

  // Render helpers
  function renderMatchCard(m) {
    const fighter = FIGHTERS.find(f => f.id === m.fighterId);
    const isWin = m.result === '胜';
    let tags = '';
    if (m.isKey) tags += '<span class="card-tag tag-key">★ 重点</span> ';
    tags += `<span class="card-tag ${isWin ? 'tag-win' : 'tag-loss'}">${m.result}</span> `;
    const levelBadge = `<span class="card-tag level-badge ${getLevelBadgeClass(m.level)}">${getLevelBadgeIcon(m.level)} ${m.level}</span>`;

    const keyClass = m.isKey ? ' match-key' : '';

    return `
      <div class="card match-card${keyClass}" data-match-id="${m.id}">
        <div class="card-body">
          <div class="card-meta">
            <span>${m.date}</span>
            <div>${tags}${levelBadge}</div>
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
        const streak = getStreakBeforeMatch(m);

        // Build streak text
        let streakHtml = '';
        if (streak && streak.count >= 2) {
          const streakLabel = streak.type === '胜' ? '连胜' : '连败';
          const streakClass = streak.type === '胜' ? 'streak-win' : 'streak-loss';
          streakHtml = `<div class="streak-badge ${streakClass}">本场前${streakLabel}${streak.count}场</div>`;
        }

        // Significance
        let significanceHtml = '';
        if (m.significance) {
          significanceHtml = `<div class="significance-line">📌 ${m.significance}</div>`;
        }

        // Opponent info
        let opponentHtml = `<div class="modal-divider"></div>
          <div class="opponent-section">
            <div class="opponent-header">对手信息</div>
            <div class="opponent-name">${m.opponent}</div>
            <div class="opponent-meta">${m.opponentCountry}${m.opponentRecord ? ' · 战绩 ' + m.opponentRecord : ''}</div>
          </div>`;

        showModal(`
          <button class="close-btn" onclick="closeModal()">✕</button>
          <div class="modal-match-header">
            <span class="level-badge ${getLevelBadgeClass(m.level)}">${getLevelBadgeIcon(m.level)} ${m.level}</span>
            <span class="card-tag ${isWin ? 'tag-win' : 'tag-loss'}">${m.result}</span>
          </div>
          <h2>${m.event}</h2>
          ${significanceHtml}
          <div class="modal-divider"></div>
          <div class="card-meta" style="margin:0 0 12px">
            <span>${m.date} | ${m.type}</span>
          </div>
          <div class="mc-vs" style="font-size:1.15rem">
            <span class="mc-fighter">${fighter ? fighter.name : ''}</span>
            <span class="mc-result ${isWin ? 'win' : 'loss'}">${m.result} (${m.method})</span>
          </div>
          ${m.round ? `<p style="margin-top:6px">回合：第 ${m.round} 回合</p>` : ''}
          ${streakHtml}
          ${opponentHtml}
          ${m.isKey ? '<div class="modal-divider"></div><p style="color:var(--accent);margin-top:8px;font-weight:700">★ 重点赛事</p>' : ''}
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
        const total = f.wins + f.losses;
        const winRate = total > 0 ? ((f.wins / total) * 100).toFixed(1) : '0.0';

        // Build match timeline
        const timelineHtml = fighterMatches.map(m => {
          const w = m.result === '胜';
          return `<div class="timeline-item ${w ? 'tl-win' : 'tl-loss'}">
            <div class="tl-dot"></div>
            <div class="tl-content">
              <div class="tl-header">
                <span class="tl-date">${m.date}</span>
                <span class="tl-result ${w ? 'win' : 'loss'}">${m.result}</span>
              </div>
              <div class="tl-event">${m.event}</div>
              <div class="tl-detail">vs ${m.opponent} (${m.opponentCountry}) · ${m.method}${m.round ? ' R'+m.round : ''}</div>
            </div>
          </div>`;
        }).join('');

        // Build awards wall
        let awardsHtml = '';
        if (f.awards && f.awards.length > 0) {
          awardsHtml = `
            <div class="modal-divider"></div>
            <h4 class="modal-section-title">🏅 荣誉墙</h4>
            <div class="awards-wall">
              ${f.awards.map(a => `
                <div class="award-item">
                  <span class="award-icon">${a.icon}</span>
                  <div>
                    <div class="award-year">${a.year}</div>
                    <div class="award-title">${a.title}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          `;
        }

        showModal(`
          <button class="close-btn" onclick="closeModal()">✕</button>
          <div style="text-align:center;margin-bottom:16px">
            <div class="fighter-avatar" style="margin:0 auto 12px;width:72px;height:72px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.5rem;font-weight:800;background:var(--bg3);border:2px solid var(--accent)">${f.name.charAt(0)}</div>
            <h2>${f.name}</h2>
            <p style="color:var(--accent)">${f.discipline} | ${f.level} | ${f.country}</p>
          </div>
          <div class="fighter-stats" style="justify-content:center;gap:24px;margin:16px 0">
            <div class="fs"><div class="fs-num green">${f.wins}</div><div class="fs-label">胜</div></div>
            <div class="fs"><div class="fs-num red">${f.losses}</div><div class="fs-label">负</div></div>
            <div class="fs"><div class="fs-num">${f.kos}</div><div class="fs-label">KO/TKO</div></div>
            <div class="fs"><div class="fs-num">${f.medals}</div><div class="fs-label">奖牌</div></div>
          </div>

          <div class="winrate-section">
            <div class="winrate-header">
              <span>胜率</span>
              <span class="winrate-value">${winRate}%</span>
            </div>
            <div class="winrate-bar">
              <div class="winrate-fill" style="width:${winRate}%">
                <span class="winrate-bar-text">${f.wins}胜${f.losses}负</span>
              </div>
            </div>
          </div>

          <div class="modal-divider"></div>
          <p style="margin:12px 0">${f.bio}</p>

          ${awardsHtml}

          <div class="modal-divider"></div>
          <h4 class="modal-section-title">📋 比赛时间线</h4>
          <div class="timeline">
            ${timelineHtml}
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
