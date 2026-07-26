package com.savora;
import org.springframework.boot.SpringApplication; import org.springframework.boot.autoconfigure.SpringBootApplication; import org.springframework.cache.annotation.EnableCaching;
@SpringBootApplication @EnableCaching public class SavoraApplication { public static void main(String[] args){SpringApplication.run(SavoraApplication.class,args);} }
