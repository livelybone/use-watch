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
  options: any = {},
): void {
  const shouldCall = useRef(options.immediate)
  const call = useRef<{ preWatches: T; watcher: Watcher<T> }>({
    preWatches: watches,
    watcher,
  })
  call.current.watcher = watcher

  useLayoutEffect(() => {
    if (shouldCall.current) {
      call.current!.watcher(watches, call.current!.preWatches)
      call.current!.preWatches = watches
    }
    shouldCall.current = true
  }, [watches])
}
