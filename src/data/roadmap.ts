// Real process data sourced from the client's Miro board and the
// "Ecom Tube Map — Flat Task Sheet" Google Sheet. All owner, automation
// level, and monthly-instance figures are real; cost/time/link/notes
// fields are left undefined until the sheet has real values for them —
// nothing here is placeholder or invented.

export type AutomationLevel = "Manual" | "Semi Automated" | "Automated";

export type Task = {
  title: string;
  owner: string;
  automationLevel: AutomationLevel;
  monthlyInstances?: number;
  previousTimeTaken?: string;
  currentTimeTaken?: string;
  previousMonthlySpend?: number;
  currentMonthlySpend?: number;
  estimatedMonthlySaving?: number;
  link?: string;
  notes?: string;
  lastUpdated?: string;
};

export type Milestone = {
  title: string;
  owner: string;
  automationLevel: AutomationLevel;
  monthlyInstances?: number;
  previousTimeTaken?: string;
  currentTimeTaken?: string;
  previousMonthlySpend?: number;
  currentMonthlySpend?: number;
  estimatedMonthlySaving?: number;
  link?: string;
  notes?: string;
  lastUpdated?: string;
  subtasks: Task[];
};

export type Phase = {
  id: string;
  name: string;
  milestones: Milestone[];
};

export const OWNER_ROLES = [
  "Account Manager",
  "New Build Team",
  "Creative Team",
  "Additional Services Team",
  "Sales",
  "Senior Team",
  "Feed Team",
] as const;

