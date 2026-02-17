import Image from "next/image";
import SidebarItem from "./SidepabItem";
const Items = [
    {
        name:'HOME',
        image:'/HOME.png',
        href:'/dashboard' 
    },    
    {
        name:'ORDER_HISTORY',
        image:'/ORDER_HISTORY.png',
        href:'/dashboard/order-history' 
    },    
    {
        name:'MESSAGES',
        image:'/MESSAGES.png',
        href:'/dashboard/messages' 
    },    
    {
        name:'STATISTICS',
        image:'/STATISTICS.png',
        href:'/dashboard/statistics' 
    },    
    {
        name:'PRODUCTS',
        image:'/PRODUCTS.png',
        href:'/dashboard/products' 
    },
    {
        name:'SETTINGS',
        image:'/SETTINGS.png',
        href:'/dashboard/settings' 
    },
    
]
export default function Sidebar() {

    return (
        <aside className="w-64 text-white flex flex-col items-center">
            <div className="relative w-33.25 h-42.5 text-center"><Image src='/logo_dashboard.png' alt="logo" fill/></div>
            <ul>
                {
                    Items?.map((item)=>( 
                        <SidebarItem 
                            href={item.href} 
                            name={item.name} 
                            image={item.image} 
                            key={item.name}
                        />
                    ))
                }
            </ul>
        </aside>
    );
};