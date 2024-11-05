import { AddressForm } from "./ui/AddressForm";
import { Title } from "@/components/ui/title/Title";
import { getCountries } from "@/actions/countries/get-countries";
import { auth } from "@/auth.config";
import { getUserAddress } from "@/actions/address/get-user-address.action";

export default async function AddressPage() {
  const countries = await getCountries();

  const session = await auth();

  if (!session?.user)
    return <h3 className="text-5xl">Error 500 - No user session</h3>;

  const address = await getUserAddress(session.user.id);

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Address" subtitle="Delivery address" />

        <AddressForm
          countries={countries}
          userStoredAddress={address ?? undefined}
        />
      </div>
    </div>
  );
}
