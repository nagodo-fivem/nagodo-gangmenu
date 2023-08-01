import { Navigation } from './m-navigation'
import { MenuContent } from './m-content'
import '../../css/gangmenu.css'

export function GangMenu() {
    return (
        <div className="gangmenu">
            <Navigation />

            <MenuContent />
        </div>
    )
}