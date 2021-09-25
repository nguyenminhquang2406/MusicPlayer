const songs = [
    {
        id: 'Bones',
        name: 'Bones',
        singer: 'Clarx',
        path: 'assets/sound/Bones.mp3',
        img: 'assets/img/Bones.jfif'
    },
    {
        id: 'GoHome',
        name: 'Go Home',
        singer: 'Maduk',
        path: 'assets/sound/GoHome.mp3',
        img: 'assets/img/GoHome.jfif'
    },
    {
        id: 'Limitless',
        name: 'Limitless',
        singer: 'Elektronomia',
        path: 'assets/sound/Limitless.mp3',
        img: 'assets/img/Limitless.jfif'
    },
    {
        id: 'SeasonsRemix',
        name: 'Seasons Remix',
        singer: 'Rival x Cadmium',
        path: 'assets/sound/SeasonsRemix.mp3',
        img: 'assets/img/SeasonsRemix.jfif'
    },
    {
        id: 'SkyHighptII',
        name: 'Sky High pt.II',
        singer: 'Elektronomia',
        path: 'assets/sound/SkyHighptII.mp3',
        img: 'assets/img/SkyHighptII.jfif'
    }, {
        id: 'Superhero',
        name: 'Superhero',
        singer: 'Unknown Brain',
        path: 'assets/sound/Superhero.mp3',
        img: 'assets/img/Superhero.jfif'
    },
    {
        id: 'Crazy',
        name: 'Crazy',
        singer: 'BEAUZ x JVNA',
        path: 'assets/sound/Crazy.mp3',
        img: 'assets/img/Crazy.jfif'
    },
    {
        id: 'Energy',
        name: 'Energy',
        singer: 'Elektronomia',
        path: 'assets/sound/Energy.mp3',
        img: 'assets/img/Energy.jfif'
    },
    {
        id: 'SkyHigh',
        name: 'Sky High',
        singer: 'Elektronomia',
        path: 'assets/sound/SkyHigh.mp3',
        img: 'assets/img/SkyHigh.jfif'
    },
    {
        id: 'Spectre',
        name: 'Spectre',
        singer: 'Alan Walker',
        path: 'assets/sound/Spectre.mp3',
        img: 'assets/img/Spectre.jfif'
    },
]

const musicImg = document.querySelector('.img-area img');
const musicName = document.querySelector('.song-details .name');
const musicSinger = document.querySelector('.song-details .singer');
const mainAudio = document.querySelector('#main-audio');
const playPauseBtn = document.querySelector('.play-pause');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');
const progressBar = document.querySelector('.progress-bar');
const progressArea = document.querySelector('.progress-area');
const btnRepeat = document.querySelector('#btnRepeat');
const listMusic = document.querySelector('.music-list');
const btnShowList = document.querySelector('#btnShowList');
const btnHideList = document.querySelector('#close');
const ulElem = document.querySelector('.music-list ul');
const animateionImg = musicImg.animate([
    { transform: 'rotate(360deg)'}
],
{
    duration: 10000,
    iterations: Infinity
});


let currentIndex = 0;

window.addEventListener('load',loadMusic(currentIndex));


function loadMusic(index) {
    musicImg.src = `${songs[index].img}`;
    musicName.innerText = `${songs[index].name}`;
    musicSinger.innerText = `${songs[index].singer}`;
    mainAudio.src = `${songs[index].path}`;
    animateionImg.pause();
}

mainAudio.addEventListener('loadeddata',() => {
    const musicDuration = document.querySelector('.duration');
    const duration = mainAudio.duration
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if (totalSec < 10) {
        totalSec = '0' + totalSec;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
})

playPauseBtn.addEventListener('click',() => {
    const isPaused = playPauseBtn.classList.contains('paused');
    isPaused ? handlePlay() : handlePause();
    if (!isPaused){
        const currentSong = document.querySelector('li.playing');
        const durationCurrent = currentSong.querySelector('.music-duration');

        durationCurrent.innerHTML = durationCurrent.getAttribute('duration');
    }
    else {
        const durationTag = liTags[currentIndex].querySelector('.music-duration');
        durationTag.innerHTML = 'Playing';
    }
});

function handlePlay() {
    mainAudio.play();
    playPauseBtn.classList.remove('paused');
    playPauseBtn.innerHTML = '<i class="ri-pause-mini-fill"></i>';
    animateionImg.play();
}

function handlePause() {
    mainAudio.pause();
    playPauseBtn.classList.add('paused');
    playPauseBtn.innerHTML = '<i class="ri-play-mini-fill"></i>';
    animateionImg.pause();
}

prevBtn.addEventListener('click',handlePrev)

function handlePrev() {
    if (btnRepeat.classList.contains('ri-shuffle-fill')) {
        randomMusic();
        handlePlay();
        handleChange();
    }
    else{
        currentIndex--;
        currentIndex = currentIndex < 0 ? songs.length-1 : currentIndex;
        loadMusic(currentIndex);
        handlePlay();
        handleChange();
    }
}

nextBtn.addEventListener('click',handleNext);

function handleNext(e) {
    if (btnRepeat.classList.contains('ri-shuffle-fill')) {
        randomMusic();
        handlePlay();
        handleChange();
    }
    else{
        currentIndex++;
        currentIndex = currentIndex > songs.length - 1 ? 0 : currentIndex;
        loadMusic(currentIndex);
        handlePlay();
        handleChange();
    }
}

mainAudio.addEventListener('timeupdate',(e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    const musicDuration = document.querySelector('.current');

    progressBar.style.width = currentTime / duration * 100 + '%';
   
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
        currentSec = '0' + currentSec;
    }
    musicDuration.innerText = `${currentMin}:${currentSec}`;
})

