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
//var appTccServer = "ec2-13-58-57-157.us-east-2.compute.amazonaws.com";





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

myApp.onPageInit('map', function (page) {
    // Do something here for "about" page
    //myApp.alert('Here comes About page');


    //zoomElement();



    var $grid = $("#search_grid");

    var optsAstar = {
        wallFrequency: .1,
        gridSizeX: 80, // numero colunas do grid
        gridSizeY: 120, // numero linhas do grid
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



    var pageWidth = $('.page').width();
    var pageHeight = $('.page').height();

    var navbarHeight = $('div.navbar').height();

    optsAstar.cellSize = pageWidth / (optsAstar.gridSizeX);

    //console.log("windowWidth");
    //console.log(windowWidth);

    //console.log("navbarHeight");
    //console.log(navbarHeight);

    //var gridWidth = optsAstar.gridSizeX * (optsAstar.cellSize + 2);

    //console.log("gridWidth");
    //console.log(gridWidth);




    var grid = new GraphSearch($grid, optsAstar, astar.search);


    $$('#search_grid').css('width', ''+(pageWidth)+'px');
    $$('#search_grid').css('height', ''+(pageHeight)+'px');
    //$$('#search_grid').css('top', ''+(navbarHeight)+'px');
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
        imageCapture.uri = "http://admin:teste123@"+appTccServer+":9999/api/search";
        imageCapture.OnUploadSucess = callBackOnUploadSucess;
        imageCapture.doCapture();

    });

    $$('#btnStartSearch').on('click', function () {

        if(!jQuery.isEmptyObject(origin) && !jQuery.isEmptyObject(destination)) {

            optsAstar.initSearch = true;
            grid.setOption(optsAstar);
            grid.initialize();


        } else if (jQuery.isEmptyObject(origin) && !jQuery.isEmptyObject(destination)) {

            myApp.alert('Selecione a origem', 'Aviso!');

        } else if (jQuery.isEmptyObject(destination) && !jQuery.isEmptyObject(origin)) {

            myApp.alert('Selecione o destino', 'Aviso!');

        } else {

            myApp.alert('Selecione a origem e o destino', 'Aviso!');

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
        //dropdownPlaceholderText: 'Informe o nome de uma loja, um local ou ponto de interesse',
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

    // botão seleção destino, verifica se o usuário realmente selecioneu algum destino
    $$('#btnSelectDestination').on('click', function (e) {

        if(jQuery.isEmptyObject(destination)) {
            myApp.alert("Selecione o destino", "Aviso!");
        } else {
            mainView.router.loadPage("map.html");
        }

    });


})







myApp.onPageInit('imagens', function (page) {
    // Do something here for "about" page
    myApp.alert('Here comes About page 1');

    var uri = encodeURI("http://"+appTccServer+":9999/api/images");

    // https://github.com/wymsee/cordova-HTTP
    //cordovaHTTP.useBasicAuth("admin", "admin");
    cordovaHTTP.setHeader("Authorization", make_base_auth('admin', 'teste123'));

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
            imageCapture.uri = "http://admin:teste123@"+appTccServer+":9999/api/images";
            imageCapture.uploadParams = {id: lastInsertId, keys: "place_id", values: ""+place_id+""}

            imageCapture.OnUploadSucess = function () {
                // recarrega a página após a inclusão da imagem
                mainView.router.refreshPage();
            }


            imageCapture.doCapture();




        }, function(response) {
            console.error(response.error);
        });

    });

    // $$('#btnDeleteImageAction').on('click', function (e) {
    //     // recarrega a lista de imagens mostrando a imagem inserida
    //     // https://framework7.io/docs/router-api.html
    //
    //     console.log("passou aqui , btnDeleteImageAction");
    //
    //
    // });




})
// Fim Funções Incialização Página ######################################################################################################

// Ações botões #####################################################
function deleteImage(id) {


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
            cordovaHTTP.setHeader("Authorization", make_base_auth('admin', 'teste123'));

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

                //var obj = parseJSON(response.data);

                // recarrega a página após a exclusão
                mainView.router.refreshPage();

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
// botão "excluir" na página place-images.html
function btnDeleteImageAction(id) {


    var buttons = [
        {
            text: 'Excluir a imagem?',
            label: true
        },
        {
            text: 'Sim',
            onClick: function () {
                //myApp.alert('Button1 clicked');
                deleteImage(id);
            }
        },
        {
            text: 'Não',
            onClick: function () {
                //myApp.alert('Button2 clicked');
            }
        },
    ];
    myApp.actions(buttons);

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
                        '<a id="btnDeleteImage" onclick="btnDeleteImageAction('+images[i].id+')" rel="'+images[i].id+'" href="#" class="button buttons-row button-fill color-red" resource="'+images[i].id+'">EXCLUIR</a>' +
                    '</div>' +
                    '<div class="item-subtitle">'+images[i].id+'</div>' +
                '</div>'+
            '</li>';
    }

    listHTML += '</ul>';

    $$('#apptcc-imagelist').append(listHTML);

}


/*
*   Lista de locais
* */
function htmlPlacesList(obj) {


    var places = obj.jsonResponse.places;

    // var listHTML = '<ul>';
    //
    // for(var i = 0;i < places.length; i++) {
    //
    //
    //     listHTML += '<li>' +
    //         '<a href="place-images.html?place_id='+places[i].id+'" class="item-link item-content">' +
    //         '<div class="item-inner">' +
    //         '<div class="item-title-row">' +
    //         '<div class="item-title">'+places[i].name+'</div>' +
    //         '</div>' +
    //         '<div class="item-subtitle">cord x: '+places[i].x+' cord y: '+places[i].y+'</div>' +
    //         '</div>'+
    //         '</a>'+
    //         '</li>';
    // }
    //
    // listHTML += '</ul>';

    var listHTML = '';

    for(var i = 0;i < places.length; i++) {

        listHTML += '' +
        '<div class="card">' +
        '<div class="card-header"><a href="place-images.html?place_id='+places[i].id+'" class="item-link item-content color-blue">'+places[i].name+'</a></div>' +
        '<div class="card-content">' +
            '<div class="card-content-inner">Info lugar</div>' +
        '</div>' +
        '<div class="card-footer"></div>' +
        '</div>';


    }



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