package com.commerce.bank.demo.dto;

import java.util.List;

public class TrendsResponse {
    private List<MonthlySpending> monthlySpending;
    private List<String> suggestions;
	public List<MonthlySpending> getMonthlySpending() {
		return monthlySpending;
	}
	public void setMonthlySpending(List<MonthlySpending> monthlySpending) {
		this.monthlySpending = monthlySpending;
	}
	public List<String> getSuggestions() {
		return suggestions;
	}
	public void setSuggestions(List<String> suggestions) {
		this.suggestions = suggestions;
	}

    // Getters and setters
    
}

