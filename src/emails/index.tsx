import { Body, Container, Head, Html, Preview } from "@react-email/components";
import * as React from "react";
import { emailTemplates } from "../constants/mail-template";

interface EmailProps {
  userFirstname: string;
}

export const NotionWaitlistEmail = ({ userFirstname }: EmailProps) => (
  <Html>
    <Head />
    <Preview>{emailTemplates.waitlist.subject}</Preview>
    <Body style={main}>
      <Container style={container}>
        <div
          dangerouslySetInnerHTML={{ __html: emailTemplates.waitlist.html }}
        />
      </Container>
    </Body>
  </Html>
);

NotionWaitlistEmail.PreviewProps = {
  userFirstname: "Tyler",
} as EmailProps;

export default NotionWaitlistEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};
