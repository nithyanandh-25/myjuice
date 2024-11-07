package com.juice.myjuice.service;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.juice.myjuice.model.Product;
import com.juice.myjuice.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository proRepo;

    public List<Product> getAllProduct() {
        return proRepo.findAll();
    }

    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        Optional<Product> product = proRepo.findById(id);
        return product.map(ResponseEntity::ok)
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    public ResponseEntity<List<Product>> saveMultiple(
            @RequestParam("name") List<String> name,
            @RequestParam("quantity") List<String> quantity, // Changed to List<Integer>
            @RequestParam("price") List<Integer> price,
            @RequestParam("image") List<MultipartFile> file) throws IOException {
        if (name.size() != quantity.size() || name.size() != price.size() || name.size() != file.size()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<Product> products = IntStream.range(0, name.size()).mapToObj(index -> {
            Product pro = new Product();
            pro.setName(name.get(index));
            pro.setQuantity(quantity.get(index));
            pro.setPrice(price.get(index));

            String fileName = StringUtils.cleanPath(file.get(index).getOriginalFilename());
            if (fileName.contains("..")) {
                throw new IllegalArgumentException("Not a valid file name");
            }
            try {
                pro.setImage(Base64.getEncoder().encodeToString(file.get(index).getBytes()));
            } catch (IOException e) {
                throw new RuntimeException("Failed to store file data", e);
            }
            return pro;
        }).collect(Collectors.toList());

        List<Product> savedProducts = proRepo.saveAll(products);
        return new ResponseEntity<>(savedProducts, HttpStatus.CREATED);
    }

    public ResponseEntity<Product> updateProduct(Long id, String name, String quantity, int price, MultipartFile file) {
        Optional<Product> existingPro = proRepo.findById(id);
        if (existingPro.isPresent()) {
            Product product = existingPro.get();
            product.setName(name);
            product.setQuantity(quantity);
            product.setPrice(price);

            // Update image if a new file is provided
            if (file != null && !file.isEmpty()) {
                try {
                    product.setImage(Base64.getEncoder().encodeToString(file.getBytes()));
                } catch (IOException e) {
                    throw new RuntimeException("Failed to store file data", e);
                }
            }

            proRepo.save(product);
            return new ResponseEntity<>(product, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<HttpStatus> deleteProduct(@PathVariable Long id) {
        try {
            Optional<Product> existingPro = proRepo.findById(id);
            if (existingPro.isPresent()) {
                proRepo.delete(existingPro.get());
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
