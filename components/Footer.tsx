const Footer = () => {
  return (
    <footer className=" fixed bottom-0 left-0 right-0 justify-center">
      <div className="w-full mx-auto max-w-screen-xl p-4 flex justify-center">
        <span className="text-sm text-gray-500 text-center dark:text-gray-400 select-none">
          powered by{" "}
          <a href="/" className="hover:underline font-k2d font-bold">
            WiTTg3N
          </a>
          &apos;s wisdom
        </span>
      </div>
    </footer>
  );
};
export default Footer;
