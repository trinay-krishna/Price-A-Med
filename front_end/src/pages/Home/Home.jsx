import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import Navbar from '../../Components/Header';
import Footer from '../../Components/Footer';
import Filters from './Filters';
import DrugCard from './DrugCard';
import { useDrugsContext } from "../../Components/DrugsContext"; 

function Home() {
  const { allDrugs, setAllDrugs } = useDrugsContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredDrugs, setFilteredDrugs] = useState(allDrugs);

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

  useEffect(() => {
    let filtered = allDrugs;

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

    if (selectedTags.length > 0) {
      filtered = filtered.filter((drug) =>
        selectedTags.some((tag) => drug.tags.includes(tag))
      );
    }

    if (selectedAgeGroup.length > 0) {
      filtered = filtered.filter((drug) => selectedAgeGroup.includes(drug.age_range));
    }

    if (triggerSearch && searchQuery) {
      filtered = filtered.filter((drug) =>
        drug.medname.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredDrugs(filtered);
  }, [activeFilter, searchQuery, triggerSearch, selectedPrice, selectedTags, selectedAgeGroup]);


  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setTriggerSearch(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#E8F5E9]">
      <Navbar />
      <main className="max-w-[1920px] mx-auto px-4 py-6">
        <div className="mb-8">
          <div className="max-w-2xl mx-auto relative">
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
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
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
          <div>
            <section>
              {filteredDrugs.length >0 ?( <>
              <h2 className="text-xl font-semibold mb-4">Available Medicines</h2>
              <div className="space-y-4">
                {filteredDrugs.map((drug) => (
                  <DrugCard key={drug.medid} drug={drug} />
                ))}
              </div>
              </>)
              : (<h2 className="text-xl font-semibold mb-4">No Medicines Available</h2>)
              }
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;