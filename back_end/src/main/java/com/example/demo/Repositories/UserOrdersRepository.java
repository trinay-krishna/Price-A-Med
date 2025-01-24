package com.example.demo.Repositories;


import com.example.demo.model.UserOrders;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserOrdersRepository extends JpaRepository<UserOrders, Long> {

    @Query("SELECT o FROM UserOrders o WHERE o.user.id = :userId")
    List<UserOrders> findUserOrders(Long userId);



}

