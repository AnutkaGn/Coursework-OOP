package com.store.courseworkoop.dto;

public class OrderDetailInfo {

    private String id;
    private String productId;
    private int quantity;
    private double priceAtPurchase;
    private ProductInfo product;

    public OrderDetailInfo(String id, String productId, int quantity, double priceAtPurchase, ProductInfo product) {
        this.id = id;
        this.productId = productId;
        this.quantity = quantity;
        this.priceAtPurchase = priceAtPurchase;
        this.product = product;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public double getPriceAtPurchase() { return priceAtPurchase; }
    public void setPriceAtPurchase(double priceAtPurchase) { this.priceAtPurchase = priceAtPurchase; }

    public ProductInfo getProduct() { return product; }
    public void setProduct(ProductInfo product) { this.product = product; }
}
