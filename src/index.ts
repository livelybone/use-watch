import { useLayoutEffect, useRef } from 'react'

export interface Watcher<T extends any> {
  (watches: T, preWatches?: T): any
}

export interface WatchOptions {
  /**
   * 是否在初始的时候就运行 watcher
   *
   * Whether call the watcher at begin
   *
   * Default is false
   * */
  immediate?: boolean

  /**
   * Use for debounce
   * */
  debounce?: number

  /**
   * Use for throttle
   * */
  throttle?: number
}

/**
 * @param watches               依赖的集合
 *                              如果 watches 为引用类型，请使用 useMemo 来生成, 否则回调有可能会不停的被调用
 *
 *                              Assembly of the prop of the component
 *                              If props is a reference type, please use useMemo to generate, otherwise the watcher may be called repeatedly
 *
 * @param watcher               监听回调函数
 *
 *                              map function
 *
 * @param [options]             选项
 *
 *                              Options
 *
 * @desc                        请不要在 watcher 中改变依赖 watches 的值
 *
 *                              Please do not change the value of the watches in watcher
 * */
export default function useWatch<T extends any>(
  watches: T,
  watcher: Watcher<T>,
  options: WatchOptions = {},
): void {
  const time = useRef({
    lastWatch: 0,
    lastCall: 0,
    debounce: options.debounce,
    throttle: options.throttle,
  })
  const shouldCall = useRef(options.immediate)
  const call = useRef<{ preWatches: T | undefined; watcher: Watcher<T> }>({
    preWatches: undefined,
    watcher,
  })
  call.current.watcher = watcher

  useLayoutEffect(() => {
    const now = Date.now()

    if (
      shouldCall.current &&
      ((!options.debounce && !options.throttle) ||
        (options.debounce && now - time.current.lastWatch > options.debounce) ||
        (options.throttle && now - time.current.lastCall > options.throttle))
    ) {
      try {
        call.current!.watcher(watches, call.current.preWatches)
        time.current.lastCall = now
      } catch (e) {
        console.error(e)
      }
    }

    call.current.preWatches = watches
    shouldCall.current = true
    time.current.lastWatch = now
  }, [options.debounce, options.throttle, watches])
}
