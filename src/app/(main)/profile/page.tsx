'use client'
import { useUIStore } from "@/stores/useUIStore";

const ProfilePage = () => {
    const { isSideBarShow, toggleSidebar } = useUIStore();
    return (
        <div onClick={() => toggleSidebar()}>ProfilePage</div>
    )
}

export default ProfilePage