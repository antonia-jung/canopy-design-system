import type { ReactNode } from 'react';
import {
  Slider as AriaSlider,
  SliderTrack,
  SliderThumb,
  SliderOutput,
  type SliderProps as AriaSliderProps,
} from 'react-aria-components';
import { Label } from '../Label/Label';
import './Slider.css';

export interface SliderProps<T extends number | number[]> extends Omit<AriaSliderProps<T>, 'className' | 'style' | 'children' | 'orientation'> {
  label?: ReactNode;
  /** Zeigt den aktuellen Wert neben dem Label */
  showValue?: boolean;
}

/**
 * Wählt einen Wert oder mit zwei Werten einen Bereich. Pfeiltasten ändern in Schritten,
 * Pos1 und Ende springen zu Minimum und Maximum, Bild hoch und runter ändern in größeren Schritten.
 */
export function Slider<T extends number | number[]>({ label, showValue = false, ...rest }: SliderProps<T>) {
  return (
    <AriaSlider {...rest} className="cp-slider">
      {(label || showValue) && (
        <div className="cp-slider__head">
          {label && <Label>{label}</Label>}
          {showValue && <SliderOutput className="cp-slider__output" />}
        </div>
      )}
      <SliderTrack className="cp-slider__track">
        {({ state }) => {
          const n = state.values.length;
          const end = state.getThumbPercent(n - 1) * 100;
          const start = n > 1 ? state.getThumbPercent(0) * 100 : 0;
          return (
            <>
              <div
                className="cp-slider__fill"
                style={
                  n > 1
                    ? { left: `${start}%`, width: `${end - start}%` }
                    : { left: '-12px', width: `calc(${end}% + 12px)` }
                }
              />
              {state.values.map((_, i) => (
                <SliderThumb key={i} index={i} className="cp-slider__thumb" />
              ))}
            </>
          );
        }}
      </SliderTrack>
    </AriaSlider>
  );
}
