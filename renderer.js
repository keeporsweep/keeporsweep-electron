// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {shell} = require('electron')
var recursive = require('recursive-readdir');
// Skip hidden or large irrelevant folders
var ignorelist = ['.*', 'node_modules', 'static'];

recursive('.', ignorelist, function (err, files) {
    // `files` is an array of file paths

    var filefull, filename, filepath;

    for(let file of files) {
        var container = document.getElementsByClassName('card-container')[0];

        // Maybe we need this for Windows: String.raw`${file}`
        filefull = __dirname + '/' + file;
        filename = file.split('/').pop();
        filepath = file.split('/').slice(0, -1).join('/');

        container.innerHTML +=
            '<div data-v-7a77af60="" class="card" data-file="' + filefull + '">' +
                '<div data-v-7a77af60="" class="preview" style="background-image: url(\'' + filefull + '\')"></div>' +
                '<h2 data-v-7a77af60="" class="name">' + filename + '</h2>' +
                '<p data-v-7a77af60="" class="detail" ' +
                    '<a data-v-7a77af60="" href="#"><img data-v-7a77af60="" class="source" src="assets/folder.svg" /></a>' +
                    filepath +
                '</p>' +
            '</div>';
    }
});

// Sweep
//shell.moveItemToTrash('/home/jan/Nextcloud/keeporsweep-electron/Abstract/image2.jpeg')

// Open file on click of name
$(document).on('click', '.name', function(event) {
    event.preventDefault();
    shell.openItem($(event.target).parent('.card').attr('data-file'));
});

// Open folder of file on click of path
$(document).on('click', '.detail', function(event) {
    event.preventDefault();
    shell.showItemInFolder($(event.target).parent('.card').attr('data-file'));
});
