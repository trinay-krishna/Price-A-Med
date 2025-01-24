package com.example.demo.controllers;

import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.EmailServiceOp.EmailService;
import com.example.demo.Repositories.CartItemRepository;
import com.example.demo.Repositories.OrderItemsRepository;
import com.example.demo.Repositories.UserDetailsRepository;
import com.example.demo.Repositories.UserOrdersRepository;
import com.example.demo.Repositories.UserSubscriptionRepository;
import com.example.demo.model.CartItem;
import com.example.demo.model.OrderItems;
import com.example.demo.model.UserDetails;
import com.example.demo.model.UserOrders;
import com.example.demo.model.UserSubscription;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
public class UserOrdersController {

    @Autowired
    private UserOrdersRepository userOrdersRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    @Autowired
    private OrderItemsRepository orderItemsRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    UserSubscriptionRepository userSubscriptionRepository;


    @PostMapping("/placeOrder")
    public ResponseEntity<UserOrders> postMethodName(@RequestParam int userId, @RequestParam int time) {

        List<CartItem> userCart = cartItemRepository.findByUserID(userId);
        UserDetails user = userDetailsRepository.findById(userId).orElse(null);

        UserSubscription subscription = userSubscriptionRepository.findByUserId((long)userId).orElse(null);

        int discount = subscription.getMembership().getPlanDiscount();

        String userEmail = user.getEmail();

        if ( ( userCart.size() == 0 ) || user == null ) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        double total_price = 0;

        for( CartItem item : userCart ) {
            double unit_price = item.getUnitPrice();
            int quantity = item.getQuantity();

            double med_total_price = (unit_price - unit_price * discount/100 ) * quantity;

            total_price += med_total_price;

        }

        UserOrders order = new UserOrders();

        double deliveryCharges = 10;

        order.setPrice(total_price + deliveryCharges);


        order.setUser(user);
        order.setStatus("Confirmed");
        order.setOrderedDate(new Date());

        int deliveryHour = time + 12;

        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE, 1);

        calendar.set(Calendar.HOUR_OF_DAY, deliveryHour);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);

        Date deliveryTime = calendar.getTime();

        order.setDeliveryTime(deliveryTime);
        
        
        //TODO: process POST request
        UserOrders savedOrder = userOrdersRepository.save(order);   

        for( CartItem item : userCart ) {
            OrderItems orderItem = new OrderItems();

            orderItem.setItemId(item.getMedication().getId());
            orderItem.setItemName(item.getMedication().getName());
            orderItem.setPricePerItem((double)item.getUnitPrice() - (double)item.getUnitPrice()*discount/100);
            orderItem.setQuantity(item.getQuantity());
            orderItem.setUserOrders(savedOrder);

            orderItemsRepository.save(orderItem);

        }


        emailService.sendOrderSummaryEmail(savedOrder.getOrderId(), userEmail);


        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("/getOrders")
    public ResponseEntity<List<UserOrders>> getMethodName(@RequestParam Long userId) {
        List<UserOrders> orders = userOrdersRepository.findUserOrders(userId);

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
    
    
    
}
