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
var appTccServer = "10.1.0.3";



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


// Funções Incialização Página ######################################################################################################

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('sobre', function (page) {
    // Do something here for "about" page
    //myApp.alert('Here comes About page');







    $$('#captura-imagem').on('click', function () {

        capturePhoto();

    });



})




var origin = {};
var destination = {};

myApp.onPageInit('mapa', function (page) {
    // Do something here for "about" page
    //myApp.alert('Here comes About page');


    //zoomElement();

    var gridMatrix = [
        1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,1,1,1,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,
        1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,1,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,0,0,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,1,1,1,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,
        1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,
        1,1,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,0,0,0,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
        1,0,1,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,
    ];


    var $grid = $("#search_grid");

    var optsAstar = {
        wallFrequency: .1,
        gridSizeX: 40, // numero colunas do grid
        gridSizeY: 40, // numero linhas do grid
        debug: false, // mostrar debug astar
        diagonal: true, // permiri pesquisa diagonal astar
        closest: false,
        startX: null, // posição X origem. null = não mostra
        startY: null, // posição Y origem. null = não mostra
        endX: null, // posição X destino. null = não mostra
        endY: null, // // posição y destino. null = não mostra
        gridMatrix: gridMatrix,
        cellSize: 10, // tamanho do lado, da célula do grid
        initSearch: false, // habilita pesquisa
        idBtnSearch: "btnStartSearch" // id do elemento inicia pesquisa, onclick

    };

    if(!jQuery.isEmptyObject(origin)) {
        optsAstar.startX = origin.x;
        optsAstar.startY = origin.y;
    }

    if(!jQuery.isEmptyObject(destination)) {
        optsAstar.endX = destination.x;
        optsAstar.endY = destination.y;
    }

    // FALTA FAZER: configurar posição serach grid dinamicamente
    $(document).ready(function() {

    });

    // executes when HTML-Document is loaded and DOM is ready
    var windowWidth = $(window).width();
    var navbarHeight = $('div.navbar').height();

    optsAstar.cellSize = windowWidth / (optsAstar.gridSizeX + 16);

    //console.log("windowWidth");
    //console.log(windowWidth);

    console.log("navbarHeight");
    console.log(navbarHeight);

    //var gridWidth = optsAstar.gridSizeX * (optsAstar.cellSize + 2);

    //console.log("gridWidth");
    //console.log(gridWidth);




    var grid = new GraphSearch($grid, optsAstar, astar.search);


    $$('#search_grid').css('width', ''+(windowWidth)+'px');
    //$$('#search_grid').css('top', ''+(navbarHeight+5)+'px');




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


                // reinicia o grid, mostrando a origem no mapa
                optsAstar.startX = origin.x;
                optsAstar.startY = origin.y;

                grid.setOption(optsAstar);
                grid.initialize();


                //console.log("origin");
                //console.log(origin);

            }, function(response) {
                console.error(response.error);
            });

        }
    }

    $$('#btnSelectOrigin').on('click', function () {

        optsAstar.startX = null;
        optsAstar.startY = null;

        grid.setOption(optsAstar);
        grid.initialize();


        var imageCapture = new ImageCapture();
        imageCapture.uri = "http://admin:admin@"+appTccServer+":9999/api/search";
        imageCapture.OnUploadSucess = callBackOnUploadSucess;
        imageCapture.doCapture();

    });

    $$('#btnStartSearch').on('click', function () {

        if(!jQuery.isEmptyObject(origin) && !jQuery.isEmptyObject(destination)) {

            optsAstar.initSearch = true;
            grid.setOption(optsAstar);
            grid.initialize();


        }

    });


    // verifique se ja foi selecionado o destino
    //console.log("page.query");
    //console.log(page.query);
    // se o objeto query não vier vazio
    //if(!jQuery.isEmptyObject(page.query)) {
    //    var place_id = page.query.place_id;
    //    console.log("place_id = "+place_id);
    //}



})

