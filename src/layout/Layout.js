export default function Layout(title, bodyHtml) {
  document.head.innerHTML = `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>항해플러스 - ${title}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  `;

  document.body.innerHTML = bodyHtml;
}
