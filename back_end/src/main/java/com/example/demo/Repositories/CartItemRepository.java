package com.example.demo.Repositories;

import com.example.demo.model.CartItem;
import com.example.demo.model.UserDetails;

import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {


    List<CartItem> findByUser(UserDetails user);

    @Query("SELECT c FROM CartItem c WHERE c.user.userId = :userId")
    List<CartItem> findByUserID(int userId);

    @Transactional
    @Modifying
    @Query("DELETE FROM CartItem c WHERE c.user.id = :userId AND c.medication.id = :medId AND c.pharmacy.id = :pharmId")
    void deleteByUserIdAndMedicationIdAndPharmacyId(Integer userId, Long medId, Long pharmId);

    @Query("SELECT c FROM CartItem c WHERE c.user.id = :userID")
    List<CartItem> findUserCart(Integer userID);



}

