package com.juice.myjuice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.juice.myjuice.dto.LoginRequest;
import com.juice.myjuice.model.Admin;
import com.juice.myjuice.repository.AdminRepository;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepo;

    public List<Admin> getAllAdmins() {
        return adminRepo.findAll();
    }

    public ResponseEntity<Admin> getAdmin(Long id) {
        Optional<Admin> admin = adminRepo.findById(id);
        return admin.map(ResponseEntity::ok)
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    public ResponseEntity<Admin> registerAdmin(Admin admin) {
        Admin newAdmin = adminRepo.save(admin); // Save the new admin
        return ResponseEntity.status(HttpStatus.CREATED).body(newAdmin);
    }

    public ResponseEntity<Admin> loginAdmin(LoginRequest loginRequest) {
        // Retrieve parameters from the LoginRequest object
        String mobilenumber = loginRequest.getMobilenumber();
        String password = loginRequest.getPassword();

        // Logic to authenticate the admin
        Optional<Admin> admin = adminRepo.findByMobilenumber(mobilenumber);
        
        if (admin.isPresent() && admin.get().getPassword().equals(password)) {
            return ResponseEntity.ok(admin.get());
        }
        
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); // or whatever response you prefer
    }

    public ResponseEntity<Admin> updateAdmin(Long id, Admin adminDetails) {
        Optional<Admin> optionalAdmin = adminRepo.findById(id);
        if (optionalAdmin.isPresent()) {
            Admin existingAdmin = optionalAdmin.get();
            existingAdmin.setName(adminDetails.getName());
            existingAdmin.setMobilenumber(adminDetails.getMobilenumber());
            existingAdmin.setPassword(adminDetails.getPassword());
            Admin updatedAdmin = adminRepo.save(existingAdmin);
            return ResponseEntity.ok(updatedAdmin);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<Void> deleteAdmin(Long id) {
        if (adminRepo.existsById(id)) {
            adminRepo.deleteById(id);
            return ResponseEntity.noContent().build(); // 204 No Content
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