export const roadmap: Phase[] = [
  {
    id: "sales",
    name: "Sales",
    milestones: [
      {
        title: "Trial agreement signed by client",
        owner: "Sales",
        automationLevel: "Manual",
        subtasks: [],
      },
      {
        title: "Onboarding email sent by BDM requesting access",
        owner: "Sales",
        automationLevel: "Manual",
        subtasks: [],
      },
      {
        title: "Onboarding email sent by marketing",
        owner: "Sales",
        automationLevel: "Manual",
        subtasks: [],
      },
      {
        title: "BDM completes new deal notes",
        owner: "Sales",
        automationLevel: "Manual",
        subtasks: [],
      },
      {
        title: "Order assigned to AM",
        owner: "Senior Team",
        automationLevel: "Manual",
        subtasks: [
          {
            title: "Email sent to AM that deal has been assigned",
            owner: "Senior Team",
            automationLevel: "Manual",
          },
        ],
      },
      {
        title: "AM speaks to BDM about client",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [],
      },
    ],
  },
  {
    id: "pre-trial",
    name: "Pre-Trial",
    milestones: [
      {
        title: "AM checks which access we have",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [
          {
            title: "AM checks which google accounts the client has",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
        ],
      },
      {
        title: "AM calls client to book WC",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [
          {
            title: "If no response to call, send email with WC times and access",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
        ],
      },
      {
        title: "AM sends email follow up confirming WC and requesting access",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [],
      },
      {
        title: "AM reviews current ads strategy",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [
          {
            title: "AM reviews current ads account data",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "AM reviews website",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "AM reviews industry search volumes",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "AM researches industry trends",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
        ],
      },
      {
        title: "AM creates Welcome Deck",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [
          {
            title: "AM adds client contact info to deck",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "AM adds client agreement info to deck",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "AM adds client business data to deck",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "AM adds suggested KPI's",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "AM adds suggested build structure",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
        ],
      },
      {
        title: "AM completes welcome call",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [
          {
            title: "AM confirms client contact info",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "AM confirms client agreement info",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "AM confirms client business data",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "AM agrees KPI's with client",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "AM agrees build structure with client",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "AM discusses Google website requirements",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "AM discusses tracking",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
        ],
      },
      {
        title: "AM agrees launch call date with client",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [],
      },
      {
        title: "AM sends follow up email to client including deck",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [],
      },
      {
        title: "AM updates CRM",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [
          {
            title: "Welcome call complete date",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "Summary notes of welcome call",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
        ],
      },
      {
        title: '"My account logins" email sent to client',
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [],
      },
      {
        title: "AM completes Monday form to create build case",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [],
      },
    ],
  },
  {
    id: "trial-build",
    name: "Trial Build",
    milestones: [
      {
        title: "Tech assign build case to team member",
        owner: "New Build Team",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [],
      },
      {
        title: "Tech complete pre build checks",
        owner: "New Build Team",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [
          {
            title: "Check which accounts the client has",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Check we have access to all accounts",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Check if tracking accurate",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Check if they have a feed",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Check they have mandatory website pages for google",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
        ],
      },
      {
        title: "Tech has call with AM to discuss build",
        owner: "New Build Team",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [],
      },
      {
        title: "Google Tag Manager set up",
        owner: "New Build Team",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [
          {
            title: "Ecommerce Access Email Added As Admin User",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "AM Added As Admin User",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Code Added To Website",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Tags Setup (Call, Email, Newsletter and Contact Form)",
            owner: "New Build Team",
            automationLevel: "Semi Automated",
            monthlyInstances: 73,
          },
          {
            title: "Phone Number and Email Clickable On Website",
            owner: "New Build Team",
            automationLevel: "Semi Automated",
            monthlyInstances: 73,
          },
          {
            title: "Tags Tested and Fired",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
        ],
      },
      {
        title: "GA4 set up",
        owner: "New Build Team",
        automationLevel: "Automated",
        monthlyInstances: 73,
        previousTimeTaken: "90 mins",
        currentTimeTaken: "15 mins",
        subtasks: [
          {
            title: "Create account if needed",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Ecommerce Access Email Added As Admin User",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Property Details (Shopping, Time Zone and Currency)",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Google Signals Activated and Acknowledge Data Collection",
            owner: "New Build Team",
            automationLevel: "Automated",
            monthlyInstances: 73,
          },
          {
            title: "Audiences Added",
            owner: "New Build Team",
            automationLevel: "Automated",
            monthlyInstances: 73,
          },
          {
            title: "Linked To Google Ads",
            owner: "New Build Team",
            automationLevel: "Automated",
            monthlyInstances: 73,
          },
          {
            title: "Linked To Google Merchant Center",
            owner: "New Build Team",
            automationLevel: "Automated",
            monthlyInstances: 73,
          },
          {
            title: "Referral Exclusions Added",
            owner: "New Build Team",
            automationLevel: "Automated",
            monthlyInstances: 73,
          },
          {
            title: "Conversion Events Set To Included",
            owner: "New Build Team",
            automationLevel: "Automated",
            monthlyInstances: 73,
          },
          {
            title: "Data Retention Settings Updated",
            owner: "New Build Team",
            automationLevel: "Automated",
            monthlyInstances: 73,
          },
          {
            title: "Attribution Settings",
            owner: "New Build Team",
            automationLevel: "Automated",
            monthlyInstances: 73,
          },
        ],
      },
      {
        title: "Create feed if needed",
        owner: "New Build Team",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [
          {
            title: "Install feed app/plugin",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Configure feed app/plugin",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
        ],
      },
      {
        title: "GMC set up",
        owner: "New Build Team",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [
          {
            title: "Create account if needed",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Tech Email Added for alerts",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "AM and Access Email Added With Correct Notifications",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Logo's Added and Approved",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Shipping and Return Policies Added",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Basic Feed Op (Title, Description, MPN)",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Phone number Verified",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Website Verified and Claimed",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Automatic Image Improvements Turned On",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Free Product Listings and Shopping Ads Active",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Customer Service Information (Address, Email, Phone)",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Checked Disapprovals",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
        ],
      },
      {
        title: "Google Ads set up",
        owner: "New Build Team",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [
          {
            title: "Create account if needed",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Ads Linked Accounts Settings - Activate GA4",
            owner: "New Build Team",
            automationLevel: "Automated",
            monthlyInstances: 73,
          },
          {
            title: "Conversions Pulled Through To Google Ads and Primary Goal Set",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Set Up Excluded Content and Excluded Types",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Recommendations Auto-Apply Updates Changed To AP Standard",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Label Account",
            owner: "New Build Team",
            automationLevel: "Automated",
            monthlyInstances: 73,
          },
          {
            title: "Check MCC Linking",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Enhanced Conversions Turned On",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Customer Match Turned On",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
        ],
      },
      {
        title: "Tech Tab completed in CRM",
        owner: "New Build Team",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [],
      },
      {
        title: "Google Ad Campaigns Created/updated",
        owner: "New Build Team",
        automationLevel: "Semi Automated",
        monthlyInstances: 73,
        subtasks: [],
      },
      {
        title: "Revenue Tracking set up / troubleshooting",
        owner: "New Build Team",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [],
      },
      {
        title: "Cookie Banner set up",
        owner: "New Build Team",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [],
      },
      {
        title: "Build checks",
        owner: "New Build Team",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [],
      },
      {
        title: "Build summary sent to AM via Monday",
        owner: "New Build Team",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [],
      },
      {
        title: "AM checks build is as requested",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [],
      },
    ],
  },
  {
    id: "trial-period",
    name: "Trial Period",
    milestones: [
      {
        title: "AM sets campaign budgets",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [],
      },
      {
        title: "AM has launch call with client",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [
          {
            title: "AM reviews campaign structure with client",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "AM reviews ad copy with client",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "Confirm budgets",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "Set campaigns live",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "Book in all trial calls",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "Campaigns on zero impression report (conditional)",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title:
              "Trial performance added to Monday board (parallel) — AM updated BDM on performance in sales meeting",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
        ],
      },
      {
        title: "Summary email sent to client",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [
          {
            title: "Build summary sent to client",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
        ],
      },
      {
        title: "AM updates CRM",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [
          {
            title: "Launch call complete date",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "Summary notes of launch call",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "Add TBAP to CRM",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
        ],
      },
      {
        title: "AM completes 2 day checks",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [
          {
            title: "Campaigns spending",
            owner: "Account Manager",
            automationLevel: "Semi Automated",
          },
          {
            title: "Tracking working",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "Check ROAS",
            owner: "Account Manager",
            automationLevel: "Semi Automated",
          },
          {
            title: "Check referral exclusions",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
        ],
      },
      {
        title: "Campaign optimisations as required",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [
          {
            title: "ADD MORE DETAIL",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
        ],
      },
      {
        title: "2 day check admin",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [
          {
            title: "Mark 2 day check complete in CRM",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "2 day check notes added in CRM",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "Add TBAP to CRM",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title:
              "Products disapproved or campaigns on zero impressions? (conditional)",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
        ],
      },
      {
        title: "AM completes 7 day checks",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [
          {
            title: "Campaigns spending",
            owner: "Account Manager",
            automationLevel: "Semi Automated",
          },
          {
            title: "Tracking working",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "Check ROAS",
            owner: "Account Manager",
            automationLevel: "Semi Automated",
          },
          {
            title: "Check referral exclusions",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
        ],
      },
      {
        title: "Campaign optimisations as required (7 day)",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [
          {
            title: "ADD MORE DETAIL",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
        ],
      },
      {
        title: "Send 7 day client email",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [],
      },
      {
        title: "7 day check admin",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [
          {
            title: "Mark 7 day check complete in CRM",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "7 day check notes added in CRM",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "Add TBAP to CRM",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
        ],
      },
      {
        title: "Mid campaign call prep",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [
          {
            title: "Review performance vs targets",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
        ],
      },
      {
        title: "Mid campaign call with client",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [
          {
            title: "Discuss performance overview",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "Review targets v stats",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "Client feedback",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "What does the client need to see to continue?",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
        ],
      },
      {
        title: "AM completes 3 week checks",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [
          {
            title: "Campaigns spending",
            owner: "Account Manager",
            automationLevel: "Semi Automated",
          },
          {
            title: "Tracking working",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "Check ROAS",
            owner: "Account Manager",
            automationLevel: "Semi Automated",
          },
        ],
      },
      {
        title: "Campaign optimisations as required (3 week)",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [],
      },
      {
        title: "3 week check admin",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [
          {
            title: "Mark 3 week check complete in CRM",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "3 week check notes added in CRM",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "Add TBAP to CRM",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
        ],
      },
      {
        title: "AM creates roadmap deck",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [],
      },
      {
        title: "Roadmap call - BDM joins",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [
          {
            title: "Goal recap / measuring success recap",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "Performance overview",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "Looking forward & our benefits",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
          {
            title: "Next steps",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
        ],
      },
      {
        title: "AM adds trial summary to CRM",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [],
      },
      {
        title: "AM marks campaign as complete in CRM",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [],
      },
      {
        title: "Trial handed back to sales",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [
          {
            title: "BDM converts on roadmap or follows up",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
        ],
      },
    ],
  },
  {
    id: "conversion-to-recurring-revenue",
    name: "Conversion to Recurring Revenue",
    milestones: [
      {
        title: "BDM completes converted deal form",
        owner: "Sales",
        automationLevel: "Manual",
        subtasks: [],
      },
      {
        title: "Order assigned to AM",
        owner: "Senior Team",
        automationLevel: "Manual",
        subtasks: [
          {
            title: "Email sent to AM that trial has converted",
            owner: "Senior Team",
            automationLevel: "Manual",
          },
        ],
      },
      {
        title: "AM calls client to book continuation call",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [],
      },
      {
        title: "AM creates continuation deck",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [],
      },
      {
        title: "Continuation call",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [],
      },
      {
        title: "AM completes continuation case form on Monday",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [],
      },
    ],
  },
  {
    id: "rec-rev-set-up",
    name: "Rec Rev Set Up",
    milestones: [
      {
        title: "CSS setup",
        owner: "Additional Services Team",
        automationLevel: "Manual",
        subtasks: [],
      },
      {
        title: "Dynamic Remarketing Set Up",
        owner: "Additional Services Team",
        automationLevel: "Manual",
        subtasks: [],
      },
      {
        title: "Click Guardian set up",
        owner: "Additional Services Team",
        automationLevel: "Semi Automated",
        subtasks: [],
      },
      {
        title: "Feedonomics Or Shoptimised Set Up",
        owner: "Feed Team",
        automationLevel: "Manual",
        subtasks: [],
      },
      {
        title: "Email Marketing - Account Creation & Linking",
        owner: "Creative Team",
        automationLevel: "Manual",
        subtasks: [],
      },
      {
        title: "Email Marketing - Design & Branding",
        owner: "Creative Team",
        automationLevel: "Manual",
        subtasks: [],
      },
      {
        title: "Email Marketing - Email Automation Building",
        owner: "Creative Team",
        automationLevel: "Manual",
        subtasks: [],
      },
      {
        title: "Email Marketing - Sender Verification",
        owner: "Creative Team",
        automationLevel: "Manual",
        subtasks: [],
      },
      {
        title: "First Video",
        owner: "Creative Team",
        automationLevel: "Manual",
        subtasks: [],
      },
    ],
  },
];
