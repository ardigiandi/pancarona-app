import { useState } from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function CarouselDemo() {
  const [current, setCurrent] = useState(0);

  const imageItems = [
    { id: 0, image: "/assets/hero.png" },
    { id: 1, image: "/assets/hero.png" },
    { id: 2, image: "/assets/hero.png" },
    { id: 3, image: "/assets/hero.png" },
  ];

  return (
    <div className="relative w-full h-fit">
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        setApi={(api) => {
          if (!api) return;
          api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
          });
        }}
      >
        <CarouselContent>
          {imageItems.map((item) => (
            <CarouselItem key={item.id}>
              <Card className="border-none shadow-none">
                <CardContent className="p-0">
                  <img
                    src={item.image}
                    alt="carousel"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute bottom-11 right-11 flex items-center gap-2">
        {imageItems.map((_, index) => (
          <div
            key={index}
            className={`h-3 rounded-full transition-all duration-300 ${
              current === index
                ? "bg-maroon w-10"
                : "bg-white/80 w-3"
            }`}
          />
        ))}
      </div>
    </div>
  );
}