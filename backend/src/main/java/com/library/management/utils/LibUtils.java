package com.library.management.utils;

import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Slf4j
@NoArgsConstructor
public class LibUtils {

    public static ResponseEntity<String> getResponse(String responseMes, HttpStatus httpStatus) {
        return new ResponseEntity<String>("{\"message\":\""+responseMes+"\"}",httpStatus);
    }


}
