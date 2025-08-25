# Roobo Multivendor Marketplace

A Shopify app that transforms any Shopify store into a multivendor marketplace with comprehensive role-based access control.

## Features

- **Multi-tenant Architecture**: Each Shopify store operates independently
- **Role-based Access**: Super Admin, Vendor, and Sub-user roles
- **Commission Management**: Flexible commission structures
- **Real-time Analytics**: Dashboard for all user types
- **Shopify Integration**: Seamless product and order synchronization

## Tech Stack

- **Frontend/Backend**: Next.js 14 (App Router)
- **Database**: Neon PostgreSQL
- **File Storage**: Vercel Blob
- **Authentication**: Shopify OAuth + NextAuth
- **Deployment**: Vercel

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and fill in your values
4. Run development server: `npm run dev`

## Environment Variables

See `.env.example` for required environment variables.

## Database Setup

1. Create a Neon PostgreSQL database
2. Run migrations: `npm run db:migrate`

## Deployment

Deploy to Vercel with automatic Neon integration.