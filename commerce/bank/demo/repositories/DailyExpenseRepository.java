package com.commerce.bank.demo.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.commerce.bank.demo.dto.MonthlySpending;
import com.commerce.bank.demo.models.DailyExpense;
import com.commerce.bank.demo.models.User;

@Repository
public interface DailyExpenseRepository extends JpaRepository<DailyExpense, Long> {
    
    List<DailyExpense> findByUserAndExpenseDate(User user, LocalDate date)	;
    
    @Query("SELECT \r\n"
    		+ "    new com.commerce.bank.demo.dto.MonthlySpending(MONTH(e.expenseDate), e.category, SUM(e.amount)) \r\n"
    		+ "FROM \r\n"
    		+ "    com.commerce.bank.demo.models.DailyExpense e \r\n"
    		+ "WHERE \r\n"
    		+ "    e.user = :user AND YEAR(e.expenseDate) = :year \r\n"
    		+ "GROUP BY \r\n"
    		+ "    MONTH(e.expenseDate), e.category \r\n"
    		+ "ORDER BY \r\n"
    		+ "    MIN(e.expenseDate) ")
    List<MonthlySpending> getMonthWiseSpending(@Param("user") User user, @Param("year") int year);

}

