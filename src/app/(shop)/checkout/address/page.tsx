import { Title } from "@/components/ui/title/Title";
import { AddressForm } from "./ui/AddressForm";

export default function AddressPage() {
  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Address" subtitle="Delivery address" />

        <AddressForm />
      </div>
    </div>
  );
}
