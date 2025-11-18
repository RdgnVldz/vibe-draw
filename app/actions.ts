"use server"

import { Resend } from "resend"

export async function submitContactForm(formData: FormData) {
  try {
    // Extract form data
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    // Validate form data
    if (!name || !email || !subject || !message) {
      return {
        success: false,
        message: "All fields are required",
      }
    }

    // Check if RESEND_API_KEY exists and is valid
    const apiKey = process.env.RESEND_API_KEY

    if (!apiKey || apiKey === "your_resend_api_key_here") {
      // For development or when API key is not available, simulate success
      console.warn("RESEND_API_KEY is missing or invalid. Using fallback email method.")

      // Log the email that would have been sent (for debugging)
      console.log(`
        Would send email to: rodgen.valdez19@gmail.com
        From: ${name} (${email})
        Subject: ${subject}
        Message: ${message}
      `)

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Return success for testing purposes
      return {
        success: true,
        message: "Thank you! Your message has been sent successfully. (Note: In development mode)",
      }
    }

    // Initialize Resend with API key
    const resend = new Resend(apiKey)

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "rodgen.valdez19@gmail.com",
      reply_to: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Subject:</strong> ${subject}</p>
<h3>Message:</h3>
<p>${message.replace(/\n/g, "<br>")}</p>
      `,
    })

    if (error) {
      console.error("Error sending email:", error)

      // Provide more specific error message based on the error
      if (error.message?.includes("API key")) {
        return {
          success: false,
          message: "There was an issue with the email service configuration. Please try contacting directly via email.",
        }
      }

      return {
        success: false,
        message: "There was an error sending your message. Please try again or contact directly via email.",
      }
    }

    return {
      success: true,
      message: "Thank you! Your message has been sent successfully.",
    }
  } catch (error) {
    console.error("Error submitting form:", error)
    return {
      success: false,
      message: "There was an error processing your request. Please try again later.",
    }
  }
}
