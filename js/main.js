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
        preview: '.image_preview',
        viewMode: 1,
    };
    var $image = $('#image');
    $image.cropper(options);
    cropper = $image.data('cropper');
    var $inputImage = $('#input_image');
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
    $('#crop').click(function () {
        let resultCanvas = cropper.getCroppedCanvas({
            width: 320,
            height: 480,
            fillColor: '#fff',
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high',
        });

        $('#getCroppedCanvasModal').modal().find('.cropped-image').html(convertCanvasToImage(resultCanvas));

    });
});

