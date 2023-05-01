import { Department } from "./dto";
import { Page } from "./route"

export type Persistant = {
    page: Page;
    selectedUser?: string;
    selectedGroup?: string;
    usersFilterText: string;
    usersFilterDep?: Department;
    groupsFilter?: string;
}