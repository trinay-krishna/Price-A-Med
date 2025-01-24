package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Repositories.MedicationRepository;
import com.example.demo.Repositories.PharmacyMedPriceRepository;
import com.example.demo.model.Medication;
import com.example.demo.model.Pharmacy;
import com.example.demo.model.PharmacyMedPrice;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
public class MedPriceController {

    @Autowired
    PharmacyMedPriceRepository pharmacyMedPriceRepository;


    @GetMapping("/getMedList")
    public List<PharmacyMedPrice> getMedList( ) {
        // return pharmacyMedPriceRepository.findAllWithMedicationAndPharmacy();
        return pharmacyMedPriceRepository.findAll();
    }

    
    
    
}
