import { useStore } from "../../../../store/store.tsx";
import { useEffect, useState } from "react";
import { TState } from "../../../../types";
import { AdminPaths, EAdminRoutes } from "../../../../routes/Routes.tsx";
import { TProject } from "../../../../types";
import { EmptyList } from "../../../../components/EmptyList";
import { InviteUserModal } from "../../../../components/InviteUserModal";
import { Pagination } from "../../../../components/Pagination";
import { UserTable } from "../../../UsersList/components/Table";
import { EmptyStateImg } from "../../../../utils/constants/images.tsx";

type TProps = {
  project: TProject;
};

export const UsersTab = ({ project }: TProps) => {
  const [{ users }, setState] = useStore();

  const [pageValues, setPageValues] = useState({
    searchQuery: '',
    selectedCompany: 'All',
    selectedDeviceCount: 'All',
    isInviteModalOpen: false,
    currentPage: 1,
    pageSize: 6,
  });

  const handlePageChange = (page: number) => {
    setPageValues(prevState => ({ ...prevState, currentPage: page }));
  };

  const handleInviteSubmit = () => {
    setPageValues(prevState => ({ ...prevState, isInviteModalOpen: false }));
  };

  useEffect(() => {
    setState((prevState: TState) => ({
      ...prevState,
      breadcrumbs: [
        { path: AdminPaths[EAdminRoutes.PROJECTS], name: "Projects" },
        { path: AdminPaths[EAdminRoutes.PROJECT_DETAILS].replace(':id', project.id), name: project.name },
      ],
    }));
  }, [setState, project]);

  const filterUsers = () => {
    let filtered = users.items.filter(user =>
      project.userIds.includes(user.id || '')
    ); 

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
    setPageValues(prevState => ({ ...prevState, currentPage: 1 }));
  };

  useEffect(() => {
    filterUsers();
  }, [pageValues.searchQuery, project.userIds]);

  const startIndex = (pageValues.currentPage - 1) * pageValues.pageSize;
  const endIndex = startIndex + pageValues.pageSize;
  const currentPageItems = users.filteredItems.slice(startIndex, endIndex);

  return (
    <div>
      <InviteUserModal
        isOpen={pageValues.isInviteModalOpen}
        onClose={() => setPageValues(prevState => ({ ...prevState, isInviteModalOpen: false }))}
        onSubmit={handleInviteSubmit}
      />

      {users.filteredItems.length ? (
        <div className="users-table">
          <UserTable 
            users={currentPageItems} 
            currentPage={pageValues.currentPage}
            pageSize={pageValues.pageSize}
          />

          <div className="devices-footer">
            <p className="devices-count">
              <span>{users.filteredItems.length}</span> users
            </p>
            <Pagination
              currentPage={pageValues.currentPage}
              pageSize={pageValues.pageSize}
              totalItems={users.filteredItems.length}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      ) : (
        <EmptyList
          image={EmptyStateImg}
          title={"Nothing was found for your query"}
        />
      )}
    </div>
  );
};