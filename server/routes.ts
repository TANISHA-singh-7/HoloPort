import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

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
  app.get('/api/contact', (req, res) => {
    res.status(200).json(contactMessages);
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
