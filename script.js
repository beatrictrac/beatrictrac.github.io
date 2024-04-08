        const audio = document.getElementById('musicPlayer');
        const progressSlider = document.getElementById('progressSlider');
        const currentTimeDisplay = document.getElementById('currentTime');
        const totalDurationDisplay = document.getElementById('totalDuration');

        let nSongs = 5; //number of songs
        let songIndex = 0;
        let isShowingInfo = false;
        let lastSongIndex = nSongs-1; //this will be useful if the shuffle option is active
        let wasNextSongPreviouslyToggled = true; 
        let isPlaying = false;
        let isShuffle = false;
        let isRepeat = false;
        let isFullHeart = [false, false, false, false, false];
        let srcGif = ['immagini/gif1.gif', 'immagini/gif2.gif', 'immagini/gif3.gif', 'immagini/gif4.gif', 'immagini/gif5.gif'];
        let srcPausedGif = ['immagini/im1.png', 'immagini/im2.png', 'immagini/im3.png', 'immagini/im4.png', 'immagini/im5.png'];
        let songName = ['Believer', 'Lost', 'Viva La Vida', 'Softcore', 'Exit Music (for a Film)'];
        let singerName = ['Imagine Dragons', 'Linkin Park', 'Coldplay', 'The Neighbourhood', 'Radiohead'];
        let srcAudio = ['musica/believer.mp3', 'musica/lost.mp3', 'musica/viva_la_vida.mp3', 'musica/softcore.mp3', 'musica/exit_music.mp3'];
        let bgColor = ['#eda304', '#d0b6ad', '#d37861', '#c2c2c2', '#a9cae5'];
        let cardColor = ['#834703', '#1a2041', '#6f2b0a', '#2c2c2c', '#334868'];


        /**************************** AUDIO SECTION *****************************/

        // Play/Pause toggle function
        function togglePlayPause() {
            const playPauseIcon = document.getElementById('playPauseIcon');
            if (isPlaying) {
                audio.pause();
                playPauseIcon.classList.remove('bi-pause-circle-fill');
                playPauseIcon.classList.add('bi-play-circle-fill');
                document.getElementById('musicImage').src = srcPausedGif[songIndex];
            } else {
                audio.play();
                playPauseIcon.classList.remove('bi-play-circle-fill');
                playPauseIcon.classList.add('bi-pause-circle-fill');
                document.getElementById('musicImage').src = srcGif[songIndex];
            }
            isPlaying = !isPlaying;
        }

        document.getElementById('playButton').addEventListener('click', togglePlayPause);

        // Format time to display as minutes:seconds
        function formatTime(seconds) {
            let minutes = Math.floor(seconds / 60);
            seconds = Math.floor(seconds % 60);
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }

        // Display total duration once the audio metadata is loaded
        audio.addEventListener('loadedmetadata', () => {
            totalDurationDisplay.textContent = formatTime(audio.duration);
        });
        

        // Update current time and progress bar as the audio plays
        audio.addEventListener('timeupdate', function () {
            if(!this.duration) //sets the progress bar value equal to 0 when a new song is loading
                progressSlider.value = 0;
            else{
                const percentage = (this.currentTime / this.duration) * 100;
                progressSlider.value = percentage;
                currentTimeDisplay.textContent = formatTime(this.currentTime);
            }
        });

        // Update the current time when the user seeks
        progressSlider.addEventListener('input', function () {
            const seekTime = (audio.duration / 100) * progressSlider.value;
            audio.currentTime = seekTime;
        });

        // Handle audio ending
        audio.onended = function () {
            loadNextSong(); //when a sog ends, the next one starts playing
        };

        // Volume Control
        document.getElementById('volumeControl').addEventListener('input', function () {
            audio.volume = this.value;
        });


        /**************************** MUSIC CARD SECTION *****************************/

        //fills/empties the heart to like/dislike the song
        function toggleLikeDislike() {
            const likeDislikeIcon = document.getElementById('likeDislikeIcon');
            if (isFullHeart[songIndex]) {
                likeDislikeIcon.classList.remove('bi-heart-fill');
                likeDislikeIcon.classList.add('bi-heart');
            } else {
                likeDislikeIcon.classList.remove('bi-heart');
                likeDislikeIcon.classList.add('bi-heart-fill');
            }
            isFullHeart[songIndex] = !isFullHeart[songIndex];
        }

        document.getElementById('heartButton').addEventListener('click', toggleLikeDislike);

        //when the shuffle option is selected, the next song to play will be chosen randomly
        function toggleShuffle() {
            const shuffleSelector = document.getElementById('shuffleSelector');
            if(isShuffle){
                shuffleSelector.innerHTML = " "
            }
            else{
                shuffleSelector.innerHTML = "&#x2022"
                if(isRepeat)
                    toggleRepeat(); //if the repeat option is on, it will be disabled
            }
            isShuffle = !isShuffle;
        }

        document.getElementById('shuffleButton').addEventListener('click', toggleShuffle);

        //when the repeat option is selected, the current song will be played again
        function toggleRepeat() {

            const repeatSelector = document.getElementById('repeatSelector');
            if(isRepeat){
                repeatSelector.innerHTML = " "
            }
            else{
                repeatSelector.innerHTML = "&#x2022"
                if(isShuffle) 
                    toggleShuffle(); //if the shuffle option is on, it will be disabled
            }
            isRepeat = !isRepeat;
        }

        document.getElementById('repeatButton').addEventListener('click', toggleRepeat);

        function selectSongInfo(){
            switch (songIndex) {
                case 0:
                    document.getElementById('p1').style.display = "block";
                    document.getElementById('p2').style.display = "none";
                    document.getElementById('p3').style.display = "none";
                    document.getElementById('p4').style.display = "none";
                    document.getElementById('p5').style.display = "none";
                    break;
                case 1:
                    document.getElementById('p1').style.display = "none";
                    document.getElementById('p2').style.display = "block";
                    document.getElementById('p3').style.display = "none";
                    document.getElementById('p4').style.display = "none";
                    document.getElementById('p5').style.display = "none";
                    break;
                case 2:
                    document.getElementById('p1').style.display = "none";
                    document.getElementById('p2').style.display = "none";
                    document.getElementById('p3').style.display = "block";
                    document.getElementById('p4').style.display = "none";
                    document.getElementById('p5').style.display = "none";
                    break;
                case 3:
                    document.getElementById('p1').style.display = "none";
                    document.getElementById('p2').style.display = "none";
                    document.getElementById('p3').style.display = "none";
                    document.getElementById('p4').style.display = "block";
                    document.getElementById('p5').style.display = "none";
                    break;
                case 4:
                    document.getElementById('p1').style.display = "none";
                    document.getElementById('p2').style.display = "none";
                    document.getElementById('p3').style.display = "none";
                    document.getElementById('p4').style.display = "none";
                    document.getElementById('p5').style.display = "block";
                    break;
                default:
                    document.getElementById('p1').style.display = "none";
                    document.getElementById('p2').style.display = "none";
                    document.getElementById('p3').style.display = "none";
                    document.getElementById('p4').style.display = "none";
                    document.getElementById('p5').style.display = "none";
            }
        }

        //shows the song information
        function showInfo(){
            const firstColumn = document.getElementById('first-column');
            firstColumn.classList.remove('col-lg-12');
            firstColumn.classList.add('col-lg-4');
            firstColumn.classList.remove('col-md-12');
            firstColumn.classList.add('col-md-6');
            document.getElementById('second-column').style.display = "block";
            isShowingInfo = true;
            selectSongInfo();
        }

        document.getElementById('infoButton').addEventListener('click', showInfo);

        function hideInfo(){
            const firstColumn = document.getElementById('first-column');
            firstColumn.classList.remove('col-lg-4');
            firstColumn.classList.add('col-lg-12');
            firstColumn.classList.remove('col-md-6');
            firstColumn.classList.add('col-md-12');
            document.getElementById('second-column').style.display = "none";
            isShowingInfo = false;
        }

        document.getElementById('hideButton').addEventListener('click', hideInfo);

        //sets all the song properties when a new song is loaded
        function loadSongProperties(){
            
            audio.src = srcAudio[songIndex];
            progressSlider.value = 0;

            if(isShowingInfo){
                selectSongInfo();
            }
            
            document.getElementById('card').style.backgroundColor = cardColor[songIndex];
            document.getElementById('progressContainer').style.backgroundColor = cardColor[songIndex];
            document.getElementById('progressSlider').style.accentColor = bgColor[songIndex];
            document.getElementById('musicImage').src = srcGif[songIndex];
            document.getElementById('song-name').innerHTML = songName[songIndex];
            document.getElementById('singer-name').innerHTML = singerName[songIndex];
            document.body.style.backgroundColor = bgColor[songIndex];
            
            //the next song will start to play as soon as you switch the song
            isPlaying = false;
            togglePlayPause();
            
            //the next song will start to play as soon as you switch the song
            isFullHeart[songIndex] = !isFullHeart[songIndex];
            toggleLikeDislike();
        }

        //sets the next song
        function loadNextSong(){
            wasNextSongPreviouslyToggled = true;
            lastSongIndex = songIndex;
            if(isShuffle){
                //if the random shuffle option is active, a random song is chosen
                let newIndex = 0;
                do{
                    newIndex = Math.floor(Math.random() * nSongs);
                }while(newIndex == songIndex); //the new song must be different from the current one
                songIndex = newIndex;
            }
            else if (!isRepeat){
                //if the random shuffle option is not active, the next song index is chosen
                songIndex = (songIndex+1)%nSongs; //circular array
            }
            
            loadSongProperties();
        }

        document.getElementById('next-track').addEventListener('click', loadNextSong);

        //sets the previous song
        function loadPrevSong(){
          
            if(isRepeat) //if the repeat option is on, it will be disabled
                toggleRepeat();

            if(wasNextSongPreviouslyToggled){
                songIndex = lastSongIndex; //this is particularly useful to select the right song while the random shuffle option is active
                wasNextSongPreviouslyToggled = false;
            }
            else{
                songIndex = (songIndex - 1 + nSongs) % nSongs; //circular array
            }
            
            loadSongProperties();
        }

        document.getElementById('prev-track').addEventListener('click', loadPrevSong);


        /**************************** PLAYLIST SECTION *****************************/

        function showPlaylist(){
            hideInfo();
            if(isShuffle) 
                toggleShuffle(); //if the shuffle option is on, it will be disabled
            else if(isRepeat) 
                toggleRepeat(); //if the repeat option is on, it will be disabled
            
            if (isPlaying)
                togglePlayPause();

            document.getElementById('card').style.display = "none";
            document.getElementById('playlist').style.display = "block";
            document.body.style.backgroundColor = "#b4ded1";
        }

        document.getElementById('playlistButton').addEventListener('click', showPlaylist);

        function loadChosenSong(){
            document.getElementById('card').style.display = "block";
            document.getElementById('playlist').style.display = "none";
            loadNextSong();
        }

        function playlistSong1(){
            songIndex = 4;
            loadChosenSong();
        }
        function playlistSong2(){
            songIndex = 0;
            loadChosenSong();
        }
        function playlistSong3(){
            songIndex = 1;
            loadChosenSong();
        }
        function playlistSong4(){
            songIndex = 2;
            loadChosenSong();
        }
        function playlistSong5(){
            songIndex = 3;
            loadChosenSong();
        }
        
        document.getElementById('s1').addEventListener('click', playlistSong1);
        document.getElementById('s2').addEventListener('click', playlistSong2);
        document.getElementById('s3').addEventListener('click', playlistSong3);
        document.getElementById('s4').addEventListener('click', playlistSong4);
        document.getElementById('s5').addEventListener('click', playlistSong5);