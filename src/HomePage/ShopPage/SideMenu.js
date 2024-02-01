import { Link } from 'react-router-dom';
import "./SideMenu.css";

export default function SideMenu(props) {
    function linkClickHandle() {
        props.onSelection();
    }

    return(
        <div className="side-menu">
            {props.sideMenu.map(indexValue => {
                return <ul> 
                    {indexValue.title}
                    {indexValue.menus.map(menu => {
                        let path = indexValue.title;
                        path = path.toLowerCase();
                        return <li><Link onClick={linkClickHandle} to={`/shop/${path}`} className="links-side-menu">{menu}</Link></li>
                    })}
                </ul>
            })}
        </div>
    );
}

//