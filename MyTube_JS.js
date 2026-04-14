//  PLAY VIDEO 
function playVideo(videoId) {
  const iframe = document.getElementById("videoFrame");
  const player = document.querySelector(".player");
  const placeholder = document.getElementById("placeholder");

  // video set
  iframe.src = "https://www.youtube.com/embed/" + videoId;

  // placeholder hide
  if (placeholder) {
    placeholder.style.display = "none";
  }

// scoll
  const yOffset = -90;
  const y = player.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({
    top: y,
    behavior: "smooth"
  });
}

//GET VIDEO ID
function getVideoId(url) {
  try {
    let urlObj = new URL(url);

    if (urlObj.searchParams.get("v")) {
      return urlObj.searchParams.get("v");
    }

    if (urlObj.hostname === "youtu.be") {
      return urlObj.pathname.slice(1);
    }

    return null;
  } catch {
    return null;
  }
}

//video
function addVideo(btn) {
  let card = btn.closest(".video-card");
  let input = card.querySelector("input").value.trim();

  let videoId = getVideoId(input);

  if (videoId) {
    let img = card.querySelector("img");

    // thumbnail set
    img.src = `https://img.youtube.com/vi/${videoId}/0.jpg`;

    // click pe video play
    card.onclick = function () {
      playVideo(videoId);
    };

    //  save  video
    saveToHistory(videoId);

  } else {
    alert("❌ Invalid YouTube link");
  }
}

function deleteVideo(btn) {
  let card = btn.closest(".video-card");

  card.querySelector("img").src = "";
  card.querySelector("input").value = "";
  card.onclick = null;
}
function saveToHistory(videoId) {
  let history = JSON.parse(localStorage.getItem("videos")) || [];
  history.push(videoId);
  localStorage.setItem("videos", JSON.stringify(history));
}
window.onload = function () {
  let history = JSON.parse(localStorage.getItem("videos")) || [];

  let cards = document.querySelectorAll(".video-card");

  history.forEach((videoId, index) => {
    if (cards[index]) {
      let img = cards[index].querySelector("img");
      img.src = `https://img.youtube.com/vi/${videoId}/0.jpg`;

      cards[index].onclick = function () {
        playVideo(videoId);
      };
    }
  });
};