import { MembersPage } from "./members/member-page";
import { RolesPage } from "./roles/roles-page";
import { AlliesPage } from "./allies/allies-page";
import { BankingPage } from "./banking/banking-page";

interface MenuContentProps {
    currentPage: string;
}

export function MenuContent(props: MenuContentProps) {

    let content = null;
    if (props.currentPage === 'members') {
        content = <MembersPage />
    } else if (props.currentPage === 'roles') {
        content = <RolesPage />
    } else if (props.currentPage === 'allies') {
        content = <AlliesPage />
    } else if (props.currentPage === 'banking') {
        content = <BankingPage />
    }
        
    return (
        <div className="menu-content">
            <div className="content">
                {content}
            </div>
        </div>
    )
}