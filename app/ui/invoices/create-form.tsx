'use client';

import { CheckIcon, ClockIcon, CurrencyDollarIcon, UserCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { createInvoice } from '@/app/lib/actions';
import { CustomerField } from '@/app/lib/definitions';
import { Button } from '@/app/ui/button';

export default function Form({ customers }: { customers: CustomerField[] }) {
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerField | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <form action={createInvoice}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <input type="hidden" name="customerId" value={selectedCustomer?.id || ''} />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 pr-8 text-left text-sm outline-2 placeholder:text-gray-500"
            >
              {selectedCustomer ? (
                <div className="flex items-center gap-2">
                  <Image
                    src={selectedCustomer.image_url}
                    alt={selectedCustomer.name}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  {selectedCustomer.name}
                </div>
              ) : (
                'Select a customer'
              )}
            </button>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />

            {isOpen && (
              <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
                {customers.map((customer) => (
                  <button
                    key={customer.id}
                    type="button"
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setIsOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-50"
                  >
                    <Image
                      src={customer.image_url}
                      alt={customer.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    {customer.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">Set the invoice status</legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}
