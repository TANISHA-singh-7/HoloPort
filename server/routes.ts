import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { info, skills, projects, experience, achievements, codingProfiles, contactInfo } from "./data";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// In-memory storage for contact form messages
const contactMessages: ContactFormData[] = [];

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for contact form
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, message } = req.body as ContactFormData;

      // Validate required fields
      if (!name || !email || !message) {
        return res.status(400).json({ 
          message: "All fields are required: name, email, and message" 
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          message: "Please provide a valid email address" 
        });
      }

      // Store the message (in a real app, this would save to a database)
      contactMessages.push({ name, email, message });

      // Return success response
      return res.status(200).json({ 
        message: "Message received successfully",
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error processing contact form:", error);
      return res.status(500).json({ 
        message: "An error occurred while processing your message" 
      });
    }
  });

  // Route to get all contact messages (normally would be protected)
  app.get('/api/contact-messages', (req, res) => { //Renamed to avoid conflict
    res.status(200).json(contactMessages);
  });

  app.get("/api/info", (_req, res) => {
    res.json(info);
  });

  app.get("/api/skills", (_req, res) => {
    res.json(skills);
  });

  app.get("/api/projects", (_req, res) => {
    res.json(projects);
  });

  app.get("/api/experience", (_req, res) => {
    res.json(experience);
  });

  app.get("/api/achievements", (_req, res) => {
    res.json(achievements);
  });

  app.get("/api/coding-profiles", (_req, res) => {
    res.json(codingProfiles);
  });

  app.get("/api/contact-info", (_req, res) => { //Renamed to avoid conflict
    res.json(contactInfo);
  });


  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}