package com.example.demo.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.model.PharmacyMedPrice;

@Repository
public interface PharmacyMedPriceRepository extends JpaRepository<PharmacyMedPrice, Long> {

    @Query("SELECT pmp FROM PharmacyMedPrice pmp " +
           "JOIN FETCH pmp.pharmacy ph " +
           "JOIN FETCH pmp.medication med " +
           "WHERE pmp.pharmacy.id IS NOT NULL AND pmp.medication.id IS NOT NULL " + 
           "ORDER BY CASE WHEN med.alternativeMedication IS NULL THEN 0 ELSE 1 END, med.alternativeMedication")
    List<PharmacyMedPrice> findAllWithMedicationAndPharmacy();

    // @Query("SELECT pmp FROM PharmacyMedPrice pmp")
    // List<PharmacyMedPrice> findAll();
}
