// objeto usando o plugin cordova-camera

function ImageCapture() {

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



/*
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

}*/
