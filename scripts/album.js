var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         {title: 'Blue', duration: '4:26'},
         {title: 'Green', duration: '3:14'},
         {title: 'Red', duration: '5:01'},
         {title: 'Pink', duration: '3:21'},
         {title: 'Magenta', duration: '2:15'}
     ]
};

 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         {title: 'Hello, Operator?', duration: '1:01' },
         {title: 'Ring, ring, ring', duration: '5:01' },
         {title: 'Fits in your pocket', duration: '3:21'},
         {title: 'Can you hear me now?', duration: '3:14' },
         {title: 'Wrong phone number', duration: '2:15'}
     ]
 };

 var albumPrince = {
     title: 'Purple Rain',
     artist: 'Prince',
     label: 'Warner Bros.',
     year: '1985',
     albumArtUrl: 'assets/images/album_covers/PurpleRain.png',
     songs: [
         {title: 'When Doves Cry', duration: '5:54'},
         {title: 'Let\'s Go Crazy', duration: '4:39'},
         {title: 'Purple Rain', duration: '8:41'},
         {title: 'I Would Die 4 U', duration: '2:49'},
         {title: 'Beautiful Ones', duration: '5:13'},
         {title: 'Computer Blue', duration: '3:59'},
         {title: 'Darling Nikki', duration: '4:14'},
         {title: 'Baby I\'m a Star', duration: '4:24'},
         {title: 'Take Me with U', duration: '3:54'}
     ]
 };


var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      +  '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     var $row =  $(template);
     var clickHandler = function() {
        var songNumber = $(this).attr('data-song-number');

        if (currentlyPlayingSong !== null) {
            var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
            currentlyPlayingCell.html(currentlyPlayingSong);
        }
        if (currentlyPlayingSong !== songNumber) {
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSong = songNumber;
        } else if (currentlyPlayingSong === songNumber) {
            $(this).html(playButtonTemplate);
            currentlyPlayingSong = null;
        }

     };

     var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(playButtonTemplate);
        }
        
     };
    
     var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(songNumber);
        }
     };  
     $row.find('.song-item-number').click(clickHandler); 
     $row.hover(onHover, offHover);
     return $row
 };
  

var setCurrentAlbum = function(album) {
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

var playButtonTemplate = '<a class="album-song-button"><span class = "ion-play"</span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class = "ion-pause"</span></a>';

var currentlyPlayingSong = null;


$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
  });

/*  var albums = [albumPicasso, albumMarconi, albumPrince];
var index = 1; //declare outside, so state is remembered

 albumImage.addEventListener("click", function(event){
   setCurrentAlbum(albums[index]) 
   index++;
     if(index == albums.length){
         index = 0;
     }
 });*/
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
/*songListContainer.addEventListener('mouseover', function(event){
     if(event.target.parentElement.className === 'album-view-song-item'){
        var songItem = getSongItem(event.target);

         if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
         songItem.innerHTML = playButtonTemplate;
       }

     }
 });*/
/*songRows[i].addEventListener('mouseleave', function(event){
        var songItem = getSongItem(event.target);
        var songItemNumber = songItem.getAttribute('data-song-number');

        if(songItemNumber !== currentlyPlayingSong){
            songItem.innerHTML = songItemNumber;
        }
});*/