
// media.js MUST be loaded before this file!


/* Globals */

// Id of the div that contains all the texts
var textListId = 'custom-text-list';



/* Functions */

function loadTexts() {

  // Check if object c is loaded, otherwise load it
  loadC(function() {

    // Do the rest
    loadMedia(

      // location
      c.url + c.location.text,

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
          thumbnail: location + id.toString() + '/' + c.file.text.thumbnail,
          drive: results.meta[0].drive
        });

        console.log(media[id].thumbnail);

        $('#' + textListId).append(`<div class="custom-text-element custom-text-element-${id%2==0?'a':'b'} container-fluid">
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-3 col-xl-3">
              <a href="${media[id].drive}" target="_blank">
                <img class="custom-text-thumbnail custom-responsive-bottom" src="${media[id].thumbnail}" alt="${media[id].title}" />
              </a>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-9 col-xl-9">
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
