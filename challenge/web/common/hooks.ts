import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const pages = ["home", "blog", "contact-us", "blog-post"] as const;
export type Page = (typeof pages)[number];

export function usePageFromPathname() {
  const path = usePathname();
  if (path) {
    if(path === "/") return "home"
    const splitPath = path.split("/");
    if(splitPath.includes("posts")) return "blog-post"
    const page = splitPath.find((p) => pages.includes(p as Page));
    if (page) {
      return page as Page;
    }
  }
}

export const GlobalContext = createContext<{ isLoaded: boolean }>({ isLoaded: false });
GlobalContext.displayName = "GlobalContext";

export function useIsLoaded() {
  const { isLoaded } = useContext(GlobalContext);

  return isLoaded;
}

export const useScrambleText = (inputString: string, scramble: boolean, scrambleAnimationLength = 50): string => {
	const [scrambledString, setScrambledString] = useState<string>('')

	useEffect(() => {
		if (!scramble) {
			setScrambledString(inputString)
			return
		}

		// Function to generate a random alphanumeric character
		const getRandomChar = (): string => {
			const characters = '!@#$%^&*()+++____##πΠΔαβΦΓ'
			const randomIndex = Math.floor(Math.random() * characters.length)
			return characters[randomIndex]
		}

		// Function to scramble characters from left to right
		const animateScramble = (currentCharIndex: number) => {
			if (currentCharIndex >= inputString.length) {
				return // Animation completed, no need to update the state
			}

			setScrambledString(prevScrambled => {
				const nextChar = getRandomChar()
				return prevScrambled.slice(0, currentCharIndex) + nextChar + prevScrambled.slice(currentCharIndex + 1)
			})

			setTimeout(() => {
				animateScramble(currentCharIndex + 1)
			}, scrambleAnimationLength) // Adjust the interval value to control the animation speed
		}

		// Start the animation
		animateScramble(0)
	}, [inputString, scramble])

	return scramble ? scrambledString : inputString
}
