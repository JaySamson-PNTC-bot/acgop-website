// ACGOP — interactive bits
document.addEventListener('DOMContentLoaded',function(){
  // Promo bar close
  var pc=document.querySelector('.promo-close');
  if(pc)pc.addEventListener('click',function(){this.closest('.promo-bar').style.display='none';});
  // Mobile menu
  var mt=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
  if(mt&&nav)mt.addEventListener('click',function(){nav.classList.toggle('open');});
  // Close mobile menu on link click
  document.querySelectorAll('.nav a').forEach(function(a){
    a.addEventListener('click',function(){nav.classList.remove('open');});
  });
});
