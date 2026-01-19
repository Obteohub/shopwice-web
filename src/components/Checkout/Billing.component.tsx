// Imports
import {
  SubmitHandler,
  useForm,
  useFormContext,
  FormProvider,
} from 'react-hook-form';

// Components
import { InputField } from '@/components/Input/InputField.component';
import AddressAutocomplete from '@/components/Input/AddressAutocomplete.component';
import Button from '../UI/Button.component';

// Constants
import { INPUT_FIELDS } from '@/utils/constants/INPUT_FIELDS';
import { ICheckoutDataProps } from '@/utils/functions/functions';

interface IBillingProps {
  handleFormSubmit: SubmitHandler<ICheckoutDataProps>;
  isLoading?: boolean;
  buttonLabel?: string;
}

import { useQuery } from '@apollo/client';
import { GET_ALLOWED_COUNTRIES } from '@/utils/gql/GQL_QUERIES';

const CountrySelect = ({ label, name, customValidation }: { label: string, name: string, customValidation: any }) => {
  const { register } = useFormContext();
  const { data } = useQuery(GET_ALLOWED_COUNTRIES);
  const allowedCountries = data?.wooCommerce?.countries || [];

  return (
    <div className="w-full">
      <label htmlFor={name} className="block mb-1 text-xs font-bold text-gray-700">
        {label}
      </label>
      <select
        id={name}
        {...register(name, customValidation)}
        className="bg-white border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
      >
        {allowedCountries.length > 0 ? (
          allowedCountries.map((c: any) => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))
        ) : (
          <option value="GH">Ghana (Default)</option>
        )}
      </select>
    </div>
  );
};

const OrderButton = ({ isLoading, label }: { isLoading: boolean; label: string }) => {
  return (
    <div className="w-full p-2">
      <div className="mt-4 flex justify-center">
        <Button buttonDisabled={isLoading}>
          {isLoading ? 'Processing...' : label}
        </Button>
      </div>
    </div>
  );
};

const Billing = ({ handleFormSubmit, isLoading = false, buttonLabel = 'PLACE ORDER' }: IBillingProps) => {
  const methods = useForm<ICheckoutDataProps>();

  return (
    <section className="w-full">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
          <div className="flex flex-wrap -mx-1">
            {INPUT_FIELDS.map(({ id, label, name, customValidation }) => (
              <div key={id} className="w-full md:w-1/2 px-1 mb-2">
                {name === 'address1' ? (
                  <AddressAutocomplete label={label} name={name} />
                ) : name === 'country' ? (
                  <CountrySelect label={label} name={name} customValidation={customValidation} />
                ) : (
                  <InputField
                    inputLabel={label}
                    inputName={name}
                    customValidation={customValidation}
                  />
                )}
              </div>
            ))}
            <OrderButton isLoading={isLoading} label={buttonLabel} />
          </div>
        </form>
      </FormProvider>
    </section>
  );
};

export default Billing;
