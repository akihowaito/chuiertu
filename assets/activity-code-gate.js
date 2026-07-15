(function(){
  const STYLE_ID='bunny-code-gate-style';
  if(!document.getElementById(STYLE_ID)){
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      .code-gate{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;margin:12px auto 10px}
      .code-gate__button{min-height:42px;padding:9px 18px;border:1.5px solid #f2a9ca;border-radius:12px;background:#fff;color:#df5b9d;font:900 14px/1.2 "Huninn","PingFang SC","Microsoft YaHei",sans-serif;cursor:pointer;box-shadow:0 4px 0 #f8d3e4;transition:transform .18s,background .18s}
      .code-gate__button:hover{transform:translateY(-2px);background:#fff5fa}.code-gate__button:active{transform:translateY(1px);box-shadow:0 2px 0 #f8d3e4}
      .code-gate__status{display:inline-flex;align-items:center;gap:6px;min-height:34px;padding:7px 12px;border-radius:999px;background:#fff7fb;color:#a38596;font:800 13px/1.2 "Huninn","PingFang SC","Microsoft YaHei",sans-serif;border:1px solid #f6d3e3}
      .code-gate__status::before{content:"";width:8px;height:8px;border-radius:50%;background:#efadc9;box-shadow:0 0 0 4px #fff}
      .code-gate[data-state="active"] .code-gate__status{background:#effcf8;color:#268d73;border-color:#bdebdc}.code-gate[data-state="active"] .code-gate__status::before{background:#49d4a6}
      .code-gate[data-state="used"] .code-gate__status{background:#f3f8fc;color:#7691a3;border-color:#d9e9f3}.code-gate[data-state="used"] .code-gate__status::before{background:#8ebbd7}
      .code-gate-modal{position:fixed;inset:0;z-index:99999;display:grid;place-items:center;padding:18px;background:rgba(71,53,76,.42);backdrop-filter:blur(5px)}
      .code-gate-modal[hidden]{display:none}.code-gate-dialog{width:min(430px,100%);padding:26px;border:2px solid #f3a5c9;border-radius:18px;background:linear-gradient(135deg,#fff8fc,#f3fbff);box-shadow:0 12px 0 rgba(154,205,235,.22),0 28px 70px rgba(72,44,76,.24);font-family:"Huninn","PingFang SC","Microsoft YaHei",sans-serif}
      .code-gate-dialog h2{margin:0 0 8px;color:#644f66;font-size:24px;font-weight:900}.code-gate-dialog p{margin:0 0 18px;color:#968294;font-size:14px;font-weight:700;line-height:1.65}
      .code-gate-input{width:100%;height:54px;box-sizing:border-box;padding:0 16px;border:2px solid #f19bc2;border-radius:14px;outline:0;background:#fff;color:#5e4d60;font:900 17px/1 "Huninn","PingFang SC","Microsoft YaHei",sans-serif;text-transform:uppercase;letter-spacing:0}
      .code-gate-input:focus{border-color:#ee91be;box-shadow:0 0 0 4px rgba(238,145,190,.12)}
      .code-gate-error{min-height:22px;margin:8px 2px 4px!important;color:#e45b87!important;font-size:12px!important;font-weight:800}
      .code-gate-actions{display:grid;grid-template-columns:1fr 1.35fr;gap:10px}.code-gate-actions button{min-height:46px;border-radius:12px;font:900 14px/1 "Huninn","PingFang SC","Microsoft YaHei",sans-serif;cursor:pointer}
      .code-gate-cancel{border:1.5px solid #cfe7f5;background:#fff;color:#6699b7}.code-gate-confirm{border:0;background:linear-gradient(110deg,#ee72b2,#79c7ef);color:#fff;box-shadow:0 5px 0 #d99aca}
      .code-gate-confirm:disabled{opacity:.55;cursor:not-allowed;box-shadow:none}
      .code-gate-locked{filter:saturate(.55);cursor:not-allowed!important;opacity:.62}
      @media(max-width:520px){.code-gate{gap:8px}.code-gate__button{min-height:40px;padding:8px 14px;font-size:12px}.code-gate__status{font-size:11px}.code-gate-dialog{padding:22px 18px}.code-gate-dialog h2{font-size:20px}}
    `;
    document.head.appendChild(style);
  }

  const normalize=value=>String(value||'').toUpperCase().replace(/\s+/g,'');
  const digest=async value=>{
    const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value));
    return [...new Uint8Array(bytes)].map(byte=>byte.toString(16).padStart(2,'0')).join('').toUpperCase();
  };
  const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
  const write=(key,value)=>localStorage.setItem(key,JSON.stringify(value));

  async function mount(options){
    const {activity,prefix,playButton,label='兑换口令',onChange=()=>{}}=options;
    const manifest=window.BUNNY_ACTIVITY_CODES&&window.BUNNY_ACTIVITY_CODES[activity];
    if(!manifest)throw new Error('兑换口令清单未加载');
    const stateKey=`bunny_code_gate_${activity}_v1`,attemptKey=`bunny_code_attempts_${activity}_v1`;
    let state=read(stateKey,null),timer=null;
    const wrap=document.createElement('div');wrap.className='code-gate';
    wrap.innerHTML=`<button class="code-gate__button" type="button">${label}</button><span class="code-gate__status"></span>`;
    playButton.insertAdjacentElement('beforebegin',wrap);
    const openButton=wrap.querySelector('button'),status=wrap.querySelector('span');
    const modal=document.createElement('div');modal.className='code-gate-modal';modal.hidden=true;
    modal.innerHTML=`<div class="code-gate-dialog" role="dialog" aria-modal="true" aria-labelledby="codeGateTitle"><h2 id="codeGateTitle">🎟️ 兑换活动口令</h2><p>输入客服发放的专属口令，即可激活 1 次${activity==='wheel'?'转盘':'刮奖'}机会。</p><input class="code-gate-input" autocomplete="off" spellcheck="false" maxlength="15" placeholder="${prefix}XXXX"><p class="code-gate-error" aria-live="polite"></p><div class="code-gate-actions"><button class="code-gate-cancel" type="button">取消</button><button class="code-gate-confirm" type="button">确认兑换</button></div></div>`;
    document.body.appendChild(modal);
    const input=modal.querySelector('input'),error=modal.querySelector('.code-gate-error'),confirm=modal.querySelector('.code-gate-confirm');

    function setPlayEnabled(enabled){playButton.disabled=!enabled;playButton.classList.toggle('code-gate-locked',!enabled)}
    function render(){
      const active=state&&state.status==='active',used=state&&(state.status==='consumed'||state.status==='completed');
      wrap.dataset.state=active?'active':used?'used':'locked';
      status.textContent=active?'兑换成功 · 已激活1次':used?'本口令已使用':'需要兑换口令后开始';
      openButton.textContent=active?'更换口令':used?'兑换新口令':label;
      setPlayEnabled(active);
      onChange(state);
    }
    function cooldownRemaining(){const attempts=read(attemptKey,{count:0,until:0});return Math.max(0,(attempts.until||0)-Date.now())}
    function renderCooldown(){
      const remaining=cooldownRemaining();
      if(!remaining){confirm.disabled=false;if(timer){clearInterval(timer);timer=null}return false}
      confirm.disabled=true;error.textContent='连续输错 3 次，请 24 小时后再试';
      if(!timer)timer=setInterval(renderCooldown,1000);
      return true;
    }
    function fail(message){
      const previous=read(attemptKey,{count:0,until:0});let count=((previous.until&&previous.until<=Date.now())?0:(previous.count||0))+1,until=0;
      if(count>=3){count=0;until=Date.now()+24*60*60*1000}
      write(attemptKey,{count,until});error.textContent=until?'连续输错 3 次，请 24 小时后再试':`${message}（还可尝试 ${3-count} 次）`;renderCooldown();
    }
    function close(){modal.hidden=true;document.body.style.overflow='';input.value='';error.textContent=''}
    function open(){modal.hidden=false;document.body.style.overflow='hidden';renderCooldown();setTimeout(()=>input.focus(),30)}
    async function redeem(){
      if(renderCooldown())return;
      const code=normalize(input.value);
      if(code.startsWith(activity==='wheel'?'RABBITCLUB':'BUNNYCLUB')){fail(`这是${activity==='wheel'?'刮刮乐':'转盘'}口令，不能在本活动使用`);return}
      if(!new RegExp(`^${prefix}\\d{4}$`).test(code)){fail(`请输入 ${prefix} 加四位数字`);return}
      confirm.disabled=true;confirm.textContent='正在核验…';
      try{
        const codeDigest=await digest(code),record=manifest[codeDigest];
        if(!record){fail('口令不存在或不属于本批活动');return}
        const used=read(`${stateKey}_used`,[]);
        state={code,digest:codeDigest,receiptId:record.receiptId,status:used.includes(codeDigest)?'completed':'active',activatedAt:new Date().toISOString()};
        write(stateKey,state);write(attemptKey,{count:0,until:0});render();close();
      }finally{confirm.disabled=false;confirm.textContent='确认兑换';renderCooldown()}
    }
    openButton.addEventListener('click',open);modal.querySelector('.code-gate-cancel').addEventListener('click',close);confirm.addEventListener('click',redeem);
    input.addEventListener('input',()=>{input.value=normalize(input.value);error.textContent=''});input.addEventListener('keydown',event=>{if(event.key==='Enter')redeem();if(event.key==='Escape')close()});
    modal.addEventListener('click',event=>{if(event.target===modal)close()});
    render();
    return {
      canPlay:()=>Boolean(state&&state.status==='active'),
      getState:()=>state?{...state}:null,
      consume(){if(!state||state.status!=='active')return null;state={...state,status:'consumed',consumedAt:new Date().toISOString()};const used=read(`${stateKey}_used`,[]);if(!used.includes(state.digest))used.push(state.digest);write(`${stateKey}_used`,used);write(stateKey,state);render();return {...state}},
      complete(extra={}){if(!state)return;state={...state,...extra,status:'completed',completedAt:new Date().toISOString()};write(stateKey,state);render()},
      open
    };
  }
  window.BunnyCodeGate={mount};
})();
