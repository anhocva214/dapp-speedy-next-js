import SidebarMenuItem from "./menu-item";


export default function Siderbar() {

    return (
        <nav className="min-h-screen">
            <SidebarMenuItem
                title="Mỹ thuật"
                icon={(<i className={`fa-brands fa-artstation`}></i>)}
                items={[
                    {
                        id: "1",
                        name: "Tranh"
                    },
                    {
                        id: "2",
                        name: "Ảnh"
                    }
                ]}
            />
            <SidebarMenuItem 
                title="Âm nhạc"
                icon={(<i className="fa-solid fa-music"></i>)}
                items={[
                    {
                        id: "3",
                        name: "Tranh"
                    },
                    {
                        id: "4",
                        name: "Ảnh"
                    }
                ]}
            />
        </nav>
    )
}