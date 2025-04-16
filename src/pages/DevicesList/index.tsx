import { FC, useEffect, useState } from "react";
import "./index.scss";
import { PageHeading } from "../../components/PageHeading";
import { useStore } from "../../store/store";
import { TState } from "../../types";
import { AdminPaths, EAdminRoutes } from "../../routes/Routes";
import { Table } from "./components/Table";
import { Pagination } from "../../components/Pagination";
import { EmptyList } from "../../components/EmptyList";
import { AddDeviceModal } from "../../components/AddDeviceModal";
import { HeaderButton } from "../../components/HeaderButton";
import { Filters } from "./components/Filters";
import { EmptyStateImg } from "../../utils/constants/images.tsx";

export const DevicesList: FC = () => {
  const [{ devices }, setState] = useStore();
  const [pageValues, setPageValues] = useState({
    currentPage: 1,
    pageSize: 6,
    isDeviceModalOpen: false,
  });

  useEffect(() => {
    setState((prevState: TState) => ({
      ...prevState,
      breadcrumbs: [
        { path: AdminPaths[EAdminRoutes.DEVICES_LIST], name: "Devices" },
      ],
    }));
  }, [setState]);

  const handlePageChange = (page: number) => {
    setPageValues((prev) => ({ ...prev, currentPage: page }));
  };

  return (
    <div className="devices-container">
      <div className="devices-header">
        <PageHeading
          title="Devices list"
        />
        <div className="devices-header-right">
          <Filters />
          <HeaderButton
            buttonText="+ Add Device"
            onClick={() => setPageValues(prev => ({ ...prev, isDeviceModalOpen: true }))}
          />
        </div>
      </div>

      <AddDeviceModal
        isOpen={pageValues.isDeviceModalOpen}
        onClose={() => setPageValues((prev) => ({ ...prev, isDeviceModalOpen: false }))}
        onSubmit={() => {}}
      />

      {!devices.isLoading && (
        <>
          {devices.filteredItems.length ? (
            <>
              <Table 
                currentPage={pageValues.currentPage} 
                pageSize={pageValues.pageSize} 
                devices={devices.filteredItems} 
              />
              <div className="devices-footer">
                <p className="devices-count">
                  <span>{devices.filteredItems.length}</span> devices
                </p>
                <Pagination
                  currentPage={pageValues.currentPage}
                  pageSize={pageValues.pageSize}
                  totalItems={devices.filteredItems.length}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          ) : (
            <EmptyList
              image={EmptyStateImg}
              title={"Nothing was found for your query"}
            />
          )}
        </>
      )}

      {devices.isLoading && <p>Loading...</p>}
    </div>
  );
};
