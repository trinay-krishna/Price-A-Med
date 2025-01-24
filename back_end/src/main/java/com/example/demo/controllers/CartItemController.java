package com.example.demo.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Repositories.CartItemRepository;
import com.example.demo.Repositories.UserDetailsRepository;
import com.example.demo.model.CartItem;
import com.example.demo.model.PharmItemDTO;
import com.example.demo.model.UserDetails;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
public class CartItemController {
    
    @Autowired
    CartItemRepository cartItemRepository;

    @Autowired
    UserDetailsRepository userDetailsRepository;



    @PostMapping("/addCart")
    public ResponseEntity<CartItem> postMethodName(@RequestBody CartItem cartItem) {

        cartItemRepository.save(cartItem);

        
        return new ResponseEntity<>(cartItem, HttpStatus.CREATED);
    }

    @GetMapping("/getCart")
    public ResponseEntity<List<PharmItemDTO>> getMethodName(@RequestParam String userIDString) {
        
        Integer userID = Integer.parseInt(userIDString);

        UserDetails user = userDetailsRepository.findById(userID).orElse(null);
        List<PharmItemDTO> pharmItems = new ArrayList<>();

        if ( user == null ) {
            return new ResponseEntity<>(pharmItems, HttpStatus.UNAUTHORIZED);
        }

        List<CartItem> cartItems = cartItemRepository.findByUser(user);



        for(CartItem cartItem : cartItems ) {
            pharmItems.add( new PharmItemDTO(cartItem.getPharmacy().getId(), cartItem.getMedication().getId()) );
        }

        return new ResponseEntity<>(pharmItems, HttpStatus.OK);

    }

    @GetMapping("/getUserCart")
    public ResponseEntity<List<CartItem>> getMethodName(@RequestParam Integer userID) {
        List<CartItem> cartItems = cartItemRepository.findUserCart(userID);

        
        return new ResponseEntity<>(cartItems, HttpStatus.OK);

    }
    

    @PostMapping("/delCart")
    public String postMethodName(@RequestParam Integer userId,
                                @RequestParam Long medId,
                                @RequestParam Long pharmId) {
        cartItemRepository.deleteByUserIdAndMedicationIdAndPharmacyId(userId, medId, pharmId);

        return "OK";
        
    }
    


    
    

}
