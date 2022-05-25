const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  window.defferedPrompt = event; 
  butInstall.classList.toggle('hidden', false);
});


butInstall.addEventListener('click', async () => {
  const promEvent = window.defferedPrompt;
    if(!promEvent){
      return;
    }
    promEvent.prompt();
    window.defferedPrompt = null;
      butInstall.classList.toggle('hidden', true);
});

// This clears the prompt
window.addEventListener('appinstalled', (event) => {
  window.defferedPrompt = null;
});
