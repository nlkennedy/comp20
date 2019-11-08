// Only use these backup_categories_json if the API requests fail b/c of API call limits 
backup_categories_json = {
    "success": {
        "total": 8
    },
    "contents": {
        "categories": {
            "inspire": "Inspiring Quote of the day",
            "management": "Management Quote of the day",
            "sports": "Sports Quote of the day",
            "life": "Quote of the day about life",
            "funny": "Funny Quote of the day",
            "love": "Quote of the day about Love",
            "art": "Art quote of the day ",
            "students": "Quote of the day for students"
        },
        "copyright": "2017-19 http://theysaidso.com"
    }
}

// Initially load page with this quote
backup_quote_json = {
    "success": {
        "total": 1
    },
    "contents": {
        "quotes": [
            {
                "quote": "Do not worry if you have built your castles in the air. They are where they should be. Now put the foundations under them.",
                "length": "122",
                "author": "Henry David Thoreau",
                "tags": [
                    "dreams",
                    "inspire",
                    "worry"
                ],
                "category": "inspire",
                "date": "2016-11-21",
                "title": "Inspiring Quote of the day",
                "background": "https://theysaidso.com/img/bgs/man_on_the_mountain.jpg",
                "id": "mYpH8syTM8rf8KFORoAJmQeF"
            }
        ]
    }
}

// after loaded, create categories and display initial quote
$(document).ready(function() {
    update_categories();
    display_quote(backup_quote_json);
});

// API call to get categories
function update_categories() {
    url = "https://quotes.rest/qod/categories";
    get_request(display_categories, url);
}

// display categories in dropdown 
function display_categories(categories_json) {
    for (let [key] of Object.entries(categories_json["contents"]["categories"])) {
        line = `<option value="` + key + `">` + key + `</option>`
        $("#categories").append(line);
    }
    $("#copy").html(categories_json["contents"]["copyright"]);
}

// API call to get the quote based on the selected category
function update_quote() {
    url = "https://quotes.rest/qod";
    selected = document.getElementById("categories").value;
    // add query to url
    url += "?category=" + selected;
    get_request(display_quote, url)
}

// display quote info in quote block
function display_quote(quote_json) {
    var quote = quote_json["contents"]["quotes"][0];
    $("#title").html(quote["title"]);
    $("#quote").html(quote["quote"]);
    $("#author").html(quote["author"]);
    $("#tags").html(quote["tags"].join(", "));
}

// API get request given url and function to display the data
function get_request(display, url) {
    request = new XMLHttpRequest();
    request.open("GET", url, true);

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            // on success, display JSON data using input function
            result = JSON.parse(request.response);
            display(result);
        }
        else if (request.readyState == 4 && request.status != 200) {
            // on error, sent alert and use backup jsons
            alert(`Error ${request.status}: ${request.statusText}`);
            display_quote(backup_quote_json);
            display_categories(backup_categories_json);
        }
    }
    request.send();
}