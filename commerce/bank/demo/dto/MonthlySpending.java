package com.commerce.bank.demo.dto;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

public class MonthlySpending {
    private int month;
    private Map<String, BigDecimal> categorySpending;
    
    public MonthlySpending(int month) {
        this.month = month;
        this.categorySpending = new HashMap<>(); // Initialize with an empty map
    }

    public MonthlySpending(int month, String category, BigDecimal amount) {
        this.month = month;
        this.categorySpending = new HashMap<>();
        this.categorySpending.put(category, amount);
    }

	public int getMonth() {
		return month;
	}

	public void setMonth(int month) {
		this.month = month;
	}

	public Map<String, BigDecimal> getCategorySpending() {
		return categorySpending;
	}

	public void setCategorySpending(Map<String, BigDecimal> categorySpending) {
		this.categorySpending = categorySpending;
	}

    // Getters and setters
    
    
}
