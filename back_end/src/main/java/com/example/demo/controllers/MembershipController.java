package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Repositories.MembershipRepository;
import com.example.demo.model.Membership;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class MembershipController {

    @Autowired
    MembershipRepository membershipRepository;

    @GetMapping("/getMemberships")
    public ResponseEntity<List<Membership>> getMethodName() {
        List<Membership> memberships = membershipRepository.findAll();

        return new ResponseEntity<>(memberships, HttpStatus.OK);
    }
    
    
}
