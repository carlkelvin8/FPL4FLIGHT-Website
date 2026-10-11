export interface LegalSection {
  id: string;
  title: string;
  paragraphs?: string[];
  introduction?: string;
  items?: string[];
}

// Adapted from the mobile app's src/features/legal/LegalPage.tsx.
// Keep the app policy date: adding a web route does not revise the policy.
export const legalUpdated = "August 19, 2026";

export const privacySections: LegalSection[] = [
  {
    id: "information", title: "Information We Collect",
    introduction: "We collect information you provide directly:",
    items: ["Account information (email, name)", "Aircraft registration data", "Flight planning data and form submissions", "Chat content and media you choose to share", "Device information needed for app functionality and security", "Sanitized crash and diagnostic details, such as the affected screen, app version, and device platform"],
  },
  {
    id: "location", title: "Location Data",
    paragraphs: ["The Map uses foreground location to display your position. Live Track can collect location in the background only after you start a tracking session and grant permission; track points are stored locally on your device. A location is sent to the chat service only when you explicitly choose Share Location."],
  },
  {
    id: "use", title: "How We Use Your Information",
    introduction: "We use collected information to:",
    items: ["Provide and maintain the App", "Sync your data across devices", "Diagnose crashes and improve our services", "Send important service notifications", "Ensure account security"],
  },
  {
    id: "security", title: "Data Storage & Security",
    paragraphs: ["Your data is stored securely using industry-standard encryption. We use Supabase for data storage with Row Level Security ensuring only you can access your own data. We do not sell or rent your personal information to third parties."],
  },
  {
    id: "sharing", title: "Data Sharing",
    introduction: "We do not share your personal data with third parties except:",
    items: ["When required by law", "To protect our rights or safety", "With your explicit consent", "With service providers who assist in operating the App (under strict confidentiality)"],
  },
  {
    id: "rights", title: "Your Rights",
    introduction: "You have the right to:",
    items: ["Access your personal data", "Correct inaccurate data", "Request deletion of your data", "Export your data", "Withdraw consent at any time"],
  },
  {
    id: "retention", title: "Data Retention",
    paragraphs: ["We retain account data while your account is active. When you request account deletion, cloud account data is removed through the deletion workflow, subject to limited security, legal, and backup-retention requirements. Locally stored files and track history can remain on a device until the App or its data is removed."],
  },
  {
    id: "children", title: "Children’s Privacy",
    paragraphs: ["FPL4FLIGHT is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children."],
  },
  {
    id: "contact", title: "Contact Us",
    paragraphs: ["For privacy-related inquiries, contact our Data Protection Officer at privacy@fpl4flight.io."],
  },
];

export const termsSections: LegalSection[] = [
  {
    id: "acceptance", title: "Acceptance of Terms",
    paragraphs: ['By accessing or using FPL4FLIGHT ("the App"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the App.'],
  },
  {
    id: "service", title: "Description of Service",
    paragraphs: ["FPL4FLIGHT provides digital flight planning tools, aircraft management, and form submission services for aviation professionals. The App is intended as a supplementary tool and must not be used as the sole source for flight-critical decisions."],
  },
  {
    id: "accounts", title: "User Accounts",
    paragraphs: ["You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account. You must provide accurate and complete information when creating an account."],
  },
  {
    id: "acceptable-use", title: "Acceptable Use",
    introduction: "You agree not to:",
    items: ["Use the App for any unlawful purpose", "Attempt to gain unauthorized access to any systems", "Transmit any harmful or malicious code", "Interfere with other users’ use of the App", "Use the App’s navigation features for actual flight operations"],
  },
  {
    id: "intellectual-property", title: "Intellectual Property",
    paragraphs: ["All content, features, and functionality of FPL4FLIGHT are owned by FPL4FLIGHT and are protected by international copyright, trademark, and other intellectual property laws."],
  },
  {
    id: "disclaimer", title: "Disclaimer",
    paragraphs: ['THE APP IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. FPL4FLIGHT DOES NOT GUARANTEE THE ACCURACY, COMPLETENESS, OR RELIABILITY OF ANY INFORMATION PROVIDED THROUGH THE APP. THE MAP AND NAVIGATION FEATURES MUST NOT BE USED FOR REAL FLIGHT OPERATIONS.'],
  },
  {
    id: "liability", title: "Limitation of Liability",
    paragraphs: ["FPL4FLIGHT shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the App, including but not limited to loss of data, revenue, or profits."],
  },
  {
    id: "changes", title: "Changes to Terms",
    paragraphs: ["We reserve the right to modify these terms at any time. Continued use of the App after changes constitutes acceptance of the revised terms. We will notify users of significant changes via the App or email."],
  },
  {
    id: "contact", title: "Contact",
    paragraphs: ["For questions about these Terms, contact us at support@fpl4flight.io."],
  },
];
