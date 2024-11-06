document.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 0) {
    header.classList.add('scrolled');
    // console.log('=> scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});