package ru.kata.spring.boot_security.demo.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.persistence.Id;
import java.util.Collection;
import java.util.Set;

@Controller
@RequestMapping(value = "/admin")
public class AdminController {
    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public String getAdminPanel(@AuthenticationPrincipal User user, Role role, Model model, @ModelAttribute("newUser") User newUser) {
        model.addAttribute("allUsers", userService.allUsers());
        model.addAttribute("allRoles", userService.allRoles());
        model.addAttribute("authorisedUser", user);
        model.addAttribute("authorisedRoles", role);
        return "admin";
    }

    @PostMapping()
    public String create(@ModelAttribute("newUser") User user, @RequestParam(value = "roles") Collection<Role> roles) {
        userService.saveUser(user, roles);
        return "redirect:/admin";
    }

    @GetMapping("/{id}")
    public String edit(@ModelAttribute("user") User user, Model model, @PathVariable("id") Long id) {
        model.addAttribute("user", userService.findUserById(id));
        model.addAttribute("allUsers", userService.allUsers());
        model.addAttribute("allRoles", userService.allRoles());
        return "admin";
    }

    @PostMapping("/{id}")
    public String update(@ModelAttribute("user") User user, @RequestParam(value = "roles") Collection<Role> roles) {
        userService.saveUser(user, roles);
        return "redirect:/admin";
    }

    @GetMapping("/{id}/delete")
    public String delete(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }
}
