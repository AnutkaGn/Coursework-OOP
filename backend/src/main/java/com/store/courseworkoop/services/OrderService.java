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
    @Autowired
    private ProductRepository productRepository;
    public ResponseDto<PaginatedResponseDto<Order>> getAll(PaymentStatus paymentStatus, DeliveryStatus deliveryStatus, String sortDirection, Integer page, Integer limit, String userId) {
        // Встановлення значень за замовчуванням для page та limit
        page = (page != null) ? page : 1;
        limit = (limit != null) ? limit : 10;

        // Логіка для сортування
        Sort.Direction direction = (sortDirection != null && sortDirection.equalsIgnoreCase("desc")) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page - 1, limit, direction, "createdAt");

        // Виклик репозиторію з фільтрами і пагінацією
        Page<Order> ordersPage = orderRepository.findByFilters(paymentStatus, deliveryStatus, userId, pageable);

        // Якщо ордери не знайдені
        if (ordersPage.isEmpty()) {
            return new ResponseDto<>(HttpStatus.NOT_FOUND.value(), "Orders not found", null);
        }

        // Пакування в PaginatedResponseDto
        PaginatedResponseDto<Order> paginatedResponse = new PaginatedResponseDto<>(ordersPage.getContent(), ordersPage.getTotalElements());

        // Повернення успішної відповіді
        return new ResponseDto<>(HttpStatus.OK.value(), "Orders retrieved", paginatedResponse);
    }


    public ResponseDto<Order> getById(String id) {
        Optional<Order> order = orderRepository.findByIdWithDetails(id);
        if (order.isPresent()) {
            return new ResponseDto<>(HttpStatus.OK.value(), "Order retrieved", order.get());
        } else {
            return new ResponseDto<>(HttpStatus.NOT_FOUND.value(), "Order not found", null);
        }
    }

    public ResponseDto<Order> create(CreateOrderDto createOrderDto) {
        // Знаходимо користувача за ID
        User user = userRepository.findByEmail(createOrderDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Створюємо нове замовлення
        Order order = new Order();
        order.setUser(user);
        order.setTotalAmount(createOrderDto.getTotalAmount());

        // Зберігаємо замовлення
        orderRepository.save(order);

        // Обробляємо деталі замовлення
        System.out.println(createOrderDto.getOrderDetails());
        createOrderDto.getOrderDetails().forEach(detail -> {
            System.out.println(detail.getProductId());
            if (detail.getProductId() == null) {
                throw new RuntimeException("Product is null in OrderDetail");
            }

            CreateOrderDetailsDto orderDetailDto = new CreateOrderDetailsDto(
                    order.getId(),
                    detail.getProductId(),
                    detail.getQuantity(),
                    detail.getPriceAtPurchase()
            );

            orderDetailService.create(orderDetailDto); // Використовуй DTO для створення
            productService.updateStock(detail.getProductId(), -detail.getQuantity());
        });


        return new ResponseDto<>(HttpStatus.CREATED.value(), Messages.ORDER_CREATED, order);
    }


    public ResponseDto<Order> updateOrderDetailQuantity(String id, UpdateOrderDetailsPayload payload) {
        ResponseDto<OrderDetail> orderDetails = orderDetailService.getById(payload.getOrderDetailId());
        int quantityChange = payload.getQuantity() - orderDetails.getData().getQuantity();
        productService.updateStock(orderDetails.getData().getProduct().getId(), -quantityChange);

        // Створюємо об'єкт UpdateOrderDetailsDto
        UpdateOrderDetailsDto updateOrderDetailsDto = new UpdateOrderDetailsDto(payload.getOrderDetailId(), payload.getQuantity());

        // Викликаємо метод для оновлення кількості
        ResponseDto<OrderDetail> response = orderDetailService.updateQuantity(updateOrderDetailsDto);
        OrderDetail orderDetail = response.getData();  // Отримуємо сам OrderDetail

        Order order = orderRepository.findById(id).orElseThrow();
        double totalAmount = recalculateTotalAmount(id);
        order.setTotalAmount(totalAmount);
        orderRepository.save(order);

        return new ResponseDto<>(HttpStatus.OK.value(), "Order updated", order);
    }


    public ResponseDto<Order> updateDeliveryStatus(String id, String deliveryStatus) {
        Order order = orderRepository.findById(id).orElseThrow();
        order.setDeliveryStatus(DeliveryStatus.valueOf(deliveryStatus));
        orderRepository.save(order);
        return new ResponseDto<>(HttpStatus.OK.value(), "Order updated", order);
    }

    public ResponseDto<Order> updatePaymentStatus(String id, String paymentStatus) {
        System.out.println(paymentStatus);
        Order order = orderRepository.findById(id).orElseThrow();
        order.setPaymentStatus(PaymentStatus.valueOf(paymentStatus));
        orderRepository.save(order);
        return new ResponseDto<>(HttpStatus.OK.value(), "Order updated", order);
    }

    public ResponseDto<Order> delete(String id) {
        ResponseDto<List<OrderDetailInfo>> orderDetails = orderDetailService.getByOrderId(id);
        orderDetails.getData().forEach(detail -> productService.updateStock(detail.getProductId(), detail.getQuantity()));
        orderRepository.deleteById(id);
        return new ResponseDto<>(HttpStatus.OK.value(), "Order deleted", null);
    }

    public ResponseDto<Order> deleteOrderDetail(String orderDetailId) {
        // 1. Видалити деталі замовлення
        ResponseDto<OrderDetail> orderDetailResponse = orderDetailService.delete(orderDetailId);
        OrderDetail orderDetail = orderDetailResponse.getData();

        if (orderDetail == null) {
            return new ResponseDto<>(HttpStatus.NOT_FOUND.value(), "Order detail not found", null);
        }

        String orderId = orderDetail.getOrder().getId();

        // 2. Перерахувати загальну суму замовлення після видалення деталей
        double totalAmount = recalculateTotalAmount(orderId);

        // 3. Оновити запаси продукту після видалення
        productService.updateStock(orderDetail.getProduct().getId(), orderDetail.getQuantity());

        // 4. Якщо сума = 0, видалити замовлення
        if (totalAmount == 0) {
            this.delete(orderId);
            return new ResponseDto<>(HttpStatus.OK.value(), "Order deleted", null);
        } else {
            // 5. Якщо сума > 0, оновити замовлення
            Order updatedOrder = orderRepository.findById(orderId)
                    .map(order -> {
                        order.setTotalAmount(totalAmount);
                        return orderRepository.save(order);
                    })
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

            return new ResponseDto<>(HttpStatus.OK.value(), "Order updated", updatedOrder);
        }
    }

    private double recalculateTotalAmount(String orderId) {
        List<OrderDetailInfo> orderDetails = orderDetailService.getByOrderId(orderId).getData();

        if (orderDetails != null && !orderDetails.isEmpty()) {
            double totalAmount = orderDetails.stream()
                    .mapToDouble(detail -> detail.getQuantity() * detail.getPriceAtPurchase())
                    .sum();
            System.out.println(totalAmount);
            return Math.round(totalAmount * 100.0) / 100.0;  // Округлення до двох знаків після коми
        } else {
            return 0;
        }
    }

}
