"use client";
import Text from "@/app/shared/heading/Text";
import TextWithLinks from "@/app/shared/heading/TextWithLinks";
import Img from "@/app/shared/Img";
import { authSliderData } from "@/utils/static";
import { CiHeadphones } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Slider from "react-slick";

const ArrowLeft = ({ onClick }: { onClick?: () => void }) => (
  <div
    role="button"
    tabIndex={0}
    aria-label="Go left"
    onKeyDown={onClick}
    onClick={onClick}
    className="border border-white text-white absolute z-20 bottom-8 left-8 hover:bg-white/30 duration-300 h-14 w-14 cursor-pointer rounded-full flex justify-center items-center"
  >
    <FiArrowLeft size={24} />
  </div>
);

const ArrowRight = ({ onClick }: { onClick?: () => void }) => (
  <div
    tabIndex={0}
    role="button"
    onKeyDown={onClick}
    aria-label="Go right"
    onClick={onClick}
    className="border border-white text-white absolute z-20 bottom-8 left-[120px] h-14 w-14 hover:bg-white/30 duration-300 cursor-pointer rounded-full flex justify-center items-center"
  >
    <FiArrowRight size={24} />
  </div>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <ArrowLeft />,
    prevArrow: <ArrowRight />,
  };
  // const {
  //   data: { siteDetails },
  // } = useContext(GlobalContext);
  const sliderData = [
    {
      image: "/assets/banner2.png",
      title: "Welcome to Global Scholar",
      description:
        "Transform your workspace with enhanced security, and efficiency, unleashing a dynamic",
    },
    ...authSliderData,
  ].filter((r) => r !== undefined);

  return (
    <div className="grid lg:grid-cols-2 min-h-dvh max-[1024px]:place-items-center">
      <div className="flex flex-col gap-y-8 justify-between sm:p-8 p-5 min-h-dvh lg:min-h-full w-full">
        <Img
          src="/assets/icons/logo.png"
          height={45}
          width={220}
          alt="logo"
          isLocal
          className="object-contain"
        />
        {children}
        <div className="flex flex-col items-center">
          <TextWithLinks
            links={[
              {
                label: "Terms of Service",
                link: "/terms-of-service",
                className: "!text-primary !text-sm",
              },
              {
                label: "Privacy Policy",
                link: "/privacy-policy",
                className: "!text-primary !text-sm",
              },
            ]}
            text="By continuing you agree to our"
            className="text-sm"
            textProps={{ variant: "tertiary", size: "sm" }}
          />

          <Text variant="tertiary" size="sm">
            © 2026 Global Scholar. All right reserved
          </Text>
        </div>
      </div>
      <div className="lg:block hidden mt-5 mx-5">
        <Slider {...settings}>
          {sliderData?.map((item, idx) => (
            <div key={item?.title + idx} className="h-[calc(100vh-40px)]">
              <div
                className="gap-y-8 rounded-[40px] relative px-8 pb-8 flex flex-col bg-cover w-full h-full bg-blue-50 bg-no-repeat"
                style={{ backgroundImage: `url(${item?.image})` }}
              >
                <div className="bg-bannerOverlay h-[calc(100vh-40px)] w-full left-0 absolute top-0 rounded-[40px]" />
                <div className="flex items-center justify-end gap-x-2 mt-5">
                  <CiHeadphones size={16} className="text-white" />
                  <Text variant="white" size="sm">
                    Help & Support
                  </Text>
                </div>
                <div className="space-y-4 mt-auto z-10 mb-[88px]">
                  {/* <SvgStar height={64} width={80} /> */}
                  <Text variant="white" type="semibold" size="5xl">
                    {item?.title}
                  </Text>
                  <Text size="xl" variant="white" type="medium">
                    {item?.description}
                  </Text>
                </div>
                <div className="absolute bottom-9 right-8 flex items-center gap-x-2">
                  <Img
                    src="/assets/icons/avatar-group.png"
                    height={40}
                    width={150}
                    alt="avatar-group"
                    isLocal
                    className="object-contain"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-x-1 z-10">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <FaStar
                          key={idx}
                          size={16}
                          className="text-yellow-500"
                        />
                      ))}
                      <Text variant="white" size="sm">
                        5.0
                      </Text>
                    </div>
                    <Text variant="white" size="sm">
                      from 2000+ reviews
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
