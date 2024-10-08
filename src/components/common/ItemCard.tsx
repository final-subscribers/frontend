import { Heart } from '@phosphor-icons/react';
import { Label } from '../ui/label';
import { formatAmount, getPropertyLabel } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import useLike from '@/hooks/useLike';
import { loginState } from '@/recoilstate/login/atoms';
import { useRecoilValue } from 'recoil';

export interface ItemCardProps {
  size: 'l' | 's' | 'default'; // 사이즈
  id: number;
  title: string; // 제목
  imageUrl: string; // 이미지
  address: string; // 주소
  propertyType?: string; // 분양유형
  salesType?: string; // 분양형태
  totalNumber?: number; // 세대수
  infra?: string[];
  benefit?: string[];
  price?: number; // 가격
  discountPrice?: number | null; // 할인가격
  discountPercent?: number | null;
  like?: boolean; // 찜 -> 상태관리 해야함
  rank?: number; // 순위 -> 홈 화면에서만 사용
  status?: boolean; // 모집상태 -> 매물 관리에서만 사용 -> string형태 주는지, boolean 형태로 주는지, date를 줘서 날짜 확인해야 하는지?
  onLikeToggle?: () => void;
}

const ItemCard = ({
  size,
  id,
  title,
  imageUrl,
  address,
  propertyType = '',
  salesType = '',
  totalNumber,
  infra,
  benefit,
  price = 0,
  discountPrice = null,
  discountPercent = null,
  like,
  rank,
  status,
  onLikeToggle,
}: ItemCardProps) => {
  const { liked, toggleLike } = useLike(like || false, id);
  const loginData = useRecoilValue(loginState);
  const navigate = useNavigate();

  const handleLikeToggle = async () => {
    if (!loginData.isLoggedIn || loginData.userInfo?.role !== 'MEMBER') {
      navigate('/login');
      return;
    }

    await toggleLike();
    if (onLikeToggle) {
      onLikeToggle();
    }
  };

  const cardSizeClass = {
    l: 'w-[352px] min-w-[352px] h-[426px] px-5 pt-6 pb-9',
    s: 'w-[328px] min-w-[328px] h-[184px]',
    default: 'w-[296px] min-w-[296px] h-[269px] px-4 pt-4 pb-7', // 매물 관리에서만 사용
  };

  return (
    <div>
      {size === 'l' && (
        <Link
          to={`/property/${id}`}
          className={`${cardSizeClass[size]} flex flex-col bg-white rounded-5  cursor-pointer`}>
          <div className="relative mb-5">
            <img src={imageUrl} alt={title} className="w-full h-[180px] rounded-5 object-cover" />
            <div className="absolute inset-0 gradient-overlay rounded-5" />
            <div className="absolute top-0 left-0">
              {rank && (
                <div
                  className={`flex items-center justify-center w-[66px] h-9 p-2 bg-effect-elevated rounded-tl-5 rounded-br-5`}>
                  <span className="text-white text-label-lg font-bold">{rank}위</span>
                </div>
              )}
            </div>
            <div
              className="absolute top-[10px] right-[10px] cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                handleLikeToggle();
              }}>
              {liked ? (
                <span className="text-accent-strong">
                  <Heart size={32} weight="fill" />
                </span>
              ) : (
                <span className="text-white">
                  <Heart size={32} weight="bold" />
                </span>
              )}
            </div>

            <div className="absolute bottom-3 left-3 flex gap-2">
              {benefit?.map((kw, index) => (
                <Label key={index} size="m" variant="accent" keyword={getPropertyLabel(kw)}>
                  {getPropertyLabel(kw)}
                </Label>
              ))}
              {infra?.map((kw, index) => (
                <Label key={index} size="m" variant="accent" keyword={getPropertyLabel(kw)}>
                  {getPropertyLabel(kw)}
                </Label>
              ))}
            </div>
          </div>

          <div>
            <h2 className="w-full text-title-2xl text-static-default font-bold overflow-hidden text-ellipsis whitespace-nowrap">
              {title}
            </h2>
            <div className="flex flex-col gap-3 mb-4">
              <p className="text-detail-lg text-assistive-detail overflow-hidden text-ellipsis whitespace-nowrap">
                {address}
              </p>
              <div className="flex items-center gap-2 text-detail-lg text-assistive-detail">
                <p>{getPropertyLabel(propertyType)}</p>
                <div className="w-[1px] h-[10px] bg-assistive-detail" />
                <p>{getPropertyLabel(salesType)}</p>
                <div className="w-[1px] h-[10px] bg-assistive-detail" />
                <p>총 {totalNumber}세대</p>
              </div>
            </div>

            <div className="flex flex-col">
              {discountPrice !== null && discountPrice !== 0 && (
                <span className="line-through text-assistive-default text-detail-xl">
                  {formatAmount(price)}
                </span>
              )}
              <div className={`${!discountPrice && 'mt-6'}`}>
                {discountPercent !== null && (
                  <span className="text-accent-strong text-title-xl font-bold mr-2">{discountPercent}%</span>
                )}
                <span className="text-static-default text-title-xl font-bold mr-2">
                  {formatAmount(discountPrice || price)}
                </span>
              </div>
            </div>
          </div>
        </Link>
      )}
      {size === 's' && (
        <Link
          to={`/property/${id}`}
          className={`${cardSizeClass[size]} flex flex-col bg-white rounded-5  border border-assistive-divider cursor-pointer`}>
          <div className="flex gap-4  px-4 pt-5 pb-4 border-b border-assistive-divider">
            <div className="w-[180px]">
              <div className="flex gap-1 mb-3">
                {benefit?.map((kw, index) => (
                  <Label key={index} size="s" variant="accent" className="text-[11px]">
                    {getPropertyLabel(kw)}
                  </Label>
                ))}
                {infra?.map((kw, index) => (
                  <Label key={index} size="s" variant="primary" className="text-[11px]">
                    {getPropertyLabel(kw)}
                  </Label>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <h2 className="w-full text-title-base-m text-static-default font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                    {title}
                  </h2>
                  <p className="text-detail-sm-m text-assistive-detail overflow-hidden text-ellipsis whitespace-nowrap">
                    {address}
                  </p>
                </div>
                <div className="flex flex-col">
                  {discountPrice !== null && (
                    <span className="h-[13px] line-through text-assistive-default text-detail-sm-m">
                      {formatAmount(price)}
                    </span>
                  )}
                  <div className={`h-6 ${!discountPrice && 'mt-4'}`}>
                    {discountPercent !== null && (
                      <span className="text-accent-strong text-title-base-m font-bold mr-2">
                        {discountPercent}%
                      </span>
                    )}
                    <span className="text-static-default text-title-base-m font-bold">
                      {formatAmount(discountPrice || price)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img src={imageUrl} alt={title} className="w-[112px] h-[112px] rounded-5 object-cover" />
              <div className="absolute top-0 left-0">
                {rank && (
                  <>
                    <div
                      className={`flex items-center justify-center w-7 h-7 p-2 bg-effect-elevated rounded-tl-4 rounded-br-4`}>
                      <span className="text-white text-label-sm-m font-bold">{rank}</span>
                    </div>
                  </>
                )}
              </div>
              <div
                className="absolute top-2 right-2 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  handleLikeToggle();
                }}>
                {liked ? (
                  <span className="text-accent-strong">
                    <Heart size={20} weight="fill" />
                  </span>
                ) : (
                  <span className="text-white">
                    <Heart size={20} weight="bold" />
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="px-4 pt-3 pb-4">
            <div className="flex items-center gap-2 text-detail-base-m text-assistive-detail">
              <p>{getPropertyLabel(propertyType)}</p>
              <div className="w-[1px] h-[10px] bg-assistive-detail" />
              <p>{getPropertyLabel(salesType)}</p>
              <div className="w-[1px] h-[10px] bg-assistive-detail" />
              <p>총 {totalNumber}세대</p>
            </div>
          </div>
        </Link>
      )}
      {size === 'default' && (
        <div className={`${cardSizeClass[size]} flex flex-col bg-white rounded-5 `}>
          <div className="relative mb-5">
            <img src={imageUrl} alt={title} className="w-full h-[153px] rounded-5 object-cover" />
            <div className="absolute top-0 left-0">
              {/* 모집중 or 모집완료 - 이후 변경 */}
              <Label size="m" className="absolute top-3 left-3">
                {status ? '모집중' : '모집완료'}
              </Label>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="w-full text-title-xl text-static-default font-bold overflow-hidden text-ellipsis whitespace-nowrap">
              {title}
            </h2>
            <p className="text-detail-lg text-assistive-detail overflow-hidden text-ellipsis whitespace-nowrap">
              {address}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemCard;
