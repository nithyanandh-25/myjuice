package com.juice.myjuice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.juice.myjuice.model.Address;
import com.juice.myjuice.model.Customer;
import com.juice.myjuice.repository.AddressRepository;
import com.juice.myjuice.repository.CustomerRepository;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public List<Address> getAllAddresses() {
        return addressRepository.findAll();
    }

    public ResponseEntity<Address> getAddress(Long id) {
        Optional<Address> address = addressRepository.findById(id);
        return address.map(ResponseEntity::ok)
                      .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    public ResponseEntity<Address> createAddress(Address address, Long customerId) {
        Optional<Customer> customer = customerRepository.findById(customerId);
        if (customer.isPresent()) {
            address.setCustomer(customer.get());
            Address newAddress = addressRepository.save(address);
            return ResponseEntity.status(HttpStatus.CREATED).body(newAddress);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<Address> updateAddress(Long id, Address addressDetails) {
        Optional<Address> optionalAddress = addressRepository.findById(id);
        if (optionalAddress.isPresent()) {
            Address existingAddress = optionalAddress.get();
            existingAddress.setAddress(addressDetails.getAddress());
            existingAddress.setPincode(addressDetails.getPincode());
            Address updatedAddress = addressRepository.save(existingAddress);
            return ResponseEntity.ok(updatedAddress);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<Void> deleteAddress(Long id) {
        if (addressRepository.existsById(id)) {
            addressRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
