const ImageUploader = () => `
    <div class="imageUploadBackdrop" id="imageUploadBackdrop">
        <div class="image-upload image-upload-padding -col-l-4 -col-m-6 -col-sm-10 -offset-l-4 -offset-m-3 -offset-sm-0" id="image-uploader">
            <div class="text-align-right" onclick="closeUploader()"><i class="material-icons">close</i></div>
            <div class="image-display-area">
                <img id="output" />
                <div class="spinnerBg" id="spinnerBg">
                    <span class="lds-ring-m lds-ring-m-align-center" id="spinner-sm">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </span>
                </div>
            </div>
            <p><input type="file" accept="image/*" name="image" id="file" class="inputFile" onchange="loadImage()" /></p>
            <div class="button-group">
                <label for="file" class ="uploadBtn btn-pointer">
                 Load image</label>
                <button type="button" class=" btn uploadBtn" onclick="saveImage()" >Save</button>
            </div>
        </div>
    </div> `;

export default ImageUploader;
