import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { FiMapPin } from "react-icons/fi";
import Navbar from '../../Components/Header';
import Footer from '../../Components/Footer';
import Filters from './Filters';
import DrugCard from './DrugCard';
import { useDrugsContext } from "../../Components/DrugsContext"; 
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { AiOutlineClose } from "react-icons/ai";
import ConditionsCard from '../Health/components/ConditionsCard';
import MedicationsCard from '../Health/components/MedicationsCard';
import NotesCard from '../Health/components/NotesCard';


function Home() {
  const { allDrugs, setAllDrugs } = useDrugsContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredDrugs, setFilteredDrugs] = useState([]);

  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState([]);
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [selectedDrugCategory, setSelectedDrugCategory] = useState([]); // For drug category filter
  const [prescriptionRequired, setPrescriptionRequired] = useState(null); // For prescription requirement filter
  const [selectedDosageForm, setSelectedDosageForm] = useState([]); // For dosage form filter
  const [selectedStrength, setSelectedStrength] = useState(""); // For strength filter
  const [selectedAvailability, setSelectedAvailability] = useState(null); // For availability filter
  const [selectedRating, setSelectedRating] = useState(null); // For rating filter
  const [showMap, setShowMap] = useState(false);

  const backend = import.meta.env.VITE_BACKEND;
  console.log("BACKEND", backend);


  useEffect(() => {
    fetch(`${backend}/getCart?userIDString=${localStorage.getItem('userId')}`)
    .then(res => res.text())
    .then(res => JSON.parse(res))
    .then(cartItems => {
      fetch(`${backend}/getMedList`)
      .then(res => res.text())
      .then(res => {
        const meds = JSON.parse(res);
        console.log(meds);
        const formattedMeds = [];
        meds.forEach(med => (
          formattedMeds.push({
            medid: med.id,
            medname: med.medication.name,
            brandname: "Pfizer",
            drug_category: "Cardiovascular",
            store_name: med.pharmacy.name,
            distance: 3.0,
            availability: true,
            home_delivery: med.pharmacy.homeDelivery,
            price: med.unitPrice,
            tier: 1,
            generic: med.medication.alternativeMedication != null,
            dosage_form: med.medication.dosageForm,
            strength: med.medication.strength,
            days_supply: med.pharmacy.supplyDays,
            age_range: "18+ years",
            tags: "cholesterol reduction",
            alt_meds: "Atorvastatin, Simvastatin",
            rating: med.pharmacy.rating,
            addToCart: cartItems.some(cartItem => cartItem.pharID == med.pharmacy.id && cartItem.medID == med.medication.id),
            image: med.medication.image,
            description: med.medication.description,
            med: med,
        }))
      );
      let filtered = formattedMeds;
      console.log(filtered)
  
      if (activeFilter === 'popular') {
        filtered = allDrugs.sort((a, b) => b.rating - a.rating);
      } else if (activeFilter === 'recent') {
        filtered = [...allDrugs].reverse(); // Assuming data is sorted by date
      } else if (activeFilter === 'delivery') {
        filtered = allDrugs.filter((drug) => drug.home_delivery);
      }
  
      if (selectedPrice) {
        if (selectedPrice === 'lowToHigh') {
          filtered = filtered.sort((a, b) => a.price - b.price);
        } else if (selectedPrice === 'highToLow') {
          filtered = filtered.sort((a, b) => b.price - a.price);
        }
      }
  
      // if (selectedTags.length > 0) {
      //   filtered = filtered.filter((drug) =>
      //     selectedTags.some((tag) => drug.tags.includes(tag))
      //   );
      // }
  
      if (selectedAgeGroup.length > 0) {
        filtered = filtered.filter((drug) => selectedAgeGroup.includes(drug.age_range));
      }
  
      if (triggerSearch && searchQuery) {
        filtered = filtered.filter((drug) =>
          drug.medname.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
  
      setFilteredDrugs(filtered);
    })
    })

  }, [activeFilter, searchQuery, triggerSearch, selectedPrice, selectedAgeGroup]);


  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setTriggerSearch(true);
    }
  };

   // Google Maps center and marker position
   const mapCenter = { lat: 37.7749, lng: -122.4194 }; // Example: San Francisco
   const markerPosition = { lat: 37.7749, lng: -122.4194 }; // Example: San Francisco 

  return (
    <div className="min-h-screen bg-[#E8F5E9]">
      <Navbar />
      <main className="max-w-[1920px] mx-auto px-4 py-6">

            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr_300px] gap-6">
            {/* Left Section */}
            <aside>
              <Filters
                // onFilterChange={{
                //   setActiveFilter,
                //   setSelectedPrice,
                //   setSelectedTags,
                //   setSelectedAgeGroup,
                // }}
                // activeFilter={activeFilter}
                // selectedPrice={selectedPrice}
                // selectedTags={selectedTags}
                // selectedAgeGroup={selectedAgeGroup}
                filteredDrugs={filteredDrugs}
                setFilteredDrugs={setFilteredDrugs}
              />
            </aside>

            {/* Middle Section */}
            <div>
              <section>
                      <div className="flex items-center space-x-4 mb-8 justify-center">
                      {/* Search Input Wrapper */}
                      <div className="relative flex-1 max-w-2xl">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search for medicines..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#34A853] text-lg"
                        />
                      </div>

                      {/* Locate Button */}
                      <button className="flex text-lg items-center gap-2 bg-blue-500 text-white px-5 py-3 rounded-md hover:bg-blue-600 transition duration-300" onClick={(e)=>setShowMap(true)}>
                        <FiMapPin className="text-lg" />
                        Locate
                      </button>
                    </div>
                {/* Medicines or Map */}
                {showMap ? (
                  <div className="relative mt-2 bg-gray-200 rounded-lg h-[calc(100vh-8rem)]">
                    {/* Cross Button */}
                    <button
                      className="absolute z-10 top-3 right-16 bg-white text-gray-600 p-2 shadow-md hover:bg-gray-100 hover:text-gray-800 transition duration-300"
                      onClick={() => setShowMap(false)}
                    >
                      <AiOutlineClose className="text-2xl" />
                    </button>

                    {/* Google Maps */}
                    <LoadScript googleMapsApiKey="AIzaSyDIuwcYsYV6tsL-6wlU7T_DnQrMlZEuZPU">
                      <GoogleMap
                        mapContainerStyle={{
                          width: "100%",
                          height: "100%",
                        }}
                        center={mapCenter}
                        zoom={12}
                      >
                        <Marker position={markerPosition} />
                      </GoogleMap>
                    </LoadScript>
                  </div>
                ) : (
                  <>
                    {filteredDrugs.length > 0 ? (
                      <>
                        <div className="flex items-center justify-between mb-2">
                          <h2 className="text-xl font-semibold">Available Medicines</h2>
                          <div className="flex space-x-4">
                            {/* Generic Label */}
                            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-green-200">
                              <span className="text-sm font-semibold text-black">Generic</span>
                            </div>
                            {/* Branded Label */}
                            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-yellow-200">
                              <span className="text-sm font-semibold text-black">Branded</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {filteredDrugs.map((drug) => (
                            <DrugCard key={drug.medid} drug={drug} />
                          ))}
                        </div>
                      </>
                    ) : (
                      <h2 className="text-xl font-semibold mb-4">No Medicines Available</h2>
                    )}
                  </>
                )}
              </section>
            </div>

            {/* Right Section */}
            <aside >
              <div className='flex flex-col gap-3'>
                <ConditionsCard/>
                <MedicationsCard/>
                <NotesCard/>
              </div>              
            </aside>
          </div>



      </main>
      <Footer />
    </div>
  );
}

export default Home;