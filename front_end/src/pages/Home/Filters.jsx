import React, { useState } from "react";
import { useContext } from "react";
import { useDrugsContext } from "../../Components/DrugsContext"; 
import {
  Sliders,
  Star,
  Clock,
  Truck,
  DollarSign,
  Tag,
  Users,
  Home,
} from "lucide-react";

export default function Filters({ filteredDrugs, setFilteredDrugs }) {
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedDrugType,setSelectedDrugType]=useState(null);
  const [selectedRange,setSelectedRange]=useState(null);
  const [selectedMembership,setSelectedMembership]=useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(null);
  const { allDrugs, setAllDrugs } = useDrugsContext();
  const [activeFilter,setActiveFilter]=useState("all");



  const priceOptions = [
    { label: "Price: Low to High", value: "lowToHigh" },
    { label: "Price: High to Low", value: "highToLow" },
  ];

  const ageGroupOptions = [ "Child" , "Adult" , "Elder" ];

  const drugCategories = [
    "Analgesic",
    "Antibiotic",
    "Antiviral",
    "Antifungal",
    "Antipyretic",
    "Antihistamine",
    "Cardiovascular",
    "Diabetes",
    "Neurological",
    "Dermatological",
    "Gastrointestinal",
    "Respiratory",
    "Psychiatric",
    "Vitamins & Supplements",
  ];

  const dosageForms = ["Tablet", "Capsule", "Syrup"];


  const filters = [
    { id: "all", label: "All Medicines", icon: Sliders },
    { id: "popular", label: "Most Popular", icon: Star },
    { id: "recent", label: "Recently Viewed", icon: Clock },
    { id: "delivery", label: "Home Delivery", icon: Truck },
  ];

  const modifyFilters=() => {
    let filtered = filteredDrugs;

    if (selectedPrice) {
      if (selectedPrice === "lowToHigh") {
        filtered = [...filtered].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      } else if (selectedPrice === "highToLow") {
        filtered = [...filtered].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      }
    }

    if (selectedRange) {
      filtered = filtered.filter(drug => drug.distance <= selectedRange);
    }

    if (selectedDrugType) {
      if(selectedDrugType=="Generic"){
        filtered = filtered.filter(drug => drug.generic==true);
      }
      else{
        filtered = filtered.filter(drug => drug.generic==false);
      }
    }

    if (selectedAgeGroup) {
      filtered = filtered.filter(drug => {
        const ageRangeString = drug.age_range.split("+")[0]; // Extract the minimum age part as a string
        const ageRange = parseInt(ageRangeString, 10); // Convert to integer
    
        if (selectedAgeGroup === "Child") {
          return ageRange < 18; // Children under 18
        } else if (selectedAgeGroup === "Adult") {
          return ageRange >= 18 && ageRange <= 35; // Adults between 18 and 35
        } else if (selectedAgeGroup === "Elder"){
          return ageRange>=18; // Seniors above 35
        }
        else{
          return true;
        }
      });
    }
    
    if (selectedMembership) {
      if(selectedMembership=="Vital Care"){
        filtered = filtered.map(item => ({
          ...item,
          discounted: (item.price - item.price * 0.25).toFixed(2)
        }));
      }
      else if(selectedMembership=="Wellness Plus"){
        filtered = filtered.map(item => ({
          ...item,
          discounted: (item.price - item.price * 0.20).toFixed(2)
        }));
      }
      else{
        filtered = filtered.map(item => ({
          ...item,
          discounted: (item.price - item.price * 0.15).toFixed(2)
        }));
      }
    }


    // if (selectedAgeGroup.length > 0) {
    //   filtered = filtered.filter((drug) => selectedAgeGroup.includes(drug.age_range));
    // }

    // if (triggerSearch && searchQuery) {
    //   filtered = filtered.filter((drug) =>
    //     drug.medname.toLowerCase().includes(searchQuery.toLowerCase())
    //   );
    //}
    setFilteredDrugs(filtered);
  };


  const handleMultiSelect = (e, setterFunction, stateArray) => {
    const value = e.target.value;
    const newSelectedValues = stateArray.includes(value)
      ? stateArray.filter((item) => item !== value)
      : [...stateArray, value];
    setterFunction(newSelectedValues);
  };

  
  const clearFilters = () => {
    setFilteredDrugs(allDrugs);
    setSelectedPrice(null);
    setSelectedDrugType(null);
    setSelectedRange("");
    setSelectedMembership(null);
    setSelectedTags([]);
    setSelectedAgeGroup([]);
    onFilterChange({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6">Filters</h2>

            {/* Drug Types*/}
            <div className="mt-4">
        <h3 className="text-lg font-semibold">Drug Type</h3>
        <div className="flex gap-4 flex-col p-3">
        <label>
          <input
            type="radio"
            name="DrugType"
            value="Generic"
            checked={selectedDrugType == "Generic"}
            onChange={(e) => setSelectedDrugType(e.target.value)}
            className="mr-2"
          />
          Generic
        </label>
        <label>
          <input
            type="radio"
            name="DrugType"
            value="Branded"
            checked={selectedDrugType === "Branded"}
            onChange={(e) => setSelectedDrugType(e.target.value)}
            className="mr-2"
          />
          Branded 
        </label>
        </div>
      </div>

             {/* Price Filting*/}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Price</h3>
        <div className="flex gap-4 flex-col p-3">
        <label>
          <input
            type="radio"
            name="price"
            value="lowToHigh"
            checked={selectedPrice === "lowToHigh"}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className="mr-2"
          />
          Low to High
        </label>
        <label>
          <input
            type="radio"
            name="price"
            value="highToLow"
            checked={selectedPrice === "highToLow"}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className="mr-2"
          />
          High to Low
        </label>
        </div>
      </div>
          
          {/* Age Group */}
        <div className="mt-4">
        <h3 className="text-lg font-semibold">Age Group</h3>
        <div className="flex gap-4 flex-col p-3">
        <label>
          <input
            type="radio"
            name="Age"
            value="Child"
            checked={selectedAgeGroup === "Child"}
            onChange={(e) => setSelectedAgeGroup(e.target.value)}
            className="mr-2"
          />
          Child
        </label>
        <label>
          <input
            type="radio"
            name="Age"
            value="Adult"
            checked={selectedAgeGroup === "Adult"}
            onChange={(e) => setSelectedAgeGroup(e.target.value)}
            className="mr-2"
          />
          Adult
        </label>
        <label>
          <input
            type="radio"
            name="Age"
            value="Elder"
            checked={selectedAgeGroup === "Elder"}
            onChange={(e) => setSelectedAgeGroup(e.target.value)}
            className="mr-2"
          />
          Elder
        </label>
        </div>
      </div>


     {/*Range*/}
     <div className="space-y-2 mt-2 ">
     <h3 className="text-lg font-semibold">Store Distance Range</h3>
     <input
        id="range-input"
        type="text"
        value={selectedRange}
        onChange={(e)=>setSelectedRange(e.target.value)}
        placeholder="Enter Miles"
        className={`w-24 h-8 bg-gray-200 ring-1 ring-black text-center mt-2 rounded outline-none
          transition-all focus:ring-2 focus:ring-green-600 `}
          />
      </div>
  
           {/* Price Filting*/}
           <div className="mt-4">
        <h3 className="text-lg font-semibold">Membership Coverages</h3>
        <div className="flex gap-4 flex-col p-3">
        <label>
          <input
            type="radio"
            name="member"
            value="Vital Care"
            checked={selectedMembership == "Vital Care"}
            onChange={(e) => setSelectedMembership(e.target.value)}
            className="mr-2"
          />
          Vital Care
        </label>
        <label>
          <input
            type="radio"
            name="member"
            value="Wellness Plus"
            checked={selectedMembership === "Wellness Plus"}
            onChange={(e) => setSelectedMembership(e.target.value)}
            className="mr-2"
          />
          Wellness Plus
        </label>
        <label>
          <input
            type="radio"
            name="member"
            value="Health Starter"
            checked={selectedMembership === "Health Starter"}
            onChange={(e) => setSelectedMembership(e.target.value)}
            className="mr-2"
          />
          Health Starter
        </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={clearFilters}
          className="w-1/2 bg-[#FF4C4C] text-white p-3 rounded-md hover:bg-[#c13f3f] transition-colors"
        >
          Clear Filters
        </button>

        <button
          onClick={modifyFilters}
          className="w-1/2 bg-[#34A853] text-white p-3 rounded-md hover:bg-[#1a8d3d] transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}