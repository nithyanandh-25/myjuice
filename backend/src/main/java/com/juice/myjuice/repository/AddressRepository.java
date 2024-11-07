package com.juice.myjuice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.juice.myjuice.model.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long>{

}
