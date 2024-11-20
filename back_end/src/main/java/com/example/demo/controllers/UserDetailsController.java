package com.example.demo.controllers;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Repositories.UserDetailsRepository;
import com.example.demo.model.LoginRequest;
import com.example.demo.model.UserDetails;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
public class UserDetailsController {

    private final UserDetailsRepository userDetailsRepository;

    @Autowired
    public UserDetailsController(UserDetailsRepository userDetailsRepository) {
        this.userDetailsRepository = userDetailsRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<UserDetails> validateLogin(@RequestBody LoginRequest loginRequest ) {
        String userName = (String) loginRequest.getUserName();
        String password = (String) loginRequest.getPassword();

        UserDetails details = ( userDetailsRepository.findByUsername(userName) ).orElse(null);


        if ( details == null || !details.getPassword().equals(password) ) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(null, HttpStatus.OK);
    }
    

    @PostMapping("/register")
    public ResponseEntity<UserDetails> registerUser(@RequestBody UserDetails userDetails) {
        System.out.println(userDetails);
        UserDetails details = userDetailsRepository.save(userDetails);

        return new ResponseEntity<>(details, HttpStatus.CREATED);

    }
    
    
}
