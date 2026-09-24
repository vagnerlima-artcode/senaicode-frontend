// Pegando os elementos do vídeo

const video = document.getElementById("video");
const play = document.getElementById("play");
const voltar = document.getElementById("voltar");
const avancar = document.getElementById("avancar");
const mute = document.getElementById("mute");
const volume = document.getElementById("volume");
const progresso = document.getElementById("progresso");
const velocidade = document.getElementById("velocidade");
const fullscreen = document.getElementById("fullscreen");


// Play e Pause

play.addEventListener("click", function() {

    if (video.paused) {
        video.play();
        play.textContent = "⏸️";
    } else {
        video.pause();
        play.textContent = "▶️";
    }

});


// Voltar 10 segundos

voltar.addEventListener("click", function() {
    video.currentTime -= 10;
});


// Avançar 10 segundos

avancar.addEventListener("click", function() {
    video.currentTime += 10;
});


// Ativar e desativar o som

mute.addEventListener("click", function() {

    video.muted = !video.muted;

    if (video.muted) {
        mute.textContent = "🔇";
    } else {
        mute.textContent = "🔊";
    }

});


// Controle de volume

volume.addEventListener("input", function() {
    video.volume = volume.value;
});


// Atualiza a barra conforme o vídeo passa

video.addEventListener("timeupdate", function() {

    const porcentagem =
        (video.currentTime / video.duration) * 100;

    progresso.value = porcentagem;

});


// Permite escolher uma parte do vídeo pela barra

progresso.addEventListener("input", function() {

    video.currentTime =
        (progresso.value / 100) * video.duration;

});


// Mudar velocidade

velocidade.addEventListener("change", function() {
    video.playbackRate = velocidade.value;
});


// Tela cheia

fullscreen.addEventListener("click", function() {
    video.requestFullscreen();
});


// ---------------- ÁUDIO ----------------

const audio = document.getElementById("audio");
const playAudio = document.getElementById("playAudio");
const muteAudio = document.getElementById("muteAudio");
const volumeAudio = document.getElementById("volumeAudio");


// Play e Pause do áudio

playAudio.addEventListener("click", function() {

    if (audio.paused) {
        audio.play();
        playAudio.textContent = "⏸️";
    } else {
        audio.pause();
        playAudio.textContent = "▶️";
    }

});


// Mute do áudio

muteAudio.addEventListener("click", function() {

    audio.muted = !audio.muted;

    if (audio.muted) {
        muteAudio.textContent = "🔇";
    } else {
        muteAudio.textContent = "🔊";
    }

});


// Volume do áudio

volumeAudio.addEventListener("input", function() {
    audio.volume = volumeAudio.value;
});