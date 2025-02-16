package com.store.courseworkoop.repositories;

import com.store.courseworkoop.models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {

    // З підтримкою пагінації для пошуку за частковим іменем
    Page<Product> findByNameContainingIgnoreCase(String name, PageRequest pageRequest);

    // З підтримкою пагінації для пошуку за категорією
    Page<Product> findByCategory(String category, PageRequest pageRequest);

    // З підтримкою пагінації для сортування за ціною по зростанню
    Page<Product> findAllByOrderByPriceAsc(PageRequest pageRequest);

    // З підтримкою пагінації для сортування за ціною по спаданню
    Page<Product> findAllByOrderByPriceDesc(PageRequest pageRequest);

    // Метод для підрахунку всіх продуктів
    long count();
}
