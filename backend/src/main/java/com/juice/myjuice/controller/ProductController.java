package com.juice.myjuice.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.juice.myjuice.model.Product;
import com.juice.myjuice.service.ProductService;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProduct();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productService.getProduct(id);
    }

    @PostMapping
    public ResponseEntity<List<Product>> saveMultipleProducts(
            @RequestParam("name") List<String> name,
            @RequestParam("quantity") List<String> quantity,  // Changed to List<Integer>
            @RequestParam("price") List<Integer> price,
            @RequestParam("image") List<MultipartFile> file) throws IOException {
        return productService.saveMultiple(name, quantity, price, file);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestParam String name,
            @RequestParam String quantity,
            @RequestParam int price,
            @RequestParam(required = false) MultipartFile file) {
        return productService.updateProduct(id, name, quantity, price, file);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteProduct(@PathVariable Long id) {
        return productService.deleteProduct(id);
    }
}
