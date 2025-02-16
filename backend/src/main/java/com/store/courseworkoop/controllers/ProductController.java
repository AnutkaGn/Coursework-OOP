package com.store.courseworkoop.controllers;

import com.store.courseworkoop.dto.*;
import com.store.courseworkoop.enums.SortOrder;
import com.store.courseworkoop.models.Product;
import com.store.courseworkoop.services.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/product")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // Create Product
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseDto<Product> create(@Valid @RequestBody CreateProductDto createProductDto) {
        return productService.create(createProductDto);
    }

    // Get all Products
    @GetMapping
    public ResponseDto<PaginatedResponseDto<GetAllProduct>> findAll(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) SortOrder sortByPrice,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit) {
        GetProductsQueryDto query = new GetProductsQueryDto(name, sortByPrice, page, limit);
        return productService.findAll(query);
    }


    // Get Product by ID
    @GetMapping("/{id}")
    public ResponseDto<Product> findOne(@PathVariable String id) {
        return productService.findOne(id);
    }

    // Update Product
    @PatchMapping("/{id}")
    public ResponseDto<Product> update(@PathVariable String id, @Valid @RequestBody UpdateProductDto updateProductDto) {
        return productService.update(id, updateProductDto);
    }

    // Delete Product
    @DeleteMapping("/{id}")
    public ResponseDto<Void> remove(@PathVariable String id) {
        return productService.remove(id);
    }
}