myApp.onPageInit('destination', function (page) {


    var selected_id = null;


    var autocompleteDropdownAjax = myApp.autocomplete({
        input: '#autocomplete-dropdown-ajax',
        openIn: 'dropdown',
        preloader: true, //enable preloader
        valueProperty: 'id', //object's "value" property name
        textProperty: 'name', //object's "text" property name
        limit: 20, //limit to 20 results
        dropdownPlaceholderText: 'Informe o nome de uma loja, um local ou ponto de interesse',
        expandInput: true, // expand input
        source: function (autocomplete, query, render) {
            var results = [];
            if (query.length === 0) {
                render(results);
                return;
            }
            // Show Preloader
            autocomplete.showPreloader();
            // Do Ajax request to Autocomplete data
            $$.ajax({
                url: 'https://'+appTccServer+'/AppTcc-backend/places/getjsonlist/',
                //url: 'autocomplete-languages.json',
                method: 'POST',
                dataType: 'json',
                //send "query" to server. Useful in case you generate response dynamically
                data: {
                    query: query
                },
                success: function (data) {

                    console.log("dados dropdow");
                    console.log(data);

                    // Find matched items
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].name.toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(data[i]);
                    }
                    // Hide Preoloader
                    autocomplete.hidePreloader();
                    // Render items by passing array with result items
                    render(results);
                }
            });
        },

        onChange: function (autocomplete, value) {

            // Add item value to input value
            $$('#autocomplete-dropdown-ajax').val(value.name);

            destination = value;


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


            //var imageCapture = new ImageCapture();
            var imageCapture = new photoCapture();
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




// objeto usando o plugin cordova-camera

function photoCapture() {

    this.uri = "";
    this.fileURL = "";
    this.uploadParams = {};

    this.pictureSource = ""; // picture source
    this.destinationType = ""; // sets the format of returned value

    var self = this;

    this.doCapture = function () {
        document.addEventListener("deviceready", this.onDeviceReady, false);

        self.capturePhoto();
    }



// Wait for device API libraries to load
//

// device APIs are available
//

    this.onDeviceReady = function() {
        this.destinationType = navigator.camera.DestinationType;
    }
// Called when a photo is successfully retrieved
//

    this.onPhotoDataSuccess = function(imageURI) {
        this.fileURL = imageURI;

        self.doUpload();
    }

// A button will call this function
//

    this.capturePhoto = function() {
        // Take picture using device camera and retrieve image as base64-encoded string
        navigator.camera.getPicture(this.onPhotoDataSuccess, this.onFail, {
            quality: 30,
            targetWidth: 1024,
            targetHeight: 768,
            destinationType: this.destinationType.FILE_URI,
            saveToPhotoAlbum: true
        });
    }

//

    function onFail(message) {
        alert('Failed because: ' + message);
    }


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
        //options.mimeType = this.mimeType;

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

function zoomElement() {
    var element = document.querySelector('#element'),
        book = document.querySelector('#search_grid'),
        zoomLeveler = document.querySelector('#zoomLeveler'),
        zoomLevel = 100;
    var write = function(log) {
        element.innerHTML = log;
    };
    var updateZoomLevel = function(number) {
        var newzoomLevel = zoomLevel + number;
        if (newzoomLevel < 10 || newzoomLevel > 200) {
            return;
        }
        zoomLeveler.innerHTML = zoomLevel = newzoomLevel;
        book.style.transform = 'translate(-50%, -50%) scale(' + zoomLevel / 100 + ')';
        book.style.webkitTransform = 'translate(-50%, -50%) scale(' + zoomLevel / 100 + ')';
    };
    var book = document.querySelector('#search_grid');
    var bookRegion = new ZingTouch.Region(book);
    bookRegion.bind(book, 'pinch', function() {
        write('zoom out');
        updateZoomLevel(-2);
    });
    bookRegion.bind(book, 'expand', function() {
        write('zoom in');
        updateZoomLevel(2);
    });
    var timer = null;
    var tap = function() {
        // double
        if (timer) {
            write('zoom in');
            updateZoomLevel(20);
            window.clearTimeout(timer);
            timer = null;
        }
        // single
        else {
            timer = window.setTimeout(function() {
                window.clearTimeout(timer);
                timer = null;
            }, 300);
        }
    }
    bookRegion.bind(book, 'tap', tap);
    write('ready');
    updateZoomLevel(0);
}