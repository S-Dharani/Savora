package com.savora.api;

import com.savora.model.*;
import com.savora.repo.*;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
public class CatalogController {
  final RestaurantRepo restaurants;
  final FoodRepo foods;
  final CategoryRepo categories;

  public CatalogController(RestaurantRepo r, FoodRepo f, CategoryRepo c) {
    restaurants = r;
    foods = f;
    categories = c;
  }

  @GetMapping("/home")
  Api<?> home() {
    return Api.ok(Map.of(
        "restaurants", restaurants.findAll(PageRequest.of(0, 6, Sort.by("rating").descending())).getContent(),
        "foods", foods.findAll(PageRequest.of(0, 8, Sort.by("rating").descending())).getContent(),
        "categories", categories.findAll()));
  }

  @GetMapping("/categories")
  Api<?> categories() { return Api.ok(categories.findAll()); }

  @GetMapping("/restaurants")
  Api<?> list(@RequestParam(defaultValue="") String q, @RequestParam(defaultValue="0") int page,
              @RequestParam(defaultValue="rating,desc") String sort) {
    String[] s = sort.split(",");
    return Api.ok(restaurants.findByActiveTrueAndNameContainingIgnoreCaseOrActiveTrueAndCuisineContainingIgnoreCase(
        q, q, PageRequest.of(page, 12, Sort.by(Sort.Direction.fromString(s.length > 1 ? s[1] : "desc"), s[0]))));
  }

  @GetMapping("/restaurants/{slug}")
  Api<?> restaurant(@PathVariable String slug) {
    var r = restaurants.findBySlug(slug).orElseThrow(() -> new NoSuchElementException("Restaurant not found"));
    return Api.ok(Map.of("restaurant", r, "foods", foods.findByRestaurantIdAndAvailableTrue(r.id)));
  }

  @GetMapping("/foods")
  Api<?> listFoods(@RequestParam(defaultValue="") String q, @RequestParam(defaultValue="0") int page) {
    return Api.ok(foods.findByAvailableTrueAndNameContainingIgnoreCase(
        q, PageRequest.of(page, 20, Sort.by("rating").descending())));
  }

  @GetMapping("/foods/{id}")
  Api<?> food(@PathVariable Long id) {
    var f = foods.findById(id).orElseThrow(() -> new NoSuchElementException("Food not found"));
    return Api.ok(Map.of("food", f, "related", foods.findByRestaurantIdAndAvailableTrue(f.restaurant.id)));
  }
}
