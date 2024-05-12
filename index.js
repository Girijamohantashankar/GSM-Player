const audio = document.querySelector("#audio");
const img = document.querySelector("#img");
const title = document.querySelector("#title");
const playPause = document.querySelector("#playpause");
const playPauseBtn = document.querySelector("#playpause-btn");
const prevBtn = document.querySelector("#prevbtn");
const nextBtn = document.querySelector("#nextbtn");
const progress = document.querySelector("#progress");
const progressLine = document.querySelector(".progress-line");
const currTime = document.querySelector(".current-time");
const totalDuration = document.querySelector(".duration-time");
const volume = document.querySelector("#volume");
const volumeIcon = document.querySelector("#volumeicon");
const volumeRange = document.querySelector(".volumerange");
const repeatBtn = document.querySelector("#repeat");
const likeBtn = document.querySelector("#like");
const likeIcon = document.querySelector("#likeicon");
const songListBtn = document.querySelector("#list");
const songList = document.querySelector("#songs-list");
const listCloseBtn = document.querySelector("#listclose");

playPause.addEventListener("click", togglePlayPause);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progress.addEventListener("input", setProgress);
volume.addEventListener("click", toggleVolume);
volumeRange.addEventListener("input", setVolume);
repeatBtn.addEventListener("click", toggleRepeat);
likeBtn.addEventListener("click", toggleLike);
songListBtn.addEventListener("click", toggleSongList);
listCloseBtn.addEventListener("click", closeSongList);

let songIndex = 0;
let isPlaying = false;
let songs = []; 

async function fetchAndLoadSongs() {
  try {
    const response = await fetch('https://gsmusic-api.onrender.com/api/songs/');
    const data = await response.json();
    songs = data; 
    loadSong(songs[songIndex]); 
  } catch (error) {
    console.error('Error fetching songs:', error);
  }
}

fetchAndLoadSongs();
function loadSong(song) {
  img.src = song.image;
  title.textContent = song.title;
  audio.src = song.audio;
}

function togglePlayPause() {
  isPlaying ? pauseSong() : playSong();
}

function playSong() {
  isPlaying = true;
  audio.play();
  playPauseBtn.classList.replace("fa-play", "fa-pause");
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  playPauseBtn.classList.replace("fa-pause", "fa-play");
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  pauseSong();
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress() {
  const { currentTime, duration } = audio;
  const progressPercent = (currentTime / duration) * 100;
  progress.value = progressPercent;
  progressLine.style.width = `${progressPercent}%`;

  const currentMinutes = Math.floor(currentTime / 60);
  const currentSeconds = Math.floor(currentTime % 60);
  currTime.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;

  const durationMinutes = Math.floor(duration / 60);
  const durationSeconds = Math.floor(duration % 60);
  totalDuration.textContent = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
}

function setProgress() {
  const progressPercent = progress.value;
  audio.currentTime = (audio.duration * progressPercent) / 100;
}

function toggleVolume() {
  volumeRange.classList.toggle("hide");
}

function setVolume() {
  audio.volume = volumeRange.value;
  volumeIcon.className = volumeRange.value > 0 ? "fas fa-volume-up" : "fas fa-volume-off";
}

function toggleRepeat() {
  audio.loop = !audio.loop;
  repeatBtn.classList.toggle("color");
}

function toggleLike() {
  likeIcon.classList.toggle("fas");
  likeIcon.classList.toggle("far");
}

function toggleSongList() {
  songList.classList.toggle("show");
}

function closeSongList() {
  songList.classList.remove("show");
}
