package com.example.demo.EmailServiceOp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Repositories.OrderItemsRepository;
import com.example.demo.model.OrderItems;

@Service
public class EmailService {

    @Autowired
    private Email emailOp;

    @Autowired
    private OrderItemsRepository orderItemsRepository;

    public String sendOrderSummaryEmail(Long orderId, String email) {
        // Fetch OrderItems from the database
        List<OrderItems> orderItems = orderItemsRepository.findByOrderID(orderId);

        if (orderItems.isEmpty()) {
            return "No items found for the given order ID.";
        }

        // Calculate totals
        double subtotal = orderItems.stream().mapToDouble(item -> item.getPricePerItem() * item.getQuantity()).sum();
        double deliveryCharge = 10.00; // Mock delivery charge
        double total = subtotal + deliveryCharge;
        double discountedTotal = total - 5.20; // Assuming a $5.20 discount

        // Prepare the email content
        String recipient = email;
        String body = generateOrderSummaryEmail(orderId, orderItems, subtotal, deliveryCharge, total, discountedTotal);
        String subject = "Order Summary for Order ID: " + orderId;

        EmailDetails details = new EmailDetails(recipient, body, subject);
        return emailOp.sendSimpleMail(details);
    }

    private String generateOrderSummaryEmail(Long orderId, List<OrderItems> orderItems, double subtotal, double deliveryCharge, double total, double discountedTotal) {
        StringBuilder emailContent = new StringBuilder();

        emailContent.append("<!DOCTYPE html>")
            .append("<html lang=\"en\">")
            .append("<head>")
            .append("<meta charset=\"UTF-8\">")
            .append("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">")
            .append("<title>Order Summary</title>")
            .append("<style>")
            .append("body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }")
            .append(".container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9; }")
            .append("h1 { text-align: center; color: #555; }")
            .append("table { width: 100%; border-collapse: collapse; margin: 20px 0; }")
            .append("th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }")
            .append("th { background-color: #f4f4f4; }")
            .append(".total { font-weight: bold; }")
            .append("</style>")
            .append("</head>")
            .append("<body>")
            .append("<div class=\"container\">")
            .append("<h1>Order Summary</h1>")
            .append("<p><strong>Order ID:</strong> ").append(orderId).append("</p>")
            .append("<table>")
            .append("<thead>")
            .append("<tr>")
            .append("<th>Item Name</th>")
            .append("<th>Quantity</th>")
            .append("<th>Price</th>")
            .append("</tr>")
            .append("</thead>")
            .append("<tbody>");

        for (OrderItems item : orderItems) {
            emailContent.append("<tr>")
                .append("<td>").append(item.getItemName()).append("</td>")
                .append("<td>").append(item.getQuantity()).append("</td>")
                .append("<td>$").append(String.format("%.2f", item.getPricePerItem())).append("</td>")
                .append("</tr>");
        }

        emailContent.append("</tbody>")
            .append("</table>")
            .append("<p><strong>Subtotal:</strong> $").append(String.format("%.2f", subtotal)).append("</p>")
            .append("<p><strong>Delivery Charge:</strong> $").append(String.format("%.2f", deliveryCharge)).append("</p>")
            .append("<p class=\"total\"><strong>Discounted Total:</strong> $").append(String.format("%.2f", total)).append("</p>")
            // .append("<p class=\"total\"><strong>Discounted Total:</strong> $").append(String.format("%.2f", discountedTotal)).append("</p>")
            .append("</div>")
            .append("</body>")
            .append("</html>");

        return emailContent.toString();
    }
}
