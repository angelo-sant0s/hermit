'use client';
import Container from "../Container";
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';
import Category from "../Category";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
    label: "Beach",
    icon: TbBeach,
    description: "Lets go to the beach!"
    },
    {
        label: "Windmills",
        icon: GiWindmill,
        description: "Windmills go brrrrrrrrr."
    },
    {
        label: "Modern",
        icon: MdOutlineVilla,
        description: "Fancy houses for the minimalists."
    },
    {
        label: 'Countryside',
        icon: TbMountain,
        description: 'YEHAAAAA BROTHER!'
      },
      {
        label: 'Pools',
        icon: TbPool,
        description: 'I was once a swimmer.'
      },
      {
        label: 'Islands',
        icon: GiIsland,
        description: 'Welcome to paradise.'
      },
      {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'Maybe you can fish here.'
      },
      {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'Snow Time!'
      },
      {
        label: 'Castles',
        icon: GiCastle,
        description: 'King of the Castle!'
      },
      {
        label: 'Caves',
        icon: GiCaveEntrance,
        description: 'Time to play some Minecraft.'
      },
      {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'Nice for some marshmallows.'
      },
      {
        label: 'Arctic',
        icon: BsSnow,
        description: 'BRRRRRR so cold...'
      },
      {
        label: 'Desert',
        icon: GiCactus,
        description: 'Aaaaah so hot...'
      },
      {
        label: 'Barns',
        icon: GiBarn,
        description: 'Farmville IRL'
      },
      {
        label: 'Lux',
        icon: IoDiamond,
        description: 'Welcome to my 12 million dollar mansion.'
      }
];

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get("category");
    const pathname = usePathname();
    const home = pathname === "/";
    if(!home) return null;

  return (
    <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
            {categories.map((item) => {
                return(
                    <Category key={item.label} label={item.label} description={item.description} icon={item.icon} selected={category === item.label} />
                )
            })}
        </div>
    
    </Container>
  )
}

export default Categories;