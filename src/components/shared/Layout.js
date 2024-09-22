export default function Layout({ children, header = "", footer = "" }) {
  return `
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          ${header}  
          ${children}
          ${footer}
        </div>
    </div>
    `;
}
