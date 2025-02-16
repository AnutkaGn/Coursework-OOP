package com.store.courseworkoop.controllers;

import com.store.courseworkoop.dto.*;
import com.store.courseworkoop.dto.CreateOrderDto;
import com.store.courseworkoop.dto.ResponseDto;
import com.store.courseworkoop.dto.CreateOrderDto;
import com.store.courseworkoop.dto.ResponseDto;
import com.store.courseworkoop.enums.DeliveryStatus;
import com.store.courseworkoop.enums.PaymentStatus;
import com.store.courseworkoop.models.Order;
import com.store.courseworkoop.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<ResponseDto<PaginatedResponseDto<Order>>> getAll(
            @RequestParam(required = false) PaymentStatus paymentStatus,
            @RequestParam(required = false) DeliveryStatus deliveryStatus,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "DESC") String sortDirection,
            @AuthenticationPrincipal String userId) {
        return new ResponseEntity<>(orderService.getAll(paymentStatus, deliveryStatus, sortDirection, page, limit, userId), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseDto<Order>> getById(@PathVariable String id) {
        return new ResponseEntity<>(orderService.getById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ResponseDto<Order>> create(@RequestBody CreateOrderDto createOrderDto,
                                                     @AuthenticationPrincipal String userId) {
        System.out.println(userId);
        createOrderDto.setUserId(userId);
        return new ResponseEntity<>(orderService.create(createOrderDto), HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ResponseDto<Order>> updateOrderDetailsQuantity(
            @PathVariable String id,
            @RequestBody UpdateOrderDetailsPayload payload) {
        return new ResponseEntity<>(orderService.updateOrderDetailQuantity(id, payload), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/delivery-status/{id}")
    public ResponseEntity<ResponseDto<Order>> updateDeliveryStatus(
            @PathVariable String id,
            @RequestBody UpdateDeliveryStatusPayload payload) {
        return new ResponseEntity<>(orderService.updateDeliveryStatus(id, payload.getDeliveryStatus()), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/payment-status/{id}")
    public ResponseEntity<ResponseDto<Order>> updatePaymentStatus(
            @PathVariable String id,
            @RequestBody UpdatePaymentStatusPayload payload) {
        return new ResponseEntity<>(orderService.updatePaymentStatus(id, payload.getPaymentStatus()), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseDto<Order>> delete(@PathVariable String id) {
        return new ResponseEntity<>(orderService.delete(id), HttpStatus.OK);
    }

    @DeleteMapping("/order-details/{id}")
    public ResponseEntity<ResponseDto<Order>> deleteOrderDetail(@PathVariable String id) {
        return new ResponseEntity<>(orderService.deleteOrderDetail(id), HttpStatus.OK);
    }
}
