// 모달 열기/닫기
document.addEventListener("click", (e) => {
  if (e.target.matches("[data-modal]")) {
    const modalId = e.target.getAttribute("data-modal");
    const modal = document.getElementById(modalId);
    modal.classList.add("active");
  }

  if (e.target.matches(".modal .close")) {
    e.target.closest(".modal").classList.remove("active");
  }
});

// README 불러오기 (공용 모달에)
document.addEventListener("click", (e) => {
  if (e.target.matches(".btn-readme")) {
    const sectionId = e.target.getAttribute("data-readme");
    fetch("readme.html")
      .then((res) => res.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const section = doc.getElementById(sectionId);

        document.getElementById("readmeContent").innerHTML = section
          ? section.innerHTML
          : "내용을 불러올 수 없습니다.";
        document.getElementById("readmeModal").classList.add("active");
      });
  }
});

// 타이핑 효과 (스크롤 시 재실행 포함)
document.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector(".home-title");
  if (!el) return;

  const text = el.getAttribute("data-text"); // 한 줄 문자열
  const highlight = "이소민";

  function typeText() {
    el.textContent = ""; // 초기화
    let i = 0;

  function type() {
        if (i < text.length) {
          const char = text.charAt(i);
          // highlight 범위에 포함되는 글자면 strong 태그 적용
          if (i >= text.indexOf(highlight) && i < text.indexOf(highlight) + highlight.length) {
            el.innerHTML += `<strong>${char}</strong>`;
          } else {
            el.innerHTML += char;
          }
          i++;
          setTimeout(type, 150);
        }
      }

    type();
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) typeText();
      });
    },
    { threshold: 0.6 }
  );

  observer.observe(el);
});
