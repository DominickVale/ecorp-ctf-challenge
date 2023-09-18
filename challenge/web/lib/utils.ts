import {twMerge} from "tailwind-merge";
import {ClassValue, clsx} from "clsx";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
export function mapRange(in_min: number, in_max: number, input: number, out_min: number, out_max: number) {
  return ((input - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}
