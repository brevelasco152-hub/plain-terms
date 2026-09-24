import type { AnalysisResult } from "@/lib/types"

/**
 * Realistic, pre-written analysis of the built-in sample policy. Used when no
 * model API key is configured so the full interface stays testable and
 * deployable. Always returned with `demo: true`.
 */
export const DEMO_RESULT: AnalysisResult = {
  demo: true,
  categories: [
    {
      category: "Your Data",
      status: "Found",
      summary:
        "The service collects your name, email, and phone number, plus device details, precise location, and in-app activity. Data is kept up to 24 months after you close your account, and you can request deletion by email.",
      clause:
        "When you create a NimbusApp account, we collect your name, email address, and phone number. As you use the Service, we automatically collect information about your device (including device identifiers, operating system, and browser type), your precise geolocation, and your activity within the app, such as pages viewed, features used, and content you interact with.",
    },
    {
      category: "Data Sharing",
      status: "Found",
      summary:
        "Your information is shared with advertising partners, analytics providers, affiliates, and business partners. The policy says it does not sell your data, but some ad-related sharing may count as a 'sale' under certain laws. You can opt out in settings.",
      clause:
        'We share your information with third-party advertising partners and analytics providers to measure performance and deliver personalized ads. We may also share information with affiliated companies and trusted business partners. We do not sell your personal information; however, certain sharing for targeted advertising may be considered a "sale" or "sharing" under some privacy laws.',
    },
    {
      category: "Your Legal Rights",
      status: "Found",
      summary:
        "The agreement requires disputes to go through individual binding arbitration instead of court, waives your right to a jury trial, and includes a class-action waiver. Claims must be filed within one year or they are barred.",
      clause:
        "By agreeing to these Terms, you and NimbusApp agree that any dispute arising out of or relating to the Service will be resolved exclusively through final and binding individual arbitration, rather than in court. You waive your right to a trial by jury. You also agree to waive your right to participate in a class action or class-wide arbitration. Any claim must be filed within one (1) year after the dispute arises, or it will be permanently barred.",
    },
    {
      category: "Payments & Cancellation",
      status: "Found",
      summary:
        "A 14-day free trial converts to a paid, auto-renewing subscription unless you cancel at least 24 hours before it ends. Cancellation is done through account settings, fees are generally non-refundable, and prices can change with 30 days' notice.",
      clause:
        "If you start a 14-day free trial, your selected payment method will be automatically charged the then-current subscription fee when the trial ends unless you cancel at least 24 hours before the trial period ends. Subscriptions renew automatically at the end of each billing cycle. To cancel, you must do so through your account settings before the next renewal date. Fees already paid are non-refundable except where required by law.",
    },
    {
      category: "Your Content & AI",
      status: "Found",
      summary:
        "You keep ownership of what you upload, but you grant a broad, sublicensable license to host, modify, publish, and distribute it. Your content and usage data may also be used to train the company's AI and machine learning models, with an opt-out available in settings.",
      clause:
        "By uploading content, you grant NimbusApp a worldwide, non-exclusive, royalty-free, sublicensable license to host, store, reproduce, modify, publish, and distribute that content in connection with operating and promoting the Service. You also agree that we may use your content and usage data to train and improve our machine learning models and artificial intelligence features. You may opt out of AI training in your privacy settings.",
    },
  ],
}
