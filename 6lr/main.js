const KROT_QUANTITY = 8;

function getRandomIdx() {
  return (Math.random() * KROT_QUANTITY).toFixed(0);
}

function setActiveKrots() {
  let $krots = Array.from(document.querySelectorAll(".krot"));
  $krots.forEach($krot => {
    $krot.classList.remove("visible");
  });
  $krots[getRandomIdx()].classList.add("visible");
  setTimeout(setActiveKrots, Math.max(700, (Math.random() * 2000).toFixed(0)));
}

window.onload = function() {
  let $viewport = document.getElementById("viewport");
  let $score = document.getElementById("score");
  let score = 0;

  for (let i = 0; i <= KROT_QUANTITY; i++) {
    let $krotContainer = document.createElement("div");
    $krotContainer.classList.add("krot-box");
    let $krot = document.createElement("div");
    $krot.classList.add("krot");
    $krot.addEventListener("click", () => {
      $score.innerHTML = $krot.classList.contains("visible") ? ++score : --score;
    });
    $krotContainer.appendChild($krot);
    $viewport.appendChild($krotContainer);
  }

  setActiveKrots();
};
