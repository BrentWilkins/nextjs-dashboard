import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Invoices',
    default: 'Invoices',
  },
};

export default function InvoicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}