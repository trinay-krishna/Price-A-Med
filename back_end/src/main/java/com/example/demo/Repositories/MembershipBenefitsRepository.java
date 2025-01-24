package com.example.demo.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.model.MembershipBenefits;

@Repository
public interface MembershipBenefitsRepository extends JpaRepository<MembershipBenefits, Long> {

    List<MembershipBenefits> findAll();

    @Query("SELECT mb.benefit FROM MembershipBenefits mb WHERE mb.membership.id = :membershipId")
    List<String> findBenefitsFromId(Long membershipId);


    
}