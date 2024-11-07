package com.juice.myjuice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.juice.myjuice.dto.LoginRequest;
import com.juice.myjuice.model.Customer;
import com.juice.myjuice.repository.CustomerRepository;

@Service
public class CustomerService {
	
	@Autowired
	private CustomerRepository custRepo;
	
	public List<Customer> getAllCustomers() {
        return custRepo.findAll();
    }

    public ResponseEntity<Customer> getCustomer(Long id) {
        Optional<Customer> Customer = custRepo.findById(id);
        return Customer.map(ResponseEntity::ok)
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    public ResponseEntity<Customer> registerCustomer(Customer Customer) {
        Customer newCustomer = custRepo.save(Customer); // Save the new Customer
        return ResponseEntity.status(HttpStatus.CREATED).body(newCustomer);
    }

    public ResponseEntity<Customer> loginCustomer(LoginRequest loginRequest) {
        // Retrieve parameters from the LoginRequest object
        String mobilenumber = loginRequest.getMobilenumber();
        String password = loginRequest.getPassword();

        // Logic to authenticate the Customer
        Optional<Customer> Customer = custRepo.findByMobilenumber(mobilenumber);
        
        if (Customer.isPresent() && Customer.get().getPassword().equals(password)) {
            return ResponseEntity.ok(Customer.get());
        }
        
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); // or whatever response you prefer
    }

    public ResponseEntity<Customer> updateCustomer(Long id, Customer CustomerDetails) {
        Optional<Customer> optionalCustomer = custRepo.findById(id);
        if (optionalCustomer.isPresent()) {
            Customer existingCustomer = optionalCustomer.get();
            existingCustomer.setName(CustomerDetails.getName());
            existingCustomer.setMobilenumber(CustomerDetails.getMobilenumber());
            existingCustomer.setPassword(CustomerDetails.getPassword());
            Customer updatedCustomer = custRepo.save(existingCustomer);
            return ResponseEntity.ok(updatedCustomer);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<Void> deleteCustomer(Long id) {
        if (custRepo.existsById(id)) {
        	custRepo.deleteById(id);
            return ResponseEntity.noContent().build(); // 204 No Content
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
