package com.example.demo.Repositories;

import com.example.demo.model.OrderItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface OrderItemsRepository extends JpaRepository<OrderItems, Long> {

    @Query("SELECT o FROM OrderItems o WHERE o.userOrders.id = :orderId")
    List<OrderItems> findByOrderID(Long orderId);

}

