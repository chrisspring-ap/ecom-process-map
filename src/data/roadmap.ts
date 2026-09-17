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
        monthlyInstances: 73,
        subtasks: [],
      },
      {
        title: "Onboarding email sent by BDM requesting access",
        owner: "Sales",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [],
      },
      {
        title: "Onboarding email sent by marketing",
        owner: "Sales",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [],
      },
      {
        title: "BDM completes new deal notes",
        owner: "Sales",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [],
      },
      {
        title: "Order assigned to AM",
        owner: "Senior Team",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [
          {
            title: "Email sent to AM that deal has been assigned",
            owner: "Senior Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
        ],
      },
    ],
  },
  {
    id: "pre-trial",
    name: "Pre-Trial",
    milestones: [
      {
        title: "AM speaks to BDM about client",
        owner: "Account Manager / Sales",
        automationLevel: "Manual",
        monthlyInstances: 73,
        currentTimeTaken: "5 mins",
        subtasks: [],
      },
      {
        title: "AM checks which access we have",
        owner: "Account Manager",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [
          {
            title: "AM checks which google accounts the client has",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
        ],
      },
      {
        title: "Inital client contacnt",
        owner: "Account Manager",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [
          {
            title: "AM calls client to book welcome call",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
            currentTimeTaken: "5 mins",
          },
          {
            title: "AM sends email follow up confirming welcome call and requesting access",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
            currentTimeTaken: "5 mins",
          },
        ],
      },
      {
        title: "Review current ads strategy",
        owner: "Account Manager",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [
          {
            title: "AM reviews current ads account data",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
            currentTimeTaken: "30 mins",
          },
          {
            title: "AM reviews website",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "AM reviews industry search volumes",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "AM researches industry trends",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
        ],
      },
      {
        title: "Weclome deck",
        owner: "Account Manager",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [
          {
            title: "AM adds client contact info to deck",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
            currentTimeTaken: "10 mins",
          },
          {
            title: "AM adds client agreement info to deck",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "AM adds client business data to deck",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "AM adds suggested KPI's",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "AM adds suggested build structure",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
        ],
      },
      {
        title: "Welcome call",
        owner: "Account Manager",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [
          {
            title: "AM confirms client contact info",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
            currentTimeTaken: "60 mins",
          },
          {
            title: "AM confirms client agreement info",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "AM confirms client business data",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "AM agrees KPI's with client",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "AM agrees build structure with client",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "AM discusses Google website requirements",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "AM discusses tracking",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "AM agrees launch call date with client",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "AM sends follow up email to client including deck",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
            currentTimeTaken: "10 mins",
          },
          {
            title: "Welcome call complete date",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
            currentTimeTaken: "5 mins",
          },
          {
            title: "Summary notes of welcome call",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "\"My account logins\" email sent to client",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
        ],
      },
      {
        title: "New Build case created",
        owner: "Account Manager",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [
          {
            title: "AM completes Monday form to create build case",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
            currentTimeTaken: "20 mins",
          },
        ],
      },
    ],
  },
  {
    id: "trial-build",
    name: "Trial Build",
    milestones: [
      {
        title: "Tech assign build case to team member",
        owner: "Senior Team",
        automationLevel: "Manual",
        monthlyInstances: 73,
        currentTimeTaken: "1 mins",
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
            currentTimeTaken: "30 mins",
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
        owner: "New Build Team / Account Manager",
        automationLevel: "Manual",
        monthlyInstances: 73,
        currentTimeTaken: "15 mins",
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
            previousTimeTaken: "40 mins",
            currentTimeTaken: "22 mins",
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
        subtasks: [
          {
            title: "Create account if needed",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
            previousTimeTaken: "40 mins",
            currentTimeTaken: "12.5 mins",
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
        title: "Feed / GMC Set up",
        owner: "Feed Team",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [
          {
            title: "Install feed app/plugin (if required)",
            owner: "Feed Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Configure feed app/plugin (if required)",
            owner: "Feed Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Create account if needed",
            owner: "Feed Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Tech Email Added for alerts",
            owner: "Feed Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "AM and Access Email Added With Correct Notifications",
            owner: "Feed Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Logo's Added and Approved",
            owner: "Feed Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Shipping and Return Policies Added",
            owner: "Feed Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Basic Feed Op (Title, Description, MPN)",
            owner: "Feed Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Phone number Verified",
            owner: "Feed Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Website Verified and Claimed",
            owner: "Feed Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Automatic Image Improvements Turned On",
            owner: "Feed Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Free Product Listings and Shopping Ads Active",
            owner: "Feed Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Customer Service Information (Address, Email, Phone)",
            owner: "Feed Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Checked Disapprovals",
            owner: "Feed Team",
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
            previousTimeTaken: "20 mins",
            currentTimeTaken: "15 mins",
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
        currentTimeTaken: "5 mins",
        subtasks: [],
      },
      {
        title: "Google Ad Campaigns Created/updated",
        owner: "New Build Team",
        automationLevel: "Semi Automated",
        monthlyInstances: 73,
        currentTimeTaken: "130 mins",
        subtasks: [],
      },
      {
        title: "Revenue Tracking set up / troubleshooting",
        owner: "New Build Team",
        automationLevel: "Manual",
        monthlyInstances: 73,
        currentTimeTaken: "40 mins",
        subtasks: [],
      },
      {
        title: "Cookie Banner set up",
        owner: "New Build Team",
        automationLevel: "Manual",
        monthlyInstances: 73,
        currentTimeTaken: "12.5 mins",
        subtasks: [],
      },
      {
        title: "Client communication",
        owner: "New Build Team",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [
          {
            title: "Contact client if required for further information",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
            currentTimeTaken: "20 mins",
          },
        ],
      },
      {
        title: "Build checks",
        owner: "Account Manager",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [
          {
            title: "New build team checks build",
            owner: "New Build Team",
            automationLevel: "Manual",
            monthlyInstances: 73,
            currentTimeTaken: "20 mins",
          },
          {
            title: "AM checks build is as requested",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Build summary sent to AM via Monday",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
            currentTimeTaken: "15 mins",
          },
        ],
      },
    ],
  },
  {
    id: "trial-period",
    name: "Trial Period",
    milestones: [
      {
        title: "Campaign budgets set",
        owner: "Account Manager",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [
          {
            title: "AM sets Google ads campaign budgets",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
            currentTimeTaken: "5 mins",
          },
        ],
      },
      {
        title: "Launch call",
        owner: "Account Manager",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [
          {
            title: "AM reviews campaign structure with client",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
            currentTimeTaken: "30 mins",
          },
          {
            title: "AM reviews ad copy with client",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Confirm budgets",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Set campaigns live",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Book in all trial calls",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Campaigns on zero impression report (conditional)",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Trial performance added to Monday board (parallel) — AM updated BDM on performance in sales meeting",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
        ],
      },
      {
        title: "Summary email sent to client",
        owner: "Account Manager",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [
          {
            title: "Build summary sent to client",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
            currentTimeTaken: "10 mins",
          },
        ],
      },
      {
        title: "CRM updated",
        owner: "Account Manager",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [
          {
            title: "Launch call complete date",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
            currentTimeTaken: "5 mins",
          },
          {
            title: "Summary notes of launch call",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Add TBAP to CRM",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
        ],
      },
      {
        title: "2 day checks",
        owner: "Account Manager",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [
          {
            title: "Campaigns spending",
            owner: "Account Manager",
            automationLevel: "Semi Automated",
            monthlyInstances: 73,
            currentTimeTaken: "15 mins",
          },
          {
            title: "Tracking working",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Check ROAS",
            owner: "Account Manager",
            automationLevel: "Semi Automated",
            monthlyInstances: 73,
          },
          {
            title: "Check referral exclusions",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Campaign optimisations as required",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Mark 2 day check complete in CRM",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "2 day check notes added in CRM",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Add TBAP to CRM",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Products disapproved or campaigns on zero impressions? (conditional)",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
        ],
      },
      {
        title: "7 day checks",
        owner: "Account Manager",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [
          {
            title: "Campaigns spending",
            owner: "Account Manager",
            automationLevel: "Semi Automated",
            monthlyInstances: 73,
            currentTimeTaken: "20 mins",
          },
          {
            title: "Tracking working",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Check ROAS",
            owner: "Account Manager",
            automationLevel: "Semi Automated",
            monthlyInstances: 73,
          },
          {
            title: "Check referral exclusions",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Campaign optimisations as required",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Send 7 day client email",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Mark 7 day check complete in CRM",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "7 day check notes added in CRM",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Add TBAP to CRM",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
        ],
      },
      {
        title: "Mid campaign call prep",
        owner: "Account Manager",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [
          {
            title: "Review performance vs targets",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
            currentTimeTaken: "30 mins",
          },
        ],
      },
      {
        title: "Mid campaign call with client",
        owner: "Account Manager",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [
          {
            title: "Discuss performance overview",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
            currentTimeTaken: "30 mins",
          },
          {
            title: "Review targets v stats",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Client feedback",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "What does the client need to see to continue?",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
        ],
      },
      {
        title: "3 week checks",
        owner: "Account Manager",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [
          {
            title: "Campaigns spending",
            owner: "Account Manager",
            automationLevel: "Semi Automated",
            monthlyInstances: 73,
            currentTimeTaken: "15 mins",
          },
          {
            title: "Tracking working",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Check ROAS",
            owner: "Account Manager",
            automationLevel: "Semi Automated",
            monthlyInstances: 73,
          },
          {
            title: "Campaign optimisations as required (3 week)",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Mark 3 week check complete in CRM",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "3 week check notes added in CRM",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Add TBAP to CRM",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
        ],
      },
      {
        title: "Roadmap deck",
        owner: "Account Manager",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [
          {
            title: "AM creates roadmap deck",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
            currentTimeTaken: "90 mins",
          },
        ],
      },
      {
        title: "Roadmap call",
        owner: "Account Manager / Sales",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [
          {
            title: "Goal recap / measuring success recap",
            owner: "Account Manager / Sales",
            automationLevel: "Manual",
            monthlyInstances: 73,
            currentTimeTaken: "60 mins",
          },
          {
            title: "Performance overview",
            owner: "Account Manager / Sales",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Looking forward & our benefits",
            owner: "Account Manager / Sales",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
          {
            title: "Next steps",
            owner: "Account Manager / Sales",
            automationLevel: "Manual",
            monthlyInstances: 73,
          },
        ],
      },
      {
        title: "CRM updated",
        owner: "Account Manager",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [
          {
            title: "AM adds trial summary to CRM",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
            currentTimeTaken: "5 mins",
          },
          {
            title: "AM marks campaign as complete in CRM",
            owner: "Account Manager",
            automationLevel: "Manual",
            monthlyInstances: 73,
            currentTimeTaken: "5 mins",
          },
        ],
      },
      {
        title: "Trial handed back to sales",
        owner: "Account Manager / Sales",
        automationLevel: "Manual",
        monthlyInstances: 73,
        subtasks: [
          {
            title: "BDM converts on roadmap or follows up",
            owner: "Account Manager / Sales",
            automationLevel: "Manual",
            monthlyInstances: 73,
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
        title: "Continuation process",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [
          {
            title: "AM calls client to book continuation call",
            owner: "Account Manager",
            automationLevel: "Manual",
            currentTimeTaken: "5 mins",
          },
          {
            title: "AM creates continuation deck",
            owner: "Account Manager",
            automationLevel: "Manual",
            currentTimeTaken: "10 mins",
          },
          {
            title: "Continuation call",
            owner: "Account Manager",
            automationLevel: "Manual",
            currentTimeTaken: "30 mins",
          },
          {
            title: "AM completes continuation case form on Monday",
            owner: "Account Manager",
            automationLevel: "Manual",
            currentTimeTaken: "10 mins",
          },
        ],
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
        monthlyInstances: 16,
        currentTimeTaken: "10 mins",
        subtasks: [],
      },
      {
        title: "Dynamic Remarketing Set Up",
        owner: "Additional Services Team",
        automationLevel: "Manual",
        monthlyInstances: 34,
        currentTimeTaken: "5 mins",
        subtasks: [],
      },
      {
        title: "Click Guardian set up",
        owner: "Additional Services Team",
        automationLevel: "Semi Automated",
        monthlyInstances: 18,
        previousTimeTaken: "10 mins",
        currentTimeTaken: "5 mins",
        subtasks: [],
      },
      {
        title: "Feedonomics Or Shoptimised Set Up",
        owner: "Feed Team",
        automationLevel: "Manual",
        subtasks: [],
      },
      {
        title: "Email Account Linking",
        owner: "Creative Team",
        automationLevel: "Manual",
        monthlyInstances: 20,
        subtasks: [
          {
            title: "Get login information from CRM",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 20,
            currentTimeTaken: "3 mins",
          },
          {
            title: "Get access info from AM if CRM incorrect",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 5,
            currentTimeTaken: "10 mins",
          },
          {
            title: "Get updated permissions from client if unable to install app",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 3,
            currentTimeTaken: "20 mins",
          },
          {
            title: "Create, link, and brand Omnisend account",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 20,
            currentTimeTaken: "10 mins",
          },
        ],
      },
      {
        title: "Email Design & Branding",
        owner: "Creative Team",
        automationLevel: "Manual",
        monthlyInstances: 20,
        subtasks: [
          {
            title: "Pull assets from the client's website",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 20,
            currentTimeTaken: "15 mins",
          },
          {
            title: "Refer to Creative Questionnaire for brand guidelines",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 20,
            currentTimeTaken: "2 mins",
          },
          {
            title: "Pull assets from stock image sites",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 5,
            currentTimeTaken: "10 mins",
          },
          {
            title: "Generate assets (Photoshop/ Generative AI)",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 5,
            currentTimeTaken: "30 mins",
          },
          {
            title: "Write/ generate copy",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 20,
            currentTimeTaken: "10 mins",
          },
        ],
      },
      {
        title: "Email Building",
        owner: "Creative Team",
        automationLevel: "Manual",
        monthlyInstances: 20,
        subtasks: [
          {
            title: "Assemble emails in Omnisend",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 20,
            currentTimeTaken: "90 mins",
          },
          {
            title: "Build form",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 20,
            currentTimeTaken: "15 mins",
          },
          {
            title: "Submit via Monday",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 20,
            currentTimeTaken: "5 mins",
          },
        ],
      },
      {
        title: "First Video",
        owner: "Creative Team",
        automationLevel: "Manual",
        monthlyInstances: 20,
        subtasks: [
          {
            title: "Idea generation",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 20,
            currentTimeTaken: "30 mins",
          },
          {
            title: "Pull assets from the clients website",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 15,
            currentTimeTaken: "30 mins",
          },
          {
            title: "Refer to Creative Questionnaire for brand guidelines",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 20,
            currentTimeTaken: "2 mins",
          },
          {
            title: "Pull assets from stock footage/ image sites",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 15,
            currentTimeTaken: "30 mins",
          },
          {
            title: "Generate assets (Photoshop/ Generative AI)",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 5,
            currentTimeTaken: "45 mins",
          },
          {
            title: "Edit in Adobe Premiere Pro",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 20,
            currentTimeTaken: "120 mins",
          },
          {
            title: "Export, upload and submit",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 20,
            currentTimeTaken: "20 mins",
          },
        ],
      },
    ],
  },
  {
    id: "ongoing-account-management",
    name: "Ongoing Account Management",
    milestones: [
      {
        title: "Recurring Video",
        owner: "Creative Team",
        automationLevel: "Manual",
        monthlyInstances: 20,
        subtasks: [
          {
            title: "Idea generation",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 20,
            currentTimeTaken: "15 mins",
          },
          {
            title: "Pull assets from the clients website",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 15,
            currentTimeTaken: "30 mins",
          },
          {
            title: "Refer to Creative Questionnaire for brand guidelines",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 18,
            currentTimeTaken: "2 mins",
          },
          {
            title: "Pull assets from stock footage/ image sites",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 15,
            currentTimeTaken: "30 mins",
          },
          {
            title: "Generate assets (Photoshop/ Generative AI)",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 5,
            currentTimeTaken: "30 mins",
          },
          {
            title: "Edit in Adobe Premiere Pro",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 20,
            currentTimeTaken: "90 mins",
          },
          {
            title: "Export, upload and submit",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 20,
            currentTimeTaken: "20 mins",
          },
        ],
      },
      {
        title: "Email Campaign",
        owner: "Creative Team",
        automationLevel: "Manual",
        monthlyInstances: 15,
        subtasks: [
          {
            title: "Idea generation",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 15,
            currentTimeTaken: "30 mins",
          },
          {
            title: "Pull assets from the client's website",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 18,
            currentTimeTaken: "10 mins",
          },
          {
            title: "Pull assets from stock image sites",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 5,
            currentTimeTaken: "10 mins",
          },
          {
            title: "Generate assets (Photoshop/ Generative AI)",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 15,
            currentTimeTaken: "30 mins",
          },
          {
            title: "Write/ generate copy",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 20,
            currentTimeTaken: "10 mins",
          },
          {
            title: "Assemble email in Omnisend",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 20,
            currentTimeTaken: "45 mins",
          },
          {
            title: "Tag AM in Monday, provide full page screenshot of email campaign",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 20,
            currentTimeTaken: "3 mins",
          },
          {
            title: "Put case status to 'Ready to schedule'",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 20,
            currentTimeTaken: "0.5 mins",
          },
          {
            title: "Chase AM for approval",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 10,
            currentTimeTaken: "10 mins",
          },
          {
            title: "Schedule when approved, put case status to 'Scheduled'",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 20,
            currentTimeTaken: "0.5 mins",
          },
          {
            title: "When campaign is confirmed to have gone out, put case status to 'Done'",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 20,
            currentTimeTaken: "0.5 mins",
          },
        ],
      },
      {
        title: "Email Sender Verification",
        owner: "Creative Team",
        automationLevel: "Manual",
        monthlyInstances: 2,
        subtasks: [
          {
            title: "Inform AM of steps needed",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 2,
            currentTimeTaken: "5 mins",
          },
          {
            title: "Research client's domain registrar",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 2,
            currentTimeTaken: "5 mins",
          },
          {
            title: "Find article showcasing steps for particular registrar",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 2,
            currentTimeTaken: "10 mins",
          },
          {
            title: "Write up explainer email for client",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 2,
            currentTimeTaken: "7 mins",
          },
          {
            title: "Add domain and generate records in Omnisend",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 2,
            currentTimeTaken: "2 mins",
          },
          {
            title: "Get access to client's website using 2FA",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 2,
            currentTimeTaken: "10 mins",
          },
          {
            title: "Work out how to add records",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 1,
            currentTimeTaken: "10 mins",
          },
          {
            title: "Add records",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 2,
            currentTimeTaken: "10 mins",
          },
          {
            title: "Verify",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 2,
            currentTimeTaken: "5 mins",
          },
          {
            title: "Retry with 2FA if failed",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 1,
            currentTimeTaken: "20 mins",
          },
          {
            title: "Build manual warm-up audiences",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 1,
            currentTimeTaken: "30 mins",
          },
          {
            title: "Inform AM and client it has worked",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 2,
            currentTimeTaken: "5 mins",
          },
          {
            title: "Inform AM and client of need for use of warm-up audiences",
            owner: "Creative Team",
            automationLevel: "Manual",
            monthlyInstances: 1,
            currentTimeTaken: "10 mins",
          },
        ],
      },
      {
        title: "2 Week Internal Review",
        owner: "Account Manager",
        automationLevel: "Manual",
        subtasks: [
          {
            title: "Standard internal review in account to continue service before advancemenet",
            owner: "Account Manager",
            automationLevel: "Manual",
          },
        ],
      },
    ],
  },
];
