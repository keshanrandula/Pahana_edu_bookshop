package com.example.backend.controller;

import com.example.backend.entity.Feedback;
import com.example.backend.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "*")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    // POST: Create feedback
    @PostMapping
    public ResponseEntity<Feedback> createFeedback(@RequestBody Feedback feedback) {
        return ResponseEntity.ok(feedbackService.saveFeedback(feedback));
    }

    // GET: Get all feedback
    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedback() {
        return ResponseEntity.ok(feedbackService.getAllFeedback());
    }

    // GET: Get feedback by ID
    @GetMapping("/{id}")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable String id) {
        Optional<Feedback> feedback = feedbackService.getFeedbackById(id);
        return feedback.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // PUT: Update feedback by ID
    @PutMapping("/{id}")
    public ResponseEntity<Feedback> updateFeedback(@PathVariable String id, @RequestBody Feedback updatedFeedback) {
        Feedback updated = feedbackService.updateFeedback(id, updatedFeedback);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    // DELETE: Delete feedback by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable String id) {
        if (feedbackService.deleteFeedback(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
