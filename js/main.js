(function(){
  var fmt=function(n){return 'EC$'+n.toLocaleString('en-US')};
  var r=document.getElementById('months');
  function upd(){
    var m=+r.value, care=m*150;
    document.getElementById('mLabel').textContent='Care plan, '+m+(m===1?' month':' months');
    document.getElementById('mCost').textContent=fmt(care);
    document.getElementById('mTotal').textContent=fmt(3200+care);
  }
  r.addEventListener('input',upd); upd();

  // Section highlight in the top bar
  var links=[].slice.call(document.querySelectorAll('.bar nav a'));
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){
      links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)});
    }});
  },{rootMargin:'-40% 0px -55% 0px'});
  document.querySelectorAll('main .sheet').forEach(function(s){io.observe(s)});

  // Expand every answer when printing
  var qa=[].slice.call(document.querySelectorAll('details.qa')), prev=[];
  window.addEventListener('beforeprint',function(){prev=qa.map(function(d){return d.open});qa.forEach(function(d){d.open=true})});
  window.addEventListener('afterprint',function(){qa.forEach(function(d,i){d.open=prev[i]})});

  // Acceptance
  function msg(){
    var n=(document.getElementById('accName').value||'Wayne Radix').trim();
    return 'Hello Savvy Tech, I accept the website proposal dated September 22, 2026 (build EC$3,200, care plan EC$150 per month). Please send the deposit invoice. '+n;
  }
  document.getElementById('accWa').onclick=function(){window.open('https://wa.me/14734198308?text='+encodeURIComponent(msg()),'_blank','noopener')};
  document.getElementById('accMail').onclick=function(){location.href='mailto:ghosten@savvytechllc.net?subject='+encodeURIComponent('Website proposal accepted')+'&body='+encodeURIComponent(msg())};
})();
