import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { useState } from 'react';

const Upload = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const [formData, setFormData] = useState({
    disease: '',
    startDate: '',
    doctor: '',
    hospital: '',
    address: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const validateForm = () => {
    const { disease, startDate, doctor, file } = formData;
    const letters = /^[A-Za-z\s]+$/;
    const today = new Date().toISOString().split("T")[0];

    if (!letters.test(disease)) {
      alert("Please enter a valid Disease Name with letters only.");
      return false;
    }
    if (!letters.test(doctor)) {
      alert("Please enter a valid Doctor Name with letters only.");
      return false;
    }
    if (startDate > today) {
      alert("The Start Date cannot be in the future.");
      return false;
    }
    if (!file) {
      alert("Please upload a prescription file.");
      return false;
    }
    const allowedExtensions = /(\.pdf|\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(file.name)) {
      alert("Please upload file in PDF, JPG, or PNG format.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
    }
  };

  const handleClose = () => {
    navigate('/Uhome'); // Redirect to UHome
  };

  return (
    <><div className='bg-green-50'>
      <Header />
      
      <div className="max-w-md mx-auto p-6 mt-10 rounded-md shadow-md mb-10 bg-blue-100">
        <h2 className="text-2xl font-bold mb-6 text-center">Prescription Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="disease" className="block text-gray-700 font-medium mb-2">Disease Name:</label>
            <input
              type="text"
              id="disease"
              name="disease"
              value={formData.disease}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="startDate" className="block text-gray-700 font-medium mb-2">Start Date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="doctor" className="block text-gray-700 font-medium mb-2">Doctor Name:</label>
            <input
              type="text"
              id="doctor"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="hospital" className="block text-gray-700 font-medium mb-2">Hospital Name:</label>
            <input
              type="text"
              id="hospital"
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Hospital Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="file" className="block text-gray-700 font-medium mb-2">Prescription File:</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="flex justify-between mt-6">
          <button
              type="button"
              className="bg-red-400 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
              onClick={handleClose} // Trigger the close function here
            >
              Close
            </button>

            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:bg-green-600">Save</button>
          </div>
        </form>
      </div>
      <Footer />
      </div>
    </>
  );
};

export default Upload;
