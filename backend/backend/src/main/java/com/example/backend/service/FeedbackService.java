package com.example.backend.service;

import com.example.backend.entity.Feedback;
import com.example.backend.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public Feedback saveFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    public Optional<Feedback> getFeedbackById(String id) {
        return feedbackRepository.findById(id);
    }

    public Feedback updateFeedback(String id, Feedback updatedFeedback) {
        return feedbackRepository.findById(id).map(fb -> {
            fb.setName(updatedFeedback.getName());
            fb.setEmail(updatedFeedback.getEmail());
            fb.setFeedback(updatedFeedback.getFeedback());
            return feedbackRepository.save(fb);
        }).orElse(null);
    }

    public boolean deleteFeedback(String id) {
        if (feedbackRepository.existsById(id)) {
            feedbackRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

