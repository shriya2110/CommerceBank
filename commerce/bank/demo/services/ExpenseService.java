package com.commerce.bank.demo.services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.commerce.bank.demo.dto.DailyExpenseDTO;
import com.commerce.bank.demo.dto.MonthlySpending;
import com.commerce.bank.demo.dto.SavingGoalDTO;
import com.commerce.bank.demo.dto.TrendsResponse;
import com.commerce.bank.demo.models.DailyExpense;
import com.commerce.bank.demo.models.SavingGoal;
import com.commerce.bank.demo.models.User;
import com.commerce.bank.demo.repositories.DailyExpenseRepository;
import com.commerce.bank.demo.repositories.UserRepository;

@Service
public class ExpenseService {

	@Autowired
	DailyExpenseRepository dailyExpenseRepository;
	
	@Autowired
	UserRepository userRepository;
	
	//This method is to save or update the Daily expense
	public void saveDailyExpense(List<DailyExpenseDTO> dailyExpenseDTOList, Long userId) throws Exception {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new Exception("User not found"));
		
		// Save saving goals
        for (DailyExpenseDTO dailyExpenseDTO : dailyExpenseDTOList) {
            DailyExpense dailyExpense = dailyExpenseDTO.getId() != null ? 
            		dailyExpenseRepository.findById(dailyExpenseDTO.getId()).orElse(new DailyExpense()) 
            		: new DailyExpense();
            dailyExpense.setCategory(dailyExpenseDTO.getCategory());
            dailyExpense.setDescription(dailyExpenseDTO.getDescription());
            dailyExpense.setAmount(dailyExpenseDTO.getAmount());
            dailyExpense.setExpenseDate(dailyExpenseDTO.getExpenseDate());
            dailyExpense.setUser(user); //Associate with the current user
            dailyExpenseRepository.save(dailyExpense);
        }
	}
	
	public List<DailyExpenseDTO> getDailyExpenseByDate(Long userId, LocalDate date) throws Exception{
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new Exception("User not found"));
		
		//Fetch daily expense
		List<DailyExpense> dailyExpenseList = dailyExpenseRepository.findByUserAndExpenseDate(user, date);
		
		//Return null if no daily expense is found for the given user and date
		if(CollectionUtils.isEmpty(dailyExpenseList)) {
			return null;
		}
		
		List<DailyExpenseDTO> dailyExpenseDTOList = dailyExpenseList
				.stream()
				.map(dailyExpense -> {	
					DailyExpenseDTO dailyExpenseDTO = new DailyExpenseDTO();
					dailyExpenseDTO.setId(dailyExpense.getId());
					dailyExpenseDTO.setUserId(userId);
					dailyExpenseDTO.setCategory(dailyExpense.getCategory());
					dailyExpenseDTO.setDescription(dailyExpense.getDescription());
					dailyExpenseDTO.setExpenseDate(dailyExpense.getExpenseDate());
					dailyExpenseDTO.setAmount(dailyExpense.getAmount());
					return dailyExpenseDTO;
		}).collect(Collectors.toList());
		
		return dailyExpenseDTOList;
	}
	
	public TrendsResponse getUserSpendingTrends(Long userId) throws Exception {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new Exception("User not found"));
		int currentYear = LocalDate.now().getYear();
        List<MonthlySpending> monthlySpending = dailyExpenseRepository.getMonthWiseSpending(user,currentYear);
        List<String> suggestions = generateCostReductionSuggestions(monthlySpending);

        TrendsResponse trendsResponse = new TrendsResponse();
        trendsResponse.setMonthlySpending(monthlySpending);
        trendsResponse.setSuggestions(suggestions);

        return trendsResponse;
    }

    // Generate cost reduction suggestions based on user spending habits
    private List<String> generateCostReductionSuggestions(List<MonthlySpending> monthlySpending) {
        List<String> suggestions = new ArrayList<>();

        // Example: Suggest cost reduction for categories where user is consistently overspending
        Map<String, BigDecimal> categoryTotals = new HashMap<>();

        for (MonthlySpending spending : monthlySpending) {
            spending.getCategorySpending().forEach((category, amount) -> {
                categoryTotals.put(category, categoryTotals.getOrDefault(category, BigDecimal.valueOf(0.0)).add(amount));
            });
        }

        return suggestions;
    }
}
