package com.example.demo.controllers;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class UplodeController {

    @PostMapping("/upload")
    public Map<String, String> uploadPrescription(@RequestParam("file") MultipartFile file) throws IOException {
        Map<String, String> response = new HashMap<>();
        String content = new String(file.getBytes());

        // Extract date (assuming it could be a date format like "MM/dd/yyyy" or "yyyy-MM-dd")
        String date = extractDate(content);
        if (date != null) response.put("date", date);

        // Extract disease name (Assume it could be a disease like 'Hypertension [I10]')
        String diseaseName = extractDiseaseName(content);
        if (diseaseName != null) response.put("diseaseName", diseaseName);

        // Extract doctor name (Assume it has a pattern like 'Dr. First Last')
        String doctorName = extractDoctorName(content);
        if (doctorName != null) response.put("doctorName", doctorName);

        // Extract hospital name (Simple extraction from nearby keywords)
        String hospitalName = extractHospitalName(content);
        if (hospitalName != null) response.put("hospitalName", hospitalName);

        // Extract hospital address (Assume it contains street numbers and city/state info)
        String hospitalAddress = extractHospitalAddress(content);
        if (hospitalAddress != null) response.put("hospitalAddress", hospitalAddress);

        // Extract age (If it's a number close to other text indicating an age)
        String age = extractAge(content);
        if (age != null) response.put("age", age);

        return response;
    }

    // Helper method to extract date (Assumes date format like "MM/dd/yyyy" or "yyyy-MM-dd")
    private String extractDate(String content) {
        Pattern pattern = Pattern.compile("\\b(\\d{2}/\\d{2}/\\d{4}|\\d{4}-\\d{2}-\\d{2})\\b");
        Matcher matcher = pattern.matcher(content);
        if (matcher.find()) {
            return matcher.group();
        }
        return null;
    }

    // Helper method to extract disease name (using a regex for typical disease format)
    private String extractDiseaseName(String content) {
        Pattern pattern = Pattern.compile("([A-Za-z ]+ \\[([A-Za-z0-9]+)\\])");
        Matcher matcher = pattern.matcher(content);
        if (matcher.find()) {
            return matcher.group(1);
        }
        return null;
    }

    // Helper method to extract doctor name (looking for "Dr. First Last" pattern)
    private String extractDoctorName(String content) {
        Pattern pattern = Pattern.compile("Dr\\. [A-Za-z]+ [A-Za-z]+");
        Matcher matcher = pattern.matcher(content);
        if (matcher.find()) {
            return matcher.group();
        }
        return null;
    }

    // Helper method to extract hospital name (Assume we look for keywords like 'Hospital')
    private String extractHospitalName(String content) {
        // Updated regex to match strings ending with "Inc." or "Hospital"
        Pattern pattern = Pattern.compile("([A-Za-z ]+ (Inc\\.|Hospital))");
        Matcher matcher = pattern.matcher(content);
        if (matcher.find()) {
            return matcher.group();
        }
        return null;
    }

    // Helper method to extract hospital address (looks for street names and numbers)
    private String extractHospitalAddress(String content) {
        Pattern pattern = Pattern.compile("\\d+ [A-Za-z ]+ [A-Za-z]+,? [A-Za-z]+ \\d+");
        Matcher matcher = pattern.matcher(content);
        if (matcher.find()) {
            return matcher.group();
        }
        return null;
    }

   // Helper method to extract age (looking for a number after the name or in a simple format like "38")
    private String extractAge(String content) {
    // Updated regex pattern to capture a number that follows the name
    Pattern pattern = Pattern.compile("\\b(\\d{1,3})\\b");
    Matcher matcher = pattern.matcher(content);
    
    // Try to find a number that appears after a name, which is likely the age
    while (matcher.find()) {
        String found = matcher.group(1);
        
        // Logic to check if this number is likely the age (e.g., not too large, appears after the name)
        int age = Integer.parseInt(found);
        if (age > 0 && age <= 120) {
            return found; // Return the first valid age found
        }
    }
    return null;
}

    

}