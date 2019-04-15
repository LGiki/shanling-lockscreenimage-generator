var cropper;

function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
}

function openFileSelector() {
    return $('#input_image').click();
}

function resetCopper() {
    if (confirm('确定要重置裁剪框吗？')) {
        cropper.reset();
    }
}

$(function () {
    'use strict';
    var URL = window.URL || window.webkitURL;
    var options = {
        aspectRatio: 2 / 3,
        preview: '.image_preview_m2x',
        viewMode: 1,
    };
    var getCroppedCanvasOptions = {
        width: 320,
        height: 480,
        fillColor: '#fff',
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high',
    };
    var $image = $('#image');
    var $inputImage = $('#input_image');
    $image.cropper(options);
    cropper = $image.data('cropper');
    $inputImage.change(function () {
        var files = this.files;
        var file;
        if (!$image.data('cropper')) {
            return;
        }
        if (files && files.length) {
            file = files[0];

            if (/^image\/\w+$/.test(file.type)) {
                let uploadedImageURL = URL.createObjectURL(file);
                $image.cropper('destroy').attr('src', uploadedImageURL).cropper(options);
                cropper = $image.data('cropper');
                $inputImage.val('');
            } else {
                window.alert('Please choose an image file.');
            }
        }
    });
    $('#crop_type').change(function () {
        let selectCropType = $(this).val();
        console.log(selectCropType);
        switch (selectCropType) {
            case "m0": //M0
                options.aspectRatio = 1;
                options.preview = '.image_preview_m0';
                $('.preview_m2x').toggle();
                $('.preview_m0').fadeToggle();
                getCroppedCanvasOptions.width = 240;
                getCroppedCanvasOptions.height = 240;
                break;
            case "m2x": //M2X & M5S
                options.aspectRatio = 2 / 3;
                options.preview = '.image_preview_m2x';
                $('.preview_m2x').fadeToggle();
                $('.preview_m0').toggle();
                getCroppedCanvasOptions.width = 320;
                getCroppedCanvasOptions.height = 480;
                break;
            default:
                break;
        }
        $image.cropper('destroy').cropper(options);
        cropper = $image.data('cropper');
    });
    $('#crop').click(function () {
        let resultCanvas = cropper.getCroppedCanvas(getCroppedCanvasOptions);
        $('#getCroppedCanvasModal').modal().find('.cropped-image').html(convertCanvasToImage(resultCanvas));
    });
});

