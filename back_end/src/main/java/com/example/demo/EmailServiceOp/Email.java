package com.example.demo.EmailServiceOp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


@Service
public class Email {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String sender;

    public String sendSimpleMail(EmailDetails details) {
        try {
            MimeMessageHelper mailMessage = new MimeMessageHelper(javaMailSender.createMimeMessage());

            mailMessage.setFrom(sender);
            mailMessage.setTo(details.getRecipient());
            mailMessage.setText(details.getMsgBody(), true);
            mailMessage.setSubject(details.getSubject());
            
            javaMailSender.send(mailMessage.getMimeMessage());

            System.out.println("Sent!");
            return "Mail Sent Successfully...";

        } catch(Exception e) {
            System.out.println("Not Sent!" + e.getMessage());
            return "Error while Sending Email";
        }
    }


    
}
