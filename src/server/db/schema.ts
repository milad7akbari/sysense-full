import { pgTable, uuid, text, boolean, timestamp, integer, bigint, uniqueIndex, primaryKey, foreignKey } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

// --- Users ---
export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    phoneNumber: text('phone_number').notNull().unique(),
    email: text('email').unique(),
    username: text('username').unique(),
    isActive: boolean('is_active').default(true).notNull(),
    firstname: text('firstname'),
    lastname: text('lastname'),
    bio: text('bio'),
    profilePictureUrl: text('profile_picture_url'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const otpRequests = pgTable('otp_requests', {
    id: uuid('id').defaultRandom().primaryKey(),
    phoneNumber: text('phone_number').notNull(),
    hashedOtp: text('hashed_otp').notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    used: boolean('used').default(false).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// --- Products ---
export const brands = pgTable('brands', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull().unique(),
});

export const products = pgTable('products', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    dgProductId: bigint('dg_product_id', { mode: 'number' }),
    sellingPrice: integer('selling_price').notNull(), // using integer for cents/basic units
    brandId: uuid('brand_id').references(() => brands.id),
    sellerId: uuid('seller_id').references(() => users.id).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const productImages = pgTable('product_images', {
    id: uuid('id').defaultRandom().primaryKey(),
    url: text('url').notNull(),
    productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
});

// --- Interactions ---
export const productInteractions = pgTable('product_interactions', {
    userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
    interactionType: text('interaction_type', { enum: ['like', 'dislike'] }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
}, (t) => ({
    pk: primaryKey({ columns: [t.userId, t.productId] }),
}));

// --- Collections ---
export const collections = pgTable('collections', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id).notNull(),
    name: text('name').notNull(),
    isPublic: boolean('is_public').default(false).notNull(),
    isDefaultFavorites: boolean('is_default_favorites').default(false).notNull(),
});

export const collectionPins = pgTable('collection_pins', {
    collectionId: uuid('collection_id').references(() => collections.id, { onDelete: 'cascade' }).notNull(),
    productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
}, (t) => ({
    pk: primaryKey({ columns: [t.collectionId, t.productId] }),
}));

// --- Relations ---
export const productsRelations = relations(products, ({ one, many }) => ({
    brand: one(brands, { fields: [products.brandId], references: [brands.id] }),
    seller: one(users, { fields: [products.sellerId], references: [users.id] }),
    images: many(productImages),
    interactions: many(productInteractions),
}));

export const usersRelations = relations(users, ({ many }) => ({
    interactions: many(productInteractions),
    collections: many(collections),
}));