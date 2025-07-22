package com.example.backend.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String username;
    private String email;
    private String password;
    private String contact_number;
    private String address;

    public User() {}

    public User(String username, String email, String password,String contact,String address) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.contact_number=contact;
        this.address=address;
    }

    // Getters & Setters
    public String getId() { return id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getContact_number() {return contact_number;}
    public void setContact_number(String contact) {this.contact_number=contact;}

    public String getAddress() {return address;}
    public void setAddress(String address) {this.address=address;}
}
