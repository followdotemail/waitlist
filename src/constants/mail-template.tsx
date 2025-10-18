export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export const emailTemplates: Record<string, EmailTemplate> = {
  waitlist: {
    subject: "Welcome to the Waitlist! 🚀",
    html: `
          <body style="background-color:#ffffff">
    <!--$-->
    <table
      border="0"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      align="center">
      <tbody>
        <tr>
          <td
            style="margin:0px;background-color:#ffffff;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px">
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="max-width:600px;width:100%;margin-left:auto;margin-right:auto;border-style:solid;background-color:#ffffff;min-width:300px;padding-top:8px;padding-right:8px;padding-bottom:8px;padding-left:8px;border-radius:0px;border-width:0px;border-color:transparent">
              <tbody>
                <tr style="width:100%">
                  <td>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="margin-top:0px;margin-bottom:32px">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td align="left" data-id="__react-email-column">
                            <img
                              title="Logo"
                              alt="Logo"
                              src="https://i.postimg.cc/WzfSG7fN/logo.png"
                              style="display:block;outline:none;border:none;text-decoration:none;width:48px;height:48px" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <h2
                      style="margin-left:0px;margin-right:0px;margin-top:0px;margin-bottom:12px;text-align:left;color:#111827;font-size:30px;line-height:36px;font-weight:700">
                      <strong>You&#x27;re on the waitlist!</strong>
                    </h2>
                    <p
                      style="font-size:15px;line-height:26.25px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:#374151;margin:0 0 20px 0;margin-top:0;margin-right:0;margin-bottom:20px;margin-left:0">
                      Thanks for joining the FollowEmail waitlist! 🎉
                    </p>
                    <p
                      style="font-size:15px;line-height:26.25px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:#374151;margin:0 0 20px 0;margin-top:0;margin-right:0;margin-bottom:20px;margin-left:0">
                      We’re building FollowEmail, an AI-powered email assistant
                      designed to make sending and managing emails effortless —
                      from smart follow-ups to automated scheduling and message
                      generation.
                    </p>
                    <p
                      style="font-size:15px;line-height:26.25px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:#374151;margin:0 0 20px 0;margin-top:0;margin-right:0;margin-bottom:20px;margin-left:0">
                      You’re officially on the list, and we’ll notify you as
                      soon as early access opens up.<br /><br />In the meantime:
                    </p>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="max-width:100%;margin-top:0px;margin-bottom:20px">
                      <tbody>
                        <tr style="width:100%">
                          <td>
                            <ul style="padding-left:26px;list-style-type:disc">
                              <li
                                style="margin-bottom:8px;margin-top:8px;padding-left:6px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale">
                                <p
                                  style="font-size:15px;line-height:26.25px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:#374151;margin:0 0 0px 0;margin-top:0;margin-right:0;margin-bottom:0px;margin-left:0">
                                  Keep an eye on your inbox for updates.
                                </p>
                              </li>
                              <li
                                style="margin-bottom:8px;margin-top:8px;padding-left:6px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale">
                                <p
                                  style="font-size:15px;line-height:26.25px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:#374151;margin:0 0 0px 0;margin-top:0;margin-right:0;margin-bottom:0px;margin-left:0">
                                  Share FollowEmail with a friend who loves
                                  productivity — they’ll thank you later.
                                </p>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <p
                      style="font-size:15px;line-height:26.25px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:#374151;margin:0 0 20px 0;margin-top:0;margin-right:0;margin-bottom:20px;margin-left:0">
                      We can&#x27;t wait to show you what we&#x27;re building.
                    </p>
                    <p
                      style="font-size:15px;line-height:26.25px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:#374151;margin:0 0 20px 0;margin-top:0;margin-right:0;margin-bottom:20px;margin-left:0">
                      Regards,<br /><strong>Team FollowEmail</strong>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!--7--><!--/$-->
  </body>
      `,
    text: "Welcome to the Waitlist! 🚀 You're on the list! Thank you for joining our waitlist. What happens next? We'll keep you updated on our progress and notify you as soon as we're ready to launch! What to expect: - Early access to new features - Exclusive updates and behind-the-scenes content - Priority support when we launch - Special launch day perks. Thanks for being part of our journey! The Team",
  },
};
