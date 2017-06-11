
// media.js MUST be loaded before this file!



/* Globals */

// Id of the div containing all the divs for each audio
var audioListId = 'custom-audio-list';



/* Functions */

function loadAudios() {

  // Check if object c is loaded, otherwise load it
  loadC(function() {

    // Do the rest
    loadMedia(

      // location
      c.url + c.location.audio,

      // queries
      {
        description: {
          url: c.file.audio.description,
          dataType: 'text'
        },
        meta: {
          url: c.file.audio.meta,
          dataType: 'json'
        }
      },

      // manage(location, results, id)
      function(location, results, id) {

        media.push({
          title: results.meta[0].title,
          description: results.description[0],
          url: location + id.toString() + '/' + c.file.audio.file,
          drive: results.meta[0].drive
        });

        $('#' + audioListId).append(`<div class="custom-audio-element custom-audio-element-${id%2==0?'a':'b'} container-fluid">
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4">
              <audio controls type="audio/wav">
                <source src="${media[id].url}"/>
              </audio>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-8 col-xl-8">
              <h3 class="custom-media-title">${media[id].title}</h3>
              <a href="${media[id].drive}" class="custom-media-link" target="_blank">
                <span class="fa fa-link" aria-hidden="true"></span>
              </a>
              <div>${media[id].description}</div>
            </div>
          </div>
        </div>`);

      },

      // final()
      function() {}

    ); // loadMedia(...)

  }); // loadC(...);

}
