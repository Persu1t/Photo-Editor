import React from "react";
import { useSelector } from "react-redux";
import { imgUploadSelector } from "../redux/imageuploadSlice";
import { Stage, Sprite, withFilters, Container } from "@pixi/react";
import * as PIXI from "pixi.js";

const Pallet = () => {
  const { uploadedImage } = useSelector(imgUploadSelector);
  const Filters = withFilters(Container, {
    blur: PIXI.BlurFilter,
    matrix: PIXI.ColorMatrixFilter,
    matrix2: PIXI.ColorMatrixFilter,
    matrix3: PIXI.ColorMatrixFilter
  });

  return (
    <div className="flex justify-center">
      <Stage height={uploadedImage.height} width={uploadedImage.width}>
        <Filters
          blur={{ blur: 0 }}
          matrix={{ enabled: true }}
          apply={({ matrix, matrix2, matrix3 }) => {
            matrix.contrast(1);
            matrix2.brightness(2);
            matrix3.hue(50)
          }}
        >
          <Sprite image={uploadedImage.image} />
        </Filters>
      </Stage>
    </div>
  );
};

export default Pallet;
