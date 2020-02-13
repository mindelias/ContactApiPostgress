export type Contact = {
  id: string;
  first_name: string;
  last_name?: string;
  phone: string;
  email?: string;
  company?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

const contacts: Contact[] = [];

export default contacts;
