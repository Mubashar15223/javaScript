
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('[data-content]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const content = this.getAttribute('data-content');
      loadContent(content);
    });
  });

  function loadContent(content) {
    let contentHtml;
    switch(content) {
      case 'home':
        contentHtml = '<h2 class="mb-4">Home</h2><p>This is the Home content.</p>';
        break;
      case 'about':
        contentHtml = '<h2 class="mb-4">About</h2><p>This is the About content.</p>';
        break;
      case 'features':
        contentHtml = '<h2 class="mb-4">Features</h2><p>This is the Features content.</p>';
        break;
      case 'pricing':
        contentHtml = '<h2 class="mb-4">Pricing</h2><p>This is the Pricing content.</p>';
        break;
      case 'services':
        contentHtml = '<h2 class="mb-4">Services</h2><p>This is the Services content.</p>';
        break;
      case 'contact':
        contentHtml = '<h2 class="mb-4">Contact</h2><p>This is the Contact content.</p>';
        break;
      default:
        contentHtml = '<h2 class="mb-4">Welcome</h2><p>Click on the links in the header or sidebar to load content dynamically.</p>';
    }
    document.getElementById('content').innerHTML = contentHtml;
  }
});
