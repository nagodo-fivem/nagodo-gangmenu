import { Navigation } from './m-navigation'
import { MenuContent } from './m-content'
import '../../css/gangmenu.css'

interface GangMenuProps {
    currentPage: string;
    setCurrentPage: Function;
}

export function GangMenu(props: GangMenuProps) {
    return (
        <div className="gangmenu">
            <Navigation setCurrentPage = {props.setCurrentPage} />

            <MenuContent currentPage = {props.currentPage} />
        </div>
    )
}