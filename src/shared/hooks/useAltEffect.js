import { useEffect, useLayoutEffect } from "react"

const useAltEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default useAltEffect;