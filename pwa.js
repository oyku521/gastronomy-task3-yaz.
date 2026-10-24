'use strict';
(() => {
 const button=document.getElementById('installApp'),dialog=document.getElementById('installDialog'),nativeButton=document.getElementById('nativeInstall'),help=document.getElementById('installHelp'),status=document.getElementById('offlineStatus');
 let prompt=null,ready=false;
 const standalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
 function update(){button.hidden=standalone();status.textContent=!navigator.onLine?t('offlineNow'):ready?t('offlineReady'):t('offlineLoading');nativeButton.hidden=!prompt;help.textContent=prompt?t('installNative'):(/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1))?t('installIos'):t('installOther');}
 button.onclick=()=>{update();dialog.showModal();};document.getElementById('closeInstall').onclick=()=>dialog.close();
 addEventListener('beforeinstallprompt',e=>{e.preventDefault();prompt=e;update();});
 nativeButton.onclick=async()=>{if(!prompt)return;const current=prompt;prompt=null;update();try{await current.prompt();if((await current.userChoice).outcome==='accepted')dialog.close();}catch{/* Manual installation guidance remains visible. */}};
 addEventListener('appinstalled',()=>{prompt=null;button.hidden=true;dialog.close();});
 addEventListener('online',update);addEventListener('offline',update);document.addEventListener('languagechange',update);update();
 let reloading=false;const hadController=!!navigator.serviceWorker?.controller;
 if('serviceWorker' in navigator&&window.isSecureContext){
  navigator.serviceWorker.addEventListener('controllerchange',()=>{if(hadController&&!reloading){reloading=true;location.reload();}});
  navigator.serviceWorker.register('./sw.js').then(async()=>{await navigator.serviceWorker.ready;ready=true;update();}).catch(()=>status.textContent=t('offlineError'));
 }else status.textContent=t('installSecure');
})();
