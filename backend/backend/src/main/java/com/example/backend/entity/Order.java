package com.example.backend.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "orders")
public class Order {

    @Id
    private String id;

    private String fullName;
    private String email;
    private String address;
    private String city;
    private String zip;
    private String paymentMethod;
    private String cardNumber;
    private String expiry;
    private String cvv;
    private String paypalEmail;
    private double total;

    private List<OrderBook> items;  // Changed from OrderItem to OrderBook

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getZip() { return zip; }
    public void setZip(String zip) { this.zip = zip; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getCardNumber() { return cardNumber; }
    public void setCardNumber(String cardNumber) { this.cardNumber = cardNumber; }

    public String getExpiry() { return expiry; }
    public void setExpiry(String expiry) { this.expiry = expiry; }

    public String getCvv() { return cvv; }
    public void setCvv(String cvv) { this.cvv = cvv; }

    public String getPaypalEmail() { return paypalEmail; }
    public void setPaypalEmail(String paypalEmail) { this.paypalEmail = paypalEmail; }

    public double getTotal() { return total; }
    public void setTotal(double total) { this.total = total; }

    public List<OrderBook> getItems() { return items; }
    public void setItems(List<OrderBook> items) { this.items = items; }
}
