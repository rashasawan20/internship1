// Log social media redirects
document.querySelectorAll('.footer a').forEach(link => {
  link.addEventListener('click', () => {
    console.log(`Redirecting to: ${link.href}`);
  });
});
