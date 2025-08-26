# Shopify OAuth Troubleshooting Guide

## Current Error: "application_cannot_be_found"

### API Credentials
- **API Key**: `c1e0d6ef2db55594c93dc1fc91cb33f2`
- **API Secret**: `46846b517788ded59bb6299ba99ab119`

### Checklist for Shopify Partner Dashboard

#### 1. App Status
- [ ] App must be **ACTIVE** (not draft)
- [ ] App must be **PUBLISHED** for external use

#### 2. App URLs Configuration
- **App URL**: `https://marketplace.roobosoft.com/app-install`
- **Allowed redirection URLs**: 
  - `https://marketplace.roobosoft.com/api/auth/shopify/callback`
  - `https://marketplace.roobosoft.com/dashboard`

#### 3. Distribution Settings
- [ ] **Distribution**: Set to "Custom distribution" or "Unlisted"
- [ ] **Installation URL**: `https://marketplace.roobosoft.com/app-install`

#### 4. App Setup
- [ ] **Embed app in Shopify admin**: Set to **FALSE**
- [ ] **App proxy**: Not required for this setup

#### 5. Scopes (OAuth & Access)
Required scopes:
- `read_products`
- `write_products` 
- `read_orders`
- `write_orders`
- `read_customers`

### Quick Fix Steps

1. **Verify API Key is Active**
   - Go to Partner Dashboard > Apps > Your App
   - Check if API key matches: `c1e0d6ef2db55594c93dc1fc91cb33f2`
   - If different, update .env.local with correct key

2. **Publish the App**
   - In Partner Dashboard, ensure app status is "Active"
   - Click "Publish" if it's still in draft

3. **Test with Manual OAuth URL**
   Open: `https://quickstart-dc4ce7d5.myshopify.com/admin/oauth/authorize?client_id=c1e0d6ef2db55594c93dc1fc91cb33f2&scope=read_products,write_products,read_orders,write_orders,read_customers&redirect_uri=https://marketplace.roobosoft.com/api/auth/shopify/callback&state=test123`

### If Still Failing - Create New App

If the above doesn't work, the app might be corrupted. Create a new Shopify Partner app:

1. Go to Shopify Partner Dashboard
2. Click "Create app" 
3. Choose "Custom app"
4. Set all URLs to use your domain
5. Update .env.local with new API credentials

### Expected Working Flow
1. User goes to: `https://marketplace.roobosoft.com/app-install?shop=quickstart-dc4ce7d5`
2. Redirects to: `/api/auth/shopify?shop=quickstart-dc4ce7d5`
3. Redirects to: Shopify OAuth page (should NOT show "application_cannot_be_found")
4. After approval, redirects to: `/api/auth/shopify/callback`
5. Finally redirects to: `/dashboard?shop=quickstart-dc4ce7d5&installed=true`