
import Contact from "../models/contact.model.js";

export const contactForm = async (req,res) => {
    try {
     const response = req.body;
     const contact = new Contact(response);
     await contact.save();
     return res.status(201).json({ success: true, message: "Message sent." });
   
    } catch (error) {
     console.log(`Error from the user route: ${error}`);
       return res.status(500).json({ msg: "Something went wrong", error: error.message });
    }
   }
   