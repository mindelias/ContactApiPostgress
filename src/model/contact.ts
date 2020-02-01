export type Contact = {
  id: string;
  firstName: string;
  lastName?: string;
  phone: string;
  email?: string;
  company?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

const contacts: Contact[] = [];

export default contacts;
