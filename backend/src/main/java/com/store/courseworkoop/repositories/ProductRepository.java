package com.store.courseworkoop.repositories;

import com.store.courseworkoop.models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {

    Page<Product> findByNameContainingIgnoreCase(String name, PageRequest pageRequest);
    // Method for counting all products
    long count();
}
