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

    public ResponseDto<Void> create(CreateOrderDetailsDto data) {
        try {
            Order order = orderRepository.findById(data.getOrderId()).orElseThrow(() ->  new ResponseStatusException(HttpStatus.NOT_FOUND, Messages.ORDER_NOT_FOUND));
            System.out.println(order);
            Product product = productRepository.findById(data.getProductId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, Messages.PRODUCT_NOT_FOUND));
            System.out.println(product);
            OrderDetail orderDetail = new OrderDetail(order, product, data.getQuantity(), data.getPriceAtPurchase());
            orderDetailRepository.save(orderDetail);

            return new ResponseDto<>(HttpStatus.CREATED.value(), Messages.ORDER_CREATED, null);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, Messages.ORDER_CREATION_FAILED);
        }
    }

    public ResponseDto<OrderDetail> getById(String id) {
        OrderDetail orderDetail = orderDetailRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, Messages.ORDER_DETAILS_NOT_FOUND));

        return new ResponseDto<>(HttpStatus.OK.value(), Messages.ORDER_RETRIEVED, orderDetail);
    }

    public ResponseDto<List<OrderDetailInfo>> getByOrderId(String orderId) {
        List<OrderDetail> orderDetails = orderDetailRepository.findByOrderId(orderId);
        List<OrderDetailInfo> orderDetailInfos = orderDetails.stream().map(orderDetail -> {
            Product product = productRepository.findById(orderDetail.getProduct().getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, Messages.PRODUCT_NOT_FOUND));

            ProductInfo productInfo = new ProductInfo(product.getName(), product.getDescription(),
                    product.getPrice(), product.getStock(), product.getCategory());

            return new OrderDetailInfo(orderDetail.getId(), orderDetail.getProduct().getId(), orderDetail.getQuantity(),
                    orderDetail.getPriceAtPurchase(), productInfo);
        }).collect(Collectors.toList());

        return new ResponseDto<>(HttpStatus.OK.value(), Messages.ORDER_RETRIEVED, orderDetailInfos);
    }

    public ResponseDto<OrderDetail> updateQuantity(UpdateOrderDetailsDto data) {
        OrderDetail existingOrderDetail = orderDetailRepository.findById(data.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, Messages.ORDER_DETAILS_NOT_FOUND));

        existingOrderDetail.setQuantity(data.getQuantity());
        orderDetailRepository.save(existingOrderDetail);

        return new ResponseDto<>(HttpStatus.OK.value(), Messages.ORDER_UPDATED, existingOrderDetail);
    }

    public ResponseDto<OrderDetail> delete(String id) {
        // Знайти OrderDetail перед видаленням
        Optional<OrderDetail> optionalOrderDetail = orderDetailRepository.findById(id);

        if (optionalOrderDetail.isEmpty()) {
            return new ResponseDto<>(HttpStatus.NOT_FOUND.value(), "Order detail not found", null);
        }

        OrderDetail orderDetail = optionalOrderDetail.get();

        // Видалити OrderDetail з бази даних
        orderDetailRepository.deleteById(id);

        // Повернути видалений об'єкт
        return new ResponseDto<>(HttpStatus.OK.value(), Messages.ORDER_DELETED, orderDetail);
    }
}
