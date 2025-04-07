import React, { useState } from "react";
import { MdArrowRight } from "react-icons/md";
import { RiArrowDownSLine } from "react-icons/ri";
import { HiOutlineHashtag } from "react-icons/hi";
const ChannelsList = ({
    onChannelSelect,
    channelList,
    toggleChannelDropdown,
}) => {
    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleDropdown = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    const dropdownItems = ["Canales", "Mensajes Directos", "Aplicaciones"]
    
    return (
        <div className="channels-list-dropdown">
            {dropdownItems.map((label, index) => (
                <div
                    className={`${
                        activeDropdown === index
                            ? "active channels-list-dropdown-items"
                            : ""
                    }`}
                    key={index}
                >
                    <div>
                        <button onClick={() => toggleDropdown(index)}>
                            <i
                                className={
                                    activeDropdown === index ? "rotate" : ""
                                }
                            >
                                <MdArrowRight />
                            </i>
                        </button>
                        <button
                            onClick={
                                label === "Canales"
                                    ? toggleChannelDropdown
                                    : undefined
                            }
                        >
                            <span>{label}</span>
                            <RiArrowDownSLine />
                        </button>
                    </div>

                    {label === "Canales" && activeDropdown === index && (
                        <div className="channels-list-dropdown-1">
                            {channelList && channelList.length > 0 ? (
                                <ul>
                                    {channelList.map((channel, index) => (
                                        <li
                                            key={index}
                                            onClick={() =>
                                                onChannelSelect(channel)
                                            }
                                            className="channel-item"
                                        >
                                            <HiOutlineHashtag />{" "}
                                            <span>{channel.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No hay canales disponibles</p>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ChannelsList;
