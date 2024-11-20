package com.example.demo.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class KafkaController {
    
    @Autowired
    private MessageProducer messageProducer;

    @PostMapping("/send")
    public String postMethodName(@RequestBody Event message) {
        messageProducer.sendMessage("my-topic", message);
        return "Message Sent " + message;
    }
    
}
