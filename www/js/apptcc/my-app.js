// REFERENCIAS

// exemplo de como pega parametros url
// https://framework7.io/docs/pages.html

/*
 * page.query	object with URL query parameters. If your page URL is "about.html?id=10&count=20&color=blue" then page.query will contain:
 {
 id: '10',
 count: '20',
 color: 'blue'
 }
 * */



/**
 * Created by francisco on 09/07/17.
 */

//var appTccServer = "192.168.0.114";
var appTccServer = "10.1.0.10";



// Initialize app
var myApp = new Framework7({
    material: true
});


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Now we need to run the code that will be executed only for About page.


// Funções Incialização Página ######################################################################################################

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('sobre', function (page) {
    // Do something here for "about" page
    //myApp.alert('Here comes About page');

    $$('p').on('click', function (e) {
        $$(this).html('sim sim sim');
    });

    var uri = encodeURI("http://"+appTccServer+"/AppTcc-backend/places/create");

    cordovaHTTP.post(uri, {
        name: "teste",
        x: "10",
        y: "34"
    }, {}, function(response) {
        console.log(response.status);
        console.log(response);

        //$$('#teste').html(response);

        var obj = parseJSON(response.data);


    }, function(response) {
        console.error(response.error);
    });





})





myApp.onPageInit('mapa', function (page) {
    // Do something here for "about" page
    //myApp.alert('Here comes About page');


    var gridMatrix = [
        1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,1,1,1,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,
        1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,
        1,1,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,0,0,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,1,1,1,1,1,1,1,
    ];


    var $grid = $("#search_grid");

    var opts = {
        wallFrequency: .1,
        gridSizeX: 20,
        gridSizeY: 20,
        debug: false,
        diagonal: true,
        closest: false,
        startX: 10,
        startY: 10,
        endX: 0,
        endY: 0,
        gridMatrix: gridMatrix

    };

    var grid = new GraphSearch($grid, opts, astar.search);









    var origin = {};
    var destination = {};


    function callBackOnUploadSucess (r) {

        //var data = JSON.parse(r.data);

        if(r.responseCode == "200") {

            console.log("passou no teste");
            var response = JSON.parse(r.response);

            var similar = response.data[0];

            alert("Imagem enviada com sucesso! code "+r.responseCode+" \n " +
                "id imagem mais similar = "+response.data[0].id); //"id imagem mais similar = "+data[0].id


            var uri = encodeURI("http://"+appTccServer+"/AppTcc-backend/images/get");

            cordovaHTTP.post(uri, {
                id: similar.id
            }, {}, function(response) {
                console.log(response.status);
                console.log(response);

                //$$('#teste').html(response);

                var obj = parseJSON(response.data);

                //console.log("buscou imagem");
                //console.log(obj);

                origin.place_id = obj.jsonResponse.image.place.id;
                origin.place_name = obj.jsonResponse.image.place.name;
                origin.x = obj.jsonResponse.image.place.x;
                origin.y = obj.jsonResponse.image.place.y;

                console.log("origin");
                console.log(origin);

            }, function(response) {
                console.error(response.error);
            });

        }
    }

    $$('#btnSelectOrigin').on('click', function () {

        var imageCapture = new ImageCapture();
        imageCapture.uri = "http://admin:admin@"+appTccServer+":9999/api/search";
        imageCapture.OnUploadSucess = callBackOnUploadSucess;
        imageCapture.doCapture();

    });

    $$('#btnSelectDestination').on('click', function () {
        myApp.popup('#popup-destination');
    });

    $$('#popup-destination').on('popup:opened', function () {
        console.log('popup-destination Popup opened')
    });

    // Fruits data demo array
    var fruits = ('Apple Apricot Avocado Banana Melon Orange Peach Pear Pineapple').split(' ');

    // Simple Dropdown
    var autocompleteDropdownSimple = myApp.autocomplete({
        input: '#autocomplete-dropdown',
        openIn: 'dropdown',
        source: function (autocomplete, query, render) {
            var results = [];
            if (query.length === 0) {
                render(results);
                return;
            }
            // Find matched items
            for (var i = 0; i < fruits.length; i++) {
                if (fruits[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(fruits[i]);
            }
            // Render items by passing array with result items
            render(results);
        }
    });

})




myApp.onPageInit('imagens', function (page) {
    // Do something here for "about" page
    myApp.alert('Here comes About page 1');

    var uri = encodeURI("http://"+appTccServer+":9999/api/images");

    // https://github.com/wymsee/cordova-HTTP
    //cordovaHTTP.useBasicAuth("admin", "admin");
    cordovaHTTP.setHeader("Authorization", make_base_auth('admin', 'admin'));

    cordovaHTTP.get(uri, {
        id: 12,
        message: "test"
    }, {}, function(response) {
        console.log(response.status);
        console.log(response);

        //$$('#teste').html(response);

        var obj = parseJSON(response.data);


        // http://10.1.0.10:9999/thumb/1495671292938.png?size=128
        //for(var i = 0;i < obj.length; i++) {
        //    console.log(obj[i].id);
        //}

        htmlImageList(obj);

    }, function(response) {
        console.error(response.error);
    });


})

myApp.onPageInit('places', function (page) {
    // Do something here for "about" page
    //myApp.alert('Here comes About page');


    var uri = encodeURI("http://"+appTccServer+"/AppTcc-backend/places/index");

    cordovaHTTP.post(uri, {
        list: "ok"
    }, {}, function(response) {
        console.log(response.status);
        console.log(response);

        //$$('#teste').html(response);

        var obj = parseJSON(response.data);

        htmlPlacesList(obj);

    }, function(response) {
        console.error(response.error);
    });
})

myApp.onPageInit('place-images', function (page) {
    // Do something here for "about" page
    //myApp.alert('Here comes About page');

    console.log(page.query);
    var place_id = page.query.place_id;
    var uri = encodeURI("http://"+appTccServer+"/AppTcc-backend/images/index");

    // requisita a lista de imagens
    cordovaHTTP.post(uri, {
        place_id: place_id
    }, {}, function(response) {
        console.log(response.status);
        console.log(response);

        //$$('#teste').html(response);

        var obj = parseJSON(response.data);

        htmlImageList(obj)

    }, function(response) {
        console.error(response.error);
    });


    // ação do botão incluir imagem
    $$('#btnCapturarImagem').on('click', function (e) {

        var uri = encodeURI("http://"+appTccServer+"/AppTcc-backend/images/create");

        // registra imagem no banco
        cordovaHTTP.post(uri, {
            place_id: place_id
        }, {}, function(response) {
            console.log(response.status);
            console.log(response);

            //$$('#teste').html(response);

            var obj = parseJSON(response.data);

            var lastInsertId = obj.jsonResponse.lastInsertId;
            var place_id = obj.jsonResponse.place_id;


            var imageCapture = new ImageCapture();
            imageCapture.uri = "http://admin:admin@"+appTccServer+":9999/api/images";
            imageCapture.uploadParams = {id: lastInsertId, keys: "place_id", values: ""+place_id+""}

            imageCapture.doCapture();




        }, function(response) {
            console.error(response.error);
        });

    });

    $$('#btnDeleteImageAction').on('click', function (e) {
        console.log("btnDeleteImageAction resource"+this.resource);
    });


})
// Fim Funções Incialização Página ######################################################################################################

// Ações botões #####################################################

// botão "excluir" na página place-images.html
function btnDeleteImageAction(id) {

    console.log("btnDeleteImageAction "+id);

    // exclui imagem no banco
    var uri = encodeURI("http://"+appTccServer+"/AppTcc-backend/images/delete");
    var storage = "default";

    cordovaHTTP.post(uri, {
        id: id
    }, {}, function(response) {
        console.log(response.status);
        console.log(response);

        //$$('#teste').html(response);

        var obj = parseJSON(response.data);

        if(obj.jsonResponse.success == "yes") {
            console.log("excluiu imagem do banco");

            // exclui imagem cbirest
            var uri = encodeURI("http://"+appTccServer+":9999/api/storages/"+storage+"/images/"+id);
            cordovaHTTP.setHeader("Authorization", make_base_auth('admin', 'admin'));

            console.log(uri);

            //DELETE /api/storages/{storage}/images/{id}

            // instalar plugin com implementação delete
            //https://github.com/Telerik-Verified-Plugins/SecureHTTP


            cordovaHTTP.delete(uri, {
                // variaveis
            }, {}, function(response) {
                console.log("excluiu do cbirest");
                console.log(response.status);
                console.log(response);

                //$$('#teste').html(response);

                var obj = parseJSON(response.data);

                // recarrega a lista de imagens mostrando a imagem inserida
                // https://framework7.io/docs/router-api.html
                var options = {};
                options.pageName = "place-images";
                options.query = {place_id: "1"};
                mainView.router.load(options);



            }, function(response) {
                console.error(response.error);
            });




        } else {
            console.log("não excluiu imagem do banco");
        }



    }, function(response) {
        console.error(response.error);
    });



}



// Fim ações botões #################################################
function htmlImageList(obj) {


    var images = obj.jsonResponse.images;

    var listHTML = '<ul>';

    for(var i = 0;i < images.length; i++) {


        listHTML += ''+
            '<li class="item-content">' +
                '<div class="item-media"><img src="http://'+appTccServer+':9999/thumb/'+images[i].id+'.png?size=128" width="128"></div>' +
                '<div class="item-inner">' +
                    '<div class="item-title">' +
                        '<a id="btnDeleteImage" onclick="btnDeleteImageAction('+images[i].id+')" href="#" class="button buttons-row button-fill color-red" resource="'+images[i].id+'">EXCLUIR</a>' +
                    '</div>' +
                    '<div class="item-subtitle">'+images[i].id+'</div>' +
                '</div>'+
            '</li>';
    }

    listHTML += '</ul>';

    $$('#apptcc-imagelist').html(listHTML);

}


/*
*   Lista de locais
* */
function htmlPlacesList(obj) {


    var places = obj.jsonResponse.places;

    var listHTML = '<ul>';

    for(var i = 0;i < places.length; i++) {


        listHTML += '<li>' +
            '<a href="place-images.html?place_id='+places[i].id+'" class="item-link item-content">' +
            '<div class="item-inner">' +
            '<div class="item-title-row">' +
            '<div class="item-title">'+places[i].name+'</div>' +
            '</div>' +
            '<div class="item-subtitle">cord x: '+places[i].x+' cord y: '+places[i].y+'</div>' +
            '</div>'+
            '</a>'+
            '</li>';
    }

    listHTML += '</ul>';

    $$('#apptcc-places-list').html(listHTML);

}




// recebe json texto e converte para objeto
function parseJSON(jsonText) {

    var jsonObject = null;

    try {
        jsonObject = JSON.parse(jsonText);
    } catch(e) {
        console.error("JSON parsing error");
    }

    return jsonObject
}


function make_base_auth(user, password) {
    var tok = user + ':' + password;
    var hash = btoa(tok);
    return 'Basic ' + hash;
}





// Option 2. Using one 'pageInit' event handler for all pages:
/*
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})
 */


// ##########################################################################

/*
*
*  Objeto que faz a captura da imaagem e upload para uri de destino
*
*
* */

function ImageCapture() {

    //var uri = encodeURI("http://10.1.0.10/AppTcc-backend/images/create");
    this.uri = "";

    this.imageCaptured = "";
    this.fileURL = "";
    this.mimeType = "";

    var uploadResponse = {} // variável privada

    this.uploadParams = {};


    //console.log(navigator.device.capture);


    this.optionsCapture = {
        limit: 1
    }

    // captura imagem ################################################################################################
    this.doCapture = function () {
        navigator.device.capture.captureImage(this.OnCatureSucess, this.onCaptureError, this.optionsCapture);
    }

    var self = this;


    this.OnCatureSucess = function (mediaFiles) {
        var i, path, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath;
            console.log(mediaFiles);
            this.imageCaptured = mediaFiles;
            this.fileURL = this.imageCaptured[0].localURL;
            this.mimeType = this.imageCaptured[0].type;


            self.doUpload();
        }
    }

    this.onCaptureError = function (error) {
        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    }
    // fim captura imagem ################################################################################################

    // upload ###########################################################################################
    this.OnUploadSucess = function (r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);

        uploadResponse = r;

        //alert("Imagem enviada com sucesso!");


    }

    this.OnUploadFail = function (error) {
        alert("An error has occurred: Code = " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
    }


    this.getUploadResponse = function() {
        return uploadResponse;
    }




    this.doUpload = function () {


        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = this.fileURL.substr(this.fileURL.lastIndexOf('/')+1);
        options.mimeType = this.mimeType;

        //var headers={'headerParam':'headerValue'};

        //options.headers = headers;

        options.params = this.uploadParams;

        var ft = new FileTransfer();
        //ft.onprogress = function(progressEvent) {
        //    if (progressEvent.lengthComputable) {
        //        loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
        //    } else {
        //        loadingStatus.increment();
        //    }
        //};
        ft.upload(fileURL, encodeURI(this.uri), this.OnUploadSucess, this.OnUploadFail, options);
    }
    // fim upload ###########################################################################################

}
// ##########################################################################
