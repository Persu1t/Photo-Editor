import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { signupSelector } from "../redux/signup";
import { imgUploadSelector } from "../redux/imageuploadSlice";
import { imgUploadAction } from "../redux/imageuploadSlice";
import Pallet from "../components/Pallet";
const Home = () => {
  // const { user } = useSelector(signupSelector);
  const { uploadedImage } = useSelector(imgUploadSelector);
  const [imageUpload, setImageUpload] = useState(null);

  const dispatch = useDispatch();

  const handleFileUpload = () => {
    if (imageUpload) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const imageDimensions = {
            width: img.width,
            height: img.height,
            src: img.src,
          };
          dispatch(
            imgUploadAction.uploadImage({ imageDimensions: imageDimensions })
          );
        };
      };
      reader.readAsDataURL(imageUpload);
    }
  };

  const removeImage = () => {
    dispatch(imgUploadAction.removeUploadedImage());
  };

  return (
    <div>
      <h1 className="text-2xl text-center">Photo Editor</h1>
      <div>
        {imageUpload !== null ? (
          <h1>{uploadedImage.src}</h1>
        ) : (
          <>
            {" "}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageUpload(e.target.files[0])}
            />
          </>
        )}
        <button onClick={handleFileUpload}>Upload</button>
      </div>
      <button onClick={removeImage}>Remove</button>
      <br />
      <hr />
      <br/>
      <div>
        <Pallet />
      </div>

      <div></div>
    </div>
  );
};

export default Home;
