package com.kb.eta;

import org.springframework.stereotype.Controller;
// import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ETAWebController {

        @GetMapping("/")
        public String homePage() {
            // This will look for the 'index.html' in the resources/templates directory for Thymeleaf
            // Or in resources/static if using static content like plain HTML
            return "index";
        }

        /*@GetMapping("/input")
        public String showForm() {
            // This will look for the 'input.html' in the resources/templates directory for Thymeleaf
            // Or in resources/static if using static content like plain HTML
            return "input";
        }*/

        @GetMapping("/ticker")
        public String showTickerForm() {
            // This will look for the 'ticker.html' in the resources/templates directory for Thymeleaf
            // Or in resources/static if using static content like plain HTML
            return "ticker";
        }

        @GetMapping("/stock-details")
        public String showDetailsForm() {
            // This will look for the 'ticker-details.html' in the resources/templates directory for Thymeleaf
            // Or in resources/static if using static content like plain HTML
            return "stock-details";
        }

        @GetMapping("/stockchart")
        public String showStockChart() {
            // This will look for the 'ticker-details.html' in the resources/templates directory for Thymeleaf
            // Or in resources/static if using static content like plain HTML
            return "stockchart";
        }
}
