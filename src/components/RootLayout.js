export default function RootLayout(children) {
  const RootLayout = document.createElement("div");
  RootLayout.setAttribute(
    "class",
    "bg-gray-100 h-screen flex justify-center items-center"
  );
  RootLayout.appendChild(children);

  return RootLayout;
}
