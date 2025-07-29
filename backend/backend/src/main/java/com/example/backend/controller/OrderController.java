package com.example.backend.controller;

import com.example.backend.entity.Order;
import com.example.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public Order placeOrder(@RequestBody Order order) {
        return orderService.saveOrder(order);
    }
    // New GET endpoint to get all orders
    @GetMapping
    public Iterable<Order> getAllOrders() {
        return orderService.getAllOrders();
    }
}
