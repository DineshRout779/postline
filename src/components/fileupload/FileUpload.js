const FileUpload = ({ onDone, img }) => {
  function handleChange(e) {
    // get the files
    let file = e.target.files[0];
    let reader = new FileReader();
    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      let fileInfo = {
        name: file.name,
        type: file.type,
        size: Math.round(file.size / 1000) + ' kB',
        base64: reader.result,
        file: file,
      };
      onDone(fileInfo);
    };
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
