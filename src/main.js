// 메인 페이지에 templates/main.html 가져와서 innerHTML으로 내용 보여주도록 함
function loadMainPage() {
  fetch("templates/main.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network Error!");
      }
      return response.text();
    })
    .then((content) => {
      document.getElementById("root").innerHTML = content;
    })
    .catch((error) => {
      console.error("Error!", error);
    });
}

// 페이지 로드 후에 함수가 실행하도록 함
document.addEventListener("DOMContentLoaded", function () {
  loadMainPage();
});
