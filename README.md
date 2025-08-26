# Roobo Shopify Connector

Simple Shopify app that connects to stores and shows "You are connected!" message.

## Configuration

Uses existing Shopify Partner app:
- **API Key**: `c1e0d6ef2db55594c93dc1fc91cb33f2`
- **Domain**: `marketplace.roobosoft.com`
- **Scopes**: `read_shop` (minimal permission)

## Pages

- `/` - Connection form
- `/success` - Success message
- `/api/auth/shopify` - OAuth start
- `/api/auth/callback` - OAuth callback

## Usage

1. Enter Shopify store name
2. Click "Connect Store"
3. Authorize on Shopify
4. See "🎉 You are Connected!" message

## Deployment

Deployed to: https://marketplace.roobosoft.com