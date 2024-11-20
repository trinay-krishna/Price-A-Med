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
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState([]);
  const [selectedDrugCategory, setSelectedDrugCategory] = useState([]);
  const [prescriptionRequired, setPrescriptionRequired] = useState(null);
  const [selectedDosageForm, setSelectedDosageForm] = useState([]);
  const [selectedStrength, setSelectedStrength] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
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

    if (selectedDrugCategory.length > 0) {
      filtered = filtered.filter((drug) =>
        selectedDrugCategory.includes(drug.drug_category)
      );
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
    setSelectedTags([]);
    setSelectedAgeGroup([]);
    setSelectedDiscount([]);
    setSelectedDrugCategory([]);
    setPrescriptionRequired(null);
    setSelectedDosageForm([]);
    setSelectedStrength("");
    setSelectedAvailability(null);
    setSelectedRating(null);
    onFilterChange({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Filters</h2>

      {/* Existing Filters */}
      <div className="space-y-4">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange({ filterId: filter.id })}
            className={`w-full flex items-center gap-3 p-3 rounded-md transition-colors ${
              activeFilter === filter.id
                ? "bg-[#E8F5E9] text-[#34A853]"
                : "hover:bg-gray-50"
            }`}
          >
            <filter.icon className="w-5 h-5" />
            <span>{filter.label}</span>
          </button>
        ))}
      </div>

      {/* Additional Filters */}
      <div className="space-y-4 mt-6">
        <h3 className="text-lg font-semibold">Drug Categories</h3>
        {drugCategories.map((category) => (
          <label key={category} className="block">
            <input
              type="checkbox"
              value={category}
              checked={selectedDrugCategory.includes(category)}
              onChange={(e) =>
                handleMultiSelect(e, setSelectedDrugCategory, selectedDrugCategory)
              }
              className="mr-2"
            />
            {category}
          </label>
        ))}
      </div>

      {/* Prescription Required */}
      <div className="mt-4 space-x-4">
        <h3 className="text-lg font-semibold pb-1">Prescription Required</h3>
        <label>
          <input
            type="radio"
            name="pxreq"
            value="true"
            checked={prescriptionRequired === "true"}
            onChange={(e) => setPrescriptionRequired(e.target.value)}
            className="mr-2"
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="pxreq"
            value="false"
            checked={prescriptionRequired === "false"}
            onChange={(e) => setPrescriptionRequired(e.target.value)}
            className="mr-2"
          />
          No
        </label>
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
            checked={selectedPrice == "lowToHigh"}
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
      <div className="space-y-2 mt-2 ">
        <h3 className="text-lg font-semibold">Age Group</h3>
        <div className="pl-2 space-y-3 pb-2">
        {ageGroupOptions.map((form) => (
          <label key={form} className="block">
            <input
              type="checkbox"
              value={form}
              checked={selectedAgeGroup.includes(form)}
              onChange={(e) =>
                handleMultiSelect(e, setSelectedAgeGroup, selectedAgeGroup)
              }
              className="mr-2"
            />
            {form}
          </label>
        ))}
        </div>
      </div>

      {/* Dosage Form */}
      <div className="space-y-4 mt-2">
        <h3 className="text-lg font-semibold">Dosage Form</h3>
        {dosageForms.map((form) => (
          <label key={form} className="block pl-2">
            <input
              type="checkbox"
              value={form}
              checked={selectedDosageForm.includes(form)}
              onChange={(e) =>
                handleMultiSelect(e, setSelectedDosageForm, selectedDosageForm)
              }
              className="mr-2"
            />
            {form}
          </label>
        ))}
      </div>

      {/* Strength */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Strength</h3>
        <input
          type="text"
          placeholder="e.g., 500mg, 10ml"
          value={selectedStrength}
          onChange={(e) => setSelectedStrength(e.target.value)}
          className="w-full border rounded-md p-2"
        />
      </div>

      {/* Availability */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Availability</h3>
        <div className="space-x-8">
        <label>
          <input
            type="radio"
            name="availability"
            value="true"
            checked={selectedAvailability === "true"}
            onChange={(e) => setSelectedAvailability(e.target.value)}
            className="mr-1"
          />
          In Stock
        </label>
        <label >
          <input
            type="radio"
            name="availability"
            value="false"
            checked={selectedAvailability === "false"}
            onChange={(e) => setSelectedAvailability(e.target.value)}
            className="mr-1"
          />Out of Stock
        </label>
        </div>
      </div>

      {/* Rating */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Rating</h3>
        <input
          type="number"
          step="0.1"
          min="0"
          max="5"
          placeholder="e.g., 4.5"
          value={selectedRating}
          onChange={(e) => setSelectedRating(e.target.value)}
          className="w-full border rounded-md p-2"
        />
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