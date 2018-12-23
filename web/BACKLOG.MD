## Backlog & Bugs

# Bugs
- Notification System Not Working (Respond Button)
- API Gateway Stagger-Bugs
  * Loading Screen Component for the Transactions, since it will likely take 3 seconds.

# Product Backlog
- Sexier Buttons on JobSearch
  - A color in the middle, white bold text.
- Updating Application/Transaction ListGroupItems to use Thumbnails/Cards (Simmy)
- Making the Enter button work to submit Login/Registration.
- Message Respond Button Not taking you to the messaging screen.
- Cognito
  * Terms of Service & Privacy Policy Integrate into the Registration Flow.
  * Auth flow re-work (easier Registration Process)
  * Only enter essentials, then have a 'More Settings' button to 'Add to your profile to help make yourself a respectable applicant.'
  * 2g data testing.
  * New routes for admin console, exclusively - API credentials authentication.
  * Import access token script from CP REST for testing.
- Error handling, especially Beyonic transactions.
    - Fully integrate Raygun
- Server Side Rendering for SEO?
- Continous Integration system for the backend API.
- add {opt-stage} for stage, adding -s in Serverless.yml and deployment
- -s stagename flag for deploying
- GOT library for request/request-promise
- A system for users to upload a general resume, and optionally submit it with a job application or have people view it on a user's profile.
- When users are editing their profile information, populate the textbox with the props so that user's dont have to re-enter everything each time.
- Search/Filter by Industry/Pagination, Regex for direct searching through profiles, etc.
- SEO Audit + Server Side Rendering
- MailChimp system, plugging in. Send invites to all the old users, telling them they need to recreate their profile for the official launch. Or just send them a text.
  * Migration script to pull all users out of database with first, last, email
- Security Audit (Additional JWT Auth, XSS, XCRF)
- Google Analytics - React
- Getting Started Component/Resources for New Users/Tutorial.
- Notifications System Redesign.
- Organization affiliation.
- Integrate basic account, API integration with separate product?
- DynamoDB Table to keep track of what organizations/companies a user is affiliated with.
- Refactor Transaction component to reduce the footprint on transactions, not having to replicate the entire component/controller function.
- Pagination for Jobs List.
- Extend Contract/Reject/Request Application functionality
- Testing Strategy
- Refactor long variable names to something simple.
- S3 security policy overhaul - storing S3 securely with signed URL’s. Make a request to S3 to get a signed upload URL, to upload the image to a private bucket. You can also request a signed url to a private file, so that you can display the image and cache it.
- View list of users by skill.

# Marketing & Business Development
- Celes International Update
  * Landing Page photos
  * Updated projects, photos
  * Lambda messaging functionality.
- Financial Projections
- Company Valuation
- EC2/RDS budgeting
- Stripe Passport for US Incorporation
- Instagram Page
- One Page Registration Summary

# Admin Console
  - Digging into transactions.
  - Editing Transactions.
  - Secondary routes, REST API testing.
  - Beyonic API for understanding data.

# Projects
- Summary of Project, Objectives (Transactions?)
- Deliverables for each milestone.
- Project Completion Deadline

# Payments
- Stripe Passport for collecting USD/Visa
- 5 Million MM deposit limit.
- Is there a better way for employers to deposit funds into a freelancer's account?
- Account for potential MM tax.
- Refund Mechanism for Employers.
- Wallet Mechanism?

Notifications
Users will receive an SMS when:
* A job from their industry has been posted.
* A job that matches with one of their skills
* The business can send out messages to every user.
* The business can send messages to certain users.

# 2 sentence pitch
According to the Global Entrepreneurship Monitor, Uganda has the highest entrepreneurship rate in the world. Work & Rise was designed for the innovative business owner who is looking for contracts to build their business, and hire freelancers to help fulfill the work.

- Sarang - Kountable, partnership
- AWS Africa contact from Angel

- Notification 1.0
  * SMS Notifications:
    - Escrow Deposit Confirmation - test UGX.

- Registration Process
  - Two-factor authentication.
- Code cleanup, documentation.

- Fetch refactor
  * Create a service to re-use as much code as possible.
  * headers, etc.
  * remove var response = responseText.json() and just use () => responseText.json();
  * Add returns to all fetch requests to guarantee returning a promise

- Task-based jobs
- Atomic transactions, roll back transactions if error
- Projects code refactoring - have 1 updateMilestone and 1 beyonic milestone function using [] to interpolate variable names. title={this.state.project['milestoneTitle'+'mNumber']} with CommandD?
- Move navbar into its own component
- Add forms and handleSubmits and type Submits to buttons so that you could press enter to submit them.
- Logging servers, client side, lambdas
- Staging, prod, dev servers
- dev database
- Sequelize migration research.
- Employers/Government looking through list of freelancers

- Notification 2.0
  * System wide - topic subscription.
  * New job posted, SMS sent to freelancers with matching skills
  * Notification to employers b4 job expires?
  * Send notification to employer who made job, when job is about to expire *trickier*
  * Display escrow status to user

- API Changes
  * After jobs expire, user's should not be able to apply. Viewing can be done?
  * Adding education level to profile, job posting.
  * Languages they speak in profile.

# WR-Reporting & Administrative Portal
Check GiHub ReadMe

# Product Marketing
- Product videos
  * Registration process
  * Creating your jobs, reviewing applications, sending messages.
  * Viewing jobs, submitting application, sending messages.
  * Managing milestones, accepting the contract, reviewing transaction info
  * OBS Software

# Marketing

- AWS South Africa migration for GDPR concerns.
- September 3rd, Expo - Ready to Launch
  * Marketing materials
  * Banner (SVG images)
  * Stickers
  * Team t-shirts.
  * Put together presentations for 3 hours to learn.
  * Business document folder.
  * Some more young people to help people sign up to the platform, follow-up with them.
  * Journalists for video, script.
  * Local subtitles?
  * Slick video.
  * PowerPoint presentation.
  * 19 tactics for building a two way marketplace.
- Accept Visa (https://mobilemoneyafrica.com/index.php/blog/uganda-visa-goes-mobile)
- Payment Rails?
- DusuPay?
- Accounteer - African Accounting API.
- Optimizations for state management, fewer API calls.
