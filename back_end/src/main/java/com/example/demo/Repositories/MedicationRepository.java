package com.example.demo.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.BrandedIDMapDTO;
import com.example.demo.model.Medication;
import com.example.demo.model.PharmacyMedPrice;

import java.util.Optional;
import java.util.List;


public interface MedicationRepository extends JpaRepository<Medication, Long> {

    
    Optional<Medication> findById(Long id);


    @Query("SELECT new com.example.demo.model.BrandedIDMapDTO(m.id, CASE WHEN m.alternativeMedication.id IS NOT NULL THEN m.alternativeMedication.id ELSE m.id END) FROM Medication m WHERE m.id IN :givenIDs")
    List<BrandedIDMapDTO> findBrandedId( @Param("givenIDs") List<Long> givenIDs);




}
