// 모달 열기/닫기
document.addEventListener("click", (e) => {
  if (e.target.matches("[data-modal]")) {
    const modalId = e.target.getAttribute("data-modal");
    const modal = document.getElementById(modalId);
    modal.classList.add("active");

    // 🔥 모달 열릴 때 첫 번째 이미지로 초기화
    const firstImg = modal.querySelector(".slides img");
    if (firstImg) {
      modal
        .querySelectorAll(".slides img")
        .forEach((img) => img.classList.remove("active"));
      firstImg.classList.add("active");
    }
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

// 이미지 슬라이더 (prev/next)
document.addEventListener("click", (e) => {
  if (e.target.matches(".next, .prev")) {
    const slider = e.target.closest(".image-slider");
    const slides = slider.querySelectorAll(".slides img");
    const counter = slider.querySelector(".slide-counter");
    if (slides.length === 0) return;

    let index = Array.from(slides).findIndex(img =>
      img.classList.contains("active")
    );

    slides[index].classList.remove("active");

    if (e.target.classList.contains("next")) {
      index = (index + 1) % slides.length;
    } else {
      index = (index - 1 + slides.length) % slides.length;
    }

    slides[index].classList.add("active");

    // 🔥 페이지 번호 업데이트
    if (counter) {
      counter.textContent = `${index + 1} / ${slides.length}`;
    }
  }
});

// 모달 열릴 때 항상 첫 장 + 페이지 번호 초기화
document.addEventListener("click", (e) => {
  if (e.target.matches("[data-modal]")) {
    const modalId = e.target.getAttribute("data-modal");
    const modal = document.getElementById(modalId);
    modal.classList.add("active");

    const slides = modal.querySelectorAll(".slides img");
    const counter = modal.querySelector(".slide-counter");
    if (slides.length > 0) {
      slides.forEach(img => img.classList.remove("active"));
      slides[0].classList.add("active");

      if (counter) {
        counter.textContent = `1 / ${slides.length}`;
      }
    }
  }
});
