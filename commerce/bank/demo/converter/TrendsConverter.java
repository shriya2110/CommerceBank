package com.commerce.bank.demo.converter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.commerce.bank.demo.dto.MonthlySpending;
import com.commerce.bank.demo.dto.TrendsResponse;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class TrendsConverter {

    public static List<MonthlySpending> convertTrendsResponse(TrendsResponse trendsResponse) {
        List<MonthlySpending> result = new ArrayList<>();
        Map<Integer, MonthlySpending> monthlyMap = new HashMap<>();

        // Loop through each entry in the TrendsResponse
        for (MonthlySpending spending : trendsResponse.getMonthlySpending()) {
            int month = spending.getMonth();
            Map<String, BigDecimal> categorySpending = spending.getCategorySpending();

            // Check if the month already exists in the map
            if (!monthlyMap.containsKey(month)) {
                // Create a new MonthlySpending object for the month with an empty category map
                monthlyMap.put(month, new MonthlySpending(month));
            }

            // Aggregate spending for each category in the current entry
            for (Map.Entry<String, BigDecimal> entry : categorySpending.entrySet()) {
                String category = entry.getKey();
                BigDecimal amount = entry.getValue();

                // Skip adding if the category is an empty string
                if (!category.isEmpty()) {
                    // Add spending to the corresponding month
                    MonthlySpending monthlySpending = monthlyMap.get(month);
                    // Update category spending
                    monthlySpending.getCategorySpending().merge(category, amount, BigDecimal::add);
                }
            }
        }

        // Collect the results from the map
        result.addAll(monthlyMap.values());

        return result;
    }
    
    
}