// JavaScript for index.html

// fill information after document has loaded
$(document).ready(function() {
    // get json object
    $("#serialize").html(JSON.stringify(set_list));

    genre_dropdown();
    display_all();
})

// create genre select dropdown based on genres in the set_list
function genre_dropdown() {
    var genres = [];

    // find all unique genres
    set_list["songs"].forEach(function(song) {
        song["genre"].forEach(function(genre) {
            if (!genres.includes(genre)) {
                genres.push(genre);
            }
        });
    });

    // create options in select list 
    genres.forEach(function(genre) {
        line = `<option value="` + genre + `">` + genre + `</option>`
        $("#genre_select").append(line);
    });
}

// create a new song entry in html
function song_entry(id, song) {
    // create html song entry based on song
    line = 
        `<div>
            <h3>` + song["title"] + `</h3>
            Artist: ` + song["artist"].join(", ") + `</br>
            Genre: ` + song["genre"].join(", ") + `</br>
            Released ` + song["year"] + `
        </div>`;

    // append the html song entry onto element with given id
    $("#" + id).append(line);
}

// display all of the songs in the list
function display_all() {
    // append html for each song in the list
    set_list["songs"].forEach(function(song) {
        song_entry("all", song);
    });

    // update two columns to be the same height
    c1_height = $(".c1").height();
    $(".c2").height(c1_height);
}

// update song list based on selected genre
function update_list() {
    // get selected genre from form
    selected = document.getElementById("genre_select").value;

    // reset selected genre list to empty
    $("#selected").html("");

    // append html to song list if genre matches
    set_list["songs"].forEach(function(song) {
        if (song["genre"].includes(selected)) {
            song_entry("selected", song);
        }
    });
}