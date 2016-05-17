    var playButtonTemplate = '<a class="album-song-button"><span class = "ion-play"</span></a>';
    var pauseButtonTemplate = '<a class="album-song-button"><span class = "ion-pause"</span></a>';
    var playerBarPlayButton = '<span class="ion-play"></span>';
    var playerBarPauseButton = '<span class="ion-pause"></span>';

    var currentlyPlayingSongNumber = null;
    var currentAlbum = null;
    var currentSongFromAlbum = null;
    
    var $previousButton = $('.main-controls .previous');
    var $nextButton = $('.main-controls .next');
    
    var currentSoundFile = null;
    var currentVolume = 80;
    
    var $playBarControls = $('.main-controls .play-pause');


$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);

    $playBarControls.click(togglePlayFromPlayerBar);

  });


var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
     var $row =  $(template);
     
     var clickHandler = function() {
        var songNumber = parseInt($(this).attr('data-song-number'));

        if (currentlyPlayingSongNumber !== null) {
            var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }
                //play -> pause
         if (currentlyPlayingSongNumber !== songNumber) {
            $(this).html(pauseButtonTemplate);
             setSong(songNumber);
             currentSoundFile.play();
             updatePlayerBarSong();
                //pause -> play
        } else if (currentlyPlayingSongNumber === songNumber) {
            if(currentSoundFile.isPaused()){
                $(this).html(pauseButtonTemplate);
                $playBarControls.html(playerBarPauseButton);
                currentSoundFile.play();
            }else{
                $(this).html(playButtonTemplate);
                $playBarControls.html(playerBarPlayButton);

                $('.main-controls .play-pause').html(playerBarPauseButton);
                currentSoundFile.play();
           
        }   
    };


    /*var clickHandler = function(targetElement){
        var songItem = getSongItem(targetElement);
        if (currentlyPlayingSong === null) {
             songItem.innerHTML = pauseButtonTemplate;
             currentlyPlayingSong = songItem.getAttribute('data-song-number');
        }else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
             songItem.innerHTML = playButtonTemplate;
             currentlyPlayingSong = null;
        }else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
             var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
             currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
             songItem.innerHTML = pauseButtonTemplate;
             currentlyPlayingSong = songItem.getAttribute('data-song-number');
        }
    };*/

     var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt($(songNumberCell).attr('data-song-number'));
      

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
        
     };
    /*songListContainer.addEventListener('mouseover', function(event){
         if(event.target.parentElement.className === 'album-view-song-item'){
            var songItem = getSongItem(event.target);
             if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
             songItem.innerHTML = playButtonTemplate;
           }
         }
     });*/
     var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt($(songNumberCell).attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        }
     };  
    
    /*songRows[i].addEventListener('mouseleave', function(event){
        var songItem = getSongItem(event.target);
        var songItemNumber = songItem.getAttribute('data-song-number');
        if(songItemNumber !== currentlyPlayingSong){
            songItem.innerHTML = songItemNumber;
        }
    });*/    
    
     $row.find('.song-item-number').click(clickHandler); 
     $row.hover(onHover, offHover);
     return $row
 };

    
var togglePlayFromPlayerBar = function(){
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = parseInt($(songNumberCell).attr('data-song-number'));

     if(currentSoundFile.isPaused()){
         
            songNumberCell.html(pauseButtonTemplate);
            $playBarControls.html(playerBarPauseButton);
            currentSoundFile.play();
        }else if(currentlyPlayingSongNumber === songNumber){
         
            songNumberCell.html(playButtonTemplate);
            $playBarControls.html(playerBarPlayButton);
            currentSoundFile.pause();
        }
};
    

var setSong = function(songNumber){
    if(currentSoundFile){
        currentSoundFile.stop();
    }
    currentlyPlayingSongNumber = parseInt(songNumber);          
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1]; 
    
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl,{
        formats:['mp3'],
        preload:true
    });
   
    setVolume(currentVolume);
};

var setVolume = function(volume){
    if(currentSoundFile){
        currentSoundFile.setVolume(volume);
    }
};

var getSongNumberCell= function(number){
    return $('.song-item-number[data-song-number="' + number + '"]');
};

var setCurrentAlbum = function(album) {
     currentAlbum = album;
    
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
     
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
 
     $albumSongList.empty();
     
     for (var i = 0; i < album.songs.length; i++) {
       var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
     }
    
 };

var trackIndex = function(album, song){
    return album.songs.indexOf(song);
};

var nextSong = function(){
    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex++;
    
    if(currentSongIndex >= currentAlbum.songs.length){
        currentSongIndex = 0;
    }
    setSong(currentSongIndex + 1);
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
    currentSoundFile.play();
    updatePlayerBarSong();
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};


var previousSong = function(){
    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex--;
    
    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }
    
    setSong(currentSongIndex + 1);
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
    currentSoundFile.play();
    updatePlayerBarSong();
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var updatePlayerBarSong = function() {
    var $songTitle = $(".song-name");
    var $artistName = $(".artist-name");
    var $musicMobile = $(".artist-song-mobile");
    
    $songTitle.text(currentSongFromAlbum.title);
    $artistName.text(currentAlbum.artist);
    $musicMobile.text(currentSongFromAlbum.title +" - "+ currentAlbum.artist);
};

