package com.example.demo.controllers;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Repositories.MedicationRepository;
import com.example.demo.model.BrandedIDMapDTO;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class MedicationController {

    @Autowired
    MedicationRepository medicationRepository;


    @PostMapping("/validateMeds")
    public ResponseEntity<List<Long>> postMethodName(@RequestBody List<Long> idList) {
        HashSet<Long> avoidIds = new HashSet<>();

        avoidIds.add((long)2);
        avoidIds.add((long)3);

        List<BrandedIDMapDTO> brandedIds = medicationRepository.findBrandedId(idList);

        List<Long> selectedAvoidIds = new ArrayList<>();

        for(BrandedIDMapDTO brandedIDMapDTO : brandedIds) {
            Long brandedID = brandedIDMapDTO.getAltMedID();

            if ( avoidIds.contains(brandedID) ) {
                selectedAvoidIds.add(brandedIDMapDTO.getMedID());
            }
        }

        return new ResponseEntity<>(selectedAvoidIds, HttpStatus.OK);

        
        

    }
    
    
}
