package com.commerce.bank.demo.dto;

import java.math.BigDecimal;

public class IncomeSourceDTO {
	private Long id;
    private Long budgetId; // Added budgetId to link the income to a specific budget
    private String sourceName;
    private BigDecimal amount;
    // Getters and setters
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getBudgetId() {
		return budgetId;
	}
	public void setBudgetId(Long budgetId) {
		this.budgetId = budgetId;
	}
	public String getSourceName() {
		return sourceName;
	}
	public void setSourceName(String sourceName) {
		this.sourceName = sourceName;
	}
	public BigDecimal getAmount() {
		return amount;
	}
	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
    
}
