package com.store.courseworkoop.dto;

import com.store.courseworkoop.enums.SortOrder;

public class GetProductsQueryDto {

    private String name;
    private SortOrder sortByPrice;
    private Integer page = 1;
    private Integer limit = 10;

    public GetProductsQueryDto(String name, SortOrder sortByPrice, Integer page, Integer limit) {
        this.name = name;
        this.sortByPrice = sortByPrice;
        this.page = page;
        this.limit = limit;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public SortOrder getSortByPrice() {
        return sortByPrice;
    }

    public void setSortByPrice(SortOrder sortByPrice) {
        this.sortByPrice = sortByPrice;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getLimit() {
        return limit;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }
}
