import React, { useState, useRef, useEffect } from 'react';
// import './Home.css';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.App}>
      <Navbar />
      <Body />
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <h2 className={styles.Logo}>Price A Med</h2>
      </div>
      <div className={styles.navbarButtons}>
        <button className={styles.navButton}>Prescription</button>
        <button className={styles.navButton}>Orders</button>
        <button className={styles.navButton}>Menu</button>
      </div>
    </nav>
  );
}

function Body() {
  const [searchText, setSearchText] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [medicines, setMedicines] = useState([
    { name: 'Aspirin', price: 5 },
    { name: 'Paracetamol', price: 10 },
    { name: 'Ibuprofen', price: 8 },
  ]);
  const [filteredMeds, setFilteredMeds] = useState([]);
  const filterRef = useRef(null); // Ref for filter dropdown

  const filterOptions = [
    'Distance',
    'Rating',
    'Price low to high',
    'Price high to low',
    'Membership availability',
    'Able to deliver the medicine continuously',
  ];

  const toggleFilterVisibility = () => {
    setFilterVisible(!filterVisible);
  };

  // Handle search text change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setFilteredMeds(
      medicines.filter((med) =>
        med.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  // Close the filter options when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterVisible(false); // Close the filter dropdown if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.searchRow}>
        <button className={styles.filterButton} onClick={toggleFilterVisibility}>
          Filter
        </button>
        <input
          type="text"
          placeholder="Search for medicines..."
          value={searchText}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <button className={styles.searchButton}>Search</button>
      </div>

      {/* Filter options dropdown */}
      {filterVisible && (
        <div ref={filterRef} className={styles.filterOptions}>
          {filterOptions.map((option, index) => (
            <button key={index} className={styles.filterOption}>
              {option}
            </button>
          ))}
        </div>
      )}

      {/* Medicine list or image */}
      {searchText ? (
        <div className={styles.medicineList}>
          {filteredMeds.length > 0 ? (
            filteredMeds.map((med, index) => (
              <div key={index} className={styles.medicineItem}>
                <p>{med.name}</p>
                <p>Price: ${med.price}</p>
                <button className={styles.medicineBtn}>Add to Cart</button>
              </div>
            ))
          ) : (
            <p className={styles.noMedicineFound}>No medicines found.</p> 
          )}
        </div>
      ) : (
        <div className={styles.imagePlaceholder}>
          <img src="https://shorturl.at/SFuR1" alt="Placeholder" />
        </div>
      )}
    </div>
  );
}


function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© 2024 Price A Med. All rights reserved.</p>
    </footer>
  );
}
