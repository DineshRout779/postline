import imageCompression from 'browser-image-compression';

const FileUpload = ({ onDone, img }) => {
  async function handleChange(e) {
    // get the files
    let imgFile = e.target.files[0];

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedImg = await imageCompression(imgFile, options);
      let reader = new FileReader();
      // Convert the file to base64 text
      reader.readAsDataURL(compressedImg);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        let fileInfo = {
          name: compressedImg.name,
          type: compressedImg.type,
          size: Math.round(compressedImg.size / 1000) + ' kB',
          base64: reader.result,
          file: compressedImg,
        };
        onDone(fileInfo);
      };
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <input
      type='file'
      name='file'
      id='file'
      key={img}
      accept='image/png, image/jpeg'
      placeholder='Upload an image'
      onChange={handleChange}
      className='form-control'
    />
  );
};

export default FileUpload;
