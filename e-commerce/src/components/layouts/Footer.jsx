export default function Footer() {
  return (
    <footer className="mt-24 lg:mt-37.5 relative bg-hitamfooter min-h-100 flex items-center justify-between">
      <div className="absolute inset-0 z-0">
        <img
          src="../assets/Grid layers - v3.png"
          alt=""
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      <div className="flex flex-col relative z-10 max-w-6xl mx-auto w-full px-4 items-center">
        <div className="flex flex-wrap text-white mt-7 gap-20 lg:gap-0 justify-between w-full">
          <div className="w-107.5 flex flex-col gap-8">
            <img src="../assets/Pancarona2.svg" alt="" className="w-31.5 h-6.5" />
            <p className="text-sm lg:text-base tracking-tightest">
              Pancarona delivers high-quality apparel with modern design and
              everyday comfort. We are committed to providing the best products
              at accessible prices, along with a seamless and trustworthy
              shopping experience.
            </p>
          </div>

          <div className="flex flex-wrap justify-between lg:justify-center gap-10 lg:gap-17.5">
            <div className="flex flex-col gap-4">
              <h1 className="text-xl font-semibold tracking-tightest">Product</h1>
              <ul className="flex flex-col gap-2">
                <li>
                  <a href="#" className="text-sm lg:text-base tracking-tightest">
                    Man
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm lg:text-base tracking-tightest">
                    Woman
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm lg:text-base tracking-tightest">
                    Series
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm lg:text-base tracking-tightest">
                    Accessories
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-xl font-semibold tracking-tightest">Company</h1>
              <ul className="flex flex-col gap-2">
                <li>
                  <a href="#" className="text-sm lg:text-base tracking-tightest">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm lg:text-base tracking-tightest">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm lg:text-base tracking-tightest">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm lg:text-base tracking-tightest">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-4 lg:w-41">
              <h1 className="text-xl font-semibold tracking-tightest">
                Pancarona Corp
              </h1>
              <ul className="flex flex-col gap-2">
                <li>
                  <a href="#" className="text-sm lg:text-base tracking-tightest">
                    admin@pancarona.id
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm lg:text-base tracking-tightest">
                    +62-217209195
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm lg:text-base tracking-tightest">
                    Jl. Bulungan No.76,Kota Jakarta Selatan 12130
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <h1 className="mt-20 mb-10 text-sm lg:text-base text-white tracking-tightest">
          ©2026 TheBrother Plus One. All rights reserved.
        </h1>
      </div>
    </footer>
  );
}
