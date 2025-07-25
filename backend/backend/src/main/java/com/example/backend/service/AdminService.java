package com.example.backend.service;

import com.example.backend.entity.Admin;
import com.example.backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public String registerAdmin(Admin admin) {
        if (adminRepository.existsByEmail(admin.getEmail())) {
            return "Admin with this email already exists!";
        }
        adminRepository.save(admin);
        return "Admin registered successfully!";
    }

    public String loginAdmin(String email, String password) {
        return adminRepository.findByEmail(email)
                .map(a -> a.getPassword().equals(password) ? "Admin login successful!" : "Incorrect password!")
                .orElse("Admin not found!");
    }
//new add remove
    @GetMapping("/admins")
    public static List<Admin> getAllAdmins() {
        return AdminService.getAllAdmins();
    }



}
