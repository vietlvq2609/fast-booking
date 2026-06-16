import { pgTable, text, unique } from 'drizzle-orm/pg-core';
import { staff } from './staff';
import { services } from './services';

export const staffServices = pgTable(
  'staff_services',
  {
    staffId: text('staff_id')
      .notNull()
      .references(() => staff.id, { onDelete: 'cascade' }),
    serviceId: text('service_id')
      .notNull()
      .references(() => services.id, { onDelete: 'cascade' }),
  },
  (t) => [unique('staff_services_pk').on(t.staffId, t.serviceId)],
);
