export function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'bg-gray-200 p-4 text-center';
  footer.innerHTML = '<p>&copy; 2024 항해플러스. All rights reserved.</p>';

  const container = document.querySelector('.bg-gray-100 .max-w-md');
  container.appendChild(footer);
}
