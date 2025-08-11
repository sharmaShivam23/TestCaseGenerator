const Contact = require("../model/Contact");
const axios = require("axios"); 
exports.createContact = async (req, res) => {
  try {
    const { name, email, contact, message , recaptchaValue } = req.body;

   
    if (!name || !email || !contact || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

   
    if (!/^[A-Za-z\s]+$/.test(name)) {
      return res.status(400).json({ error: "Name can only contain letters and spaces" });
    }

    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    
    if (!/^[6-9]\d{9}$/.test(contact)) {
      return res.status(400).json({ error: "Contact must be a valid 10-digit Indian number starting with 6-9" });
    }

    
    if (message.trim().length < 10) {
      return res.status(400).json({ error: "Message must be at least 10 characters long" });
    }

     if (!recaptchaValue) {
          return res.status(400).json({ success: false, message: "reCAPTCHA verification required" });
        }
    
        try {
          const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
          const secretKey = process.env.CAPTCHA_KEY;
          
          if (!secretKey) {
            console.error('SECRET_KEY not configured');
            return res.status(500).json({ success: false, message: "Server configuration error" });
          }
    
          const recaptchaResponse = await axios.post(verifyUrl, null, {
            params: {
              secret: secretKey,
              response: recaptchaValue,
            },
            timeout: 5000, 
          });
    
          if (!recaptchaResponse.data.success) {
            return res.status(400).json({ success: false, message: "reCAPTCHA verification failed" });
          }
        } catch (recaptchaError) {
          console.error('reCAPTCHA verification error:', recaptchaError.message);
          return res.status(500).json({ success: false, message: "reCAPTCHA verification error" });
        }
    

    
    const newContact = new Contact({
      name,
      email,
      contact,
      message
    });

    await newContact.save();

    return res.status(200).json({ message: "Contact form submitted successfully" });
  } catch (err) {
    console.error("Error creating contact:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
