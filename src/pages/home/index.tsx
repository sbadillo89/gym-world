import { Birthays } from "./components/birthays";
import { Card } from "../components/card";
import { Fragment } from "react";
import { NewCustomers } from "./components/new-customers";
import { Sessions } from "./components/sessions";
import { TotalPerMonth } from "./components/total-per-month";
import { WeeklyMemberships } from "./components/weekly-memberships";
import { WelcomeBanner } from "./welcome-banner";

const Home = (): React.ReactElement => {
  return (
    <Fragment>
      {/* Welcome banner */}
      <WelcomeBanner />

      <div className="flex flex-col sm:grid sm:grid-cols-3 gap-y-3 sm:gap-4 sm:mt-6 mb-3">
        <TotalPerMonth />
        <NewCustomers />
        <TotalPerMonth />
      </div>

      <div className="flex flex-col sm:grid sm:grid-cols-2 sm:gap-4 sm:mt-6">
        <Card>
          <h3 className="text-primary-100 font-semibold text-xl mb-2">
            Sesiones del día
          </h3>
          <Sessions />
        </Card>
        <Card>
          <h3 className="text-primary-100 font-semibold text-xl mb-2">
            Cumpleaños del mes
          </h3>
          <Birthays />
        </Card>
        <Card>
          <h3 className="text-primary-100 font-semibold text-xl mb-2">
            Membresias por semana
          </h3>
          <WeeklyMemberships />
        </Card>
        <Card>otra card</Card>
      </div>
    </Fragment>
  );
};

export { Home };
