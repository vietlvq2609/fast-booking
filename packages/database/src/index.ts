export { db } from './client';
export type { Db } from './client';

// Helpers
export { auditTimestamps } from './schema/helpers';

// Enums
export {
  userRoleEnum,
  bookingStatusEnum,
  paymentStatusEnum,
  paymentMethodEnum,
  dayOfWeekEnum,
} from './schema/enums';

// Tables
export { shops } from './schema/shops';
export { users } from './schema/users';
export { staff } from './schema/staff';
export { services } from './schema/services';
export { staffServices } from './schema/staff-services';
export { customers } from './schema/customers';
export { bookings } from './schema/bookings';
export { bookingItems } from './schema/booking-items';
export { workingHours } from './schema/working-hours';

// Relations
export {
  shopsRelations,
  usersRelations,
  staffRelations,
  servicesRelations,
  staffServicesRelations,
  customersRelations,
  bookingsRelations,
  bookingItemsRelations,
  workingHoursRelations,
} from './schema/relations';
