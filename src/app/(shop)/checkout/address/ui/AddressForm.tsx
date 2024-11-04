"use client";

import Link from "next/link";

export const AddressForm = () => {
  return (
    <div className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
      <div className="flex flex-col mb-2">
        <span>Name</span>
        <input type="text" className="p-2 border rounded-md bg-gray-200" />
      </div>

      <div className="flex flex-col mb-2">
        <span>Lastname</span>
        <input type="text" className="p-2 border rounded-md bg-gray-200" />
      </div>

      <div className="flex flex-col mb-2">
        <span>Street</span>
        <input type="text" className="p-2 border rounded-md bg-gray-200" />
      </div>

      <div className="flex flex-col mb-2">
        <span>Street 2 (optional)</span>
        <input type="text" className="p-2 border rounded-md bg-gray-200" />
      </div>

      <div className="flex flex-col mb-2">
        <span>Zip code</span>
        <input type="text" className="p-2 border rounded-md bg-gray-200" />
      </div>

      <div className="flex flex-col mb-2">
        <span>City</span>
        <input type="text" className="p-2 border rounded-md bg-gray-200" />
      </div>

      <div className="flex flex-col mb-2">
        <span>Country</span>
        <select className="p-2 border rounded-md bg-gray-200">
          <option value="">[ Select ]</option>
          <option value="MX">Mexico</option>
        </select>
      </div>

      <div className="flex flex-col mb-2">
        <span>Phone</span>
        <input type="text" className="p-2 border rounded-md bg-gray-200" />
      </div>

      <div className="flex flex-col mb-2 sm:mt-1">
        <div className="inline-flex items-center mb-10">
          <label
            className="border-gray-500 relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor="checkbox"
          >
            <input
              type="checkbox"
              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
              id="checkbox"
              checked
            />
            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </label>

          <span>Remember addres?</span>
        </div>

        <Link
          href="/checkout"
          className="btn-primary flex w-full sm:w-1/2 justify-center "
        >
          Continue
        </Link>
      </div>
    </div>
  );
};