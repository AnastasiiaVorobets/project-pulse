import { FC, useEffect, useState } from "react";
import { useStore } from "../../store/store.tsx";
import { TState } from "../../types";
import { AdminPaths, EAdminRoutes } from "../../routes/Routes.tsx";
import "./index.scss";
import { PageHeading } from "../../components/PageHeading";
import { Filters } from "./components/Filters";
import { UserTable } from "./components/Table";
import { HeaderButton } from "../../components/HeaderButton";
import { EmptyList } from "../../components/EmptyList";
import { InviteUserModal } from "../../components/InviteUserModal";
import { Pagination } from "../../components/Pagination";
import { EmptyStateImg } from "../../utils/constants/images.tsx";

export const UsersList: FC = () => {
  const [{ users }, setState] = useStore();
  const [pageValues, setPageValues] = useState({
    searchQuery: '',
    selectedCompany: 'All',
    selectedProject: 'All',
    selectedDeviceCount: 'All',
    isInviteModalOpen: false,
    currentPage: 1,
    pageSize: 6,
  });

  const handlePageChange = (page: number) => setPageValues((prev) => ({ ...prev, currentPage: page }));

  useEffect(() => {
    setState((prevState: TState) => ({
      ...prevState,
      breadcrumbs: [{ path: AdminPaths[EAdminRoutes.USERS], name: "Users" }],
    }));
  }, [setState]);

  const filterUsers = () => {
    let filtered = [...users.items];

    if (pageValues.searchQuery) {
      const query = pageValues.searchQuery.toLowerCase();
      filtered = filtered.filter(user =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    }

    setState(prev => ({
      ...prev,
      users: {
        ...prev.users,
        filteredItems: filtered
      }
    }));
  };

  useEffect(() => {
    filterUsers();
  }, [pageValues.searchQuery, pageValues.selectedCompany, pageValues.selectedProject, pageValues.selectedDeviceCount]);

  return (
    <div className="users-container">
      <div className="users-header">
        <PageHeading title="Users list" />
        <div className="users-header-right">
          <div className="filters-container">
            <Filters />
          </div>
          <HeaderButton 
            buttonText="+ Add User" 
            onClick={() => setPageValues((prev) => ({ ...prev, isInviteModalOpen: true }))} 
          />
        </div>
      </div>

      <InviteUserModal
        isOpen={pageValues.isInviteModalOpen}
        onClose={() => setPageValues((prev) => ({ ...prev, isInviteModalOpen: false }))}
        onSubmit={() => {}}
      />

      {users.filteredItems.length ? (
        <>
          <UserTable users={users.filteredItems} currentPage={pageValues.currentPage} pageSize={pageValues.pageSize} />

          <div className="users-footer">
            <p className="users-count">
              <span>{users.filteredItems.length}</span> users
            </p>
            <Pagination
              currentPage={pageValues.currentPage}
              pageSize={pageValues.pageSize}
              totalItems={users.filteredItems.length}
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
    </div>
  );
};
