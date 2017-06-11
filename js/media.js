
var c; // Contents of const.json will be stored here
var thumbnailId = 'custom-thumbnail-'; // Append thumbnail id number at the end
var selectedClass = 'custom-thumbnail-selected'; // Class for selected thumbnails

/* Here each media element can be stored.
Elements will have different formats depending on the type of media */
var media = [];

/* Loads object c with all the data from const.js if not previously loaded
- init(): function to call once c is properly loaded
*/
function loadC(init) {

  // c not defined
  if(c == null) {

    // Load c from const.json
    $.ajax({
      url: 'js/const.json',
      dataType: 'json'
    })

    // const.json was loaded fine
    .done(function(data) {
      c = data;
      init();
    })

    // Couldn't load const.js for some reason
    .fail(function() {
      console.log('Couldn\'t load const.json');
    });

  }

}

/* Loads all the media elements of the given type into the media array, and
does all the side effects specified in manage, for each element, and final,
once all the elements have been loaded
- location: string with location of numbered folders containing media
- queries: object containing AJAX queries to be made to the server
- manage(location, results, i): manager function for each media element
  - location: same as previous given location
  - results: copy of queries with each query replaced by its resulting jqXHR
  - i: index [0..queries.length-1] of the media element being processed
- final(): to be called after all media is processed
*/
function loadMedia(location, queries, manage, final) {

  // Recursive function
  function nextMedia(i) {

    // From queries object to array, in order to use $.when()
    var indices = []; // Keeps track of which number corresponds with which key
    var queriesArr = []; // Array of the queries
    var j = 0; // Index
    for(var q in queries) {
      indices.push(q);
      // Make a shallow copy of queries[q], so it's unaffected for next iteration
      queriesArr.push($.extend({}, queries[q]));
      // Important! Add the absolute path of the file to the query as a prefix!
      queriesArr[j].url = location + i.toString() + '/' + queriesArr[j].url;
      // Replace query data by actual jqXHR object
      queriesArr[j] = $.ajax(queriesArr[j]);
      j++;
    }

    // When all the queries are completed...
    $.when(...queriesArr).done(function(...resultsArr) {

      // Back from array to object
      var results = {};
      for(var j = 0; j < resultsArr.length; j++) {
        results[indices[j]] = resultsArr[j];
      }

      // Call to manager function with processed data
      manage(location, results, i);

      nextMedia(i + 1); // Keep going

    }).fail(final); // Call after everything is done

  } // nextMedia(i)

  nextMedia(0); // Initial call

}
