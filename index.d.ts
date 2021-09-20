interface Watcher<T extends any> {
  (watches: T, preWatches?: T): any
}
interface WatchOptions {
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
declare function useWatch<T extends any>(
  watches: T,
  watcher: Watcher<T>,
  options?: WatchOptions,
): void

export default useWatch
export { WatchOptions, Watcher }
