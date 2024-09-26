export default function Alert(message) {
  return `
    <section class="flex items-center justify-center min-h-screen">
      <div class="w-full text-center" style="max-width: 480px">
        <p class="mb-4">오류 발생! ${message}</p>
      </div>
    </section>
    `;
}
