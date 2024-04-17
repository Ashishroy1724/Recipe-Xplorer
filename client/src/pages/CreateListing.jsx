import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { useState } from "react";
import { app } from "../firebase";
import {useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';

export default function CreateListing() {
  const {currentUser} = useSelector(state => state.user);
  const navigate = useNavigate()
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    ingredients: '',
    description: '',
    // type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountPrice: 0,
    dinner: false,
    breakfast: false,
    snack: false,
    lunch: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);
  // eslint-disable-next-line no-unused-vars
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
          
        })
        // eslint-disable-next-line no-unused-vars
        .catch((err) => {
          setImageUploadError("Image Upload Failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // eslint-disable-next-line no-unused-vars
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is $(progress)% done");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      imageUrls: prevFormData.imageUrls.filter((_, i) => i !== index),
    }));
  };

// --------Listing  Form--------------

  const handleChange = (e) => {
    // if(e.target.id === 'sale' || e.target.id === 'rent'){
    //   setFormData({
    //     ...formData,
    //     type: e.target.id
    //   })
    // }

    if(e.target.id === 'breakfast' || e.target.id === 'lunch' || e.target.id === 'snack'|| e.target.id === 'dinner'){
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked
      })
    }

    if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea'){
      setFormData({
        ...formData,
        [e.target.id] : e.target.value
      })
    }
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      if(formData.imageUrls.length < 1) return setError('You must upload atleast 1 image')
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false){
        setError(data.message);
      }
      navigate(`/listing/${data._id}`)
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Add Your Recipe
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="Ingredients"
            className="border p-3 rounded-lg"
            id="ingredients"
            required
            onChange={handleChange}
            value={formData.ingredients}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <div className="flex gap-6 flex-wrap">
           
            <div className="flex gap-2">
              <input 
              type="checkbox" 
              id="breakfast" 
              className="w-5" 
              onChange={handleChange}
              checked={formData.breakfast}
              />
              <span>Breakfast</span>
            </div>
            <div className="flex gap-2">
              <input 
              type="checkbox" 
              id="lunch" 
              className="w-5" 
              onChange={handleChange}
              checked={formData.lunch}
            />
              <span>Lunch</span>
            </div>

    {/* ------------------ Snack ---------------- */}
            <div className="flex gap-2">
              <input 
              type="checkbox" 
              id="snack" 
              className="w-5" 
              onChange={handleChange}
              checked={formData.snack}
            />
              <span>Snack</span>
            </div>


            <div className="flex gap-2">
              <input 
              type="checkbox" 
              id="dinner" 
              className="w-5" 
              onChange={handleChange}
              checked={formData.dinner}
            />
              <span>Dinner</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max-6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded-lg w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded-lg uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="Recipe Image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:text-red-900"
                >
                  Delete
                </button>
              </div>
            ))}
          <button disabled={loading || uploading} className="p-3 bg-green-700 text-white rounded-lg uppercase hover: opacity-95 disabled:opacity-60">
            {loading ? 'Adding Recipe...': 'Add Recipe'}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}
