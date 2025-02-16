package com.store.courseworkoop.services;


import com.store.courseworkoop.constants.Messages;
import com.store.courseworkoop.dto.*;
import com.store.courseworkoop.dto.CreateOrderDto;
import com.store.courseworkoop.dto.ResponseDto;
import com.store.courseworkoop.enums.DeliveryStatus;
import com.store.courseworkoop.enums.PaymentStatus;
import com.store.courseworkoop.models.Order;
import com.store.courseworkoop.models.OrderDetail;
import com.store.courseworkoop.models.Product;
import com.store.courseworkoop.models.User;
import com.store.courseworkoop.repositories.OrderRepository;
import com.store.courseworkoop.repositories.ProductRepository;
import com.store.courseworkoop.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailService orderDetailService;

    @Autowired
    private ProductService productService;

    @Autowired
    private UserRepository userRepository;

    //Retrieves all orders with optional filtering, sorting, and pagination.
    public ResponseDto<PaginatedResponseDto<Order>> getAll(PaymentStatus paymentStatus, DeliveryStatus deliveryStatus, String sortDirection, Integer page, Integer limit, String userId) {
        page = (page != null) ? page : 1;
        limit = (limit != null) ? limit : 10;

        // Sorting logic
        Sort.Direction direction = (sortDirection != null && sortDirection.equalsIgnoreCase("desc")) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page - 1, limit, direction, "createdAt");

        // Calling a repository with filters and pagination
        Page<Order> ordersPage = orderRepository.findByFilters(paymentStatus, deliveryStatus, userId, pageable);

        if (ordersPage.isEmpty()) {
            return new ResponseDto<>(HttpStatus.NOT_FOUND.value(), Messages.ORDER_NOT_FOUND, null);
        }

        // Packaging in PaginatedResponseDto
        PaginatedResponseDto<Order> paginatedResponse = new PaginatedResponseDto<>(ordersPage.getContent(), ordersPage.getTotalElements());

        return new ResponseDto<>(HttpStatus.OK.value(), Messages.ORDER_RETRIEVED, paginatedResponse);
    }

    // Retrieves an order by its ID.
    public ResponseDto<Order> getById(String id) {
        Optional<Order> order = orderRepository.findByIdWithDetails(id);
        if (order.isPresent()) {
            return new ResponseDto<>(HttpStatus.OK.value(), Messages.ORDER_RETRIEVED, order.get());
        } else {
            return new ResponseDto<>(HttpStatus.NOT_FOUND.value(), Messages.ORDER_NOT_FOUND, null);
        }
    }

    // Creates a new order and its order details.
    public ResponseDto<Order> create(CreateOrderDto createOrderDto) {
        // Find a user by ID
        User user = userRepository.findByEmail(createOrderDto.getUserId())
                .orElseThrow(() -> new RuntimeException(Messages.ORDER_NOT_FOUND));

        // Creating a new order
        Order order = new Order();
        order.setUser(user);
        order.setTotalAmount(createOrderDto.getTotalAmount());

        orderRepository.save(order);

        // Processing order details
        createOrderDto.getOrderDetails().forEach(detail -> {
            CreateOrderDetailsDto orderDetailDto = new CreateOrderDetailsDto(
                    order.getId(),
                    detail.getProductId(),
                    detail.getQuantity(),
                    detail.getPriceAtPurchase()
            );

            orderDetailService.create(orderDetailDto);
            productService.updateStock(detail.getProductId(), -detail.getQuantity());
        });


        return new ResponseDto<>(HttpStatus.CREATED.value(), Messages.ORDER_CREATED, order);
    }

    // Updates the quantity of an order detail and recalculates the total order amount.
    public ResponseDto<Order> updateOrderDetailQuantity(String id, UpdateOrderDetailsPayload payload) {
        ResponseDto<OrderDetail> orderDetails = orderDetailService.getById(payload.getOrderDetailId());
        int quantityChange = payload.getQuantity() - orderDetails.getData().getQuantity();
        productService.updateStock(orderDetails.getData().getProduct().getId(), -quantityChange);

        UpdateOrderDetailsDto updateOrderDetailsDto = new UpdateOrderDetailsDto(payload.getOrderDetailId(), payload.getQuantity());

        // Call the method to update the quantity
        ResponseDto<OrderDetail> response = orderDetailService.updateQuantity(updateOrderDetailsDto);

        Order order = orderRepository.findById(id).orElseThrow();
        double totalAmount = recalculateTotalAmount(id);
        order.setTotalAmount(totalAmount);
        orderRepository.save(order);

        return new ResponseDto<>(HttpStatus.OK.value(), Messages.ORDER_UPDATED, order);
    }

    //  Updates the delivery status of an order.
    public ResponseDto<Order> updateDeliveryStatus(String id, String deliveryStatus) {
        Order order = orderRepository.findById(id).orElseThrow();
        order.setDeliveryStatus(DeliveryStatus.valueOf(deliveryStatus));
        orderRepository.save(order);
        return new ResponseDto<>(HttpStatus.OK.value(), Messages.ORDER_UPDATED, order);
    }

    // Updates the payment status of an order.
    public ResponseDto<Order> updatePaymentStatus(String id, String paymentStatus) {
        Order order = orderRepository.findById(id).orElseThrow();
        order.setPaymentStatus(PaymentStatus.valueOf(paymentStatus));
        orderRepository.save(order);
        return new ResponseDto<>(HttpStatus.OK.value(), Messages.ORDER_UPDATED, order);
    }

    // Deletes an order and restores product stock.
    public ResponseDto<Order> delete(String id) {
        ResponseDto<List<OrderDetailInfo>> orderDetails = orderDetailService.getByOrderId(id);
        orderDetails.getData().forEach(detail -> productService.updateStock(detail.getProductId(), detail.getQuantity()));
        orderRepository.deleteById(id);
        return new ResponseDto<>(HttpStatus.OK.value(), Messages.ORDER_UPDATED, null);
    }

    // Deletes an order detail, updates product stock, and recalculates order amount.
    public ResponseDto<Order> deleteOrderDetail(String orderDetailId) {
        // Delete order details
        ResponseDto<OrderDetail> orderDetailResponse = orderDetailService.delete(orderDetailId);
        OrderDetail orderDetail = orderDetailResponse.getData();

        if (orderDetail == null) {
            return new ResponseDto<>(HttpStatus.NOT_FOUND.value(), Messages.ORDER_NOT_FOUND, null);
        }

        String orderId = orderDetail.getOrder().getId();

        // Recalculate the total order amount after removing details
        double totalAmount = recalculateTotalAmount(orderId);

        // Update product inventory after deletion
        productService.updateStock(orderDetail.getProduct().getId(), orderDetail.getQuantity());

        // If amount = 0, delete the order
        if (totalAmount == 0) {
            this.delete(orderId);
            return new ResponseDto<>(HttpStatus.OK.value(), Messages.ORDER_DELETED, null);
        } else {
            // If sum > 0, update order
            Order updatedOrder = orderRepository.findById(orderId)
                    .map(order -> {
                        order.setTotalAmount(totalAmount);
                        return orderRepository.save(order);
                    })
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, Messages.ORDER_NOT_FOUND));

            return new ResponseDto<>(HttpStatus.OK.value(), Messages.ORDER_UPDATED, updatedOrder);
        }
    }

    // Recalculates the total amount of an order.
    private double recalculateTotalAmount(String orderId) {
        List<OrderDetailInfo> orderDetails = orderDetailService.getByOrderId(orderId).getData();

        if (orderDetails != null && !orderDetails.isEmpty()) {
            double totalAmount = orderDetails.stream()
                    .mapToDouble(detail -> detail.getQuantity() * detail.getPriceAtPurchase())
                    .sum();
            return Math.round(totalAmount * 100.0) / 100.0;  // Round to two decimal places
        } else {
            return 0;
        }
    }

}
