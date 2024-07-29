function Header() {



  return (
    <header className="text-center sm:h-[50vh] relative">
    <div className="relative flex flex-col pb-16 gap-4 items-center justify-center h-full w-full mx-auto bg-gradient-to-r from-gray-500 via-black to-gray-500">
      <h1 className="text-white text-5xl font-bold mt-16">Amit Kumar</h1>
      <h3 className='text-white text-3xl font-semibold p-4'>I am a Web Developer.</h3>
      <button className='text-white border border-white rounded-3xl p-4 shadow-lg'>Contact me</button>
    </div>
  </header>
  );
}

export default Header;
