import React, { useState } from 'react';
import BlackCardPrompt from './BlackCardPrompt';
import ImageChoiceGrid from './ImageChoiceGrid';
import WhiteCardAnswer from './WhiteCardAnswer';
import './CardStyles.css';

export default function FormController() {
  const [selected, setSelected] = useState([]);

  return (
    <div className="form-wrapper">
      <BlackCardPrompt text="Choose 3 images that reflect your vibe" />
      <ImageChoiceGrid onSelect={setSelected} max={3} />
      <WhiteCardAnswer selectedImages={selected} />
    </div>
  );
}
