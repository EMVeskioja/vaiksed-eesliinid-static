const menuBtn=document.getElementById('menuBtn'); const navlinks=document.getElementById('navlinks');
if(menuBtn){ menuBtn.addEventListener('click',()=>{const open=navlinks.classList.toggle('show'); menuBtn.setAttribute('aria-expanded', open?'true':'false');});}
const form=document.getElementById('contactForm'); const formMsg=document.getElementById('formMsg');
if(form){ form.addEventListener('submit', async (e)=>{ e.preventDefault(); formMsg.textContent='Vormi demorežiim: lisa Formspree/Netlify endpoint.'; }); }