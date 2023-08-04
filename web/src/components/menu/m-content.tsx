import { MembersPage } from "./members/member-page";
import { RolesPage } from "./roles/roles-page";

interface MenuContentProps {
    currentPage: string;
}

export function MenuContent(props: MenuContentProps) {

    let content = null;
    if (props.currentPage === 'members') {
        content = <MembersPage />
    } else if (props.currentPage === 'roles') {
        content = <RolesPage />
    }
        
    return (
        <div className="menu-content">
            <div className="content">
                {content}
            </div>
        </div>
    )
}