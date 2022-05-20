import { ReactNode, useState } from 'react'
import useCollapse from 'react-collapsed';


interface IProps {
    title: string;
    icon: ReactNode;
    items: {
        id: string;
        name: string;
    }[]
}

export default function SidebarMenuItem(props: IProps) {

    const [isExpanded, setExpanded] = useState(false);
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

    function handleOnClick() {
        setExpanded(!isExpanded);
    }

    return (
        <div>
            <a {...getToggleProps({ onClick: handleOnClick })} onClick={handleOnClick} role="button" className="flex justify-between items-center py-3">
                <h4 className="flex gap-2 items-center">
                    {props.icon}
                    <span>
                        {props.title}
                    </span>
                </h4>
                <span>
                    <i className={`fa-solid fa-angle-down transition-all duration-300 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}></i>
                </span>
            </a>
            <ul {...getCollapseProps()} className="pl-6">
                {
                    props.items.map(item => (
                        <li key={item.id} className='py-2'>
                            <a role={'button'}>
                                {item.name}
                            </a>
                        </li>
                    ))
                }

                {/* <li className='py-2'>
                        <a role={'button'}>
                            Ảnh
                        </a>
                    </li> */}
            </ul>

        </div>
    )
}