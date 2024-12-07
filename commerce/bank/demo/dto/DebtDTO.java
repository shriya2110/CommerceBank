package com.commerce.bank.demo.dto;

import java.math.BigDecimal;

public class DebtDTO {
    private String type;
    private BigDecimal amount;
    private BigDecimal interestRate;
    private BigDecimal minPayment;
    private BigDecimal additionalPayment;
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public BigDecimal getAmount() {
		return amount;
	}
	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
	public BigDecimal getInterestRate() {
		return interestRate;
	}
	public void setInterestRate(BigDecimal interestRate) {
		this.interestRate = interestRate;
	}
	public BigDecimal getMinPayment() {
		return minPayment;
	}
	public void setMinPayment(BigDecimal minPayment) {
		this.minPayment = minPayment;
	}
	public BigDecimal getAdditionalPayment() {
		return additionalPayment;
	}
	public void setAdditionalPayment(BigDecimal additionalPayment) {
		this.additionalPayment = additionalPayment;
	}
	@Override
	public String toString() {
		return "DebtDTO [type=" + type + ", amount=" + amount + ", interestRate=" + interestRate + ", minPayment="
				+ minPayment + ", additionalPayment=" + additionalPayment + "]";
	}
    
    
}
