package com.store.courseworkoop.repositories;

import com.store.courseworkoop.enums.DeliveryStatus;
import com.store.courseworkoop.enums.PaymentStatus;
import com.store.courseworkoop.models.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {



    @Query("SELECT o FROM Order o " +
            "WHERE (:paymentStatus IS NULL OR o.paymentStatus = :paymentStatus) " +
            "AND (:deliveryStatus IS NULL OR o.deliveryStatus = :deliveryStatus) " +
            "AND (:userEmail IS NULL OR o.user.email = :userEmail)")
    Page<Order> findByFilters(@Param("paymentStatus") PaymentStatus paymentStatus,
                              @Param("deliveryStatus") DeliveryStatus deliveryStatus,
                              @Param("userEmail") String userEmail,
                              Pageable pageable);

    @Query("SELECT DISTINCT o FROM Order o LEFT JOIN FETCH o.orderDetails WHERE o.id = :id")
    Optional<Order> findByIdWithDetails(@Param("id") String id);
}

