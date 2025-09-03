package com.example.backend.controller;

import com.example.backend.entity.Admin;
import com.example.backend.service.AdminService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/register")
    public String registerAdmin(@RequestBody Admin admin) {
        return adminService.registerAdmin(admin);
    }

    @PostMapping("/login")
    public String loginAdmin(@RequestBody Admin admin) {
        return adminService.loginAdmin(admin.getEmail(), admin.getPassword());
    }


    @GetMapping("/admins")
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }


    //new one
    @GetMapping("/profile")
    public Admin getAdminProfile(@RequestParam String email) {
        return adminService.getAdminByEmail(email);
    }

    //new one

    @PutMapping("/update")
    public String updateAdmin(@RequestBody Admin admin) {
        Admin existingAdmin = adminService.getAdminByEmail(admin.getEmail());
        if (existingAdmin == null) {
            return "Admin not found!";
        }
        existingAdmin.setUsername(admin.getUsername());
        existingAdmin.setPassword(admin.getPassword());
        adminService.saveAdmin(existingAdmin);
        return "Admin updated successfully!";
    }




}
