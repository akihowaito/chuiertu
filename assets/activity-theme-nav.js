(function(){
  const THEME_KEY='chuiertu_site_theme_v1';
  const pages={
    home:{href:'./index.html',icon:'⌂',label:'首页'},
    wheel:{href:'./chuiertu_188_luckywheel.html',icon:'🎡',label:'心愿常驻转盘'},
    scratch:{href:'./chuiertu_scratch.html',icon:'🎟️',label:'祈愿刮刮乐'},
    fun:{href:'./chuiertu_188_blindbox.html',icon:'🎁',label:'今日趣味单'}
  };
  const path=location.pathname.toLowerCase();
  const current=path.endsWith('/')||path.endsWith('/index.html')?'home':path.includes('luckywheel')?'wheel':path.includes('scratch')?'scratch':path.includes('blindbox')?'fun':'home';
  const stored=localStorage.getItem(THEME_KEY);
  let theme=stored==='bunny'||stored==='angel'?stored:'angel';

  const style=document.createElement('style');
  style.id='activity-theme-nav-style';
  style.textContent=`
    :root{--angel-pink:#f2a8cc;--angel-blue:#9fd8f4;--angel-gold:#e9c77b;--angel-ink:#685669}
    body{transition:background-color .35s ease,background-image .35s ease}
    .theme-switch{position:fixed;z-index:72;right:24px;top:84px;display:inline-flex;align-items:center;gap:7px;min-height:38px;padding:8px 13px;border:1.5px solid rgba(242,168,204,.72);border-radius:999px;background:rgba(255,255,255,.9);box-shadow:0 5px 0 rgba(159,216,244,.24),0 12px 25px rgba(105,85,106,.1);color:#755f72;font:900 12px/1.2 "Huninn","PingFang SC","Microsoft YaHei",sans-serif;cursor:pointer;backdrop-filter:blur(9px);transition:transform .2s,box-shadow .2s,background .2s}
    .theme-switch:hover{transform:translateY(-2px);box-shadow:0 7px 0 rgba(159,216,244,.25),0 16px 28px rgba(105,85,106,.13)}
    .theme-switch:active{transform:translateY(2px);box-shadow:0 2px 0 rgba(159,216,244,.25)}
    .theme-switch__icon{font-size:16px}.theme-switch__text{white-space:nowrap}
    .angel-sky{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none;opacity:0;transition:opacity .35s}
    .angel-sky::before{content:"";position:absolute;left:-8%;right:-8%;bottom:-135px;height:270px;background:radial-gradient(ellipse at 8% 20%,rgba(255,255,255,.9) 0 26%,transparent 27%),radial-gradient(ellipse at 28% 35%,rgba(255,255,255,.82) 0 31%,transparent 32%),radial-gradient(ellipse at 52% 16%,rgba(255,255,255,.9) 0 34%,transparent 35%),radial-gradient(ellipse at 76% 35%,rgba(255,255,255,.82) 0 31%,transparent 32%),radial-gradient(ellipse at 94% 20%,rgba(255,255,255,.9) 0 26%,transparent 27%);filter:drop-shadow(0 -8px 18px rgba(157,210,239,.14))}
    .angel-sky::after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 50% 14%,rgba(255,242,190,.2),transparent 18%),radial-gradient(circle at 12% 44%,rgba(255,255,255,.7),transparent 12%),radial-gradient(circle at 88% 54%,rgba(255,255,255,.68),transparent 13%)}
    body[data-site-theme="angel"] .angel-sky{opacity:1}
    .angel-sky span{position:absolute;color:#fff;text-shadow:0 0 12px rgba(233,199,123,.7);opacity:.42;will-change:transform;animation:angelGlide var(--time) ease-in-out var(--delay) infinite}
    @keyframes angelGlide{0%,100%{transform:translate3d(0,8px,0) rotate(-7deg);opacity:.16}45%{transform:translate3d(var(--drift),-14px,0) rotate(8deg);opacity:.46}}
    body[data-site-theme="angel"]{background-image:radial-gradient(circle at 18% 9%,rgba(255,224,239,.88),transparent 36%),radial-gradient(circle at 83% 12%,rgba(212,239,255,.9),transparent 38%),linear-gradient(135deg,#fff9fc 0%,#f8f5ff 48%,#effaff 100%)!important}
    body[data-site-theme="angel"] .page{background-image:linear-gradient(120deg,rgba(255,239,247,.64),rgba(241,249,255,.68))!important}
    body[data-site-theme="angel"] h1,body[data-site-theme="angel"] .hero-title{background:linear-gradient(100deg,#ef8fbd 12%,#d8b15e 50%,#78bfe8 88%)!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important;filter:drop-shadow(0 3px 0 rgba(255,255,255,.95)) drop-shadow(0 8px 12px rgba(151,199,230,.15))}
    body[data-site-theme="angel"] .theme-switch{border-color:rgba(225,188,104,.8);background:linear-gradient(120deg,rgba(255,255,255,.96),rgba(255,247,218,.94),rgba(239,249,255,.95));box-shadow:0 5px 0 rgba(233,199,123,.25),0 0 18px rgba(255,226,144,.26)}
    body[data-site-theme="angel"] .event-card,body[data-site-theme="angel"] .wheel-shell,body[data-site-theme="angel"] .inline-result,body[data-site-theme="angel"] .panel,body[data-site-theme="angel"] .history-card,body[data-site-theme="angel"] .probability-card,body[data-site-theme="angel"] .draw-card{border-color:rgba(226,190,106,.62)!important;box-shadow:0 0 0 2px rgba(255,255,255,.76),0 7px 0 rgba(159,216,244,.18),0 20px 38px rgba(105,85,106,.09)!important}
    body[data-site-theme="angel"] .eyebrow,body[data-site-theme="angel"] .status-pill,body[data-site-theme="angel"] .brand-tag{border-color:rgba(226,190,106,.54)!important;background:rgba(255,253,244,.86)!important}
    body[data-site-theme="angel"] .spin-button,body[data-site-theme="angel"] .start-btn,body[data-site-theme="angel"] .draw-button,body[data-site-theme="angel"] .event-link{background:linear-gradient(110deg,#f28dbc,#f7d990 52%,#8fd1f2)!important}
    body[data-site-theme="angel"] .event-card::before{background:linear-gradient(90deg,var(--cardA,#f2a8cc),#fff2c9,var(--cardB,#9fd8f4))!important}
    .activity-dock{position:fixed;right:18px;bottom:148px;z-index:70;display:flex;flex-direction:column;align-items:flex-end;gap:8px;font-family:"Huninn","PingFang SC","Microsoft YaHei",sans-serif}
    .activity-dock__panel{display:flex;max-height:0;flex-direction:column-reverse;align-items:flex-end;gap:8px;overflow:hidden;opacity:0;transform:translateY(8px);pointer-events:none;transition:max-height .3s ease,opacity .2s,transform .3s}
    .activity-dock.is-open .activity-dock__panel{max-height:240px;opacity:1;transform:none;pointer-events:auto}
    .activity-dock__link,.activity-dock__toggle{display:flex;align-items:center;gap:9px;min-height:42px;border:1.5px solid #cceafa;border-radius:14px;background:rgba(255,255,255,.93);box-shadow:0 5px 0 rgba(159,216,244,.28),0 12px 24px rgba(91,71,92,.1);color:#705b70;text-decoration:none;font-family:inherit;font-size:12px;font-weight:900;line-height:1.2;white-space:nowrap;transition:transform .2s,background .2s,opacity .2s;backdrop-filter:blur(9px)}
    .activity-dock__link{padding:9px 13px}.activity-dock__toggle{display:flex;width:50px;height:50px;min-height:50px;justify-content:center;padding:0;border:1.5px solid #eda0c4;border-radius:50%;outline:0;background:linear-gradient(135deg,#fff5fa,#fff,#eff9ff);box-shadow:0 5px 0 rgba(159,216,244,.3),0 12px 24px rgba(91,71,92,.12);cursor:pointer;color:#df639f;font-size:25px}.activity-dock__toggle .activity-dock__label{display:none}.activity-dock__toggle .activity-dock__icon{transition:transform .25s ease}.activity-dock.is-open .activity-dock__toggle .activity-dock__icon{transform:rotate(45deg)}.activity-dock__toggle:focus-visible{box-shadow:0 0 0 4px rgba(239,153,194,.2),0 5px 0 rgba(159,216,244,.3)}
    .activity-dock__link:hover,.activity-dock__toggle:hover{transform:translateY(-2px);background:#fff8fc}
    .activity-dock__link[aria-current="page"]{border-color:#ef9cc3;background:linear-gradient(110deg,#fff2f8,#eef9ff);color:#e25b9d;pointer-events:none}
    .activity-dock__icon{display:grid;place-items:center;width:22px;height:22px;font-size:16px}.activity-dock__label{max-width:160px;overflow:hidden;transition:max-width .25s,opacity .2s}
    @media(max-width:760px){
      .theme-switch{right:12px;top:74px;min-height:36px;padding:7px 10px}.theme-switch__text{display:none}
      .activity-dock{right:12px;bottom:max(112px,calc(env(safe-area-inset-bottom) + 90px));gap:7px}
      .activity-dock__panel{max-height:0;opacity:0;overflow:hidden;transform:translateY(8px);pointer-events:none;transition:max-height .3s ease,opacity .2s,transform .3s}
      .activity-dock.is-open .activity-dock__panel{max-height:230px;opacity:1;transform:none;pointer-events:auto}
      .activity-dock__link{min-height:40px;padding:8px 11px}.activity-dock__label{font-size:11px}
    }
    @media(prefers-reduced-motion:reduce){.angel-sky span{animation:none}.theme-switch,.activity-dock__link,.activity-dock__panel{transition:none}}
  `;
  document.head.appendChild(style);

  const sky=document.createElement('div');
  sky.className='angel-sky';sky.setAttribute('aria-hidden','true');
  ['✦','✧','☁','⋆','♡','✦'].forEach((symbol,index)=>{
    const item=document.createElement('span');item.textContent=symbol;
    item.style.left=`${8+(index*17)%84}%`;item.style.top=`${12+(index*19)%72}%`;
    item.style.fontSize=`${14+(index%3)*5}px`;item.style.setProperty('--time',`${7+index*1.3}s`);
    item.style.setProperty('--delay',`${-index*1.7}s`);item.style.setProperty('--drift',`${index%2?18:-18}px`);sky.appendChild(item);
  });
  document.body.prepend(sky);

  const toggle=document.createElement('button');toggle.type='button';toggle.className='theme-switch';
  function renderTheme(){
    document.body.dataset.siteTheme=theme;document.documentElement.dataset.siteTheme=theme;
    toggle.innerHTML=theme==='angel'?'<span class="theme-switch__icon">🪽</span><span class="theme-switch__text">天使主题</span>':'<span class="theme-switch__icon">🎀</span><span class="theme-switch__text">粉蓝主题</span>';
    toggle.title=theme==='angel'?'切换为粉蓝主题':'切换为天使主题';toggle.setAttribute('aria-label',toggle.title);
    const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=theme==='angel'?'#fff4fa':'#dff4ff';
  }
  toggle.addEventListener('click',()=>{theme=theme==='angel'?'bunny':'angel';localStorage.setItem(THEME_KEY,theme);renderTheme()});
  document.body.appendChild(toggle);renderTheme();

  if(current!=='home'){
    const dock=document.createElement('nav');dock.className='activity-dock';dock.setAttribute('aria-label','活动快捷导航');
    const panel=document.createElement('div');panel.className='activity-dock__panel';
    Object.entries(pages).forEach(([id,item])=>{
      const link=document.createElement('a');link.className='activity-dock__link';link.href=item.href;
      link.innerHTML=`<span class="activity-dock__icon" aria-hidden="true">${item.icon}</span><span class="activity-dock__label">${item.label}</span>`;
      link.title=item.label;if(id===current)link.setAttribute('aria-current','page');panel.appendChild(link);
    });
    const menu=document.createElement('button');menu.type='button';menu.className='activity-dock__toggle';menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','打开活动导航');menu.title='活动导航';menu.innerHTML='<span class="activity-dock__icon" aria-hidden="true">＋</span><span class="activity-dock__label">活动导航</span>';
    menu.addEventListener('click',()=>{const open=dock.classList.toggle('is-open');menu.setAttribute('aria-expanded',String(open))});
    dock.append(panel,menu);document.body.appendChild(dock);
    document.addEventListener('click',event=>{if(!dock.contains(event.target)){dock.classList.remove('is-open');menu.setAttribute('aria-expanded','false')}});
    document.addEventListener('keydown',event=>{if(event.key==='Escape'){dock.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.focus()}});
  }
})();
