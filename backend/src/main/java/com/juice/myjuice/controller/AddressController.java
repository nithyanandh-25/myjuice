package com.juice.myjuice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.juice.myjuice.model.Address;
import com.juice.myjuice.service.AddressService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/addresses")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @GetMapping("/customer/{customerId}")
    public List<Address> getAllAddresses() {
        return addressService.getAllAddresses();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Address> getAddress(@PathVariable Long id) {
        return addressService.getAddress(id);
    }

    @PostMapping("/customer/{customerId}")
    public ResponseEntity<Address> createAddress(@RequestBody Address address, @PathVariable Long customerId) {
        if (customerId == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return addressService.createAddress(address, customerId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Address> updateAddress(@PathVariable Long id, @RequestBody Address addressDetails) {
        return addressService.updateAddress(id, addressDetails);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAddress(@PathVariable Long id) {
        return addressService.deleteAddress(id);
    }
}
