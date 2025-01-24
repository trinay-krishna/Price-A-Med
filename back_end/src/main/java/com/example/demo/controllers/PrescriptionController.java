package com.example.demo.controllers;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Repositories.PresciptionRepository;
import com.example.demo.model.Prescription;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;



@RestController
public class PrescriptionController {
    
    @Autowired
    PresciptionRepository presciptionRepository;

    @PostMapping("/getPrescriptions")
    public ResponseEntity<List<Prescription>> getPrescriptions(@RequestBody String userIDString) {

        if ( userIDString == null ) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        long userID = Long.parseLong(userIDString);

        List<Prescription> prescriptions = presciptionRepository.findByUserId(userID);

        int start = 0, end = prescriptions.size() - 1;

        while( start < end ) {
            if ( ( prescriptions.get(start) ).getEndDate() == null ) {
                Prescription temp = prescriptions.get(end);
                prescriptions.set(end, prescriptions.get(start));
                prescriptions.set(start, temp);
                end--;
            }
            start++;
        }

        System.out.println(prescriptions);
        return new ResponseEntity<>(prescriptions, HttpStatus.OK);


    }

    @PostMapping("/addPrescription")
    public ResponseEntity<Prescription> addPrescription(@RequestBody Prescription prescription) {


        return new ResponseEntity<>(presciptionRepository.save(prescription), HttpStatus.CREATED);

        
    }

    @PostMapping("/endPrescription")
    public ResponseEntity<String> endPrescription(@RequestBody String stringID) {
        //TODO: process POST request

        Prescription prescription = (presciptionRepository.findById(Long.parseLong(stringID))).orElse(null);

        if ( prescription != null ) {
            prescription.setEndDate(LocalDate.now());
            presciptionRepository.save(prescription);
            return new ResponseEntity<>(null, HttpStatus.CREATED);
        } 

        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        
    }
    
    
    

}
