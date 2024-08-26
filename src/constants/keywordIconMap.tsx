import LifeIcon from '@/assets/LifeIcon';
import OfficeTelIcon from '@/assets/OfficeTelIcon';

import PublicIcon from '@/assets/PublicIcon';
import RentIcon from '@/assets/RentIcon';
import {
  Bank,
  BuildingApartment,
  BuildingOffice,
  CalendarBlank,
  City,
  FirstAid,
  GraduationCap,
  Heart,
  Money,
  Park,
  PencilSimple,
  SealPercent,
  ShieldCheck,
  ShoppingBag,
  SquaresFour,
  Storefront,
  TrainSimple,
  User,
  UsersThree,
} from '@phosphor-icons/react';

export interface ListItem {
  title: string;
  onIcon: React.ReactNode;
  offIcon: React.ReactNode;
}
const createToggleIcons = () => {
  const toggleIcon1: ListItem[] = [
    {
      title: 'DISCOUNT_SALE',
      onIcon: <SealPercent weight="fill" className="size-full" />,
      offIcon: <SealPercent weight="light" className="size-full" />,
    },
    {
      title: 'BALANCE_DEFERRAL',
      onIcon: <CalendarBlank weight="fill" className="size-full" />,
      offIcon: <CalendarBlank weight="light" className="size-full" />,
    },
    {
      title: 'CASH_PAYMENT',
      onIcon: <Money weight="fill" className="size-full" />,
      offIcon: <Money weight="light" className="size-full" />,
    },
    {
      title: 'GUARANTEED_PAYMENT',
      onIcon: <ShieldCheck weight="fill" className="size-full" />,
      offIcon: <ShieldCheck weight="light" className="size-full" />,
    },
    {
      title: 'SUPPORT_PAYMENT',
      onIcon: <Heart weight="fill" className="size-full" />,
      offIcon: <Heart weight="light" className="size-full" />,
    },
    {
      title: 'OPTION_PAYMENT',
      onIcon: <SquaresFour weight="fill" className="size-full" />,
      offIcon: <SquaresFour weight="light" className="size-full" />,
    },
  ];
  const toggleIcon2: ListItem[] = [
    {
      title: 'SUBWAY',
      onIcon: <TrainSimple weight="fill" className="size-full" />,
      offIcon: <TrainSimple weight="light" className="size-full" />,
    },
    {
      title: 'SCHOOL',
      onIcon: <GraduationCap weight="fill" className="size-full" />,
      offIcon: <GraduationCap weight="light" className="size-full" />,
    },
    {
      title: 'PARK',
      onIcon: <Park weight="fill" className="size-full" />,
      offIcon: <Park weight="light" className="size-full" />,
    },
    {
      title: 'SHOPPING',
      onIcon: <ShoppingBag weight="fill" className="size-full" />,
      offIcon: <ShoppingBag weight="light" className="size-full" />,
    },
    {
      title: 'HOSPITAL',
      onIcon: <FirstAid weight="fill" className="size-full" />,
      offIcon: <FirstAid weight="light" className="size-full" />,
    },

    {
      title: 'LIBRARY',
      onIcon: <PencilSimple weight="fill" className="size-full" />,
      offIcon: <PencilSimple weight="light" className="size-full" />,
    },
    {
      title: 'PUBLIC_FACILITIES',
      onIcon: <PublicIcon weight="fill" className="size-full" />,
      offIcon: <PublicIcon weight="light" className="size-full" />,
    },
    {
      title: 'GOVERNMENT',
      onIcon: <Bank weight="fill" className="size-full" />,
      offIcon: <Bank weight="light" className="size-full" />,
    },
  ];
  const toggleIcon3: ListItem[] = [
    {
      title: 'APARTMENT',
      onIcon: <BuildingApartment weight="fill" className="size-full" />,
      offIcon: <BuildingApartment weight="light" className="size-full" />,
    },
    {
      title: 'OFFICETEL',
      onIcon: <OfficeTelIcon weight="fill" className="size-full" />,
      offIcon: <OfficeTelIcon weight="light" className="size-full" />,
    },
    {
      title: 'VILLA',
      onIcon: <BuildingOffice weight="fill" className="size-full" />,
      offIcon: <BuildingOffice weight="light" className="size-full" />,
    },
    {
      title: 'URBAN_HOUSING',
      onIcon: <City weight="fill" className="size-full" />,
      offIcon: <City weight="light" className="size-full" />,
    },
    {
      title: 'LIVING_ACCOMMODATION',
      onIcon: <LifeIcon weight="fill" className="size-full" />,
      offIcon: <LifeIcon weight="light" className="size-full" />,
    },
    {
      title: 'DOWNTOWN',
      onIcon: <Storefront weight="fill" className="size-full" />,
      offIcon: <Storefront weight="light" className="size-full" />,
    },
  ];

  const toggleIcon4: ListItem[] = [
    {
      title: 'PRIVATE_SALE',
      onIcon: <User weight="fill" className="size-full" />,
      offIcon: <User weight="light" className="size-full" />,
    },
    {
      title: 'PUBLIC_SALE',
      onIcon: <UsersThree weight="fill" className="size-full" />,
      offIcon: <UsersThree weight="light" className="size-full" />,
    },
    {
      title: 'LEASE_SALE',
      onIcon: <RentIcon weight="fill" className="size-full" />,
      offIcon: <RentIcon weight="light" className="size-full" />,
    },
  ];
  return { toggleIcon1, toggleIcon2, toggleIcon3, toggleIcon4 };
};

export default createToggleIcons;
