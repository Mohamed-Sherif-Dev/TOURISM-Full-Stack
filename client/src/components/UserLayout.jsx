
import {Outlet} from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

const UserLayout = () => {
return(
    <>
    {/* Header */}
    <Header/> 
        <main className="min-h-screen">
        <Outlet />
    </main>
    {/* Footer */}
    <Footer />
    </>
)
}

export default UserLayout