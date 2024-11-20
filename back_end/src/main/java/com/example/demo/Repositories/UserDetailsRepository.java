package com.example.demo.Repositories;

import com.example.demo.model.UserDetails;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserDetailsRepository extends JpaRepository<UserDetails, Integer> {

    Optional<UserDetails> findByUsername(String username);

}
