package com.example.demo.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class MessageProducer {
    
    @Autowired
    private KafkaTemplate<String, Event> kafkaTemplate;

    public void sendMessage(String topic, Event message) {
        kafkaTemplate.send(topic, message);
    }
}
