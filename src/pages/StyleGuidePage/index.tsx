import { Switch } from "../../components/Switch";
import { useEffect, useState } from "react";
import { TState } from "../../types";
import { AdminPaths, EAdminRoutes } from "../../routes/Routes.tsx";
import { useStore } from "../../store/store.tsx";
import { Datepicker } from "../../components/Datepicker";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../../components/Accordion";
import { TabButton } from "../../components/TabButton";
import { HeaderButton } from "../../components/HeaderButton";
import { Filters } from "../DevicesList/components/Filters";
import { Pagination } from "../../components/Pagination";
import { DropdownMenu } from "../../components/DropdownMenu";
import { EditIco, DeactivateIco, DeleteIco } from "../../utils/constants/images";
import "./index.scss";
import { PageHeading } from "../../components/PageHeading";

const DropdownMenuExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div style={{ padding: '50px', background: '#f8f9fa', borderRadius: '8px' }}>
      <DropdownMenu
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
      >
        <button onClick={() => console.log('Edit clicked')}>
          {EditIco}
          Edit
        </button>
        <button onClick={() => console.log('Deactivate clicked')}>
          {DeactivateIco}
          Deactivate
        </button>
        <button onClick={() => console.log('Delete clicked')}>
          {DeleteIco}
          Delete
        </button>
      </DropdownMenu>
    </div>
  );
};

const components = [
  {
    name: "Switch",
    description: "Toggle switch component for boolean values",
    component: (
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div>
          <p style={{ marginBottom: '8px' }}>Default State:</p>
          <Switch checked={true} onChange={() => {}} />
        </div>
        <div>
          <p style={{ marginBottom: '8px' }}>Unchecked State:</p>
          <Switch checked={false} onChange={() => {}} />
        </div>
      </div>
    ),
  },
  {
    name: "PageHeading",
    description: "Page header with title and subtitle",
    component: <PageHeading title="Style Guide" />,
  },
  {
    name: "Datepicker",
    description: "Date selection component with calendar",
    component: <Datepicker />,
  },
  {
    name: "Accordion",
    description: "Expandable/collapsible content panel",
    component: (
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Example Accordion</AccordionTrigger>
          <AccordionContent>This is accordion content</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Another Section</AccordionTrigger>
          <AccordionContent>More content here</AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
  {
    name: "TabButton",
    description: "Tab navigation component",
    component: (
      <div style={{ display: 'flex', gap: '16px' }} className="tab-container">
        <TabButton label="Tab 1" isActive={true} onClick={() => {}} />
        <TabButton label="Tab 2" isActive={false} onClick={() => {}} />
        <TabButton label="Tab 3" isActive={false} onClick={() => {}} />
      </div>
    ),
  },
  {
    name: "HeaderButton",
    description: "Button component for header actions",
    component: <HeaderButton buttonText="Example Button" />,
  },
  {
    name: "Filters",
    description: "Search and filter component with modal",
    component: (
      <div style={{ width: '100%' }}>
        <Filters />
      </div>
    ),
  },
  {
    name: "DropdownMenu",
    description: "Interactive dropdown menu with actions",
    component: <DropdownMenuExample />,
  },
  {
    name: "Pagination",
    description: "Page navigation component with previous/next buttons",
    component: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <p style={{ marginBottom: '8px' }}>Default State:</p>
          <Pagination 
            currentPage={1}
            pageSize={10}
            totalItems={50}
            onPageChange={(page) => console.log('Page changed to:', page)}
          />
        </div>
        <div>
          <p style={{ marginBottom: '8px' }}>Middle Page:</p>
          <Pagination 
            currentPage={3}
            pageSize={10}
            totalItems={50}
            onPageChange={(page) => console.log('Page changed to:', page)}
          />
        </div>
        <div>
          <p style={{ marginBottom: '8px' }}>Last Page:</p>
          <Pagination 
            currentPage={5}
            pageSize={10}
            totalItems={50}
            onPageChange={(page) => console.log('Page changed to:', page)}
          />
        </div>
      </div>
    ),
  },
];

export const StyleGuide = () => {
  const [, setState] = useStore();

  useEffect(() => {
    setState((prevState: TState) => ({
      ...prevState,
      breadcrumbs: [
        { path: AdminPaths[EAdminRoutes.STYLE_GUIDE], name: "Style Guide" },
      ],
    }));
  }, []);

  return (
    <div className="style-guide">
      <h2>Style Guide</h2>
      <div className="components-grid">
        {components.map(({ name, description, component }) => (
          <div key={name} className="component-card">
            <h3>{name}</h3>
            <p className="description">{description}</p>
            <div className="component-example">{component}</div>
            <hr />
          </div>
        ))}
      </div>

    </div>
  );
};
