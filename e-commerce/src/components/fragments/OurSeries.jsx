export default function OurSeries() {
  return (
    <div className="max-w-6xl mx-auto mt-14 px-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tightest">Our Series</h1>
        <p className="text-base font-semibold tracking-tightest">See All Product</p>
      </div>
      <div className="flex flex-wrap mt-8 gap-5 justify-center lg:justify-between">
        <div className="group relative shadow-md hover:shadow-xl transition-all duration-300">
          <img src="/assets/series1.png" alt="" className="w-72 lg:w-88" />

          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white text-xl lg:text-[34px] tracking-tightest font-semibold">
              Core Collection
            </p>
          </div>
        </div>
        <div className="group relative shadow-md hover:shadow-xl transition-all duration-300">
          <img src="/assets/series2.png" alt="" className="w-72 lg:w-88" />

          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white text-xl lg:text-[34px] tracking-tightest font-semibold">
              Motion Collection
            </p>
          </div>
        </div>
        <div className="group relative shadow-md hover:shadow-xl transition-all duration-300">
          <img src="/assets/series3.png" alt="" className="w-72 lg:w-88" />

          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white text-xl lg:text-[34px] tracking-tightest font-semibold">
              Noir Collection
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
