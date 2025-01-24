package com.example.demo.EmailServiceOp;

// Importing required classes


// Class
public class EmailDetails {

    // Class data members
    private String recipient;
    private String msgBody;
    private String subject;
    private String attachment;

    public EmailDetails(String recipient, String msgBody, String subject) {
        this.recipient = recipient;
        this.msgBody = msgBody;
        this.subject = subject;
    }

    public String getRecipient() {
        return this.recipient;
    }

    public String getMsgBody() {
        return this.msgBody;
    }

    public String getSubject() {
        return this.subject;
    }

    public String getAttachment() {
        return this.attachment;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public void setMsgBody(String msgBody) {
        this.msgBody = msgBody;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
    }


}
