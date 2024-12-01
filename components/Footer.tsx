const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 flex justify-center">
      <div className="w-full mx-auto max-w-screen-xl p-4 flex justify-center">
        <span className="text-sm text-gray-500 text-center dark:text-gray-400 select-none">
          powered by{" "}
          <span className="hover:underline font-semibold font-mistral">
            WiTTg3N
          </span>
          &apos;s wisdom
        </span>
      </div>
    </footer>
  );
};

export default Footer;
