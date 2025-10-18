"use client";

import { toast } from "sonner";
import { useState } from "react";
import CTA from "@/components/header";
import Form from "@/components/form";
import Particles from "@/components/ui/particles";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    if (!name || !email) return;
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);

    const promise = new Promise(async (resolve, reject) => {
      try {
        // First, attempt to send the email
        const mailResponse = await fetch("/api/mail", {
          cache: "no-store",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstname: name, email }),
        });

        const mailData = await mailResponse.json();

        if (!mailResponse.ok) {
          const errorMap = {
            429: "Rate limited",
            409: "Email already sent",
            400: mailData.error || "Invalid input"
          };
          reject(errorMap[mailResponse.status as keyof typeof errorMap] || "Email sending failed");
          return;
        }

        const notionResponse = await fetch("/api/notion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        });
          //fix
        const notionData = await notionResponse.json();

        if (!notionResponse.ok) {
          const errorMap = {
            429: "Rate limited",
            409: "Email already exists",
            400: notionData.error || "Invalid input"
          };
          reject(errorMap[notionResponse.status as keyof typeof errorMap] || "Notion insertion failed");
        } else {
          resolve({ name });
        }
      } catch (error) {
        reject(error);
      }
    });

    toast.promise(promise, {
      loading: "Getting you on the waitlist... 🚀",
      success: (data) => {
        setName("");
        setEmail("");
        return "Thank you for joining the waitlist 🎉";
      },
      error: (error) => {
        const errorMessages = {
          "Rate limited": "You're doing that too much. Please try again later.",
          "Email already sent": "You're already on our waitlist!",
          "Email already exists": "You're already on our waitlist!",
          "Email sending failed": "Failed to send welcome email. Please try again!",
          "Notion insertion failed": "Failed to save your details. Please try again!"
        };
        return errorMessages[error as keyof typeof errorMessages] || "An error occurred. Please try again 😢";
      },
    });

    promise.finally(() => {
      setLoading(false);
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-clip pt-12 md:pt-24">
      <section className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <CTA />

        <Form
          name={name}
          email={email}
          handleNameChange={handleNameChange}
          handleEmailChange={handleEmailChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </section>

      <Particles
        quantityDesktop={350}
        quantityMobile={100}
        ease={80}
        color={"#F7FF9B"}
        refresh
      />
    </main>
  );
}
