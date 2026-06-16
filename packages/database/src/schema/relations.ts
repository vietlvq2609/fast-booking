import { relations } from 'drizzle-orm';
import { shops } from './shops';
import { users } from './users';
import { staff } from './staff';
import { services } from './services';
import { staffServices } from './staff-services';
import { customers } from './customers';
import { bookings } from './bookings';
import { bookingItems } from './booking-items';
import { workingHours } from './working-hours';

export const shopsRelations = relations(shops, ({ many }) => ({
  users: many(users),
  staff: many(staff),
  services: many(services),
  customers: many(customers),
  bookings: many(bookings),
  workingHours: many(workingHours),
}));

export const usersRelations = relations(users, ({ one }) => ({
  shop: one(shops, { fields: [users.shopId], references: [shops.id] }),
  staff: one(staff, { fields: [users.id], references: [staff.userId] }),
}));

export const staffRelations = relations(staff, ({ one, many }) => ({
  shop: one(shops, { fields: [staff.shopId], references: [shops.id] }),
  user: one(users, { fields: [staff.userId], references: [users.id] }),
  staffServices: many(staffServices),
  bookings: many(bookings),
}));

export const servicesRelations = relations(services, ({ one, many }) => ({
  shop: one(shops, { fields: [services.shopId], references: [shops.id] }),
  staffServices: many(staffServices),
  bookingItems: many(bookingItems),
}));

export const staffServicesRelations = relations(staffServices, ({ one }) => ({
  staff: one(staff, { fields: [staffServices.staffId], references: [staff.id] }),
  service: one(services, { fields: [staffServices.serviceId], references: [services.id] }),
}));

export const customersRelations = relations(customers, ({ one, many }) => ({
  shop: one(shops, { fields: [customers.shopId], references: [shops.id] }),
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
  shop: one(shops, { fields: [bookings.shopId], references: [shops.id] }),
  customer: one(customers, { fields: [bookings.customerId], references: [customers.id] }),
  staff: one(staff, { fields: [bookings.staffId], references: [staff.id] }),
  items: many(bookingItems),
}));

export const bookingItemsRelations = relations(bookingItems, ({ one }) => ({
  booking: one(bookings, { fields: [bookingItems.bookingId], references: [bookings.id] }),
  service: one(services, { fields: [bookingItems.serviceId], references: [services.id] }),
}));

export const workingHoursRelations = relations(workingHours, ({ one }) => ({
  shop: one(shops, { fields: [workingHours.shopId], references: [shops.id] }),
}));
