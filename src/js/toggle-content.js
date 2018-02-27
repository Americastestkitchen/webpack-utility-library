export default function() {
  const toggleOpen = document.querySelectorAll('button[data-toggle-open]');
  const toggleClose = document.querySelectorAll('button[data-toggle-close]');

  function closeToggle(button, container) {
    button.setAttribute('aria-expanded', 'false');
    container.hidden = true;
    container.setAttribute('aria-hidden', 'true');
  }

  for(let i = 0; i < toggleOpen.length; i++) {
    toggleOpen[i].addEventListener('click', function(e){
      e.stopPropagation();
      const button = this.getAttribute('data-toggle-open');
      const container = document.querySelector(`[data-toggle-content='${button}'`);
      if(container) {
        if(container.hidden) {
          this.setAttribute('aria-expanded', 'true');
          container.hidden = false;
          container.removeAttribute('aria-hidden');
        } else {
          closeToggle(this, container);
        } 
      } else {
        console.log("No container");
      }
    });

    toggleClose[i].addEventListener('click', function(e){
      e.stopPropagation();
      const button = this.getAttribute('data-toggle-close');
      const buttonExapended = document.querySelector(`[data-toggle-open='${button}'`);
      const container = document.querySelector(`[data-toggle-content='${button}'`);
      if(container) {
        closeToggle(buttonExapended, container);
      }
    });
  }
}