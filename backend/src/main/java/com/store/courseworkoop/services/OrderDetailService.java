package com.store.courseworkoop.services;

import com.store.courseworkoop.constants.Messages;
import com.store.courseworkoop.dto.*;
import com.store.courseworkoop.models.Order;
import com.store.courseworkoop.models.OrderDetail;
import com.store.courseworkoop.models.Product;
import com.store.courseworkoop.repositories.OrderDetailRepository;
import com.store.courseworkoop.repositories.OrderRepository;
import com.store.courseworkoop.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderDetailService {

    @Autowired
    private OrderDetailRepository orderDetailRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private OrderRepository orderRepository;

    // Creates a new OrderDetail entry.
    public ResponseDto<Void> create(CreateOrderDetailsDto data) {
        try {
            // Find the order by ID
            Order order = orderRepository.findById(data.getOrderId())
                .orElseThrow(() ->  new ResponseStatusException(HttpStatus.NOT_FOUND, Messages.ORDER_NOT_FOUND));
            // Find the product by ID
            Product product = productRepository.findById(data.getProductId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, Messages.PRODUCT_NOT_FOUND));
            // Create new OrderDetail and save it
            OrderDetail orderDetail = new OrderDetail(order, product, data.getQuantity(), data.getPriceAtPurchase());
            orderDetailRepository.save(orderDetail);

            return new ResponseDto<>(HttpStatus.CREATED.value(), Messages.ORDER_CREATED, null);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, Messages.ORDER_CREATION_FAILED);
        }
    }

    // Retrieves an OrderDetail by its ID.
    public ResponseDto<OrderDetail> getById(String id) {
        OrderDetail orderDetail = orderDetailRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, Messages.ORDER_DETAILS_NOT_FOUND));

        return new ResponseDto<>(HttpStatus.OK.value(), Messages.ORDER_RETRIEVED, orderDetail);
    }

    //  Retrieves all OrderDetails for a specific order ID.
    public ResponseDto<List<OrderDetailInfo>> getByOrderId(String orderId) {
        // Fetch all OrderDetails associated with the given order ID
        List<OrderDetail> orderDetails = orderDetailRepository.findByOrderId(orderId);
        // Convert OrderDetail entities to DTOs
        List<OrderDetailInfo> orderDetailInfos = orderDetails.stream().map(orderDetail -> {
            // Retrieve product details
            Product product = productRepository.findById(orderDetail.getProduct().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, Messages.PRODUCT_NOT_FOUND));
            // Create ProductInfo DTO
            ProductInfo productInfo = new ProductInfo(product.getName(), product.getDescription(),
                    product.getPrice(), product.getStock(), product.getCategory());
            // Create OrderDetailInfo DTO
            return new OrderDetailInfo(orderDetail.getId(), orderDetail.getProduct().getId(), orderDetail.getQuantity(),
                    orderDetail.getPriceAtPurchase(), productInfo);
        }).collect(Collectors.toList());

        return new ResponseDto<>(HttpStatus.OK.value(), Messages.ORDER_RETRIEVED, orderDetailInfos);
    }

    //  Updates the quantity of an existing OrderDetail.
    public ResponseDto<OrderDetail> updateQuantity(UpdateOrderDetailsDto data) {
        // Find the existing OrderDetail by ID
        OrderDetail existingOrderDetail = orderDetailRepository.findById(data.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, Messages.ORDER_DETAILS_NOT_FOUND));

        existingOrderDetail.setQuantity(data.getQuantity());
        orderDetailRepository.save(existingOrderDetail);

        return new ResponseDto<>(HttpStatus.OK.value(), Messages.ORDER_UPDATED, existingOrderDetail);
    }

    //  Deletes an OrderDetail by its ID.
    public ResponseDto<OrderDetail> delete(String id) {
        // Find OrderDetail before deletion
        Optional<OrderDetail> optionalOrderDetail = orderDetailRepository.findById(id);

        if (optionalOrderDetail.isEmpty()) {
            return new ResponseDto<>(HttpStatus.NOT_FOUND.value(), Messages.ORDER_NOT_FOUND, null);
        }

        OrderDetail orderDetail = optionalOrderDetail.get();

        // Delete the OrderDetail from the database
        orderDetailRepository.deleteById(id);

        // Повернути видалений об'єкт
        return new ResponseDto<>(HttpStatus.OK.value(), Messages.ORDER_DELETED, orderDetail);
    }
}
