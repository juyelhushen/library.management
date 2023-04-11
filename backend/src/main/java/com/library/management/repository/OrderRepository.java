package com.library.management.repository;

import com.library.management.model.Order;
import com.library.management.wrapper.OrderResponse;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    @Query("Select new com.library.management.wrapper.OrderResponse(o.id,o.user.id,CONCAT(o.user.firstname,' ',o.user.lastname),o.books.id,o.books.title,o.orderedOn,o.returned) from Order o Where o.user.id = :id")
    public List<OrderResponse> orderList(@Param("id") int id);

    @Query("Select new com.library.management.wrapper.OrderResponse(o.id,o.user.id,CONCAT(o.user.firstname,' ',o.user.lastname),o.books.id,o.books.title,o.orderedOn,o.returned) from Order o")
    public List<OrderResponse> allOrderList();

    @Transactional
    @Modifying
    @Query("UPDATE Order o SET returned = true WHERE o.books.id = :bookId AND o.user.id = :userId")
    void returnUpdate(int bookId, int userId);

    @Query("SELECT new com.library.management.wrapper.OrderResponse(o.user.id,o.books.id,o.orderedOn,o.returned) FROM Order o WHERE o.user.id = :userId")
    List<OrderResponse> getOrderByUserId(long userId);
}
