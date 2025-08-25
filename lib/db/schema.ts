import { pgTable, varchar, timestamp, text, boolean, integer, decimal, uuid, jsonb } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Users & Authentication
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  shopifyStoreId: varchar('shopify_store_id', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull().default('vendor'), // super_admin, vendor, sub_user
  status: varchar('status', { length: 50 }).notNull().default('pending'), // active, pending, suspended
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const userProfiles = pgTable('user_profiles', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  businessName: varchar('business_name', { length: 255 }),
  contactInfo: jsonb('contact_info'), // phone, address, etc.
  businessAddress: text('business_address'),
  businessDescription: text('business_description'),
  logoUrl: text('logo_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

// Vendor Management
export const vendors = pgTable('vendors', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  shopId: varchar('shop_id', { length: 255 }).notNull(),
  commissionRate: decimal('commission_rate', { precision: 5, scale: 2 }).default('10.00'),
  status: varchar('status', { length: 50 }).notNull().default('pending'), // active, pending, suspended
  approvedAt: timestamp('approved_at'),
  approvedBy: uuid('approved_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const vendorSettings = pgTable('vendor_settings', {
  id: uuid('id').defaultRandom().primaryKey(),
  vendorId: uuid('vendor_id').references(() => vendors.id, { onDelete: 'cascade' }).notNull(),
  shippingConfig: jsonb('shipping_config'),
  paymentConfig: jsonb('payment_config'),
  notificationSettings: jsonb('notification_settings'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

// Sub-user Management
export const subUsers = pgTable('sub_users', {
  id: uuid('id').defaultRandom().primaryKey(),
  vendorId: uuid('vendor_id').references(() => vendors.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  permissions: jsonb('permissions'), // array of permission strings
  createdBy: uuid('created_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

// Product Management
export const vendorProducts = pgTable('vendor_products', {
  id: uuid('id').defaultRandom().primaryKey(),
  vendorId: uuid('vendor_id').references(() => vendors.id, { onDelete: 'cascade' }).notNull(),
  shopifyProductId: varchar('shopify_product_id', { length: 255 }).notNull(),
  status: varchar('status', { length: 50 }).notNull().default('active'), // active, inactive, pending
  commission: decimal('commission', { precision: 5, scale: 2 }),
  customSettings: jsonb('custom_settings'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const productAssignments = pgTable('product_assignments', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id').references(() => vendorProducts.id, { onDelete: 'cascade' }).notNull(),
  subUserId: uuid('sub_user_id').references(() => subUsers.id, { onDelete: 'cascade' }).notNull(),
  permissions: jsonb('permissions'), // edit, view, manage_inventory, etc.
  assignedBy: uuid('assigned_by').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

// Commission & Revenue
export const commissionRates = pgTable('commission_rates', {
  id: uuid('id').defaultRandom().primaryKey(),
  vendorId: uuid('vendor_id').references(() => vendors.id, { onDelete: 'cascade' }).notNull(),
  category: varchar('category', { length: 255 }),
  rate: decimal('rate', { precision: 5, scale: 2 }).notNull(),
  effectiveDate: timestamp('effective_date').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export const revenueTracking = pgTable('revenue_tracking', {
  id: uuid('id').defaultRandom().primaryKey(),
  vendorId: uuid('vendor_id').references(() => vendors.id, { onDelete: 'cascade' }).notNull(),
  orderId: varchar('order_id', { length: 255 }).notNull(),
  shopifyOrderId: varchar('shopify_order_id', { length: 255 }).notNull(),
  productId: uuid('product_id').references(() => vendorProducts.id),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  commission: decimal('commission', { precision: 10, scale: 2 }).notNull(),
  commissionRate: decimal('commission_rate', { precision: 5, scale: 2 }).notNull(),
  status: varchar('status', { length: 50 }).notNull().default('pending'), // pending, paid, disputed
  paidAt: timestamp('paid_at'),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

// App Configuration
export const appSettings = pgTable('app_settings', {
  id: uuid('id').defaultRandom().primaryKey(),
  shopId: varchar('shop_id', { length: 255 }).notNull(),
  key: varchar('key', { length: 255 }).notNull(),
  value: jsonb('value'),
  updatedBy: uuid('updated_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const shippingZones = pgTable('shipping_zones', {
  id: uuid('id').defaultRandom().primaryKey(),
  shopId: varchar('shop_id', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  countries: jsonb('countries'), // array of country codes
  rates: jsonb('rates'), // shipping rate configuration
  isActive: boolean('is_active').default(true),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(userProfiles, { fields: [users.id], references: [userProfiles.userId] }),
  vendor: one(vendors, { fields: [users.id], references: [vendors.userId] }),
  subUser: one(subUsers, { fields: [users.id], references: [subUsers.userId] })
}))

export const vendorsRelations = relations(vendors, ({ one, many }) => ({
  user: one(users, { fields: [vendors.userId], references: [users.id] }),
  settings: one(vendorSettings, { fields: [vendors.id], references: [vendorSettings.vendorId] }),
  products: many(vendorProducts),
  subUsers: many(subUsers),
  commissionRates: many(commissionRates),
  revenue: many(revenueTracking)
}))

export const vendorProductsRelations = relations(vendorProducts, ({ one, many }) => ({
  vendor: one(vendors, { fields: [vendorProducts.vendorId], references: [vendors.id] }),
  assignments: many(productAssignments),
  revenue: many(revenueTracking)
}))