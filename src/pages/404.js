export default function NotFound() {
  const NotFoundEl = document.createElement("div");
  NotFoundEl.setAttribute("class", "p-4");
  const H1El = document.createElement("h1");
  H1El.textContent = "404 Not Found";
  NotFoundEl.appendChild(H1El);
  return NotFoundEl;
}
