# Citrus.ai

Citrus.ai is a SaaS platform that empowers HR teams to collect honest, private feedback through exit interviews.  
When employees leave, HR managers can generate tailored exit interview forms, share them securely, and receive insights powered by AI.

Something i struggled with while creating that project, is the form creation logic, specifically for select and radio inputs. Those inputs require to be able to add multiple options to what to select, while regular text inputs don't need that, and I didn't want to create seperate schema and api for it, so I was struggling creating that logic, and I chose to add another fiels called options field, which can be empty in case the input is text or number.

## Key Features

- HR creates custom exit interview forms (questions, labels, placeholders).
- Receiver (employee) fills out the form anonymously/privately via a unique link.
- Responses are stored securely — only the HR creator can access them.
- AI insights help HR identify recurring themes in feedback.
- Notification system keeps HR updated when interviews are completed.

## Tech Stack

- **Next.js 13+ App Router**
- **Prisma ORM** with MongoDB
- **TailwindCSS** for styling
- **TypeScript**
- Optional integrations: AI/NLP for insights, email delivery for sharing links.

# Citrus.ai Workflow

## 1. HR User

1. Logs in / creates an account.
2. Creates an **Exit Interview**:
   - Adds receiver name + email.
   - Defines interview fields (label, placeholder).
   - Gets a unique link for the interview.
3. Shares the link with the receiver.
4. Receives a notification once the interview is completed.
5. Views responses and AI-generated insights.

## 2. Receiver (Employee)

1. Opens interview link (no login required).
2. Sees form fields defined by HR.
3. Fills out and submits their answers.
4. Submission is stored in the database, linked to the interview.

## 3. Backend System

- Stores interviews, fields, and responses.
- Generates notifications for HR.
- Tracks interview completion status (`isCompleted`).
- Supports AI analysis on submitted feedback.

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/jane-does-coding/citrusai
cd citrusai
```

### 2. Install the dependencies

```bash
npm i
```

### 3. Configure .env

```bash
DATABASE_URL="your mongodb"
NEXTAUTH_SECRET="random-secret"
```

### 4. Setup Prisma

```bash
npx prisma generate
```

### 4. Run the project

```bash
npm run dev
```

[![Athena Award Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Faward.athena.hackclub.com%2Fapi%2Fbadge)](https://award.athena.hackclub.com?utm_source=readme)
