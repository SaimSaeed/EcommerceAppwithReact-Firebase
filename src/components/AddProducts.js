import React, { useState } from 'react'
import { db, storage } from '../config/firebase_config';
import { addDoc, collection } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"


function AddProducts() {
    // Form States
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    // Error and Sucess States
    const [imageError, setImageError] = useState('');
    const [successMsg, setSuccessMsg] = useState(false);
    const [uploadError, setUploadError] = useState(false);
    // Products ref
    let productsRef = collection(db, "Products");
    // Adding Products to Firestore
    const handleAddProducts = async (e) => {
        e.preventDefault();
        // If there is not image then return
        if (!image) return;
        // Reference to firebase storage
        const fileUploadRef = ref(storage, `projectFiles/${image.name}`);
        // Upload image using async await
        try {
            setSuccessMsg(true)
            await uploadBytes(fileUploadRef, image)
            // getting link of image through getDownloadUrl Function with promises
            getDownloadURL(fileUploadRef)
                .then((url) => {
                    // Insert url into an <img> tag to "download"
                    addDoc(productsRef, {
                        Title: title,
                        Description: description,
                        Price: price,
                        url
                    })
                    setSuccessMsg(false)
                })
                .catch((error) => {
                    console.log(error)
                    setUploadError(true)
                    successMsg(false)
                })


        } catch (error) {
            console.error(error)
            setUploadError(true)
            successMsg(false)

        }





    }

    // Types are defined to get only images 
    const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"]
    const handleProductImg = (e) => {
        e.preventDefault()
        // Variable for selected file
        let selectedFile = e.target.files[0];
        // If else for file
        // condition for file is true or not
        if (selectedFile) {
            // Nested if is used
            // Condition if file is same as in the types array
            if (selectedFile && types.includes(selectedFile.type)) {
                // image is set to variable
                setImage(selectedFile)
                // error is set empty
                setImageError("")
            } else {
                // Image will be set empty
                setImage(null)
                // Error
                setImageError("Please select a valid image file type (png or jpg)")
            }
        } else {
            console.log("please select your file!")
        }

    }


    return (
        <div className='container'>
            <br></br>
            <br></br>
            <h1>Add Products</h1>
            <hr></hr>
            {/* Sucess Message */}
            {successMsg && <>
                <div className='success-msg'>Action Completed!</div>
                <br></br>
            </>}
            {/* Form */}
            <form autoComplete="off" className='form-group' onSubmit={handleAddProducts}>
                <label>Product Title</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setTitle(e.target.value)} value={title}></input>
                <br></br>
                <label>Product Description</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setDescription(e.target.value)} value={description}></input>
                <br></br>
                <label>Product Price</label>
                <input type="number" className='form-control' required
                    onChange={(e) => setPrice(e.target.value)} value={price}></input>
                <br></br>
                <label>Upload Product Image</label>
                <input type="file" id="file" className='form-control' required
                    onChange={handleProductImg}></input>
                {/* Image Error */}
                {imageError && <>
                    <br></br>
                    <div className='error-msg'>{imageError}</div>

                </>}
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" className='btn btn-success btn-md'>
                        SUBMIT
                    </button>
                </div>
            </form>
            {/* Upload Error */}
            {uploadError && <>
                <br></br>
                <div className='error-msg'>{uploadError}</div>

            </>}

        </div>
    )
}

export default AddProducts