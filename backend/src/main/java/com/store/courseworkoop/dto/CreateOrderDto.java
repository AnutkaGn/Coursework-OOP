package com.store.courseworkoop.dto;

import com.store.courseworkoop.models.OrderDetail;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class CreateOrderDto {
    @NotNull
    private String userId;

    @NotNull
    private double totalAmount;

    @NotNull
    private List<CreateOrderDetailsDto> orderDetails;

    // Getters and Setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public List<CreateOrderDetailsDto> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(List<CreateOrderDetailsDto> orderDetails) {
        this.orderDetails = orderDetails;
    }
}