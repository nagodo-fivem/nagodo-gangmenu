import '../../css/navigation.css'

interface NavigationItemProps {

}

function NavigationItem(props: NavigationItemProps) {
    return (
        <div className='nav-item'>
            <i className="fa-solid fa-user icon"></i>
        </div>
    )
}


export function Navigation() {

    return (
        <div className="navigation">
            <NavigationItem />
            <NavigationItem />
            <NavigationItem />
        </div>
    );
}