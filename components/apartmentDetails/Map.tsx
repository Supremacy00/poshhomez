"use client";
import React, { useState, useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { MapProps } from "@/@types";
import { FadeLoader } from "react-spinners";

const Map: React.FC<MapProps> = ({ address, zoom }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isMapLoading, setIsMapLoading] = useState(true);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      version: "weekly",
    });

    loader.importLibrary("core").then(() => {
      const geocoder = new google.maps.Geocoder();

      if (address) {
        geocoder.geocode({ address }, (results, status) => {
          if (
            status === google.maps.GeocoderStatus.OK &&
            results?.length &&
            mapRef.current
          ) {
            const map = new google.maps.Map(mapRef.current, {
              center: results[0]?.geometry.location,
              zoom: zoom,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              mapTypeControl: true,
              mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DEFAULT,
                position: google.maps.ControlPosition.LEFT_BOTTOM,
                mapTypeIds: [
                  google.maps.MapTypeId.ROADMAP,
                  google.maps.MapTypeId.SATELLITE,
                ],
              },
            });

            new google.maps.Marker({
              map: map,
              position: results[0]?.geometry.location,
            });

            setIsMapLoading(false);
          } else {
            console.error(
              `Geocode was not successful for the following reason: ${status}`
            );
          }
        });
      }
    });
  },);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      {isMapLoading && (
          <div className="relative w-full h-full flex justify-center items-center bg-gray-300 bg-opacity-40 animate-pulse">
            <FadeLoader
              color="#646464"
              height={7}
              margin={-9}
              radius={0}
              width={2.5}
            />
          </div>
      )}
      <div ref={mapRef} className="w-full h-full outline-none" tabIndex={-1} />
      <div className="absolute top-2.5 mx-2.5 ss:absolute ss:right-auto text-[15px] text-secondary bg-white py-2.5 px-4">
        {address}
      </div>
    </div>
  );
};

export default Map;
