
// media.js MUST be loaded before this file!



/* Globals */

// Id of the element to link to when clicking a thumbnail
var linkId = 'custom-content';
// Id of the iframe object that acts as player
var playerId = 'custom-showcase-player';
// Id of the div containing the video data
var descriptionId = 'custom-showcase-description';
// Id of the div containing all the clickable video thumbnails
var thumbnailsId = 'custom-thumbnails';



/* Functions */

// Loads all videos into array media and shows media[0]
function loadVideos() {

  // Check if object c is loaded, otherwise load it
  loadC(function() {

    // Do the rest
    loadMedia(

      // location
      c.url + c.location.video,

      // queries
      {
        description: {
          url: c.file.video.description,
          dataType: 'text'
        },
        meta: {
          url: c.file.video.meta,
          dataType: 'json'
        }
      },

      // manage(location, results, id)
      function(location, results, id) {

        media.push({
          title: results.meta[0].title,
          description: results.description[0],
          url: results.meta[0].url,
          thumbnail: location + id.toString() + '/' + c.file.video.thumbnail,
          drive: results.meta[0].drive
        });

        $('#' + thumbnailsId).append(`<a href="#${linkId}" class="col-sm-12 col-md-6 col-lg-6 col-xl-4 custom-thumbnail" onclick="showVideo(${id});">
          <img src="${media[id].thumbnail}" alt="${media[id].title}" /><br/>
          <h3>${media[id].title}</h3>
        </a>`);

      },

      // final()
      function() {
        showVideo(0);
      }

    ); // loadMedia(...)

  }); // loadC(...)

} // loadVideos()

/* Makes proper changes to HTML and UI when the page is first loaded or
a thumbnail is clicked in order to show the new video etc.
- id: index [0..media.length-1] of the video to show
*/
function showVideo(id) {

  if(media == null || media[id] == null) {
    console.log("Variable media was not loaded upon calling showVideos()");
    return;
  }

  // Find the video data box and fill it
  $('#' + descriptionId)
    // Add title
    .html(`<h3 class="custom-media-title">${media[id].title}</h3>
      <a href="${media[id].drive}" class="custom-media-link" target="_blank">
        <span class="fa fa-link" aria-hidden="true"></span>
      </a>`)
    // And the description
    .append(media[id].description);

  // Find the thumbnails at the bottom, and on each of them...
  $('#' + thumbnailsId).children().each(function(i) {
    // ... if they're the clicked one, add selected class
    if(i == id){
      $(this).addClass(selectedClass);
    // ... otherwise, remove it
    } else {
      $(this).removeClass(selectedClass);
    }
  });

  // Finally, change the source of the shown media to the clicked one
  $('#' + playerId).attr('src', media[id].url);

} // showVideo(id)
