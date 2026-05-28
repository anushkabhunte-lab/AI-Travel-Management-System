import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

// Lazy-initialize Gemini API
let aiInstance: GoogleGenAI | null = null;
function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required to generate trip plans.");
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for body parsing
  app.use(express.json());

  // API Route: Healthcheck
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // API Route: Generate Trip Plan using Gemini
  app.post("/api/gemini/generate", async (req, res) => {
    try {
      const { destination, date, budget, transport } = req.body;

      if (!destination) {
        return res.status(400).json({ error: "Destination is required." });
      }

      const ai = getAI();

      const prompt = `Plan a travel itinerary for a trip to ${destination}.
Details:
- Target Date: ${date || "Flexible Dates"}
- Target Budget: ${budget ? `₹${budget}` : "Flexible Budget"}
- Transport Type: ${transport || "Any"}
Provide an amazing, comprehensive, highly personalized plan. Make sure costs, timelines, checkable packing items, and local tips are specific and tailored to ${destination}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are an expert personalized travel planner. You generate beautifully detailed, specific, and structured JSON travel plans with accurate local budget estimations.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            required: ["title", "destination", "startDate", "budget", "transport", "itinerary", "budgetBreakdown", "packingChecklist", "localTips"],
            properties: {
              title: {
                type: Type.STRING,
                description: "Appealing title of the customized travel itinerary",
              },
              destination: {
                type: Type.STRING,
                description: "Name of the travel destination",
              },
              startDate: {
                type: Type.STRING,
                description: "The formatted start date or 'Flexible'",
              },
              budget: {
                type: Type.STRING,
                description: "The target travel budget display string",
              },
              transport: {
                type: Type.STRING,
                description: "The chosen mode of transportation",
              },
              itinerary: {
                type: Type.ARRAY,
                description: "Day-by-day activities roadmap",
                items: {
                  type: Type.OBJECT,
                  required: ["day", "theme", "activities"],
                  properties: {
                    day: {
                      type: Type.INTEGER,
                      description: "The sequence day number (e.g., 1, 2, 3)",
                    },
                    theme: {
                      type: Type.STRING,
                      description: "Overall daily focus or vibe (e.g., 'Historical Sightseeing', 'Adventure & Views')",
                    },
                    activities: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        required: ["time", "activity", "description", "cost"],
                        properties: {
                          time: {
                            type: Type.STRING,
                            description: "Logical time of day or general range (e.g., '09:00 AM', 'Late Afternoon')",
                          },
                          activity: {
                            type: Type.STRING,
                            description: "Specific visual activity name",
                          },
                          description: {
                            type: Type.STRING,
                            description: "Interesting, descriptive details about the activity",
                          },
                          cost: {
                            type: Type.STRING,
                            description: "Estimated cost line or 'Free'",
                          },
                        },
                      },
                    },
                  },
                },
              },
              budgetBreakdown: {
                type: Type.OBJECT,
                required: ["transportation", "accommodation", "food", "sightseeing"],
                properties: {
                  transportation: { type: Type.STRING, description: "Estimated cost or portion for transportation" },
                  accommodation: { type: Type.STRING, description: "Estimated cost or portion for accommodation/resort" },
                  food: { type: Type.STRING, description: "Estimated cost or portion for meals/dining" },
                  sightseeing: { type: Type.STRING, description: "Estimated cost or portion for tickets, entry fees, activities" },
                },
              },
              packingChecklist: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Highly customized packing recommendations based on destination climate, culture, and activities",
              },
              localTips: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Crucial local wisdom, scams to avoid, cultural etiquette, or safety tricks specific to the destination",
              },
            },
          },
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("No response returned from the model.");
      }

      // Parse and return the JSON directly
      const parsedData = JSON.parse(responseText.trim());
      res.json(parsedData);
    } catch (error: any) {
      console.error("Gemini Generation Error:", error);
      res.status(500).json({
        error: error.message || "An unexpected error occurred while generating the trip plan.",
      });
    }
  });

  // Serving Frontend Assets
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
