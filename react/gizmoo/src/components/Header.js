function Header() {
    return (
        <>
            <header className="bg-blue-400 p-5 rounded flex justify-between">
                <a className="text-2xl font-bold text-green-600" href="index.html">Gizmo</a>
                <nav className="w-1/4">
                    <ul className="flex justify-between">
                        <li>Home</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                </nav>
            </header>
        </>
    )
}
export default Header;