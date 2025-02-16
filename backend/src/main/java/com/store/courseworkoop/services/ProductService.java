package com.store.courseworkoop.services;

import com.store.courseworkoop.dto.CreateProductDto;
import com.store.courseworkoop.dto.UpdateProductDto;
import com.store.courseworkoop.dto.ResponseDto;
import com.store.courseworkoop.dto.GetProductsQueryDto;
import com.store.courseworkoop.dto.GetAllProduct;
import com.store.courseworkoop.dto.PaginatedResponseDto;
import com.store.courseworkoop.enums.SortOrder;
import com.store.courseworkoop.models.Product;
import com.store.courseworkoop.repositories.ProductRepository;
import com.store.courseworkoop.constants.Messages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public ResponseDto<Product> create(CreateProductDto createProductDto) {
        Product product = new Product();
        product.setName(createProductDto.getName());
        product.setDescription(createProductDto.getDescription());
        product.setStock(createProductDto.getStock());
        product.setPrice(createProductDto.getPrice());
        product.setCategory(createProductDto.getCategory());

        Product savedProduct = productRepository.save(product);

        return new ResponseDto<>(HttpStatus.CREATED.value(), Messages.PRODUCT_CREATED, savedProduct);
    }

    // Retrieves all products with optional filtering by name and sorting by price.
    public ResponseDto<PaginatedResponseDto<GetAllProduct>> findAll(GetProductsQueryDto query) {
        // Set default values for page and limit
        int page = query.getPage() != null ? query.getPage() : 1;
        int limit = query.getLimit() != null ? query.getLimit() : 10;
        String name = query.getName();
        SortOrder sortOrder = query.getSortByPrice();

        // Create PageRequest for pagination
        PageRequest pageRequest;

        // Logic for sorting by price
        if (sortOrder != null && sortOrder == SortOrder.ASC) {
            pageRequest = PageRequest.of(page - 1, limit, Sort.by(Sort.Order.asc("price")));
        } else if (sortOrder != null && sortOrder == SortOrder.DESC) {
            pageRequest = PageRequest.of(page - 1, limit, Sort.by(Sort.Order.desc("price")));
        } else {
            pageRequest = PageRequest.of(page - 1, limit);
        }

        // Search for products with filter by name and pagination
        Page<Product> productPage;
        if (name != null && !name.isEmpty()) {
            productPage = productRepository.findByNameContainingIgnoreCase(name, pageRequest);
        } else {
            productPage = productRepository.findAll(pageRequest); // if name is not specified, return all products
        }

        long total = productPage.getTotalElements();

        // If no products are found
        if (productPage.getContent().isEmpty()) {
            return new ResponseDto<>(HttpStatus.NOT_FOUND.value(), Messages.NO_PRODUCTS_FOUND, null);
        }

        // Convert products to DTO
        List<GetAllProduct> getAllProducts = productPage.getContent().stream()
                .map(product -> {
                    GetAllProduct getAllProduct = new GetAllProduct();
                    getAllProduct.setId(product.getId());
                    getAllProduct.setName(product.getName());
                    getAllProduct.setPrice(product.getPrice());
                    getAllProduct.setCategory(product.getCategory());
                    return getAllProduct;
                }).collect(Collectors.toList());

        // Form the response with pagination
        PaginatedResponseDto<GetAllProduct> response = new PaginatedResponseDto<>(getAllProducts, total);

        return new ResponseDto<>(HttpStatus.OK.value(), Messages.PRODUCTS_RETRIEVED, response);
    }

    // Finds a single product by ID.
    public ResponseDto<Product> findOne(String id) {
        Product product = productRepository.findById(id).orElse(null);

        if (product == null) {
            return new ResponseDto<>(HttpStatus.NOT_FOUND.value(), Messages.PRODUCT_NOT_FOUND, null);
        }

        return new ResponseDto<>(HttpStatus.OK.value(), Messages.PRODUCTS_RETRIEVED, product);
    }

    // Updates an existing product.
    public ResponseDto<Product> update(String id, UpdateProductDto updateProductDto) {
        Product existingProduct = productRepository.findById(id).orElse(null);

        if (existingProduct == null) {
            return new ResponseDto<>(HttpStatus.NOT_FOUND.value(), Messages.PRODUCT_NOT_FOUND, null);
        }

        existingProduct.setName(updateProductDto.getName());
        existingProduct.setDescription(updateProductDto.getDescription());
        existingProduct.setStock(updateProductDto.getStock());
        existingProduct.setPrice(updateProductDto.getPrice());
        existingProduct.setCategory(updateProductDto.getCategory());

        Product updatedProduct = productRepository.save(existingProduct);

        return new ResponseDto<>(HttpStatus.OK.value(), Messages.PRODUCT_UPDATED, updatedProduct);
    }

    //  Removes a product by ID.
    public ResponseDto<Void> remove(String id) {
        Product existingProduct = productRepository.findById(id).orElse(null);

        if (existingProduct == null) {
            return new ResponseDto<>(HttpStatus.NOT_FOUND.value(), Messages.PRODUCT_NOT_FOUND, null);
        }

        productRepository.delete(existingProduct);

        return new ResponseDto<>(HttpStatus.OK.value(), Messages.PRODUCT_DELETED, null);
    }

    // Updates the stock quantity of a product.
    public ResponseDto<Product> updateStock(String productId, int quantity) {
        Optional<Product> productOptional = productRepository.findById(productId);
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            product.setStock(product.getStock() + quantity);
            productRepository.save(product);
            return new ResponseDto<>(HttpStatus.OK.value(), Messages.PRODUCT_UPDATED, product);
        } else {
            return new ResponseDto<>(HttpStatus.NOT_FOUND.value(), Messages.PRODUCT_NOT_FOUND, null);
        }
    }
}
