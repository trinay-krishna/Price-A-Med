package com.example.demo.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Repositories.MembershipRepository;
import com.example.demo.Repositories.UserSubscriptionRepository;
import com.example.demo.model.Membership;
import com.example.demo.model.UserSubscription;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
public class UserSubscriptionController {

    @Autowired
    UserSubscriptionRepository userSubscriptionRepository;

    @Autowired
    MembershipRepository membershipRepository;

    @GetMapping("/getUserMembership")
    public ResponseEntity<UserSubscription> getMethodName(@RequestParam Long userId) {
        UserSubscription subscription = userSubscriptionRepository.findByUserId(userId).orElse(null);

        return new ResponseEntity<>(subscription, HttpStatus.OK);
    }

    @PostMapping("/upgradeUser")
    public ResponseEntity<UserSubscription> postMethodName(@RequestParam Long userId, @RequestParam Long membershipId) {
        //TODO: process POST request

        if ( userId == null || membershipId == null ) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        
        UserSubscription subscription = userSubscriptionRepository.findByUserId(userId).orElse(null);

        if ( subscription == null  ) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        Membership upgradedMembership = membershipRepository.findById(membershipId).orElse(null);

        if ( upgradedMembership == null ) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        subscription.setMembership(upgradedMembership);

        UserSubscription updatedSubscription = userSubscriptionRepository.save(subscription);

        return new ResponseEntity<>(updatedSubscription, HttpStatus.OK);


    }
    
    
    
}
