import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useState } from "react";

const Upload = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    diseaseName: "",
    doctorName: "",
    hospitalName: "",
    hospitalAddress: "",
    age: "",
  });
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const uploadData = new FormData();
    uploadData.append("file", file);

    const backend = import.meta.env.VITE_BACKEND;

    try {
      setLoading(true);
      const response = await fetch(`${backend}/api/upload`, {
        method: "POST",
        body: uploadData,
      });

      if (!response.ok) {
        console.error("Error uploading file:", response.statusText);
        alert("Error uploading file. Please try again.");
        return;
      }

      const data = await response.json();
      setFormData({
        date: data.date || "",
        diseaseName: data.diseaseName || "",
        doctorName: data.doctorName || "",
        hospitalName: data.hospitalName || "",
        hospitalAddress: data.hospitalAddress || "",
        age: data.age || "",
      });
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error processing file:", error);
      alert("An error occurred while processing the file.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    const prescription = {
      startDate: formData.date,
      diseaseName: formData.diseaseName,
      doctorName: formData.doctorName,
      hospitalName: formData.hospitalName,
      hospitalAddress: formData.hospitalAddress,
      endDate: null,
      userId: localStorage.getItem('userId')
    };

    const backend = import.meta.env.VITE_BACKEND;

    fetch(`${backend}/addPrescription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prescription),
    }).then(res => navigate('/prescription'));





  };

  return (
    <div className="bg-green-50 min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex justify-center items-center m-5">
        <div className="w-full max-w-lg bg-blue-100 p-6 rounded-md shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Prescription Form
          </h2>
          <form>
            <div className="mb-4">
              <label htmlFor="file" className="block text-gray-700 font-medium mb-2">
                Upload Prescription File:
              </label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={handleFileUpload}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            {loading ? (
              <p className="text-center text-blue-500">Processing file, please wait...</p>
            ) : (
              <>
                <div className="mb-4">
                  <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                    Date:
                  </label>
                  <input
                    type="text"
                    id="date"
                    name="date"
                    value={formData.date}
                    readOnly
                    className="w-full p-2 border rounded bg-gray-100 focus:outline-none"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="disease" className="block text-gray-700 font-medium mb-2">
                    Disease Name:
                  </label>
                  <input
                    type="text"
                    id="disease"
                    name="disease"
                    value={formData.diseaseName}
                    readOnly
                    className="w-full p-2 border rounded bg-gray-100 focus:outline-none"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="doctor" className="block text-gray-700 font-medium mb-2">
                    Doctor Name:
                  </label>
                  <input
                    type="text"
                    id="doctor"
                    name="doctor"
                    value={formData.doctorName}
                    readOnly
                    className="w-full p-2 border rounded bg-gray-100 focus:outline-none"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="hospital" className="block text-gray-700 font-medium mb-2">
                    Hospital Name:
                  </label>
                  <input
                    type="text"
                    id="hospital"
                    name="hospital"
                    value={formData.hospitalName}
                    readOnly
                    className="w-full p-2 border rounded bg-gray-100 focus:outline-none"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                    Hospital Address:
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.hospitalAddress}
                    readOnly
                    className="w-full p-2 border rounded bg-gray-100 focus:outline-none"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="age" className="block text-gray-700 font-medium mb-2">
                    Age:
                  </label>
                  <input
                    type="text"
                    id="age"
                    name="age"
                    value={formData.age}
                    readOnly
                    className="w-full p-2 border rounded bg-gray-100 focus:outline-none"
                  />
                </div>
              </>
            )}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none"
                onClick={() => navigate("/home")}
              >
                Close
              </button>
              <button
                type="button"
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Upload;