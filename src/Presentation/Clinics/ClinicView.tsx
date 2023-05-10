/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect } from "react";
import useClinicViewModel from "./ClinicViewModel";
import { convertUsStateAbbrAndName } from "../../Core/utils/stateNameToAlphaCode";

export interface ClinicViewProps {
  clinicId: string;
  children: ReactNode;
}

export const ClinicView = (props: ClinicViewProps): React.ReactElement => {
  const { clinicId, children } = props;
  const { clinic, getClinicById } = useClinicViewModel();

  useEffect(() => {
    getClinicById(clinicId);
  }, []);

  const stateAlphaCode = clinic?.state
    ? convertUsStateAbbrAndName(clinic?.state)
    : undefined;

  const renderClinics = clinic ? (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <svg
        className="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
      >
        <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c.2 35.5-28.5 64.3-64 64.3H128.1c-35.3 0-64-28.7-64-64V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L416 100.7V64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V185l52.8 46.4c8 7 12 15 11 24zM272 192c-8.8 0-16 7.2-16 16v48H208c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h48v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V320h48c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H320V208c0-8.8-7.2-16-16-16H272z" />
      </svg>
      <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {clinic.name}
      </h5>
      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
        {clinic.address}
      </p>
      {clinic.city}, {stateAlphaCode}, {clinic.zipcode}
      <div>{children}</div>
    </div>
  ) : undefined;

  return <>{renderClinics}</>;
};
