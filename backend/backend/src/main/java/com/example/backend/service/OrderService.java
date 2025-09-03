package com.example.backend.service;

import com.example.backend.entity.Order;
import com.example.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    public Iterable<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order updateOrder(String id, Order updatedOrder) {
        Order existing = orderRepository.findById(id).orElseThrow();
        existing.setStatus(updatedOrder.getStatus());
        return orderRepository.save(existing);
    }

    public void deleteOrder(String id) {
        orderRepository.deleteById(id);
    }


}


