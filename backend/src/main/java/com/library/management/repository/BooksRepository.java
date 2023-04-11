package com.library.management.repository;

import com.library.management.model.Books;
import com.library.management.wrapper.BooksWrapper;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BooksRepository extends JpaRepository<Books, Integer> {

    @Query(value = "SELECT new com.library.management.wrapper.BooksWrapper(b.id,b.title,b.category.id,b.category.name,b.category.subcategory,b.price,b.available,b.ordered,b.count,b.author) FROM Books b")
    public List<BooksWrapper> getAllBooks();

    @Query("Update Books b Set ordered = true, available = false Where b.id = :id")
    @Transactional
    @Modifying
    void orderBook(int id);

    @Transactional
    @Modifying
    @Query("Update Books b Set available = true,ordered = false Where b.id = :bookId")
    void updateBookAvailability(int bookId);


}
