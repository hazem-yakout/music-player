
let now_playing = document.querySelector(".now-playing");
let wrapper = document.querySelector(".wrapper");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
let heart = document.querySelector(".heart");
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let wave = document.getElementById("wave");
let randomIcon = document.querySelector(".fa-random");
let musicList = wrapper.querySelector(".music-list");
let moreMusicBtn = wrapper.querySelector("#more-music");
let closemoreMusic = musicList.querySelector("#close");
let curr_track = document.createElement("audio");
let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
  {
    img: "sponge.jpg",
    name: "Ana Sponge Bob",
    artist: "Hamada Helal",
    music: "bob.mp3",
  },
  {
    img: "baba.jpg",
    name: "Baba Fen",
    artist: "Nasr Mahrous",
    music: "fen.mp3",
  },

  {
    img: "halgtak.jpg",
    name: "Halagatk Bergalatk",
    artist: "Hamada Helal",
    music: "hal.mp3",
  },
  {
    img: "lolo.jpg",
    name: "Ya Lolo Fe Nono",
    artist: "Farfasha",
    music: "nono.mp3",
  },
  {
    img: "sngab.jpg",
    name: "Fe Manzel ElSngab",
    artist: "Osratna",
    music: "sng.mp3",
  },
  {
    img: "baby.jpg",
    name: "Baby Shark",
    artist: "PinkFong Songs",
    music: "shark.mp3",
  },
];

// Ensure that `ulTag` is declared and assigned after `wrapper` is properly assigned
const ulTag = wrapper.querySelector("ul");

loadTrack(track_index);

function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();

  curr_track.src = music_list[track_index].music;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
  track_name.textContent = music_list[track_index].name;
  track_artist.textContent = music_list[track_index].artist;
  now_playing.textContent =
    "Playing music " + (track_index + 1) + " of " + music_list.length;

  updateTimer = setInterval(setUpdate, 1000);

  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
  playingSong();
}

function random_bg_color() {
  let hex = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
  ];

  function populate(a) {
    for (let i = 0; i < 6; i++) {
      let x = Math.round(Math.random() * 14);
      let y = hex[x];
      a += y;
    }
    return a;
  }
  let Color1 = populate("#");
  let Color2 = populate("#");
  let angle = "to right";

  let gradient =
    "linear-gradient(" + angle + "," + Color1 + ", " + Color2 + ")";
  document.body.style.background = gradient;
}

function reset() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
  isRandom = true;
  randomIcon.classList.add("randomActive");
}

function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove("randomActive");
}

function repeatTrack() {
  loadTrack(track_index);
  playTrack();
}

function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  track_art.classList.add("rotate");
  wave.classList.add("loader");
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove("rotate");
  wave.classList.remove("loader");
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  if (track_index < music_list.length - 1 && !isRandom) {
    track_index += 1;
  } else if (track_index < music_list.length - 1 && isRandom) {
    let random_index = Math.floor(Math.random() * music_list.length);
    track_index = random_index;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}

function change() {
  heart.addEventListener("click", () => {
    heart.classList.toggle("color"); // Change color on click
  });
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) currentSeconds = "0" + currentSeconds;
    if (durationSeconds < 10) durationSeconds = "0" + durationSeconds;
    if (currentMinutes < 10) currentMinutes = "0" + currentMinutes;
    if (durationMinutes < 10) durationMinutes = "0" + durationMinutes;

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

// Show music list onclick of music icon
moreMusicBtn.addEventListener("click", () => {
  musicList.classList.toggle("show");
});
closemoreMusic.addEventListener("click", () => {
  moreMusicBtn.click();
});

// Create li tags according to array length for list
for (let i = 0; i < music_list.length; i++) {
  let liTag = `<li li-index="0">
                <div class="row">
                  <span>Ana Sponge Bob</span>
                  <p>Hamada Helal</p>
                </div>
    
                <audio class="bob.mp3" src="bob.mp3"></audio>
                            <span id="bob.mp3" class="audio-duration">04:37</span>
              </li>
              <li li-index="1">
                <div class="row">
                  <span>Baba Fen</span>
                  <p>Nasr Mahrous</p>
                </div>
    
                <audio class="fen.mp3" src="fen.mp3"></audio>
                            <span id="fen.mp3" class="audio-duration">02:54</span>
              </li>
              <li li-index="2">
                <div class="row">
                  <span>Halagatk Bergalatk</span>
                  <p>Hamada Helal</p>
                </div>
    
                <audio class="hal.mp3" src="hal.mp3"></audio>
                            <span id="hal.mp3" class="audio-duration">04:27</span>
              </li>
              <li li-index="3">
                <div class="row">
                  <span>Ya Lolo Feh Nono</span>
                  <p>Farfasha</p>
                </div>
    
                <audio class="nono.mp3" src="nono.mp3"></audio>
                            <span id="nono.mp3" class="audio-duration">02:10</span>
              </li>
                </li>
              <li li-index="4">
                <div class="row">
                  <span>Fe Manzel ElSngab</span>
                  <p>Osratna</p>
                </div>
    
                <audio class="sng.mp3" src="sng.mp3"></audio>
                            <span id="sng.mp3" class="audio-duration">02:30</span>
              </li>  </li>
              <li li-index="5">
                <div class="row">
                  <span>Baby Shark</span>
                  <p>PinkFong Songs</p>
                </div>
    
                <audio class="shark.mp3" src="shark.mp3"></audio>
                            <span id="shark.mp3" class="audio-duration">02:16</span>
              </li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag); // Inserting the li inside ul tag
  let liAudioDurationTag = ulTag.querySelector(`#${music_list[i].music}`);
  let liAudioTag = ulTag.querySelector(`.${music_list[i].music}`);

  liAudioTag.addEventListener("loadeddata", () => {
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if (totalSec < 10) {
      // If sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    }
    liAudioDurationTag.innerText = `${totalMin}:${totalSec}`; // Passing total duration of song
    liAudioDurationTag.setAttribute("t-duration", `${totalMin}:${totalSec}`); // Adding t-duration attribute with total duration value
  });
}

// Play particular song from the list onclick of li tag
function playingSong() {
  const allLiTag = ulTag.querySelectorAll("li");
  for (let j = 0; j < allLiTag.length; j++) {
    let audioTag = allLiTag[j].querySelector(".audio-duration");

    if (allLiTag[j].classList.contains("playing")) {
      allLiTag[j].classList.remove("playing");
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }
    // If the li tag index is equal to the musicIndex then add playing class in it
    if (allLiTag[j].getAttribute("li-index") == track_index) {
      allLiTag[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }
    allLiTag[j].setAttribute("onclick", "clicked(this)");
  }
}

// Particular li clicked function
function clicked(element) {
  let getLiIndex = element.getAttribute("li-index");
  track_index = getLiIndex; // Updating current song index with clicked li index
  loadTrack(track_index);
  playTrack();
  playingSong();
}
