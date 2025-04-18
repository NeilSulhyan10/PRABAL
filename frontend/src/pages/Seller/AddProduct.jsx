import React, { useState } from 'react';
import axios from 'axios';
import { Leaf, ShieldCheck, PackageCheck } from 'lucide-react';

const yesNoFields = [
  { label: 'Is Your Product Recyclable?', name: 'is_recyclable', icon: <Leaf size={16} /> },
  { label: 'Is Your Product Biodegradable?', name: 'is_biodegradable', icon: <Leaf size={16} /> },
  { label: 'Is Your Product Reusable?', name: 'is_reusable', icon: <PackageCheck size={16} /> },
  { label: 'Does Your Product Use Organic Materials?', name: 'uses_organic_materials', icon: <Leaf size={16} /> },
  { label: 'Does Your Product Have Plastic Packaging?', name: 'is_plastic_packaging', icon: <PackageCheck size={16} /> },
  { label: 'Do you Have Certification for Your Product?', name: 'is_certified', icon: <ShieldCheck size={16} /> },
];

const AddProduct = () => {
  const initialProductData = {
    name: '',
    short_description: '',
    description: '',
    durability: '',
    quantity: '',
    price: '',
    is_recyclable: '',
    is_biodegradable: '',
    is_reusable: '',
    uses_organic_materials: '',
    is_plastic_packaging: '',
    is_certified: '',
    certification_image: null,
    images: [],
  };

  const [productData, setProductData] = useState(initialProductData);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      if (name === 'images') {
        setProductData({ ...productData, [name]: Array.from(files) });
      } else if (name === 'certification_image') {
        setProductData({ ...productData, certification_image: files[0] });
      }
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleYesNoClick = (name, value) => {
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true while waiting for the response
  
    // Create a FormData object to handle file uploads
    const formData = new FormData();
    for (const key in productData) {
      if (productData[key] instanceof FileList) {
        // Handle files separately
        for (let i = 0; i < productData[key].length; i++) {
          formData.append(key, productData[key][i]);
        }
      } else {
        formData.append(key, productData[key]);
      }
    }
  
    try {
      const token = localStorage.getItem('token');
      console.log(token)
      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
    
      if (response.status === 200) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setLoading(false);
    }
     
  };  

  const handleAddAnotherProduct = () => {
    setProductData(initialProductData);
    setSubmitted(false);
  };

  const renderCarousel = () => (
    <div className="flex space-x-4 overflow-x-auto py-2">
      {productData.images.map((image, index) => (
        <img
          key={index}
          src={URL.createObjectURL(image)}
          alt={`Product ${index}`}
          className="w-32 h-32 object-cover rounded-lg"
        />
      ))}
    </div>
  );

  const yesNoButtonStyle = (selected, type) => {
    const base = 'px-4 py-2 rounded-full text-sm transition-all duration-200 font-medium shadow-sm border';
    const hover = type === 'yes' ? 'hover:border-green-500' : 'hover:border-red-700';

    return selected
      ? `${base} ${type === 'yes' ? 'bg-green-600 text-white border-green-600' : 'bg-red-700 text-white border-red-700'}`
      : `${base} bg-white text-[#1F2421] border-gray-300 ${hover}`;
  };

  const sectionTitle = (text) => (
    <h3 className="text-xl font-semibold text-[#1F2421] border-b pb-1 mb-2">{text}</h3>
  );

  if (submitted) {
    return (
      <div className="p-6 md:p-10 bg-[#F3F6F4] min-h-screen">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-8">
          <h2 className="text-3xl font-bold text-[#1F2421]">🎉 Product Added Successfully!</h2>
          <div className="space-y-6">
            <p className="text-lg font-medium">Your product has been successfully added. Here are the details:</p>
            <div className="space-y-4">
              <div><strong>Product Name:</strong> {productData.name}</div>
              <div><strong>Short Description of Product:</strong> {productData.short_description}</div>
              <div><strong>Durability:</strong> {productData.durability}</div>
              <div><strong>Price:</strong> ₹{productData.price}</div>
              <div><strong>Quantity:</strong> {productData.quantity}</div>
              <div><strong>Description:</strong> {productData.description}</div>
              <div><strong>Recyclable:</strong> {productData.is_recyclable === 'true' ? 'Yes' : 'No'}</div>
              <div><strong>Biodegradable:</strong> {productData.is_biodegradable === 'true' ? 'Yes' : 'No'}</div>
              <div><strong>Reusable:</strong> {productData.is_reusable === 'true' ? 'Yes' : 'No'}</div>
              <div><strong>Uses Organic Materials:</strong> {productData.uses_organic_materials === 'true' ? 'Yes' : 'No'}</div>
              <div><strong>Plastic Packaging:</strong> {productData.is_plastic_packaging === 'true' ? 'Yes' : 'No'}</div>
              <div><strong>Certified:</strong> {productData.is_certified === 'true' ? 'Yes' : 'No'}</div>
              {productData.is_certified === 'true' && (
                <div><strong>Certification Image:</strong> {productData.certification_image ? 'Uploaded' : 'Not Uploaded'}</div>
              )}
              {productData.images.length > 0 && (
                <div>
                  <strong>Uploaded Images:</strong>
                  {renderCarousel()}
                </div>
              )}
            </div>
            <div className="text-center pt-4">
              <button
                onClick={handleAddAnotherProduct}
                className="bg-[#216869] text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-[#4CAF50] transition-all duration-300"
              >
                Add Another Product
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-[#F3F6F4] min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-8">
        <h2 className="text-3xl font-bold text-[#1F2421]">🌱 Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-8" encType="multipart/form-data">
          <div>
            {sectionTitle('📦 Basic Info')}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#1F2421] mb-1">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl bg-gray-50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1F2421] mb-1">Short Description of Product</label>
                <input
                  type="text"
                  name="short_description"
                  value={productData.short_description}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl bg-gray-50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1F2421] mb-1">Durability</label>
                <input
                  type="text"
                  name="durability"
                  value={productData.durability}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl bg-gray-50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1F2421] mb-1">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl bg-gray-50"
                  required
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1F2421] mb-1">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={productData.quantity}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl bg-gray-50"
                  required
                  min="1"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#1F2421] mb-1">Upload Product Photos</label>
                <div className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 p-6 text-center cursor-pointer">
                  <input
                    type="file"
                    name="images"
                    multiple
                    onChange={handleChange}
                    accept="image/*"
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#216869] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    <span className="text-sm text-gray-600">Click or drag images to upload (Max: 10 files)</span>
                    <span className="text-xs text-gray-400 mt-1">Accepted formats: JPG, PNG, WEBP</span>
                  </label>
                </div>
                {productData.images.length > 0 && <div className="mt-4">{renderCarousel()}</div>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#1F2421] mb-1">🌲Description</label>
                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl bg-gray-50"
                  required
                  placeholder="List every material used in this product. Example: Bamboo, Organic Cotton, Natural Latex, Plastic Wrapping..."
                />
              </div>
            </div>
          </div>

          <div>
            {sectionTitle('🍃 Eco Attributes')}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {yesNoFields.map(({ label, name, icon }) => (
                <div key={name}>
                  <div className="flex items-center gap-2 text-[#1F2421] mb-1 font-medium">
                    {icon}
                    {label}
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      className={yesNoButtonStyle(productData[name] === 'true', 'yes')}
                      onClick={() => handleYesNoClick(name, 'true')}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className={yesNoButtonStyle(productData[name] === 'false', 'no')}
                      onClick={() => handleYesNoClick(name, 'false')}
                    >
                      No
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {productData.is_certified === 'true' && (
            <div>
              {sectionTitle('📜 Certification')}
              <label className="block text-sm font-medium text-[#1F2421] mb-1">Upload Certification</label>
              <div className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 p-6 text-center cursor-pointer">
                <input
                  type="file"
                  name="certification_image"
                  onChange={handleChange}
                  accept="image/*"
                  className="hidden"
                  id="certification-upload"
                />
                <label htmlFor="certification-upload" className="cursor-pointer flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#216869] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  <span className="text-sm text-gray-600">Click or drag certification image to upload</span>
                  <span className="text-xs text-gray-400 mt-1">Accepted formats: JPG, PNG, WEBP</span>
                </label>
              </div>
              {productData.certification_image && (
                <div className="mt-4">
                  <img src={URL.createObjectURL(productData.certification_image)} alt="Certification preview" className="w-24 h-24 object-cover rounded-lg" />
                </div>
              )}
            </div>
          )}

          <div className="text-center mt-8">
            <button
              type="submit"
              className="bg-[#216869] text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-[#4CAF50] transition-all duration-300"
            >
              🌿 Add Product 🌿
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;