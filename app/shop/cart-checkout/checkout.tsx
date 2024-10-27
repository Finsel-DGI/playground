"use client"

import { Input } from "@/components/input";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { User } from "@finsel-dgi/pasby-react";
import { getValueByQuery } from "@rebatlabs/ui-funs";
import { useState } from "react";

const card = {
  digits: "4242 4242 4242 4242",
  exp: "12/99",
  cvv: "202",
}

export function CheckoutElement({ eid }: { eid: User }) {
  const claims = eid.claims;
  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
        <div>
          <h3 id="contact-info-heading" className="text-lg font-medium text-gray-900">
            Contact information
          </h3>

          <div className="mt-6">
            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              <Input
                id="email-address"
                name="email-address"
                type="email"
                disabled
                defaultValue={eid.claims?.contact?.email}
                autoComplete="email"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-medium text-gray-900">Payment details</h3>

          <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
            <div className="col-span-3 sm:col-span-4">
              <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                Card number
              </label>
              <div className="mt-1">
                <Input
                  id="card-number"
                  name="card-number"
                  type="text"
                  disabled
                  defaultValue={card.digits}
                  autoComplete="cc-number"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="col-span-2 sm:col-span-3">
              <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                Expiration date (MM/YY)
              </label>
              <div className="mt-1">
                <Input
                  id="expiration-date"
                  name="expiration-date"
                  type="text"
                  disabled
                  defaultValue={card.exp}
                  autoComplete="cc-exp"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
                />
              </div>
            </div>

            <div>
              <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                CVC
              </label>
              <div className="mt-1">
                <Input
                  id="cvc"
                  name="cvc"
                  disabled
                  type="text"
                  defaultValue={card.cvv}
                  autoComplete="csc"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-medium text-gray-900">Shipping address</h3>

          <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
            <div className="sm:col-span-3">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <div className="mt-1">
                <Input
                  id="address"
                  name="address"
                  disabled
                  type="text"
                  defaultValue={getValueByQuery(claims, 'address.place')}
                  autoComplete="street-address"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>


            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <div className="mt-1">
                <Input
                  id="country"
                  name="country"
                  disabled
                  defaultValue={getValueByQuery(claims, 'address.country')}
                  type="text"
                  autoComplete="country"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-medium text-gray-900">Billing information</h3>

          <div className="mt-6 flex items-center">
            <input
              defaultChecked
              id="same-as-shipping"
              name="same-as-shipping"
              type="checkbox"
              disabled
              className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
            />
            <div className="ml-2">
              <label htmlFor="same-as-shipping" className="text-sm font-medium text-gray-900">
                Same as shipping information
              </label>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
          <PSD/>
        </div>
      </div>
    </div>
  );
}

function PSD() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className="rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
        >
          Pay now
        </button>
      </AlertDialogTrigger>
    </AlertDialog>
  );
}