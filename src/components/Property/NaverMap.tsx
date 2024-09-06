import useResponsive from '@/hooks/useResponsive';
import { useEffect } from 'react';

interface NaverMapProps {
  address: string;
  buildingName: string;
}

const NaverMap = ({ address, buildingName }: NaverMapProps) => {
  const { isMobile } = useResponsive();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${import.meta.env.VITE_NAVER_MAPS_API_ID}&submodules=geocoder`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 15,
      });
      naver.maps.Service.geocode(
        {
          query: address,
        },
        function (status, response) {
          if (status === naver.maps.Service.Status.ERROR) {
            console.error('Geocoding Error:', response);
            return;
          }

          if (response.v2.addresses.length > 0) {
            const { x, y } = response.v2.addresses[0];

            const latlng = new naver.maps.LatLng(Number(y), Number(x));
            map.setCenter(latlng);

            const marker = new naver.maps.Marker({
              position: latlng,
              map: map,
            });

            map.panBy(new naver.maps.Point(0, -70));

            const contentString = `
              <div style="
                display: flex;
                align-items: center;
                padding: ${isMobile ? '12px' : '24px 32px'};
                border-radius: ${isMobile ? '20px' : '40px'};
                background-color: white;
                box-shadow: 0px 4px 4px 0px rgba(70, 69, 107, 0.15);
                width: ${isMobile ? '193px' : '403px'};
                height: ${isMobile ? '57px' : '116px'};
              ">
                <svg xmlns="http://www.w3.org/2000/svg" width="${isMobile ? '32' : '48'}" height="${isMobile ? '32' : '48'}" viewBox="0 0 48 48" fill="none">
                  <path d="M24 11.25C22.3683 11.25 20.7733 11.7339 19.4165 12.6404C18.0598 13.5469 17.0024 14.8354 16.378 16.3429C15.7536 17.8504 15.5902 19.5092 15.9085 21.1095C16.2269 22.7098 17.0126 24.1798 18.1664 25.3336C19.3202 26.4874 20.7902 27.2731 22.3905 27.5915C23.9908 27.9098 25.6496 27.7464 27.1571 27.122C28.6646 26.4976 29.9531 25.4402 30.8596 24.0835C31.7661 22.7267 32.25 21.1317 32.25 19.5C32.2475 17.3127 31.3775 15.2157 29.8309 13.6691C28.2843 12.1225 26.1873 11.2525 24 11.25ZM24 23.25C23.2583 23.25 22.5333 23.0301 21.9166 22.618C21.2999 22.206 20.8193 21.6203 20.5355 20.9351C20.2516 20.2498 20.1774 19.4958 20.3221 18.7684C20.4667 18.041 20.8239 17.3728 21.3483 16.8483C21.8728 16.3239 22.541 15.9667 23.2684 15.8221C23.9958 15.6774 24.7498 15.7516 25.4351 16.0355C26.1203 16.3193 26.706 16.7999 27.118 17.4166C27.5301 18.0333 27.75 18.7583 27.75 19.5C27.75 20.4946 27.3549 21.4484 26.6517 22.1516C25.9484 22.8549 24.9946 23.25 24 23.25ZM24 2.25C19.4265 2.25496 15.0418 4.07396 11.8079 7.30789C8.57396 10.5418 6.75496 14.9265 6.75 19.5C6.75 34.005 22.0575 44.8875 22.71 45.3431C23.0881 45.6077 23.5385 45.7496 24 45.7496C24.4615 45.7496 24.9119 45.6077 25.29 45.3431C28.1893 43.2064 30.8418 40.7538 33.1987 38.0306C38.4656 31.9819 41.25 25.5694 41.25 19.5C41.245 14.9265 39.426 10.5418 36.1921 7.30789C32.9582 4.07396 28.5735 2.25496 24 2.25ZM29.8688 35.0081C28.081 37.0617 26.1173 38.9551 24 40.6669C21.8827 38.9551 19.919 37.0617 18.1312 35.0081C15 31.3819 11.25 25.7456 11.25 19.5C11.25 16.1185 12.5933 12.8755 14.9844 10.4844C17.3755 8.0933 20.6185 6.75 24 6.75C27.3815 6.75 30.6245 8.0933 33.0156 10.4844C35.4067 12.8755 36.75 16.1185 36.75 19.5C36.75 25.7456 33 31.3819 29.8688 35.0081Z" fill="#A8B9F5"/>
                </svg>

                <div style="margin-left: 10px;">
                  <span style="font-size: ${isMobile ? '11px' : '21px'}; font-weight: bold; color: #204AE5;">${buildingName}</span>
                  <div style="font-size: ${isMobile ? '9px' : '19px'}; color: #778292;">${address}</div>
                </div>
              </div>
            `;

            const infoWindow = new naver.maps.InfoWindow({
              content: contentString,
              backgroundColor: 'rgba(255, 255, 255, 0)',
              borderWidth: 0,
              anchorSkew: true,
              anchorSize: new naver.maps.Size(30, 10),
              pixelOffset: new naver.maps.Point(0, -10),
            });

            infoWindow.open(map, marker);
          } else {
            console.error('Geocoding result');
          }
        },
      );
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [address, buildingName]);
  return <div id="map" className="w-full h-[374px] mobile:h-[178px]" />;
};

export default NaverMap;
