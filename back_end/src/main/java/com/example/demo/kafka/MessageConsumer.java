package com.example.demo.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class MessageConsumer {
    @KafkaListener(topics="my-topic", groupId = "my-group-id")
    public void listen(Event message) {
        System.out.println("Received Message " + message.getID() + " " + message.getStatus());
    }
}
