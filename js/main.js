var longUrl;

$(document).ready(function() {
	longUrl = "https://gist.github.com/jeromeetienne/f0bd6fe553488298454a7495650b7b22";

	urlShortner(longUrl, function(short_url) {
   		console.log(short_url);
	});
});


function previewFile(){
//    var preview = document.querySelector('img'); //selects the query named img
   var file    = document.querySelector('input[type=file]').files[0]; //sames as here
   var reader  = new FileReader();
   
   var preview = document.createElement("IMG");
   preview.setAttribute('class', 'upload-img');

   reader.onloadend = function () {
       preview.src = reader.result;
   }

   if (file) {
       reader.readAsDataURL(file); //reads the data as a URL
       
       //var imgData = convertImageToCanvas(file);
       //var ctx = canvas.getContext('2d');
       document.getElementsByClassName('input-container')[0].appendChild(preview);
       googleApiClientReady();
   } else {
       preview.src = "";
       //alert("Image upload failed");
   }
}

function encodeUrl() {
	var url = document.getElementById('url-input').value;
// 	console.log(url);

}

function convertImageToCanvas(image) {
	var canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;
	canvas.getContext("2d").drawImage(image, 0, 0);

	return canvas;
}

// POST to google API
function urlShortner(long_url, func) {
	var login = "o_1f5bndsc3j";
	var api_key = "R_d7a01329aaf843708e85205dce13c7a5";
	
    $.getJSON(
        "http://api.bitly.com/v3/shorten?callback=?", 
        { 
            "format": "json",
            "apiKey": api_key,
            "login": login,
            "longUrl": longUrl
        },
        
        function(response)
        {
            func(response.data.url);
        }
    );
}