progressArea.addEventListener('click',(e) => {
    const progressWidth = progressArea.clientWidth;
    const valueOffSetX = e.offsetX;
    const duration = mainAudio.duration;
    const durationTag = liTags[currentIndex].querySelector('.music-duration');

    mainAudio.currentTime = valueOffSetX / progressWidth * duration;
    durationTag.innerHTML = 'Playing';
    handlePlay();
})

btnRepeat.addEventListener('click',function (e) {
    if(this.classList.contains('ri-repeat-line')) {
        this.classList.remove('ri-repeat-line');
        this.classList.add('ri-repeat-one-fill');
    }
    else if (this.classList.contains('ri-repeat-one-fill')){
        this.classList.remove('ri-repeat-one-fill');
        this.classList.add('ri-shuffle-fill');
    }
    else{
        this.classList.remove('ri-shuffle-fill');
        this.classList.add('ri-repeat-line');
    }
})

function randomMusic() {
    const initIndex = currentIndex;
    do{
        currentIndex = Math.floor(Math.random() * songs.length);
    }while (currentIndex == initIndex)
    loadMusic(currentIndex);
}

mainAudio.addEventListener('ended',() => {
    if (btnRepeat.classList.contains('ri-repeat-line')){
        handleNext();
    }
    else if (btnRepeat.classList.contains('ri-repeat-one-fill')) {
        loadMusic(currentIndex);
        handlePlay();
    }
    else {
        randomMusic();
        handlePlay();
        handleChange();
    }
})

btnShowList.addEventListener('click',() => {
    listMusic.classList.toggle('show');
})

btnHideList.addEventListener('click',() => {
    btnShowList.click();
});

for (let index = 0; index < songs.length; index++) {
    const html = `<li li-index="${index}">
                    <div class="row">
                        <span>${songs[index].name}</span>
                        <p>${songs[index].singer}</p>
                    </div>
                    <audio class="${songs[index].id}" src="${songs[index].path}"></audio>
                    <span id="${songs[index].id}" class="music-duration">3:20</span>
                </li>`
    ulElem.insertAdjacentHTML('beforeend',html);
    
    const audioTag = document.querySelector(`.${songs[index].id}`);
    const audioDuration = document.querySelector(`#${songs[index].id}`);

    audioTag.addEventListener('loadeddata',() => {
        const duration = audioTag.duration
        let totalMin = Math.floor(duration / 60);
        let totalSec = Math.floor(duration % 60);
        if (totalSec < 10) {
            totalSec = '0' + totalSec;
        }
        audioDuration.innerText = `${totalMin}:${totalSec}`;
        audioDuration.setAttribute('duration',`${totalMin}:${totalSec}`);
    })
}

function playingNow() {
    const currentSong = document.querySelector('li.playing');
    const indexSong = this.getAttribute('li-index');
    const durationTag = this.querySelector('.music-duration');
    const durationCurrent = currentSong.querySelector('.music-duration');

    currentSong.classList.remove('playing');
    this.classList.add('playing');
    durationTag.innerHTML = 'Playing';
    durationCurrent.innerHTML = durationCurrent.getAttribute('duration');

    currentIndex = indexSong;
    loadMusic(indexSong);
    handlePlay();
    animateionImg.play();
}

function handleChange() {
    const currentSong = document.querySelector('li.playing');
    const durationTag = liTags[currentIndex].querySelector('.music-duration');
    const durationCurrent = currentSong.querySelector('.music-duration');

    currentSong.classList.remove('playing');
    liTags[currentIndex].classList.add('playing');
    durationTag.innerHTML = 'Playing';
    durationCurrent.innerHTML = durationCurrent.getAttribute('duration');
}

const liTags = document.querySelectorAll('.music-list ul li');

liTags.forEach((elem) => {
    const liIndex = elem.getAttribute('li-index');
    if (liIndex == currentIndex){
        elem.classList.add('playing');
    }
    elem.addEventListener('click',playingNow);
});