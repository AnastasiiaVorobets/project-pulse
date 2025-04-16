import { FC, useEffect, useState } from "react";
import "./index.scss";
import { useStore } from "../../store/store";
import { TState } from "../../types";
import { AdminPaths, EAdminRoutes } from "../../routes/Routes";
import { AllertTab } from "./tabs/AllertTab";
import { ProfileTab } from "./tabs/ProfileTab";
import { Tabs } from "../../utils/enums";
import { HeaderButton } from "../../components/HeaderButton";
import { TabButton } from "../../components/TabButton";
import { PageHeading } from "../../components/PageHeading";

export const ProfilePage: FC = () => {
  const [, setState] = useStore();
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.MAIN_PROFILE);

  useEffect(() => {
    setState((prevState: TState) => ({
      ...prevState,
      breadcrumbs: [
        { path: AdminPaths[EAdminRoutes.SETTINGS], name: "Settings" },
      ],
    }));
  }, [setState, activeTab]);

  return (
    <div className="profile">
      <div className="profile__header">
        <div className='device__header'>
          <PageHeading title='Settings' />
        </div>
        {activeTab === Tabs.MAIN_PROFILE && (
          <HeaderButton buttonText="Save Changes"/>
        )}
      </div>

      <div className="tab-container">
        <TabButton
          label="Main"
          isActive={activeTab === Tabs.MAIN_PROFILE}
          onClick={() => setActiveTab(Tabs.MAIN_PROFILE)}
        />
        <TabButton
          label="Allerts"
          isActive={activeTab === Tabs.ALLERT_PROFILE}
          onClick={() => setActiveTab(Tabs.ALLERT_PROFILE)}
        />
      </div>

      {activeTab === Tabs.MAIN_PROFILE ? (
        <ProfileTab/>
      ) : (
        <AllertTab/>
      )}
    </div>
  );
};
